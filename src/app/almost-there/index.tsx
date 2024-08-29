import Background from "@/src/components/background";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import GradientButton from "@/src/components/gradientButton";
import RoleInput from "@/src/components/input";

export default function AlmostThere() {
    const [image, setImage] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [usernameError, setUsernameError] = useState<string>('');
    const [nicknameError, setNicknameError] = useState<string>('');

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    function handleUsernameChange(text: string) {
        setUsername(text);
        if (username) setUsernameError(''); // Reseta o erro ao digitar
    }

    function handleNicknameChange(text: string) {
        setNickname(text);
        if (nickname) setNicknameError(''); // Reseta o erro ao digitar
    }

    return (
        <>
            <Background>
                <View>
                    <Text className="text-white text-3xl">Estamos quase lá...</Text>
                </View>
                <View className="bg-button-color rounded-full mt-10 mb-5">
                    <Text className="text-white text-xl p-2">Adicione uma foto de perfil!</Text>
                </View>
                <LinearGradient style={{ borderRadius: 999, padding: 5 }} colors={[
                    '#5A189A',
                    '#9C4EDC',
                    '#DFA9FD'
                ]}>
                    <TouchableOpacity onPress={pickImage}  className="">
                        <View className="p-3 rounded-full bg-white">
                            <View className="rounded-full  bg-gray-400">
                                {
                                    image ? (
                                        <Image source={{ uri: image }} style={styles.image} className=" rounded-full" />
                                    ) : (
                                        <Ionicons name="person" size={64} color="white" className="p-3 items-center justify-center" />
                                    )
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
                <TouchableOpacity onPress={pickImage} className="mt-12 mr-5 absolute right-1/4 top-1/3">
                    <View className="bg-button-color rounded-full ">
                        <Ionicons name="pencil" size={22} color="white" className="p-2"/>
                    </View>
                </TouchableOpacity>
                <View className="w-[80%] gap-5">
                    <View className="bg-button-color mx-auto w-[70%] rounded-full items-center mt-14">
                        <Text className="text-white text-xl p-2">Escolha seu @ de usuário!</Text>
                    </View>
                    <RoleInput type="at" value={username} error={usernameError} onChangeText={handleUsernameChange} />
                    <View className="bg-button-color mx-auto rounded-full items-center ">
                        <Text className="text-white text-xl p-2">Como seus amigos te chamam?</Text>
                    </View>
                    <RoleInput type="nickname" value={nickname} error={nicknameError} onChangeText={handleNicknameChange} />
                </View>
                <View className="text-end">

                </View>
                <View className="flex w-[80%] items-center my-6">
                    <Text className="text-white text-2xl mb-5">Preparado(a)?</Text>
                    <GradientButton texto="BORA" />
                </View>
            </Background >
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
    },
});