import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";

interface RoleCardProps {
    data: string;
    image: string;
    title: string;
    type: string;
    stars: number;
    local: string;
    idRole: string;
}

export default function RoleCard({data, image, title, type, stars, local, idRole} : RoleCardProps) {
    const {width, height} = Dimensions.get('window');
    
    function handleRole() {
        router.push(`/event-description`)
        // router.replace('/')
    }

    return (
        <TouchableOpacity className="flex flex-row bg-[#1C1C1C] rounded-2xl" style={{height: height*0.14}} onPress={handleRole}>
            <View className="absolute top-2 left-2 z-10 bg-[#121212]/70 px-2 py-1 rounded-lg">
                <Text className="text-white text-base">16 DEZ</Text>
            </View>
            <View className="w-1/2">
                <Image source={{ uri: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png' }} className="w-full h-full object-cover rounded-l-2xl"/>
            </View>
            <View className="w-1/2 p-5">
                <View className="mb-2">
                    <Text className="text-xl font-bold text-white">{title}</Text>
                </View>
                <View className="flex flex-row gap-2 mb-4 items-center">
                    {type === 'Bar' ? (
                        <FontAwesome6 name="beer-mug-empty" size={16} color="white" />
                    )
                    : (
                        <FontAwesome6 name="question" size={16} color="white" />
                    )}
                    <Text className="text-base text-white">{type}</Text>
                </View>
                <View className="flex flex-row gap-4">
                    <View className="flex flex-row gap-2 items-center">
                        <FontAwesome6 name="star" size={8} color="#BDBDBD" solid/>
                        <Text className="text-sm text-[#BDBDBD]">{stars}</Text>
                    </View>
                    <View className="flex flex-row gap-2 items-center">
                        <FontAwesome6 name="location-dot" size={8} color="#BDBDBD" />
                        <Text className="text-sm text-[#BDBDBD]">{local}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}   
