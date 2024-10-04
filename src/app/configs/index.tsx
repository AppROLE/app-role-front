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
        // navigation.push('/configs/privacy'); 
    }

    function handleConta() {
        // navigation.push('/configs/account'); 
    }

    function handleExcluir() {
        navigation.push('/configs/delete'); 
    }

    // Função chamada quando o switch de tema é alterado
    
  const toggleTheme = async (isDark: boolean) => {
    const newTheme = isDark ? 'dark' : 'light';
    setThemeModeS(newTheme);
    await AsyncStorage.setItem('themeMode', newTheme);
  };

    return (
        <Background>
            <View className="flex flex-row items-center justify-center">
                <TouchableOpacity
                    onPress={() => handleVoltar()}
                    className={`absolute right-64 ml-5 flex h-12 w-12 items-center justify-center rounded-full ${themeModeS === 'dark' ? 'bg-[#1C1C1C]' : 'bg-[#C9C9C9]'}`}
                >
                    <SvgUri 
                        uri={process.env.EXPO_PUBLIC_URL_S3 + '/left_arrow.svg'}
                        width={20}
                        height={20}
                        fill={themeModeS === 'dark' ? '#FFFFFF' : '#000000'}
                    />
                </TouchableOpacity>
                <Text className={`text-3xl ${themeModeS === 'dark' ? 'text-white' : 'text-black'} font-sansBold`}>Configurações</Text>
            </View>
            <View className={`mt-10 h-[1px] w-full ${themeModeS === 'dark' ? 'bg-[#615b5b]' : 'bg-[#D0D0D0]'}`} />

            {/* Privacidade */}
            <TouchableOpacity className="w-full pl-10 py-3" onPress={handlePrivacidade}>
                <View className="flex flex-row">
                    <Text className={`text-xl mt-4 ${themeModeS === 'dark' ? 'text-white' : 'text-black'} font-sansBold`}>Privacidade</Text>
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
            <View className={`mt-4 h-[1px] w-full ${themeModeS === 'dark' ? 'bg-[#615b5b]' : 'bg-[#D0D0D0]'}`} />

            {/* Conta */}
            <TouchableOpacity className="w-full pl-10 py-3" onPress={handleConta}>
                <View className="flex flex-row">
                    <Text className={`text-xl mt-4 ${themeModeS === 'dark' ? 'text-white' : 'text-black'} font-sansBold`}>Conta</Text>
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
            <View className={`mt-4 h-[1px] w-full ${themeModeS === 'dark' ? 'bg-[#615b5b]' : 'bg-[#D0D0D0]'}`} />

            {/* Aparência */}
            <View className="w-full pl-10 py-3">
                <View className="flex flex-row">
                    <Text className={`text-xl mt-4 ${themeModeS === 'dark' ? 'text-white' : 'text-black'} font-sansBold`}>Aparência</Text>
                    <View className="absolute ml-[250px] mt-1 flex flex-row h-12 w-12 items-center justify-center gap-3">
                        <SvgUri 
                            uri={process.env.EXPO_PUBLIC_URL_S3 + '/sun.svg'}
                            width={20}
                            height={20}
                            fill={themeModeS === 'dark' ? '#FFFFFF' : '#000000'}
                        />
                        <CustomToggleSwitch
                             themeMode={themeModeS} // Passa o tema atual
                             onValueChange={toggleTheme}
                        />
                        <SvgUri 
                            uri={process.env.EXPO_PUBLIC_URL_S3 + '/moon.svg'}
                            width={20}
                            height={20}
                            fill={themeModeS === 'dark' ? '#FFFFFF' : '#000000'}
                        />
                    </View>
                </View>
            </View>
            <View className={`mt-4 h-[1px] w-full ${themeModeS === 'dark' ? 'bg-[#615b5b]' : 'bg-[#D0D0D0]'}`} />

            {/* Excluir */}
            <TouchableOpacity className="w-full pl-10 py-3" onPress={handleExcluir}>
                <View className="flex flex-row">
                    <Text className={`text-xl mt-4 ${themeModeS === 'dark' ? 'text-white' : 'text-black'} font-sansBold`}>Excluir Conta</Text>
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
            <View className={`mt-4 h-[1px] w-full ${themeModeS === 'dark' ? 'bg-[#615b5b]' : 'bg-[#D0D0D0]'}`} />
        </Background>
    );
}
