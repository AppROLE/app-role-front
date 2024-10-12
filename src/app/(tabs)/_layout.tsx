import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserContextProvider from '@/context/user_context';
import { InstituteContextProvider } from '@/context/institute_context';
import {useEffect, useState} from "react";
import { UserRepositoryHttp } from "@/api/repositories/user_repository_http"; // ajuste o caminho conforme necessário

export default function TabLayout() {
    const insets = useSafeAreaInsets(); // Obtem as margens seguras do dispositivo

    // Defina as alturas para dispositivos com ou sem SafeAreaView
    const tabBarHeightWithSafeArea = 60;
    const tabBarHeightWithoutSafeArea = 90;

    // Use a altura adequada com base no insets.bottom
    const tabBarHeight = insets.bottom > 0 ? tabBarHeightWithoutSafeArea : tabBarHeightWithSafeArea;

    // Instanciar a classe UserRepositoryHttp
    const userRepository = new UserRepositoryHttp();

    // Estados para armazenar os dados do perfil
    const [profileData, setProfileData] = useState({
        profilePhoto: '',
    });

    async function fetchProfile() {
        try {
            const profile = await userRepository.getProfile();
            if (profile) {
                setProfileData(profile);
            }
        } catch (error) {
            console.error("Erro ao buscar perfil:", error);
        }
    }

    console.log(profileData)

    // useEffect para carregar os dados quando o componente for montado
    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <UserContextProvider>
            <InstituteContextProvider>
                <Tabs
                    screenOptions={{
                        tabBarActiveTintColor: 'blue',
                        headerShown: false,
                        tabBarStyle: {
                            backgroundColor: '#1C1C1C',
                            borderTopWidth: 2,
                            borderTopColor: '#2C2B2B',
                            height: tabBarHeight, // Usa a altura dinâmica baseada no dispositivo
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingBottom: 0
                        },
                    }}
                >
                    <Tabs.Screen
                        name="home/index"
                        options={{
                            tabBarLabel: '', // Oculta o nome da aba
                            tabBarIcon: ({ focused }) => (
                                <View className='justify-start flex-1 pt-4'>
                                    <FontAwesome6 name="house" size={28} color={`${focused ? '#9C4EDC' : '#FFFFFF'}`} />
                                </View>
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="packages/index"
                        options={{
                            tabBarLabel: '', // Oculta o nome da aba
                            tabBarIcon: ({ focused }) => (
                                <View className='justify-start flex-1 pt-4'>
                                    <MaterialCommunityIcons name="party-popper" size={28} color={`${focused ? '#9C4EDC' : '#FFFFFF'}`} />
                                </View>
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="favorites/index"
                        options={{
                            tabBarLabel: '', // Oculta o nome da aba
                            tabBarIcon: ({ focused }) => (
                                <View className='justify-start flex-1 pt-4'>
                                    <FontAwesome6 name="heart" size={28} color={`${focused ? '#9C4EDC' : '#FFFFFF'}`} solid />
                                </View>
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="profile/index"
                        options={{
                            tabBarLabel: '', // Oculta o nome da aba
                            tabBarIcon: ({ focused }) => (
                                <View className='justify-start flex-1 pt-4'>
                                    <LinearGradient
                                        colors={focused ? ['#5A189A', '#9C4EDC'] : ['#FFFFFF', '#FFFFFF']}
                                        style={{
                                            borderRadius: 50,
                                            padding: 2, // Ajuste para a espessura da borda
                                        }}
                                    >
                                        <View style={{
                                            borderRadius: 50,
                                            backgroundColor: 'white', // Cor do fundo
                                            width: 28, // Largura total do contêiner
                                            height: 28, // Altura total do contêiner
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Image
                                                source={{ uri: 'https://placehold.co/600x400' }}
                                                style={{ width: 24, height: 24, borderRadius: 12 }}
                                            />
                                        </View>
                                    </LinearGradient>
                                </View>
                            ),
                        }}
                    />
                </Tabs>
            </InstituteContextProvider>
        </UserContextProvider>
    );
}
