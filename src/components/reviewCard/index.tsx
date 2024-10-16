import { Text, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import Svg from "@/src/components/svg";

interface ReviewCardProps {
    image: string;
    nickname: string;
    username: string;
    stars: number;
    full: boolean;
    review: string;
    opacity: number;
    onOpen?: () => void;
}

export default function ReviewCard({ image, nickname, username, stars, full, review, onOpen, opacity }: ReviewCardProps) {
    const starsList = Array.from({ length: stars }, (_, index) => index + 1)
    const emptyStars = Array.from({ length: 5 - stars }, (_, index) => index + 1)

    return (
        <TouchableOpacity activeOpacity={opacity} onPress={onOpen} className="flex bg-[#1C1C1C] rounded-2xl p-3 mb-4 w-full">
            <View className="flex-row w-full justify-between items-center">
                <View className="flex flex-row items-center gap-2 w-3/5">
                    <Image
                        source={{ uri: image }}
                        style={{ width: 32, height: 32 }}
                        className="rounded-full my-1"
                    />
                    <View className="flex-1">
                        <Text numberOfLines={1} className="font-bold text-white">
                            {nickname}
                        </Text>
                        <Text numberOfLines={1} className="text-sm text-sub_title">
                            @{username}
                        </Text>
                    </View>
                </View>
                <View className="flex-row gap-2 justify-end">
                    {starsList.map((_, index) => (
                        <Svg
                            key={`filled-${index}`}
                            uri={process.env.EXPO_PUBLIC_URL_S3 + "/star.svg"}
                            width="16"
                            height="16"
                        />
                    ))}
                    {emptyStars.map((_, index) => (
                        <Svg
                            key={`empty-${index}`} // Add a unique key for each star
                            uri={process.env.EXPO_PUBLIC_URL_S3 + "/star_empty.svg"}
                            width="16"
                            height="16"
                        />
                    ))}
                </View>
            </View>
            <View className="flex items-center justify-center mt-2">
                <Text className={`text-center text-sub_title ${full ? '' : 'line-clamp-3'}`}>
                    {review}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
