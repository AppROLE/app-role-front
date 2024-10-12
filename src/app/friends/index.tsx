import Background from "@/src/components/background";
import {Text, TouchableOpacity, View, FlatList} from "react-native";
import React, { useState } from "react";
import FriendCard from "@/src/components/friendCard";
import Svg from "@/src/components/svg";
import SearchingBarInput from "@/src/components/searchingBarInput";
import {useRouter} from "expo-router";

export default function Favorites() {
    const [search, setSearch] = useState('')
    const navigation = useRouter()

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
    function handleVoltar() {
        navigation.back()
    }

    return (
        <Background>
            <View className="items-start h-full w-full">
                <View className="absolute top-0 flex h-12 w-full flex-row items-center gap-3 border-b-2 border-b-[#2C2B2B] pb-8">
                    <TouchableOpacity
                        onPress={() => handleVoltar()}
                        className="ml-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1C1C]"
                    >
                        <Svg
                            uri={process.env.EXPO_PUBLIC_URL_S3 + '/left_arrow.svg'}
                        />
                    </TouchableOpacity>
                    <SearchingBarInput search={search} setSearch={setSearch} />
                </View>
                <View className="p-10 mt-8 w-full">
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