import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

interface CategoryMusicalCardProps {
    type: string;
    name: string;
}

export default function CategoryMusicalCard({type, name} : CategoryMusicalCardProps) {
    function handleCategory() {
        // request - {idRole} (Isso é o parametro)
        router.replace('/')
    }

    return (
        <TouchableOpacity className="bg-button_color flex justify-end w-2/5 h-52 rounded-2xl pb-10">
            <View className="mx-auto flex flex-col items-center gap-8">
                {type === 'Musical' ? (
                    <FontAwesome6 name="music" size={48} color="white" />
                )
                : (
                    <FontAwesome6 name="question" size={48} color="white" />
                )}
                <Text className="text-xl text-white">{name}</Text>
            </View>
        </TouchableOpacity>
    )
}