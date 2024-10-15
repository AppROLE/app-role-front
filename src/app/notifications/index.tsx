import Background from "@/src/components/background";
import {Text, View, FlatList, TouchableOpacity} from "react-native";
import React from "react";
import NotificationCard from "@/src/components/notificationCard";
import Svg from "@/src/components/svg";

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
                        <Text className="absolute left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold">
                            Notificações
                        </Text>
                    </View>
                </View>
                <View className="p-10 w-full">
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