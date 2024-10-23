import { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Linking, Alert } from "react-native";
import { SvgUri } from "react-native-svg";
import MenuHamburguer from "@/src/components/menuHamburguer";
import RoleMainButton from "@/src/components/roleMainButton";
import { useRouter } from "expo-router"; // ajuste o caminho conforme necessário
import RoleCard from "@/src/components/roleCard";
import { PresenceContext } from "@/context/presence_context";
import { Events } from "@/api/types/presence_dto";
import { UserContext } from "@/context/user_context";
import { findPersonResponseDTO, getProfileResponseDTO, getProfileToFollowResponseDTO, personResponseDTO } from "@/api/types/user_dto";
import { AuthContext } from "@/context/auth_context";

export default function FollowUser() {
  const navigation = useRouter();
  const [roles, setRoles] = useState<Events[]>([]);
  const { getAllConfirmedEvents } = useContext(PresenceContext);
  const { getProfileToFollow } = useContext(UserContext);
  const { followUser } = useContext(AuthContext);
  // Instanciar a classe UserRepositoryHttp
  

  // Estados para armazenar os dados do perfil
  const [profileData, setProfileData] = useState<getProfileToFollowResponseDTO>();

  // Função para buscar o perfil
  async function fetchProfile() {
    try {
      const personUsername = 'titans69'
      const response = await getProfileToFollow(personUsername);
      console.log("RESPOSTA DA GET PROFILE TO FOLLOW", response)
      if (response) {
        setProfileData(response);
      }
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    }
  }

  async function handleFollow() {
    try {
      if (profileData) {
        const response = await followUser(profileData.username);
        console.log("RESPOSTA DA FOLLOW ", response)
      } else {
        console.error("Profile data is undefined");
      }
    } catch (error: any) {
      throw new Error()
    }
   }

  function handleProcurar() {
    navigation.push('/home');
  }

  // Função para abrir links
  function openLink(link: string) {
    if (link) {
      Linking.openURL(link).catch(err => {
        console.error("Erro ao abrir link:", err);
        Alert.alert("Erro", "Não foi possível abrir o link.");
      });
    } else {
      Alert.alert("Erro", "Link não disponível.");
    }
  }

  async function fetchRoles() {
    const response = await getAllConfirmedEvents();
    console.log('RESPOSTA DA GET ALL ROLES', response);
    if (response) {
      setRoles(response.events);
    }
  }

  useEffect(() => {
    fetchRoles();
    fetchProfile();
  }, []);

  return (
    <View className="bg-[#999999] h-full">
      <Image
        source={{ uri: profileData?.backgroundPhoto || process.env.EXPO_PUBLIC_URL_S3 + '/images/background_default.png' }}
        className="h-[215px] w-full" />
      <MenuHamburguer />
      <View className="absolute bottom-0 bg-[#121212] h-[75%] w-full flex flex-col items-center rounded-t-[54px] pt-12">
        <View className="absolute -top-10 bg-[#121212] w-28 h-28 rounded-full overflow-hidden items-center justify-center">
          <Image
            source={{ uri: profileData?.profilePhoto || process.env.EXPO_PUBLIC_URL_S3 + '/images/profile_default.png' }}
            className="rounded-full w-[85%] h-[85%]"
          />
        </View>
        <TouchableOpacity className="absolute left-8 top-0 m-4 items-center">
          <Text className="text-white text-2xl">{profileData?.followers}</Text>
          <Text className="text-white text-lg">Seguidores</Text>
        </TouchableOpacity>
        <TouchableOpacity className="absolute right-8 top-0 m-4 items-center">
          <Text className="text-white text-2xl">{profileData?.following}</Text>
          <Text className="text-white text-lg">Seguindo</Text>
        </TouchableOpacity>
        <View className="">
          <Text className="text-white text-center text-3xl mt-10">{profileData?.nickname}</Text>
          <Text className="text-[#BDBDBD] mt-1 text-center">@{profileData?.username}</Text>
          <Text className="text-center text-[#BDBDBD] mt-8 w-72">{profileData?.biography}</Text>
        </View>
        <View className="flex-row space-x-4 mt-8 gap-5 justify-center items-center w-full">
          <View className="w-[30%]">
            <RoleMainButton type="following" buttonFunction={handleFollow}>
              <Text className="text-white">Seguir</Text>
            </RoleMainButton>
          </View>
          {/* Renderizar botões de redes sociais apenas se os links estiverem presentes */}
          { (profileData?.linkTiktok || profileData?.linkInstagram) && (
            <View
              className="bg-[#1C1C1C] flex flex-row gap-6"
              style={{ paddingVertical: 8, paddingHorizontal: 30, borderRadius: 20 }}>
              {profileData.linkTiktok && (
                <TouchableOpacity onPress={() => openLink(profileData?.linkTiktok ?? '')}>
                  <SvgUri
                    uri={process.env.EXPO_PUBLIC_URL_S3 + '/tiktok.svg'}
                    width={30}
                    height={30}
                  />
                </TouchableOpacity>
              )}
              {profileData.linkInstagram && (
                <TouchableOpacity className="top-[2px]" onPress={() => openLink(profileData?.linkInstagram ?? '')}>
                  <SvgUri
                    uri={process.env.EXPO_PUBLIC_URL_S3 + '/instagram.svg'}
                    width={26}
                    height={26}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        <View className="mt-8 border-b-2 border-[#DFA9FD]">
          <Text className="text-[#DFA9FD]">ROLEs Confirmados</Text>
        </View>
        {roles ? roles.slice(0, 5).map((role, index) => (
          <RoleCard
            data={role.eventDate}
            image={role.eventPhotoLink}
            title={role.name}
            type={role.category}
            local={role.address}
            key={`id${role.eventId}ind${index}`}
            {...role}
          />
        )) : <></>}

        {(!roles || roles.length === 0) && (
          <>
            <View className="mt-8">
              <Text className="text-white">Você ainda não possui um ROLE confirmado :(</Text>
              <Text className="text-white text-center mt-1">
                Bora dar um <Text className="text-[#DFA9FD]">ROLE</Text>?
              </Text>
            </View>
            <View className="mt-6">
              <RoleMainButton type="gradient" buttonFunction={handleProcurar}>
                <Text className="text-white">Procurar</Text>
              </RoleMainButton>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
