import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";

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
    function handleRole() {
        // router.replace(`/role/${idRole}`)
        router.replace('/')
    }

    return (
        <TouchableOpacity className="flex flex-row bg-[#1C1C1C] rounded-2xl">
            <View className="bg-[#121212] opacity-70 absolute z-10 rounded-lg top-2 left-2">
                <Text className="text-white text-lg px-2 py-1">{data}</Text>
            </View>
            <View className="w-1/2">
                <Image 
                    source={{ uri: image }} 
                    style={{ width: '100%', height: '100%', borderBottomLeftRadius: 16, borderTopLeftRadius: 16 }} 
                    resizeMode="cover"
                />
            </View>
            <View className="w-1/2 p-5">
                <View className="mb-2">
                    <Text className="text-2xl font-bold text-white">{title}</Text>
                </View>
                <View className="flex flex-row gap-2 mb-6">
                    {type === 'Bar' ? (
                        <FontAwesome6 name="beer-mug-empty" size={24} color="white" />
                    )
                    : (
                        <FontAwesome6 name="question" size={24} color="white" />
                    )}
                    <Text className="text-base text-white">{type}</Text>
                </View>
                <View className="flex flex-row gap-4">
                    <View className="flex flex-row gap-2">
                        <FontAwesome6 name="star" size={12} color="#BDBDBD" solid/>
                        <Text className="text-sm text-[#BDBDBD]">{stars}</Text>
                    </View>
                    <View className="flex flex-row gap-2">
                        <FontAwesome6 name="location-dot" size={12} color="#BDBDBD" />
                        <Text className="text-sm text-[#BDBDBD]">{local}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}   
