import Background from "@/src/components/background";
import RoleMainButton from "@/src/components/roleMainButton";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

const handlePress = () => {
    console.log('teste')
}

export default function FirstPage() {
    return (
        <>
            <View className="bg-background h-full pt-20">
                <Image
                    style={{
                        width: 140, 
                        height: 70 
                    }}
                    source={require('../../../assets/images/ROLE.png')}
                    className="ml-6 mt-4"
                />
                <View className="items-center">
                    <Text className="text-white text-xl">Suas melhores histórias começam aqui.</Text>
                    <Text className="text-white text-xl mt-2">Bora dar um <Text className="font-bold text-white text-xl ">ROLE</Text>?</Text>
                    <View className="w-[80%] mt-8">
                        <Link href={'/sign-up'} asChild>
                            <RoleMainButton type="gradient" buttonFunction={handlePress}>
                                <Text className="text-white text-base">Cadastre-se</Text>
                            </RoleMainButton>
                        </Link> 
                    </View> 
                    <View className="mt-16">
                        <Text className="text-[#BDBDBD]">Já possui uma conta?  <Link href={'/sign-in'} className="text-[#D8A9FF]">Entrar</Link></Text>
                    </View>
                </View>
            </View>
        </>
    )
}