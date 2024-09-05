import {Text, TouchableOpacity, Image, View} from "react-native";
import React from "react";
import SvgUri from "react-native-svg-uri";

interface SocialCardProps {
    image: string;
    title: string;
}

export default function SocialCard({image, title} : SocialCardProps) {

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
                <Text className="text-2xl font-bold text-white flex-1 line-clamp-3">{title}</Text>
            </View>
            <View className="pr-3">
                <SvgUri
                    source={{uri: "https://d2sw4frthbnrzj.cloudfront.net/bookmark.svg"}}
                    width="14"
                    height="18"
                />
            </View>
        </TouchableOpacity>
    )
}
