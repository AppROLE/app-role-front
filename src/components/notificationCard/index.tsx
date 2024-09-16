
import {Text, TouchableOpacity, Image, View} from "react-native";
import React from "react";

interface NotificationCardProps {
    image: string;
    nickname: string;
    message: string;
    time: string;
}

export default function NotificationCard({image, nickname, message, time} : NotificationCardProps) {

    return (
        <TouchableOpacity className="flex flex-row items-center bg-[#1C1C1C] rounded-full p-2 justify-between mb-4">
            <View className="flex flex-row items-center gap-4">
                <Image
                    src={image}
                    style={[
                        { width: 48, height: 48 },
                    ]}
                    className="rounded-full"
                />
                <View className="flex-1 flex-row items-end gap-2 pr-2">
                    <Text className="text-2xl font-bold text-white line-clamp-1">
                        {nickname}
                    </Text>
                    <View className="flex-1 flex-row justify-between">
                        <Text className="text-md line-clamp-3 text-sub_text ">{message}</Text>
                        <Text style={{lineHeight: 20, fontSize: 12}} className=" text-sub_text text-center">{time}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity>
    )
}
