import Background from "@/src/components/background";
import RoleInput from "@/src/components/input";
import RoleMainButton from "@/src/components/roleMainButton";
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View, Text, ScrollView, Image, StyleSheet } from "react-native";


export default function EditingPerfil() {
  const navigation = useRouter();
  const [userErr, setUserErr] = useState('')
  const [nickErr, setNickErr] = useState('')
  const [bioErr, setBioErr] = useState('')
  const [instaErr, setInstaErr] = useState('')
  const [tiktokErr, setTiktokErr] = useState('')

  const [profileImage, setProfileImage] = useState('')
  const [imageType, setImageType] = useState('')
  const [banner, setBanner] = useState('')
  const [bannerType, setBannerType] = useState('')
  const [user, setUser] = useState('')
  const [nick, setNick] = useState('')
  const [bio, setBio] = useState('')
  const [insta, setInsta] = useState('')
  const [tiktok, setTiktok] = useState('')

  const pickProfilePhoto = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log("RESPOSTA DO PICKER " + result);

    if (!result.canceled) {
      const selectedImage = result.assets[0]; // Obter o primeiro item na seleção
      const imageUri = selectedImage.uri;
      const imageType = imageUri.split('.').pop();
      const formattedImageType = imageType ? `.${imageType}` : '';

      console.log("IMAGEM SELECIONADA " + selectedImage.uri);
      console.log("TYPE IMAGE ", formattedImageType);

      setImageType(formattedImageType); // Definir a imagem localmente para exibição na UI
      setProfileImage(imageUri); // Definir a imagem para envio ao backend    
    } else {
      console.log('Cancelado');
    }
  }

  const handleChooseBanner = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6, 19],
      quality: 1
    });

    console.log("RESPOSTA DO PICKER " + result);

    if (!result.canceled) {
      const selectedImage = result.assets[0]; // Obter o primeiro item na seleção
      const imageUri = selectedImage.uri;
      const imageType = imageUri.split('.').pop();
      const formattedImageType = imageType ? `.${imageType}` : '';

      console.log("IMAGEM SELECIONADA " + selectedImage.uri);
      console.log("TYPE IMAGE ", formattedImageType);

      setBannerType(formattedImageType); // Definir a imagem localmente para exibição na UI
      setBanner(imageUri); // Definir a imagem para envio ao backend    
    } else {
      console.log('Cancelado');
    }
  }

  function handleVoltar() {
    navigation.back()
  }

  return (
    <Background >
      <View className="relative w-full flex-1 ">
        <View className="relative top-0 flex h-12 w-full flex-row items-center gap-3 border-b-2 border-b-[#2C2B2B] pb-8">
          <View className="absolute top-[-120%] h-12 z-40">
            <TouchableOpacity
              onPress={() => handleVoltar()}
              className="ml-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1C1C]"
            >
              <FontAwesome6 name="arrow-left" size={18} color="white" />
            </TouchableOpacity>
          </View>
          <View className="flex h-[300%] w-[100%] items-center">
            <Text className="text-white text-3xl items-center flex h-[300%] ">Editar Perfil</Text>
          </View>
        </View>
        <View className="flex-1">
          <ScrollView className=" flex-1">
            <View className="p-8 pl-10 gap-5 border-b-2 border-b-[#1C1C1C]">
              <Text className="text-white text-2xl">Foto de perfil</Text>
              <View className="flex flex-row items-center gap-8">
                <View className="flex h-24 w-24 rounded-full bg-[#1C1C1C] items-center justify-center">
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      style={styles.image}
                      className="rounded-full"
                    />
                  ) : (
                    <FontAwesome6
                      name="user"
                      size={64}
                      color="white"
                      className="items-center justify-center p-3"
                    />
                  )}
                </View>
                <TouchableOpacity onPress={pickProfilePhoto} className="flex h-12 w-12 rounded-full bg-[#1C1C1C] items-center justify-center">
                  <FontAwesome6 name="pen" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="p-8 pl-10 gap-5 border-b-2 border-b-[#1C1C1C]">
              <Text className="text-white text-2xl">
                Banner
              </Text>
              <View className="flex flex-row items-center gap-8">
                <View className="flex h-24 w-48 bg-[#1c1c1c] items-center justify-center" >
                  {banner ? (
                    <Image
                      source={{ uri: banner }}
                      style={{ width: 168, height: 84 }}
                    />
                  ) : (
                    <FontAwesome6
                      name="landscape"
                      size={64}
                      color="white"
                      className="items-center justify-center p-3"
                    />
                  )}
                </View>
                <TouchableOpacity onPress={handleChooseBanner} className="flex h-12 w-12 rounded-full bg-[#1C1C1C] items-center justify-center">
                  <FontAwesome6 name="pen" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="p-8 pl-10 gap-5 border-b-2 border-b-[#1C1C1C]">
              <Text className="text-white text-2xl">
                Usuário
              </Text>
              <View className="flex flex-row items-center gap-8">
                <RoleInput type="user" error={userErr} value={user} />
              </View>
            </View>
            <View className="p-8 pl-10 gap-5 border-b-2 border-b-[#1C1C1C]">
              <Text className="text-white text-2xl">
                Apelido
              </Text>
              <View className="flex flex-row items-center gap-8">
                <RoleInput type="user" error={nickErr} value={nick} />
              </View>
            </View>
            <View className="p-8 pl-10 gap-5 border-b-2 border-b-[#1C1C1C]">
              <Text className="text-white text-2xl">
                Biografia
              </Text>
              <View className="flex flex-row items-center gap-8">
                <RoleInput type="user" error={bioErr} value={bio} />
              </View>
            </View>
            <View className="p-8 pl-10 gap-5">
              <Text className="text-white text-2xl">
                Contas vinculadas
              </Text>
              <View className="flex flex-row items-center gap-8">
                <View className="flex h-12 w-12 rounded-full bg-[#1C1C1C] items-center justify-center">
                  <FontAwesome6 name="instagram" size={18} color="white" />
                </View>
                <RoleInput type="email" error={instaErr} value={insta} />
              </View>
              <View className="flex flex-row items-center gap-8">
                <View className="flex h-12 w-12 rounded-md bg-[#1C1C1C] items-center justify-center">
                  <FontAwesome6 name="tiktok" size={18} color="white" />
                </View>
                <RoleInput type="email" error={tiktokErr} value={tiktok} />
              </View>
            </View>
          </ScrollView>
        </View>
        <View className="fixed bottom-0 z-40 flex h-[16%] w-full flex-row items-center justify-evenly border-t-2 border-t-[#2C2B2B] bg-background pb-6">
          <View className="flex w-[85%]">
            <RoleMainButton type="gradient">
              <Text className="text-white">Salvar</Text>
            </RoleMainButton>
          </View>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100
  }
})