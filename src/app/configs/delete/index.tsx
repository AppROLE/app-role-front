import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgUri } from "react-native-svg";
import Background from "@/src/components/background";
import { useRouter } from "expo-router";
import RoleMainButton from "@/src/components/roleMainButton";

export default function Delete() {
    const [themeModeS, setThemeModeS] = useState('dark');
    const [isChecked, setIsChecked] = useState(false); // Estado para o checkbox
    const navigation = useRouter();

    function handleVoltar() {
        navigation.back();
    }

    return (
        <>
            <Background>
                <View className="flex flex-1">
                    <View className="flex flex-row items-center px-5 py-1">
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
                        <View className={`mt-10 h-[1px] w-full ${themeModeS === 'dark' ? 'bg-[#615b5b]' : 'bg-[#D0D0D0]'}`} />
                        <Text className="text-white text-xl py-8 px-10 text-center">
                            Atenção! O ROLE irá excluir todas as informações de sua conta e removê-lá de nosso banco de dados. 
                            Você tem certeza que deseja continuar?
                        </Text>
                        
                        {/* Custom Checkbox View */}
                        <View className="flex flex-row items-center justify-center gap-4 py-10">
                            <TouchableOpacity
                                style={{
                                    height: 25,
                                    width: 25,
                                    borderWidth: 2,
                                    borderColor: themeModeS === 'dark' ? '#BDBDBD' : '#000000',
                                    backgroundColor: isChecked ? (themeModeS === 'dark' ? '#FFFFFF' : '#000000') : 'transparent',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 4,
                                }}
                                onPress={() => setIsChecked(!isChecked)}
                            >
                                {/* Optionally render checkmark */}
                                {isChecked && (
                                    <SvgUri
                                        uri={process.env.EXPO_PUBLIC_URL_S3 + '/checkmark.svg'}
                                        width={16}
                                        height={16}
                                        fill={themeModeS === 'dark' ? '#000000' : '#FFFFFF'}
                                    />
                                )}
                            </TouchableOpacity>
                            <Text
                                style={{
                                    color: themeModeS === 'dark' ? '#BDBDBD' : '#000000', // Estilo condicional aplicado aqui
                                    width: 300,
                                     // Tamanho fixo para o texto (equivalente à classe w-80)
                                }}
                            >
                                Estou ciente que está ação é irreversível e quero excluir minha conta.
                            </Text>
                        </View>
                    </View>

                    {/* Footer view ajustada */}
                    <View style={{ position: 'absolute', bottom: 0, width: '100%', marginTop: '100%' }}>
                        <View className="bg-[#1C1C1C] h-20 py-4 items-center w-full">
                            <View className="w-80 h-14"> 
                                <RoleMainButton
                                    type="gradient"
                                    buttonFunction={() => (alert('Conta excluída com sucesso!'))}  
                                >
                                    <Text className="text-white">Excluir Conta</Text>
                                </RoleMainButton>
                            </View>
                        </View>
                    </View>
                </View>
            </Background>
        </>
    );
}
