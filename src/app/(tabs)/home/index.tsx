import Background from "@/src/components/background";
import CategoryMusicalCard from "@/src/components/category-musicalCard";
import RoleCard from "@/src/components/roleCard";
import RoleEmphasis from "@/src/components/roleEmphasis";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Home() {
    const [disabledB, setDisabled] = useState(false);
    const [roles, setRoles] = useState([
        {
            idRole: "1",
            data: "16 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "2",
            data: "17 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "3",
            data: "18 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "4",
            data: "19 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "5",
            data: "20 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "6",
            data: "16 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "7",
            data: "17 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "8",
            data: "18 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "9",
            data: "19 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "10",
            data: "20 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "11",
            data: "16 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "12",
            data: "17 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "13",
            data: "18 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "14",
            data: "19 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "15",
            data: "20 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "16",
            data: "16 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "17",
            data: "17 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "18",
            data: "18 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "19",
            data: "19 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
        {
            idRole: "20",
            data: "20 DEZ",
            image: "https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png",
            title: "São Conrado",
            type: "Bar",
            stars: 4.5,
            local: "Itaim",
        },
    ])

    const gradientColors = disabledB 
        ? ['rgba(90, 24, 154, 0.25)', 'rgba(156, 78, 220, 0.25)'] // Cores do gradiente com brilho reduzido
        : ['#5A189A', '#DFA9FD']; // Cores normais do gradiente

    return (
        <Background text="Home" scrollable>
            <Text className="text-white text-3xl font-bold text-center mb-4">Role Bombando</Text>
            <View className="px-12 mb-12">
                <RoleEmphasis />
            </View>
            <View className="px-12 mb-12">
                <View className="bg-[#1C1C1C] flex flex-row px-2 py-1 items-center rounded-full">
                    <View className="w-[12%]">
                        <FontAwesome6 name="magnifying-glass" size={24} color="#BEBEBE" solid/>
                    </View>
                    <View className="w-[78%]">
                        <TextInput placeholder="Encontre o seu role" className="text-white" placeholderTextColor={'#BEBEBE'}/>
                    </View>
                    <View className="w-[10%]">
                        <FontAwesome6 name="bars" size={24} color="#BEBEBE" solid/>
                    </View>
                </View>
            </View>
            <View className="px-12 flex flex-col gap-4">
                <Text className="text-white text-3xl font-bold">Explore</Text>
                {roles.slice(0, 5).map(role => (
                    <RoleCard key={role.idRole} {...role} />
                ))}
                <View>
                    <CategoryMusicalCard name="Balada" type="Musical"/>
                </View>
                {roles.slice(5, 10).map(role => (
                    <RoleCard key={role.idRole} {...role} />
                ))}
                <View>
                    <CategoryMusicalCard name="Bar" type="Musical"/>
                </View>
                {roles.slice(10, 15).map(role => (
                    <RoleCard key={role.idRole} {...role} />
                ))}
                <View className="mt-8">
                    <Text className="text-lg text-[#BDBDBD] text-center">Não encontrou o que procurava?</Text>
                    <Text className="text-lg text-[#BDBDBD] text-center">Utilieze os nossos <Text className="font-bold text-white">Filtros!</Text></Text>
                    <TouchableOpacity className="flex justify-center w-full rounded-2xl py-4">
                        <LinearGradient
                        colors={gradientColors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }} // Gradiente diagonal suave
                        style={{ 
                            width: '25%',
                            marginHorizontal: 'auto',

                            paddingVertical: 6, 
                            paddingHorizontal: 8, 
                            borderRadius: 20, // Bordas arredondadas
                            alignItems: 'center',

                            shadowColor: 'rgba(156, 78, 220, 1)', // Cor da sombra
                            shadowOffset: { width: 0, height: 7 }, // Deslocamento da sombra
                            shadowOpacity: 1, // Opacidade da sombra
                            shadowRadius: 11, // Raio de desfoque
                            elevation: 10,
                        }}
                        >
                            <Text className="text-white text-lg">Filtrar</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </Background>
    )
}