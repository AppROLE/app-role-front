import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, Pressable, Text, TextInput, View } from "react-native";

const statusBarHeight = Constants.statusBarHeight

export default function Background({ children }: any) {
    return (
        <LinearGradient
            style={{ flex: 1 }}
            className="flex h-screen w-full"
            colors={[
                '#10002B',
                '#240046',
                '#3C096C',
                '#5A189A',
                '#9C4EDC',
                '#DFA9FD'
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View
                style={{ marginTop: statusBarHeight }}
                className="flex h-full w-full flex-col justify-between gap-4"
            >
                <Image
                    style={{
                        width: 140, // Ajuste aqui para o tamanho desejado
                        height: 70 // Ajuste aqui para o tamanho desejado
                    }}
                    source={require('../../../assets/images/ROLE.png')}
                    className="ml-6 mt-4"
                />
                <View className="flex h-[89%] flex-col items-center  rounded-t-[54px] bg-background pt-12">
                    {children}
                </View>
            </View>
        </LinearGradient >
    )
}