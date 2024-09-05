import Background from "@/src/components/background";
import {Text, TouchableOpacity, View, FlatList} from "react-native";
import { useState } from "react";
import FriendCard from "@/src/components/friendCard";

export default function Favorites() {
    const json = [
        {
            "id": 1,
            "image": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            "nickname": "João",
            "user": "joao123"
        },
        {
            "id": 2,
            "image": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            "nickname": "Leleo",
            "user": "leleo.ribeiro"
        },
        {
            "id": 3,
            "image": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            "nickname": "Rinha",
            "user": "rinhademina"
        },
        {
            "id": 4,
            "image": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            "nickname": "Isabella",
            "user": "isa.saab"
        }
    ]

    const [friends, setFriends] = useState(json)

    return (
        <Background>
            <View className="items-start h-full w-full">
                <View className='flex-row justify-between w-full px-8'>
                    {/* BARRA DE PESQUISA E BOTÃO DE VOLTAR */}
                </View>
                <View className="border-t-line_gray border-2 mt-8 p-10 w-full">
                    <FlatList
                        data={friends}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={
                            ({item}) => <FriendCard image={item.image} nickname={item.nickname}
                                                    user={item.user}/>
                        }
                    />
                </View>
            </View>
        </Background>
    );
}