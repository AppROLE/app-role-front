import { Tabs } from 'expo-router';
import { View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserContextProvider from '@/context/user_context';
import { InstituteContextProvider } from '@/context/institute_context';
import {useEffect, useState} from "react";
import { UserRepositoryHttp } from "@/api/repositories/user_repository_http"; // ajuste o caminho conforme necessário
import Svg from '@/src/components/svg';
import { SvgGradient } from '@/src/components/svgGradient';

export default function TabLayout() {
    const insets = useSafeAreaInsets(); // Obtem as margens seguras do dispositivo

    // Defina as alturas para dispositivos com ou sem SafeAreaView
    const tabBarHeightWithSafeArea = 60;
    const tabBarHeightWithoutSafeArea = 90;

    // Use a altura adequada com base no insets.bottom
    const tabBarHeight = insets.bottom > 0 ? tabBarHeightWithoutSafeArea : tabBarHeightWithSafeArea;

    const userRepository = new UserRepositoryHttp();

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
                                    {focused ?
                                        <View>
                                            <SvgGradient
                                                uri={process.env.EXPO_PUBLIC_URL_S3 + "/house.svg"}
                                                height={28}
                                                width={28}
                                            />
                                            <View className='mt-1'>
                                                <LinearGradient
                                                    colors={focused ? ['#EBC8FF', '#C07EED'] : ['#FFFFFF', '#FFFFFF']}
                                                    style={{
                                                        borderRadius: 50,
                                                        width: 28, 
                                                        height: 2
                                                    }}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                />
                                            </View>
                                        </View>
                                        :
                                        <Svg
                                            uri={process.env.EXPO_PUBLIC_URL_S3 + "/house.svg"}
                                            height={28}
                                            width={28}
                                        />                                 
                                    }
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
                                    {focused ?
                                        <View>
                                            <SvgGradient
                                                uri={process.env.EXPO_PUBLIC_URL_S3 + "/party-popper-alt.svg"}
                                                height={28}
                                                width={28}
                                            />
                                            <View className='mt-1'>
                                                <LinearGradient
                                                    colors={focused ? ['#EBC8FF', '#C07EED'] : ['#FFFFFF', '#FFFFFF']}
                                                    style={{
                                                        borderRadius: 50,
                                                        width: 28, 
                                                        height: 2
                                                    }}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                />
                                            </View>
                                        </View>
                                        :
                                        <Svg
                                            uri={process.env.EXPO_PUBLIC_URL_S3 + "/party-popper.svg"}
                                            height={28}
                                            width={28}
                                        />                                 
                                    }
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
                                    {focused ?
                                        <View>
                                            <SvgGradient
                                                uri={process.env.EXPO_PUBLIC_URL_S3 + "/heart.svg"}
                                                height={28}
                                                width={28}
                                            />
                                            <View className='mt-1'>
                                                <LinearGradient
                                                    colors={focused ? ['#EBC8FF', '#C07EED'] : ['#FFFFFF', '#FFFFFF']}
                                                    style={{
                                                        borderRadius: 50,
                                                        width: 28, 
                                                        height: 2
                                                    }}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 0 }}
                                                />
                                            </View>
                                        </View>
                                        :
                                        <Svg
                                            uri={process.env.EXPO_PUBLIC_URL_S3 + "/heart.svg"}
                                            height={28}
                                            width={28}
                                        />                                 
                                    }
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
                                        colors={focused ? ['#EBC8FF', '#C07EED'] : ['#FFFFFF', '#FFFFFF']}
                                        style={{
                                            borderRadius: 50,
                                            width: 28, 
                                            height: 28
                                        }}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 0 }}
                                    >
                                        <View style={{
                                            borderRadius: 50,
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Image
                                                source={{ uri: !(profileData.profilePhoto == '' || profileData == undefined) ? profileData.profilePhoto : process.env.EXPO_PUBLIC_URL_S3 + "/images/profile_default.png" }}
                                                style={{ width: 25, height: 25, borderRadius: 12 }}
                                            />
                                        </View>
                                    </LinearGradient>
                                    {focused ?
                                        <View className='mt-1'>
                                            <LinearGradient
                                                colors={focused ? ['#EBC8FF', '#C07EED'] : ['#FFFFFF', '#FFFFFF']}
                                                style={{
                                                    borderRadius: 50,
                                                    width: 28, 
                                                    height: 2
                                                }}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                            />
                                        </View> : <></>
                                    }
                                </View>
                                
                            ),
                        }}
                    />
                </Tabs>
            </InstituteContextProvider>
        </UserContextProvider>
    );
}
