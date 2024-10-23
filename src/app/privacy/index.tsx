import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Background from '@/src/components/background';
import React, { useState } from "react";
import BigButton from "@/src/components/bigButton";
import Svg from "@/src/components/svg";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RoleMainButton from '@/src/components/roleMainButton';
import { useNavigation, useRouter } from 'expo-router';

export default function Privacy() {
    const [isPrivate, setIsPrivate] = React.useState(false);
    const navigation = useRouter();
    const insets = useSafeAreaInsets();
    const [viewHeight, setViewHeight] = useState(0);

    const handleLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;
        setViewHeight(height);
    };
    const tabBarHeightWithSafeArea = viewHeight - 20;
    const tabBarHeightWithoutSafeArea = 0;
    const tabBarHeight = insets.bottom > 0 ? tabBarHeightWithoutSafeArea : tabBarHeightWithSafeArea;

    function handleGoBack() {
        navigation.push('/configs');  // Função para voltar para a tela anterior
    }

    function onSave() {
        //go back to previous screen
    }
    return (
        <Background>
            <SafeAreaView style={{ flex: 1, paddingBottom: insets.bottom }}>
                <View className="w-full flex-1 relative">
                    <View className="relative flex flex-row h-16 w-full items-center gap-3 ">
                        <TouchableOpacity
                            onPress={() => handleGoBack()}
                            className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-button_color bottom-8 left-6"
                        >
                            <Svg
                                uri={process.env.EXPO_PUBLIC_URL_S3 + "/left_arrow.svg"}
                                width={20}
                                height={20}
                            />
                        </TouchableOpacity>
                        <View className="flex-1 justify-center h-full mb-8">
                            <Text className="absolute left-1/2 transform -translate-x-1/2 text-white text-3xl font-nunitoBold bottom-4">
                                Privacidade
                            </Text>
                        </View>
                    </View>
                    <View className='bg-[#2C2B2B] h-[1px]'/>
                    <View className="px-6 gap-3 pt-6 items-start">
                        <Text className="text-white text-lg font-nunitoBold">
                            Público
                        </Text>
                        <View className="flex-row w-full">
                            <Text className="text-white text-md pr-6 justify-center self-center mb-8 items-center w-11/12 font-nunito">
                                Todos os usuários podem ver seus próximos ROLEs e seu nome nas listas de confirmados!
                            </Text>
                            <TouchableOpacity className='rounded-full h-8 w-8 border-2 border-button_color justify-center items-center' onPress={() => setIsPrivate(false)}>
                                {!isPrivate ? <LinearGradient
                                    style={{ height: 18, width: 18, borderRadius: 999 }}
                                    colors={['#5A189A', '#9C4EDC', '#DFA9FD']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0 }}
                                /> : <></>}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className='bg-[#2C2B2B] h-[1px]'/>
                    <View className="px-6 gap-3 pt-6 items-start">
                        <Text className="text-white text-lg font-nunitoBold">
                            Privado
                        </Text>
                        <View className="flex-row w-full">
                            <Text className="text-white text-md pr-6 justify-center self-center mb-8 items-center w-11/12 font-nunito">
                                Apenas seus amigos podem ver seus próximos ROLEs e seu nome nas listas de confirmados! Da mesma forma em que apenas seus amigos estarão visívieis para você.
                            </Text>
                            <TouchableOpacity className='rounded-full h-8 w-8 border-2 border-button_color justify-center items-center' onPress={() => setIsPrivate(true)}>
                                {isPrivate ? <LinearGradient
                                    style={{ height: 18, width: 18, borderRadius: 999 }}
                                    colors={['#5A189A', '#9C4EDC', '#DFA9FD']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 0 }}
                                /> : <></>}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className='bg-[#2C2B2B] h-[1px]'/>
                    <View onLayout={handleLayout} className="absolute flex justify-end items-center py-4 bg-button_color w-full" style={{bottom: tabBarHeight}}>
                        <BigButton buttonFunction={onSave}>
                            <Text className="text-white text-lg">
                                Salvar
                            </Text>
                        </BigButton>
                    </View>
                </View>
            </SafeAreaView>
        </Background>
    );
}