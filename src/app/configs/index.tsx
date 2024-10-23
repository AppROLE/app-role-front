import Background from "@/src/components/background";
import CustomToggleSwitch from "@/src/components/switch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgUri } from "react-native-svg";

export default function Configs() {
    const navigation = useRouter();
    const [themeModeS, setThemeModeS] = useState('dark');

    // Carrega o tema salvo do AsyncStorage quando a tela é montada
    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('themeMode');
            if (savedTheme) {
                setThemeModeS(savedTheme);
            }
        };
        loadTheme();
    }, []);

    function handleVoltar() {
        navigation.back();
    }

    function handlePrivacidade() {
        navigation.push('/privacy');
    }

    function handleConta() {
        navigation.push('/account');
    }

    function handleExcluir() {
        navigation.push('/configs/delete');
    }


    return (
        <Background>
            <View className="flex flex-row items-center justify-center relative w-full">
                <TouchableOpacity
                    onPress={() => handleVoltar()}
                    className={`absolute left-5 bottom-1 h-12 w-12 items-center justify-center rounded-full ${themeModeS === 'dark' ? 'bg-[#1C1C1C]' : 'bg-[#C9C9C9]'}`}
                >
                    <SvgUri
                        uri={process.env.EXPO_PUBLIC_URL_S3 + '/left_arrow.svg'}
                        width={20}
                        height={20}
                    />
                </TouchableOpacity>
                {/* Título centralizado */}
                <Text className="text-white text-4xl font-nunitoBold flex-1 text-center bottom-1">
                    Configurações
                </Text>
            </View>

            <View className={`mt-6 h-[1px] w-full ${themeModeS === 'dark' ? 'bg-[#2C2B2B]' : 'bg-[#D0D0D0]'}`} />

            {/* Privacidade */}
            <TouchableOpacity className="w-full pl-10 py-3" onPress={handlePrivacidade}>
                <View className="flex flex-row">
                    <Text className={`text-xl mt-4 ${themeModeS === 'dark' ? 'text-white' : 'text-black'} font-nunitoBold`}>Privacidade</Text>
                    <View className={`absolute ml-[300px] mt-1 flex h-12 w-12 items-center justify-center rounded-full ${themeModeS === 'dark' ? 'bg-[#1C1C1C]' : 'bg-[#C9C9C9]'}`}>
                        <SvgUri
                            uri={process.env.EXPO_PUBLIC_URL_S3 + '/right_arrow.svg'}
                            width={20}
                            height={20}
                            fill={themeModeS === 'dark' ? '#FFFFFF' : '#000000'}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            <View className={`mt-4 h-[1px] w-full ${themeModeS === 'dark' ? 'bg-[#2C2B2B]' : 'bg-[#D0D0D0]'}`} />

            {/* Conta */}
            <TouchableOpacity className="w-full pl-10 py-3" onPress={handleConta}>
                <View className="flex flex-row">
                    <Text className={`text-xl mt-4 ${themeModeS === 'dark' ? 'text-white' : 'text-black'} font-nunitoBold`}>Conta</Text>
                    <View className={`absolute ml-[300px] mt-1 flex h-12 w-12 items-center justify-center rounded-full ${themeModeS === 'dark' ? 'bg-[#1C1C1C]' : 'bg-[#C9C9C9]'}`}>
                        <SvgUri
                            uri={process.env.EXPO_PUBLIC_URL_S3 + '/right_arrow.svg'}
                            width={20}
                            height={20}
                            fill={themeModeS === 'dark' ? '#FFFFFF' : '#000000'}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            <View className={`mt-4 h-[1px] w-full ${themeModeS === 'dark' ? 'bg-[#2C2B2B]' : 'bg-[#D0D0D0]'}`} />

            {/* Excluir */}
            <TouchableOpacity className="w-full pl-10 py-3" onPress={handleExcluir}>
                <View className="flex flex-row">
                    <Text className={`text-xl mt-4 ${themeModeS === 'dark' ? 'text-white' : 'text-black'} font-nunitoBold`}>Excluir Conta</Text>
                    <View className={`absolute ml-[300px] mt-1 flex h-12 w-12 items-center justify-center rounded-full ${themeModeS === 'dark' ? 'bg-[#1C1C1C]' : 'bg-[#C9C9C9]'}`}>
                        <SvgUri
                            uri={process.env.EXPO_PUBLIC_URL_S3 + '/right_arrow.svg'}
                            width={20}
                            height={20}
                            fill={themeModeS === 'dark' ? '#FFFFFF' : '#000000'}
                        />
                    </View>
                </View>
            </TouchableOpacity>
            <View className={`mt-4 h-[1px] w-full ${themeModeS === 'dark' ? 'bg-[#2C2B2B]' : 'bg-[#D0D0D0]'}`} />
        </Background>
    );
}
