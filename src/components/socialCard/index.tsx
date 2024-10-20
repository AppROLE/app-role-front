import {Text, TouchableOpacity, Image, View} from "react-native";
import React from "react";
import {SvgUri} from "react-native-svg";

interface SocialCardProps {
    image?: string;
    title?: string;
    bookMarkerFunction?: () => void;
}

export default function SocialCard({image, title, bookMarkerFunction} : SocialCardProps) {

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
            <TouchableOpacity onPress={bookMarkerFunction} className="pr-3">
                <SvgUri
                    uri={process.env.EXPO_PUBLIC_URL_S3 + "/bookmark.svg"}
                    width="14"
                    height="18"
                />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
