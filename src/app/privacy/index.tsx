import {
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Background from '@/src/components/background';
import React, {useState} from "react";
import BigButton from "@/src/components/bigButton";
import Svg from "@/src/components/svg";
import {LinearGradient} from "expo-linear-gradient";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function Privacy() {
    const [isPrivate, setIsPrivate] = React.useState(false);

    const insets = useSafeAreaInsets();
    const [viewHeight, setViewHeight] = useState(0);

    const handleLayout = (event:any) => {
        const { height } = event.nativeEvent.layout;
        setViewHeight(height);
    };

    const tabBarHeightWithSafeArea = viewHeight - 20;
    const tabBarHeightWithoutSafeArea = 0;

    const tabBarHeight = insets.bottom > 0 ? tabBarHeightWithoutSafeArea : tabBarHeightWithSafeArea;

    function onSave(){
        //go back to previous screen
    }
    return (
        <Background>
            <View className="w-full flex-1">
                <View className="relative flex flex-row h-12 w-full items-center gap-3 border-b-2 border-b-line_gray">
                    <TouchableOpacity
                        className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-button_color bottom-4 left-6"
                    >
                        <Svg
                            uri={process.env.EXPO_PUBLIC_URL_S3 + "/left_arrow.svg"}
                        />
                    </TouchableOpacity>
                    <View className="flex-1 h-full mb-8">
                        <Text className="absolute left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold">
                            Privacidade
                        </Text>
                    </View>
                </View>
                <View className="px-6 gap-3 pt-6 items-start border-b-2 border-b-line_gray">
                    <Text className="text-white text-lg font-bold">
                        Público
                    </Text>
                    <View className="flex-row w-full">
                        <Text className="text-white text-xs pr-6 justify-center self-center mb-8 items-center w-11/12">
                            Todos os usuários podem ver seus próximos ROLEs e seu nome nas listas de confirmados!
                        </Text>
                        <TouchableOpacity className='rounded-full h-8 w-8 border-2 border-button_color justify-center items-center' onPress={() => setIsPrivate(false)}>
                            {!isPrivate ? <LinearGradient
                                style={{height: 18, width: 18, borderRadius: 999}}
                                colors={['#5A189A', '#9C4EDC', '#DFA9FD']}
                                start={{x: 0, y: 1}}
                                end={{x: 1, y: 0}}
                            /> : <></>}
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="px-6 gap-3 pt-6 items-start border-b-2 border-b-line_gray">
                    <Text className="text-white text-lg font-bold">
                        Privado
                    </Text>
                    <View className="flex-row w-full">
                        <Text className="text-white text-xs pr-6 justify-center self-center mb-8 items-center w-11/12">
                            Apenas seus amigos podem ver seus próximos ROLEs e seu nome nas listas de confirmados! Da mesma forma em que apenas seus amigos estarão visívieis para você.
                        </Text>
                        <TouchableOpacity className='rounded-full h-8 w-8 border-2 border-button_color justify-center items-center' onPress={() => setIsPrivate(true)}>
                            {isPrivate ? <LinearGradient
                                style={{height: 18, width: 18, borderRadius: 999}}
                                colors={['#5A189A', '#9C4EDC', '#DFA9FD']}
                                start={{x: 0, y: 1}}
                                end={{x: 1, y: 0}}
                            /> : <></>}
                        </TouchableOpacity>
                    </View>
                </View>

                <View onLayout={handleLayout} className="absolute flex justify-end items-center py-4 bg-button_color w-full" style={{bottom: tabBarHeight}}>
                    <BigButton buttonFunction={onSave}>
                        <Text className="text-white text-lg">
                            Salvar
                        </Text>
                    </BigButton>
                </View>

            </View>
        </Background>
    );
}