import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { SvgUri } from "react-native-svg";

export default function MenuHamburguer() {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useRouter();

    function handleConfigs() {
        navigation.push('/configs');
        setModalVisible(false);
    }

    function handleSair() {
        navigation.push('/sign-in');
        setModalVisible(false);
    }

    return (
        <>
            <View className="absolute top-12 right-6 p-4 w-14 h-14 rounded-full flex items-center justify-center bg-[#1D1D1D99]">
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <SvgUri
                        uri={process.env.EXPO_PUBLIC_URL_S3 + '/list.svg'}
                        width={25}
                        height={25}
                        fill={'#FFFFFF'}
                    />
                </TouchableOpacity>
            </View>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
            >
                {/* View para escurecer o fundo */}
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)} // Fecha o modal ao clicar fora
                    style={{ flex: 1, backgroundColor: '#000000B0', justifyContent: 'center', alignItems: 'flex-end' }}
                >
                    {/* Menu lateral */}
                    <TouchableOpacity
                        activeOpacity={1} // Desativa o clique dentro do menu para que ele não feche o modal
                        style={{ backgroundColor: '#1D1D1D', height: '100%', width: '50%', paddingTop: 64 }}
                    >
                        {/* Título do Menu */}
                        <TouchableOpacity onPress={handleConfigs}>
                            <View className="flex flex-row gap-3 justify-center">
                                <Text className="text-white text-base mb-4">Configurações</Text>
                                <SvgUri
                                    uri={process.env.EXPO_PUBLIC_URL_S3 + '/cog.svg'}
                                    width={20}
                                    height={20}
                                />
                            </View>
                        </TouchableOpacity>
                        <View className="flex flex-row gap-3 justify-center">
                            <Text className="text-white text-base mb-4">Suporte</Text>
                            <SvgUri
                                uri={process.env.EXPO_PUBLIC_URL_S3 + '/wheel.svg'}
                                width={20}
                                height={20}
                            />
                        </View>
                        <View className="flex flex-row gap-3 justify-center">
                            <Text className="text-white text-base mb-4">FAQ</Text>
                            <SvgUri
                                uri={process.env.EXPO_PUBLIC_URL_S3 + '/help.svg'}
                                width={20}
                                height={20}
                            />
                        </View>

                        {/* Botão para fechar o menu */}
                        <TouchableOpacity onPress={handleSair}>
                            <View className="flex flex-row gap-3 justify-center">
                                <Text className="text-white text-base mb-4">Sair</Text>
                                <SvgUri
                                    uri={process.env.EXPO_PUBLIC_URL_S3 + '/exit.svg'}
                                    width={20}
                                    height={20}
                                />
                            </View>
                        </TouchableOpacity>

                        {/* Centralizar a imagem e os textos na parte inferior */}
                        <View style={{ alignItems: 'center', marginTop: 'auto', marginBottom: 20 }}>
                            <Image style={{ width: 111, height: 34 }} source={require('../../../assets/images/ROLE.png')} />
                            <Text className="text-[#D9D9D9] mt-3 text-xs">© ROLE</Text>
                            <Text className="text-[#D9D9D9] mt-3 text-xs">Todos os direitos reservados.</Text>
                            <Text className="text-[#D9D9D9] mt-3 text-[8px]">Desenvolvido por DevDynasty</Text>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </>
    );
}
