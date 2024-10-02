import MenuHamburguer from "@/src/components/menuHamburguer";
import RoleMainButton from "@/src/components/roleMainButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, Image } from "react-native";
import { SvgUri } from "react-native-svg";

export default function Profile() {
  const navigation = useRouter();

  function handleEditProfile() {
    navigation.push('/editing-perfil');
  }

  function handleProcurar() {
    navigation.push('/home');
  }

  return (
    <View className="bg-[#999999] h-full">
      <MenuHamburguer />
      <View className="absolute bottom-0 bg-[#121212] h-[75%] w-full flex flex-col items-center rounded-t-[54px] pt-12">
        <View className="absolute -top-10 bg-[#121212] w-28 h-28 rounded-full overflow-hidden items-center justify-center">
          <Image
            source={{ uri: process.env.EXPO_PUBLIC_URL_S3 + '/images/profile_default.png' }}
            className="rounded-full w-[85%] h-[85%]"
          />
        </View>
        <View className="absolute left-8 top-0 m-4 items-center">
          <Text className="text-white text-2xl">0</Text>
          <Text className="text-white text-lg">Seguidores</Text>
        </View>
        <View className="absolute right-8 top-0 m-4 items-center">
          <Text className="text-white text-2xl">0</Text>
          <Text className="text-white text-lg">Seguindo</Text>
        </View>
        <View className="">
          <Text className="text-white text-3xl mt-10">Isabella</Text>
          <Text className="text-[#BDBDBD] mt-1 text-center">@isa.saab</Text>
        </View>
        <View className="mt-28 w-44">
          <RoleMainButton type="simple" buttonFunction={handleEditProfile}>
            <SvgUri
              uri={process.env.EXPO_PUBLIC_URL_S3 + '/pencil.svg'}
              width={20}
              height={20}
            />
            <Text className="text-white">Editar Perfil</Text>
          </RoleMainButton>
        </View>
        <View className="mt-8 border-b-2 border-[#DFA9FD]">
          <Text className="text-[#DFA9FD]">ROLEs Confirmados</Text>
        </View>
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
      </View>
    </View>
  );
}
