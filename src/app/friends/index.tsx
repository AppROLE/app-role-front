import Background from "@/src/components/background";
import {Text, TouchableOpacity, View, FlatList} from "react-native";
import React, { useState } from "react";
import FriendCard from "@/src/components/friendCard";
import Svg from "@/src/components/svg";

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
                <View className="relative flex flex-row h-12 w-full items-center gap-3 border-b-2 border-b-line_gray">
                    <TouchableOpacity
                        className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-button_color
                        bottom-4 left-6"
                    >
                        <Svg
                            uri={process.env.EXPO_PUBLIC_URL_S3 + "/left_arrow.svg"}
                        />
                    </TouchableOpacity>
                    <View className="flex-1 h-full mb-8">
                        {/* BARRA DE PESQUISA */}
                    </View>
                </View>
                <View className="p-10 w-full">
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