import { FontAwesome6 } from "@expo/vector-icons";
import { View, Text, Dimensions, Image, ColorValue } from "react-native";

export default function RoleEmphasis() {
    const {width, height} = Dimensions.get('window');

    return (
        <>
            <View className={`w-full bg-blue-500`} style={{height: height*0.21, borderRadius: 24}} >
                <View className="absolute top-2 left-2 z-10 bg-[#121212]/70 px-2 py-1 rounded-lg">
                    <Text className="text-white text-base">16 DEZ</Text>
                </View>
                <Image source={{ uri: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png' }} className="w-full h-full object-cover rounded-3xl"/>
                <View className="absolute bottom-2 z-10 w-full">
                    <View className="flex flex-row items-center w-[90%] bg-[#121212]/70 rounded-lg px-2 py-1 mx-auto" style={{height: height*0.05}}>
                        <View className="flex flex-row items-end gap-1 w-[50%] justify-center">
                            <Text className="text-white text-2xl font-bold">Galleria,</Text>
                            <Text className="text-[#BEBEBE] text-sm">Pinheiros</Text>
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
                                <Text className="text-[#BDBDBD] text-sm">4.8</Text>
                            </View>
                            <View className="flex flex-row items-center gap-1">
                                <FontAwesome6 name="user" size={8} color="#BDBDBD" solid/>
                                <Text className="text-[#BDBDBD] text-sm">195</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}