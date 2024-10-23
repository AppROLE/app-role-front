import Background from '@/src/components/background'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useContext, useEffect, useState } from 'react'
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView, ActivityIndicator
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import RoleMainButton from '@/src/components/roleMainButton'
import RoleInput from '@/src/components/input'
import { AuthContext } from '@/context/auth_context'
import {finishSignUpRequestDTO, updateImageProfileResponseDTO} from '@/api/types/auth_dto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Svg from '@/src/components/svg'
import Toast, {ErrorToast} from "react-native-toast-message";

export default function AlmostThere() {
    const [files, setFiles] = useState<any>(null)
    const [imageType, setImageType] = useState<string>('')
    const [imageUri, setImageUri] = useState<string>(process.env.EXPO_PUBLIC_URL_S3 + '/images/profile_default.png')
    const [username, setUsername] = useState<string>('')
    const [nickname, setNickname] = useState<string>('')
    const [usernameError, setUsernameError] = useState<string>('')
    const [nicknameError, setNicknameError] = useState<string>('')
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false)
    const [buttonDebounce, setButtonDebounce] = useState<boolean>(false)
    const { finishSignUp, signIn, uploadImageProfile } = useContext(AuthContext)

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })

        if (!result.canceled) {
            const selectedImage = result.assets[0]
            const imageUri = selectedImage.uri
            const imageType = imageUri.split('.').pop()
            const formattedImageType = imageType ? `.${imageType}` : '' // Obter o primeiro item na seleção
            setImageUri(imageUri)
            setImageType(formattedImageType)
            setFiles({
                uri: selectedImage.uri,
                name: selectedImage.uri.split('/').pop(), // Pega o nome do arquivo da URI
                type: "image/jpeg"
            });
        } else {
            console.log('Cancelado')
        }
    }

    function handleUsernameChange(text: string) {
        const trimmedText = text.trimStart();
        setUsername(trimmedText);
        if (trimmedText !== '') setUsernameError(''); // Limpa o erro imediatamente
    }

    function handleNicknameChange(text: string) {
        const trimmedText = text.trimStart();
        setNickname(trimmedText);
        if (trimmedText !== '') setNicknameError(''); // Limpa o erro imediatamente
    }

    function verifyCredentials(){
        var isValid = true

        setUsername(username.trim())
        setNickname(nickname.trim())

        if (username === '') {
            setUsernameError('Campo obrigatório')
            isValid = false
        }

        if (nickname === '') {
            setNicknameError('Campo obrigatório')
            isValid = false
        }

        return isValid
    }

    useEffect(() => {
        async function loginVerify() {
            const response = await AsyncStorage.getItem('token')
        }
        loginVerify()
    }, [])

    async function handleFinishSignUp() {
        setButtonDebounce(true)

        if (!verifyCredentials()){
            setButtonDebounce(false)
            return
        }

        const trimUser = username.trim()
        const trimNick = nickname.trim()

        const data: finishSignUpRequestDTO = {
            email: (await AsyncStorage.getItem('email')) ?? '',
            password: (await AsyncStorage.getItem('password')) ?? '',
            username: trimUser,
            nickname: trimNick
        }

        const email = await AsyncStorage.getItem('email')
        const password = await AsyncStorage.getItem('password')
        if (!email || !password) {
            Toast.show({
                text1: 'Erro',
                text2: ("Email ou senha não encontrado no sistema"),
                position: 'top',
                visibilityTime: 3000,
                type: 'error',
                props: {
                    style: { backgroundColor: 'black' },
                    text1Style: { color: 'white', fontSize: 18, fontFamily: "nunito" },
                    text2Style: { color: 'white', fontFamily: "nunito" },
                    contentContainerStyle: { backgroundColor: 'white' }
                },
            });
            setButtonDebounce(false)
            throw new Error(!email ? 'Email não encontrado no AsyncStorage' : 'Senha não encontrada no AsyncStorage')
        }

        const dataSignIn = {
            email,
            password
        }

        const response = await finishSignUp(data)

        if(!(response.message == "Seu cadastro foi finalizado com sucesso!")){
            Toast.show({
                text1: 'Erro',
                text2: response.message,
                position: 'top',
                visibilityTime: 3000,
                type: 'error',
                props: {
                    style: { backgroundColor: 'black' },
                    text1Style: { color: 'white', fontSize: 18, fontFamily: "nunito" },
                    text2Style: { color: 'white', fontFamily: "nunito" },
                    contentContainerStyle: { backgroundColor: 'white' }
                },
            });
            setButtonDebounce(false)
            return
        }

        const formData = new FormData()
        if (files) {
            formData.append('files', {
                uri: files.uri,
                name: files.name,
                type: files.type,
            })
        }

        formData.append('username', trimUser)
        formData.append('email', "mzoletti@yahoo.com.br")
        formData.append('typePhoto', '.jpeg')

        const uploadResponse: updateImageProfileResponseDTO = await uploadImageProfile(formData)
        if(!(uploadResponse.message == "A foto de perfil foi adicionada com sucesso!")){
            Toast.show({
                text1: 'Erro',
                text2: uploadResponse.message,
                position: 'top',
                visibilityTime: 3000,
                type: 'error',
                props: {
                    style: { backgroundColor: 'black' },
                    text1Style: { color: 'white', fontSize: 18, fontFamily: "nunito" },
                    text2Style: { color: 'white', fontFamily: "nunito" },
                    contentContainerStyle: { backgroundColor: 'white' }
                },
            });
            setButtonDebounce(false)
        }
        const result = await signIn(dataSignIn)
        // guardar tokens

        setButtonDebounce(false)
        // router.replace('/home')
    }

    return (
        <>
            <Background>
                <SafeAreaView className="w-full flex-1">
                    <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
                        <View className="w-full items-center">
                            <View>
                                <Text className="text-3xl text-white font-nunitoBold">Estamos quase lá...</Text>
                            </View>
                            <View className="mb-5 mt-10 rounded-full bg-button_color">
                                <Text className="py-1 px-2 text-xl text-white font-nunito">
                                    Adicione uma foto de perfil!
                                </Text>
                            </View>
                            <View className="relative flex items-center">
                                <LinearGradient
                                    style={{ borderRadius: 999, padding: 5 }}
                                    colors={['#5A189A', '#9C4EDC', '#DFA9FD']}
                                >
                                    <TouchableOpacity onPress={pickImage}>
                                        <View className="rounded-full bg-white">
                                            <View className="rounded-full bg-gray-400">
                                                    <Image
                                                        source={{ uri: imageUri }}
                                                        style={styles.image}
                                                        className="rounded-full"
                                                    />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </LinearGradient>

                                <TouchableOpacity
                                    onPress={pickImage}
                                    className="absolute"
                                    style={{
                                        top: 75, // Ajuste fino da posição vertical do lápis
                                        left: 85, // Ajuste fino da posição horizontal do lápis
                                        borderRadius: 999,
                                        padding: 10 // Espaçamento ao redor do ícone
                                    }}
                                >
                                    <View className="rounded-full bg-button_color p-3">
                                        <Svg
                                            uri={process.env.EXPO_PUBLIC_URL_S3 + "/pencil.svg"}
                                            width={16}
                                            height={16}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View className="w-[80%] gap-5">
                                <View className="mx-auto mt-14 items-center rounded-full bg-button_color">
                                    <Text className="py-1 px-2 text-xl text-white font-nunito">
                                        Escolha seu @ de usuário!
                                    </Text>
                                </View>
                                <RoleInput
                                    type="at"
                                    value={username}
                                    error={usernameError}
                                    onChangeText={handleUsernameChange}
                                />
                                <View className="mx-auto items-center rounded-full bg-button_color">
                                    <Text numberOfLines={1} className="px-2 py-1 text-xl text-white font-nunito">
                                        Como seus amigos te chamam?
                                    </Text>
                                </View>
                                <View>
                                    <RoleInput
                                        type="nickname"
                                        value={nickname}
                                        error={nicknameError}
                                        onChangeText={handleNicknameChange}
                                        onFocus={() => setIsInputFocused(true)}
                                        style={{ padding: isInputFocused || nickname ? 1 : 0 }}
                                    />
                                </View>
                            </View>
                            <View className="my-6 flex w-[85%]">
                                <Text className="mb-5 text-center text-2xl text-white font-nunitoBold">
                                    Preparado(a)?
                                </Text>
                                <RoleMainButton
                                    type="gradient"
                                    buttonFunction={handleFinishSignUp}
                                    disabled={buttonDebounce}
                                >
                                    {buttonDebounce ?
                                        <ActivityIndicator color={'white'} />
                                        :
                                        <Text className="text-white font-nunito">BORA</Text>
                                    }
                                </RoleMainButton>
                            </View>
                        </View>
                    </ScrollView>
                    <Toast config={{
                        error: (props) => (
                            <ErrorToast
                                {...props}
                                style={{
                                    backgroundColor: '#240046',
                                }}
                                text1Style={{
                                    fontSize: 17,
                                    color: 'white',
                                    fontFamily: 'NunitoBold',
                                }}
                                text2Style={{
                                    fontSize: 15,
                                    color: 'white',
                                    fontFamily: 'Nunito',
                                    overflow: 'hidden',
                                    flexWrap: 'wrap', // Permite a quebra de linha
                                }}
                            />
                        ),
                    }}/>
                </SafeAreaView>
            </Background>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 100,
        height: 100
    }
})
