import Background from '@/src/components/background'
import Ionicons from '@expo/vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import { useState } from 'react'
import {
    Image,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
    SafeAreaView
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import RoleMainButton from '@/src/components/roleMainButton'
import RoleInput from '@/src/components/input'

export default function AlmostThere() {
    const [image, setImage] = useState<string | null>(null)
    const [username, setUsername] = useState<string>('')
    const [nickname, setNickname] = useState<string>('')
    const [usernameError, setUsernameError] = useState<string>('')
    const [nicknameError, setNicknameError] = useState<string>('')

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        })

        console.log(result)

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    function handleUsernameChange(text: string) {
        setUsername(text)
        if (username) setUsernameError('') // Reseta o erro ao digitar
    }

    function handleNicknameChange(text: string) {
        setNickname(text)
        if (nickname) setNicknameError('') // Reseta o erro ao digitar
    }

    return (
        <>
            <Background>
                <SafeAreaView className='w-full flex items-center justify-between'>
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
                            <TouchableOpacity onPress={pickImage} className="">
                                <View className="rounded-full bg-white ">
                                    <View className="rounded-full bg-gray-400">
                                        {image ? (
                                            <Image
                                                source={{ uri: image }}
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
                            className="absolute top-[85px] left-[85px]"
                        >
                            <View className="bg-button_color rounded-full">
                                <Ionicons name="pencil" size={22} color="white" className="p-2" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className="w-[80%] gap-5">
                        <View className="mx-auto mt-14 w-[70%] items-center rounded-full bg-button_color">
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
                        <View className="mx-auto items-center rounded-full bg-button_color">
                            <Text className="p-2 text-xl text-white">
                                Como seus amigos te chamam?
                            </Text>
                        </View>
                        <RoleInput
                            type="nickname"
                            value={nickname}
                            error={nicknameError}
                            onChangeText={handleNicknameChange}
                        />
                    </View>
                    <View className="text-end"></View>
                    <View className="my-6 flex w-[80%]">
                        <Text className="mb-5 text-center text-2xl text-white">
                            Preparado(a)?
                        </Text>
                        <RoleMainButton type="gradient">
                            <Text className="text-white">BORA</Text>
                        </RoleMainButton>
                    </View>
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
