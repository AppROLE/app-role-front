import Background from "@/src/components/background";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from "react";
import { Link } from "expo-router";


export default function ForgotPassword() {
    const [email, setEmail] = useState("");

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handlePress = () => {
        if (validateEmail(email)) {
            Alert.alert(
                "Sucesso",
                "E-mail enviado com sucesso. Verifique sua caixa de entrada.",
                [{ text: "OK" }]
            );
            setEmail("");
        } else {
            Alert.alert(
                "Erro",
                "Por favor, insira um e-mail válido.",
                [{ text: "OK" }]
            );
        }
    };

    return (
        <>
            <Background>
                <View className="flex justify-center items-center w-[80%]">
                    <Text className="text-white text-2xl ">Recuperação de Senha</Text>
                    <View className="w-[85%] pt-8">
                        <Text className="text-[#BDBDBD] text-center text-base">Escreva seu e-mail ou nome de usuário e enviaremos detalhes de como prosseguir 
                        para a criação de sua nova senha.</Text>
                    </View>
                    <View className="flex w-80 flex-row gap-2 border-b-[1px] border-WHITE mt-16">
                        <Entypo name="mail" size={24} color="#BDBDBD" />
                        <TextInput
                            placeholder="E-mail"
                            className="w-[80%] text-white placeholder:text-[#BDBDBD]"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View className="pt-16">
                        <TouchableOpacity 
                            className="mt-8 bg-violet-700 w-96 py-2 rounded-2xl h-10"
                            onPress={handlePress}
                        >
                            <Text className="text-white text-center text-base">Enviar</Text>
                        </TouchableOpacity>
                        <Link href={'/sign-in'} className="mt-8" asChild>
                            <TouchableOpacity className=" bg-[#1C1C1C] w-96 rounded-2xl h-10 justify-center items-center">
                                <Text className="text-[#BDBDBD] text-center text-base">Voltar</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </Background>
        </>
    )
}