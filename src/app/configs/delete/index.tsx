import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgUri } from "react-native-svg";
import Background from "@/src/components/background";
import { useRouter } from "expo-router";
import RoleMainButton from "@/src/components/roleMainButton";
import Toast from "react-native-toast-message";
import { AuthContext } from "@/context/auth_context";  // Importe o AuthContext
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Delete() {
    const [themeModeS, setThemeModeS] = useState('dark');
    const [isChecked, setIsChecked] = useState(false); // Estado para o checkbox
    const navigation = useRouter();
    const { deleteAccount } = useContext(AuthContext); // Use o AuthContext

    function handleVoltar() {
        navigation.back();
    }

    async function handleButton() {
        try {
            const response = await deleteAccount(); // Passa o idToken no request
            if (response.message === 'Conta deletada com sucesso!') {
                Toast.show({
                    type: 'success',
                    text1: 'Conta deletada com sucesso',
                    visibilityTime: 3000,
                    position: 'top', 
                    topOffset: 10,   
                    onHide: () => {
                        AsyncStorage.removeItem('idToken'); // Remove o idToken do AsyncStorage
                        AsyncStorage.removeItem('accessToken'); // Remove o accessToken do AsyncStorage
                        AsyncStorage.removeItem('refreshToken'); // Remove o refreshToken do AsyncStorage
                        navigation.replace('/first-page'); // Redireciona após sucesso
                    } // Redireciona após sucesso
                });
                
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao deletar conta',
                    text2: 'Tente novamente mais tarde.',
                    visibilityTime: 3000,
                    position: 'top', 
                    topOffset: 10,
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Falha ao deletar conta',
                visibilityTime: 3000,
                position: 'top', 
                topOffset: 10,
            });
        }
    }
    return (
        <>
            <Background>
                <Toast/>
                <View className="justify-between h-[95%] w-full">
                    <View>
                        <View className="flex flex-row items-center px-5">
                            <TouchableOpacity
                                onPress={() => handleVoltar()}
                                className={`flex h-12 w-12 items-center justify-center rounded-full ${themeModeS === 'dark' ? 'bg-[#1C1C1C]' : 'bg-[#C9C9C9]'}`}
                            >
                                <SvgUri
                                    uri={process.env.EXPO_PUBLIC_URL_S3 + '/left_arrow.svg'}
                                    width={20}
                                    height={20}
                                    fill={themeModeS === 'dark' ? '#FFFFFF' : '#000000'}
                                />
                            </TouchableOpacity>
                            <Text className="text-white text-3xl ml-20">Excluir Conta</Text>
                        </View>

                        <View>
                            <View className={`mt-6 h-[1px] w-full ${themeModeS === 'dark' ? 'bg-[#615b5b]' : 'bg-[#D0D0D0]'}`} />
                            <Text className="text-white text-xl py-8 px-10 text-center">
                                Atenção! O ROLE irá excluir todas as informações de sua conta e removê-lá de nosso banco de dados.
                                Você tem certeza que deseja continuar?
                            </Text>

                            {/* Custom Checkbox View */}
                            {/* Custom Checkbox View */}
                            <View className="flex flex-row items-center justify-center gap-4 py-10">
                                <TouchableOpacity
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 4,
                                    }}
                                    onPress={() => setIsChecked(!isChecked)}
                                >
                                    {/* Alternar entre dois SVGs com base no estado */}
                                    {isChecked ? (
                                        <SvgUri
                                            uri={process.env.EXPO_PUBLIC_URL_S3 + '/checkbox_check.svg'} // SVG para quando está marcado
                                            width={25}
                                            height={25}
                                        />
                                    ) : (
                                        <SvgUri
                                            uri={process.env.EXPO_PUBLIC_URL_S3 + '/checkbox_empty.svg'} // SVG para quando não está marcado
                                            width={25}
                                            height={25}
                                        />
                                    )}
                                </TouchableOpacity>
                                <Text
                                    style={{
                                        color: themeModeS === 'dark' ? '#BDBDBD' : '#000000', // Estilo condicional aplicado aqui
                                        width: 300,
                                    }}
                                >
                                    Estou ciente que está ação é irreversível e quero excluir minha conta.
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View className="bg-[#1C1C1C] pt-6 pb-7 items-center w-full">
                        <View className="w-80">
                            <RoleMainButton
                                type="gradient"
                                buttonFunction={handleButton} // Função para deletar a conta
                                disabled={!isChecked} // Botão desativado até marcar o checkbox
                            >
                                <Text className="text-white">Excluir Conta</Text>
                            </RoleMainButton>
                        </View>
                    </View>
                </View>
            </Background>
        </>
    );
}
