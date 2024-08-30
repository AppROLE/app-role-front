import Background from "@/src/components/background";
import { Text, TouchableOpacity, View, Keyboard } from "react-native";
import { useContext, useState } from "react";
import { Link } from "expo-router";
import RoleInput from "@/src/components/input";
import Toast from 'react-native-toast-message';
import RoleMainButton from "@/src/components/roleMainButton";
import { AuthContext } from "@/context/auth_context";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const { forgotPassword } = useContext(AuthContext);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handlePress = async () => {
        if (validateEmail(email)) {
            try {
                const response = await forgotPassword(email);
                Keyboard.dismiss();
                Toast.show({    
                    type: 'success',
                    text1: 'Sucesso',
                    text2: response.message || 'E-mail enviado com sucesso!',
                    visibilityTime: 3000,
                    topOffset: 0,
                });
                
                setEmail("");
            } catch (error : any) {
                Toast.show({    
                    type: 'error',
                    text1: 'Erro',
                    text2: error.message || 'Ocorreu um erro ao enviar o e-mail.',
                    visibilityTime: 3000,
                    topOffset: 0,
                });
            }
        } else {
            setEmailError("Por favor, insira um e-mail válido.");
        }
    }
    function handleEmailChange(text: string) {
        setEmail(text);
        if (emailError) setEmailError(''); 
    }

    return (
        <>
            <Background>
                <Toast/>
                <View className="flex justify-center items-center w-[80%]">
                    <Text className="text-white text-2xl ">Recuperação de Senha</Text>
                    <View className="w-[85%] pt-8">
                        <Text className="text-[#BDBDBD] text-center text-base">Escreva seu e-mail ou nome de usuário e enviaremos detalhes de como prosseguir 
                        para a criação de sua nova senha.</Text>
                    </View>
                    <View className="flex w-80 flex-row gap-2 mt-16">
                        <RoleInput
                            type="email"
                            value={email}
                            onChangeText={handleEmailChange}
                            error={emailError}
                        />
                    </View>
                    <View className="pt-16">
                        <RoleMainButton type='gradient' buttonFunction={handlePress}>
                            <Text className="text-white">Enviar</Text>
                        </RoleMainButton>
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
