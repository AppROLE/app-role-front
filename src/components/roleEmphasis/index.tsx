import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Dimensions, Image, ColorValue, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function RoleEmphasis(role: object) {
    const {width, height} = Dimensions.get('window');
    const [date, setDate] = useState(new Date(role.events[0].date));

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

    async function handleRole() {
        await AsyncStorage.setItem('eventId', role.events[0].eventId)
        router.push(`/event-description`)
    }

    function nameFormat() {
        const name = role.events[0].name;
        if (name.length > 8) {
            return name.substring(0, 8) + '...'
        }
        return name
    }

    useEffect(() => {
        console.log(role.events[0]);
    }, []);
    
    useEffect(() => {
        setDate(new Date(role.events[0].date))
    }, [role])

    return (
        <>
            <TouchableOpacity className={`w-full bg-blue-500`} style={{height: height*0.21, borderRadius: 24}} onPress={handleRole}>
                <View className="absolute top-2 left-2 z-10 bg-[#121212]/70 px-2 py-1 rounded-lg">
                    <Text className="text-white text-base">{dateFormat()}</Text>
                </View>
                <Image source={{ uri: role.events[0].eventPhoto ? role.events[0].eventPhoto : 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png' }} className="w-full h-full object-cover rounded-3xl"/>
                <View className="absolute bottom-2 z-10 w-full">
                    <View className="flex flex-row items-center w-[90%] bg-[#121212]/70 rounded-lg px-2 py-1 mx-auto" style={{height: height*0.05}}>
                        <View className="flex flex-row items-end gap-1 w-[50%] justify-center">
                            <Text className="text-white text-lg font-bold">{nameFormat()},</Text>
                            <Text className="text-[#BEBEBE] text-xs">{role.events[0].districtId}</Text>
                        </View>
                        <View className="flex flex-row w-[40%] justify-center items-center">
                            <Image source={{ uri: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png' }} className="w-8 h-8 border-[1px] border-[#1D1D1D99] border-opacity-60 rounded-full"/>
                            <Image source={{ uri: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png' }} className="w-8 h-8 border-[1px] border-[#1D1D1D99] border-opacity-60 rounded-full ml-[-8]"/>
                            <Image source={{ uri: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png' }} className="w-8 h-8 border-[1px] border-[#1D1D1D99] border-opacity-60 rounded-full ml-[-8]"/>
                            <View className="bg-[#1D1D1D99] w-4 h-4 flex rounded-full ml-[-6]">
                                <Text className="text-white text-center" style={{lineHeight: 14, fontSize: 12}}>+</Text>
                            </View>
                        </View>
                        <View className="flex flex-col w-[10%] justify-center">
                            <View className="flex flex-row items-center gap-1">
                                <FontAwesome6 name="star" size={8} color="#BDBDBD" solid/>
                                {role.events[0].rating === null ? <Text className="text-[#BDBDBD] text-sm">0</Text> : <Text className="text-[#BDBDBD] text-sm">{role.events[0].rating}</Text>}
                            </View>
                            <View className="flex flex-row items-center gap-1">
                                <FontAwesome6 name="user" size={8} color="#BDBDBD" solid/>
                                <Text className="text-[#BDBDBD] text-sm">{role.events[0].presenceCount}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </>
    )
}