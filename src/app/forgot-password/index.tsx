import Background from "@/src/components/background";
import {Text, TouchableOpacity, View, Keyboard, ActivityIndicator} from "react-native";
import React, { useContext, useState } from "react";
import { Link, useRouter } from "expo-router";
import RoleInput from "@/src/components/input";
import Toast from 'react-native-toast-message';
import RoleMainButton from "@/src/components/roleMainButton";
import { AuthContext } from "@/context/auth_context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [buttonDebounce, setButtonDebounce] = useState(false);
    const { forgotPassword } = useContext(AuthContext);
    const router = useRouter(); 

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handlePress = async (router : any) => {
        if (validateEmail(email)) {
            setButtonDebounce(true);
            try {
                const response = await forgotPassword(email);
                if (typeof response === 'string' && response === 'Nenhum item foi encontrado para this email') {
                    Keyboard.dismiss();
                    Toast.show({
                        type: 'error',
                        text1: 'Erro',
                        text2: 'E-mail não encontrado.',
                        visibilityTime: 3000,
                        topOffset: 0,
                    })
                    setButtonDebounce(false);
                    return;
                }
                Keyboard.dismiss();
                Toast.show({    
                    type: 'success',
                    text1: 'Sucesso',
                    text2: response.message || 'E-mail enviado com sucesso!',
                    visibilityTime: 3000,
                    topOffset: 0,
                });
                setButtonDebounce(false);
                setTimeout(async () => {
                    await AsyncStorage.setItem('user_email', email)
                    await AsyncStorage.setItem('ScreenRequestToCode', 'forgot-password');
                    router.push('/recovery-code');
                    setEmail(""); 
                }, 2000);
            } catch (error : any) {
                Toast.show({    
                    type: 'error',
                    text1: 'Erro',
                    text2: error.message || 'Ocorreu um erro ao enviar o e-mail.',
                    visibilityTime: 3000,
                    topOffset: 0,
                });
            }
            setButtonDebounce(false);
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
                    <Text className="text-white text-2xl font-nunito">Recuperação de Senha</Text>
                    <View className="w-[85%] pt-8">
                        <Text className="text-[#BDBDBD] text-center text-base font-nunito">Escreva seu e-mail ou nome de usuário e enviaremos detalhes de como prosseguir 
                        para a criação de sua nova senha.</Text>
                    </View>
                    <View className="flex w-80 flex-row gap-2 mt-16">
                        <RoleInput
                            type="email"
                            value={email}
                            onChangeText={handleEmailChange}
                            error={emailError}
                            placeholder="E-mail ou usuário"
                        />
                    </View>
                    <View className="pt-16">
                        <RoleMainButton type='gradient' buttonFunction={() => handlePress(router)} disabled={buttonDebounce}>
                            {buttonDebounce ?
                                <ActivityIndicator color={'white'}/>
                                :
                                <Text className="text-white font-nunito">Enviar</Text>
                            }
                        </RoleMainButton>
                        <Link href={'/sign-in'} className="mt-8" asChild>
                            <TouchableOpacity className=" bg-[#1C1C1C] w-96 rounded-2xl h-10 justify-center items-center">
                                <Text className="text-[#BDBDBD] text-center text-base font-nunito">Voltar</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </Background>
        </>
    )
}
