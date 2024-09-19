import Background from '@/src/components/background';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useEffect, useState } from 'react';
import {
    Image,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView
} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import RoleMainButton from '@/src/components/roleMainButton';
import RoleInput from '@/src/components/input';
import { AuthContext } from '@/context/auth_context';
import { finishSignUpRequestDTO } from '@/api/types/auth_dto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as FileSystem from 'expo-file-system';

export default function AlmostThere() {
    const [imageType, setImageType] = useState<string>(''); // Provide a default value for imageType
    const [username, setUsername] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [nicknameError, setNicknameError] = useState<string>('');
    const [profilePhoto, setProfilePhoto] = useState<File>();
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const { finishSignUp, signIn, uploadImageProfile } = useContext(AuthContext);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        console.log("RESPOSTA DO PICKER ", result);

        if (!result.canceled) {
            const selectedImage = result.assets[0]; // Obter o primeiro item na seleção
            const imageUri = selectedImage.uri;
            const imageType = imageUri.split('.').pop();
            const formattedImageType = imageType ? `.${imageType}` : '';

            console.log("IMAGEM SELECIONADA " + selectedImage.uri);
            console.log("TYPE IMAGE ", formattedImageType);

            setImageType(formattedImageType); // Definir a imagem localmente para exibição na UI
            setProfilePhoto(imageUri); // Definir a imagem para envio ao backend    
        } else {
            console.log('Cancelado');
        }
    }

    function handleUsernameChange(text: string) {
        setUsername(text);
        if (username) setUsernameError(''); // Reseta o erro ao digitar
    }

    function handleNicknameChange(text: string) {
        setNickname(text)
        if (nickname) setNicknameError('') // Reseta o erro ao digitar
    }

    useEffect(() => {
        async function loginVerify() {
            const response = await AsyncStorage.getItem('token');
            if (response) {
                console.log("TOKEN NO STORAGE " + response);
            }
        }
        loginVerify();
    }, []);

    async function handleFinishSignUp() {
        if (username === '') {
            setUsernameError('Campo obrigatório')
            return
        }
        const data: finishSignUpRequestDTO = {
            email: (await AsyncStorage.getItem('email')) ?? '',
            password: (await AsyncStorage.getItem('password')) ?? '',
            username: username,
            nickname: nickname
        }
        console.log("DADOS ENVIADOS NA REQ " + data);

        const response = await finishSignUp(data);
        // const result = await signIn(data.email, data.password);
        console.log("PROFILE PHOTO " + profilePhoto);
        console.log("NICKNAME " + nickname);
        console.log("USERNAME " + username);
        console.log("IMAGE TYPE " + imageType);

        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', await AsyncStorage.getItem('user_email') ?? '');
            formData.append('profilePhoto', profilePhoto);
            formData.append('typePhoto', imageType);

            // Fazer upload da imagem para o backend
            const uploadResponse = await uploadImageProfile(formData);
            console.log(uploadResponse);
            if (Object.keys(uploadResponse).length === 0) {
                console.error("Erro ao fazer upload da imagem");
                return;
            }
            console.log("Upload concluído:", uploadResponse);
            console.log("FORM DATA " + formData)
            
        } catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
        }
        
        // console.log("SIGN IN " + result)
        console.log("FINISH SIGNUP ", response.message)
    }

    return (
        <>
            <Background>
                <SafeAreaView className='w-full flex-1 '>
                    <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
                        <View className='w-full items-center'>
                            <View>
                                <Text className="text-3xl text-white">Estamos quase lá...</Text>
                            </View>
                            <View className="mb-5 mt-10 rounded-full bg-button_color">
                                <Text className="p-2 text-xl text-white">
                                    Adicione uma foto de perfil!
                                </Text>
                            </View>
                            <View className='relative flex items-center'>
                                <LinearGradient
                                    style={{ borderRadius: 999, padding: 5 }}
                                    colors={['#5A189A', '#9C4EDC', '#DFA9FD']}
                                >
                                    <TouchableOpacity onPress={pickImage}>
                                        <View className="rounded-full bg-white ">
                                            <View className="rounded-full bg-gray-400">
                                                {profilePhoto ? (
                                                    <Image
                                                        source={{ uri: profilePhoto }}
                                                        style={styles.image}
                                                        className="rounded-full"
                                                    />
                                                ) : (
                                                    <Ionicons
                                                        name="person"
                                                        size={64}
                                                        color="white"
                                                        className="items-center justify-center p-3"
                                                    />
                                                )}
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </LinearGradient>

                                <TouchableOpacity
                                    onPress={pickImage}
                                    className="absolute "
                                    style={{
                                        top: 75,  // Ajuste fino da posição vertical do lápis
                                        left: 85, // Ajuste fino da posição horizontal do lápis
                                        borderRadius: 999,
                                        padding: 10, // Espaçamento ao redor do ícone
                                    }}
                                >
                                    <View className="bg-button_color rounded-full">
                                        <Ionicons name="pencil" size={22} color="white" className="p-2" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View className="w-[80%] gap-5">
                                <View className="mx-auto mt-14 w-[250px] items-center rounded-full bg-button_color">
                                    <Text className="p-2 text-xl text-white">
                                        Escolha seu @ de usuário!
                                    </Text>
                                </View>
                                <RoleInput
                                    type="at"
                                    value={username}
                                    error={usernameError}
                                    onChangeText={handleUsernameChange}
                                />
                                <View className="mx-auto w-[250px] items-center rounded-full bg-button_color">
                                    <Text className="p-2 text-xl text-white">
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
                            <View className="my-6 flex w-[80%]">
                                <Text className="mb-5 text-center text-2xl text-white">
                                    Preparado(a)?
                                </Text>
                                <RoleMainButton type="gradient" buttonFunction={handleFinishSignUp}>
                                    <Text className="text-white">BORA</Text>
                                </RoleMainButton>
                            </View>
                        </View>
                    </ScrollView>
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
