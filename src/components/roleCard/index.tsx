import { CATEGORY } from "@/api/enums/catetegory_enum";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";

export default function RoleCard(role: any) {
    const {width, height} = Dimensions.get('window');
    const [date, setDate] = useState(new Date(role.eventDate));
    const [loading, setLoading] = useState(false);
    
    async function handleRole() {
        await AsyncStorage.setItem('eventId', role.eventId)
        router.push(`/event-description`)
    }

    function dateFormat() {
        const day = date.getDate();
        const month = date.getMonth();
        switch (month) {
            case 0:
                return `${day} JAN`
            case 1:
                return `${day} FEV`
            case 2:
                return `${day} MAR`
            case 3:
                return `${day} ABR`
            case 4:
                return `${day} MAI`
            case 5:
                return `${day} JUN`
            case 6:
                return `${day} JUL`
            case 7:
                return `${day} AGO`
            case 8:
                return `${day} SET`
            case 9:
                return `${day} OUT`
            case 10:
                return `${day} NOV`
            case 11:
                return `${day} DEZ`
        }
    }

    function imageValidation() {
        if (role.eventPhotoLink != '' && role.eventPhotoLink != null && role.eventPhotoLink != undefined) {
            return role.eventPhotoLink
        }
        return 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png'
    }

    useEffect(() => {
        setDate(new Date(role.eventDate))
    }, [role])

    useEffect(() => {
        dateFormat()
    }, [date])

    return (
        <TouchableOpacity className="flex flex-row bg-[#1C1C1C] rounded-2xl" style={{height: height*0.14}} onPress={handleRole}>
            <View className="absolute top-2 left-2 z-10 bg-[#121212]/70 px-2 py-1 rounded-lg">
                <Text className="text-white text-base">{dateFormat()}</Text>
            </View>
            <View className="w-1/2">
                <Image source={{ uri: imageValidation() }} className="w-full h-full object-cover rounded-l-2xl"/>
            </View>
            <View className="w-1/2 p-5">
                <View className="mb-2">
                    <Text 
                        className="text-xl font-bold text-white"
                        numberOfLines={1}  // Limita a uma linha
                        ellipsizeMode="tail"  // Adiciona reticências (...) no final do texto se ultrapassar a linha
                    >
                        {role.name}
                    </Text>
                </View>
                <View className="flex flex-row gap-2 mb-4 items-center">
                    {role.category === 'Bar' ? (
                        <FontAwesome6 name="beer-mug-empty" size={16} color="white" />
                    )
                    : (
                        <FontAwesome6 name="question" size={16} color="white" />
                    )}
                    <Text className="text-base text-white">{role.category}</Text>
                </View>
                <View className="flex flex-row gap-4">
                    <View className="flex flex-row gap-2 items-center">
                        <FontAwesome6 name="star" size={8} color="#BDBDBD" solid/>
                        {role.rating ? (
                            <Text className="text-sm text-[#BDBDBD]">{role.rating}</Text>
                        ) : (
                            <Text className="text-sm text-[#BDBDBD]">0</Text>
                        )}
                    </View>
                    <View className="flex flex-row gap-2 items-center">
                        <FontAwesome6 name="location-dot" size={8} color="#BDBDBD" />
                        <Text className="text-sm text-[#BDBDBD]">{role.districtId}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}   
