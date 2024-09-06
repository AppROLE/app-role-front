import Background from "@/src/components/background";
import {Text, View, FlatList} from "react-native";
import React from "react";
import NotificationCard from "@/src/components/notificationCard";

export default function Notifications() {

    const json = [
        {
            "id": 1,
            "image": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            "nickname": "João",
            "message": "seguiu você!",
            "time": "agora"
        },
        {
            "id": 2,
            "image": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            "nickname": "Leleo",
            "message": "seguiu você!",
            "time": "1h"
        },
        {
            "id": 3,
            "image": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            "nickname": "Rinha",
            "message": "seguiu você!",
            "time": "1h"
        },
        {
            "id": 4,
            "image": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
            "nickname": "Isabella",
            "message": "seguiu você!",
            "time": "1h"
        }
    ]

    return (
        <Background>
            <View className="items-start h-full w-full">
                <View className='w-full items-center'>
                    {/* BOTÃO DE VOLTAR */}
                    <Text className="text-3xl text-white font-medium text-center">Notificações</Text>
                </View>
                <View className="border-t-line_gray border-2 mt-8 p-10 w-full">
                    <FlatList
                        data={json}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={
                            ({item}) => <NotificationCard image={item.image} nickname={item.nickname} message={item.message} time={item.time}/>
                        }
                    />
                </View>
            </View>
        </Background>
    );
}