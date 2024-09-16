import Background from "@/src/components/background";
import RoleInput from "@/src/components/input";
import RoleMainButton from "@/src/components/roleMainButton";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View, Text, ScrollView } from "react-native";


export default function EditingPerfil() {
  const navigation = useRouter();
  const [userErr, setUserErr] = useState('')
  const [nickErr, setNickErr] = useState('')
  const [bioErr, setBioErr] = useState('')
  const [instaErr, setInstaErr] = useState('')
  const [tiktokErr, setTiktokErr] = useState('')

  const [profileImage, setProfileImage] = useState(null)
  const [banner, setBanner] = useState(null)
  const [user, setUser] = useState('')
  const [nick, setNick] = useState('')
  const [bio, setBio] = useState('')
  const [insta, setInsta] = useState('')
  const [tiktok, setTiktok] = useState('')

  function handleChoosePhoto() {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
        setProfileImage(response.assets[0].uri);
      }
    });
  }

  function handleChooseBanner() {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets) {
        setBanner(response.assets[0].uri);
      }
    });
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
                <View className="flex h-24 w-24 rounded-full bg-[#1C1C1C] items-center justify-center" />
                <TouchableOpacity onPress={handleChoosePhoto} className="flex h-12 w-12 rounded-full bg-[#1C1C1C] items-center justify-center">
                  <FontAwesome6 name="pen" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="p-8 pl-10 gap-5 border-b-2 border-b-[#1C1C1C]">
              <Text className="text-white text-2xl">
                Banner
              </Text>
              <View className="flex flex-row items-center gap-8">
                <View className="flex h-24 w-48 bg-[#1c1c1c] items-center justify-center" />
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
                <RoleInput type="user" error={userErr} />
              </View>
            </View>
            <View className="p-8 pl-10 gap-5 border-b-2 border-b-[#1C1C1C]">
              <Text className="text-white text-2xl">
                Apelido
              </Text>
              <View className="flex flex-row items-center gap-8">
                <RoleInput type="user" error={nickErr} />
              </View>
            </View>
            <View className="p-8 pl-10 gap-5 border-b-2 border-b-[#1C1C1C]">
              <Text className="text-white text-2xl">
                Biografia
              </Text>
              <View className="flex flex-row items-center gap-8">
                <RoleInput type="user" error={bioErr} />
              </View>
            </View>
            <View className="p-8 pl-10 gap-5">
              <Text className="text-white text-2xl">
                Contas vinculadas
              </Text>
              <View className="flex flex-row items-center gap-8">
                <RoleInput type="email" error={instaErr} />
              </View>
              <View className="flex flex-row items-center gap-8">
                <RoleInput type="email" error={tiktokErr} />
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

function launchImageLibrary(arg0: { mediaType: string; }, arg1: (response: any) => void) {
  throw new Error("Function not implemented.");
}
