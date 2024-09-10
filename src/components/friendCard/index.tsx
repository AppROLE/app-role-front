import {Text, TouchableOpacity, Image, View} from "react-native";
import React from "react";

interface FriendCardProps {
    image: string;
    nickname: string;
    user: string;
}

export default function FriendCard({image, nickname, user} : FriendCardProps) {

    return (
        <TouchableOpacity className="flex flex-row items-center bg-[#1C1C1C] rounded-full p-2 justify-between mb-4">
            <View className="flex flex-row items-center gap-4 w-5/6">
                <Image
                    src={image}
                    style={[
                        { width: 48, height: 48 },
                    ]}
                    className="rounded-full"
                />
                <View>
                    <Text className="text-2xl font-bold text-white flex-1 line-clamp-1">{nickname}</Text>
                    <Text className="text-md flex-1 line-clamp-1 text-sub_text">@{user}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}
