import {Text, TouchableOpacity, Image, View} from "react-native";
import React, { useContext, useState } from "react";
import {SvgUri} from "react-native-svg";
import { InstituteContext } from "@/context/institute_context";

interface SocialCardProps {
    image?: string;
    title?: string;
}

export default function SocialCard({image, title} : SocialCardProps) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const { updateFavoriteInstitute } = useContext(InstituteContext)

    
  async function updateInstitute() { 
    const instituteIdee = '2f3073ac-3633-4fc7-9cfe-c2084399bbc3'
    const response = await updateFavoriteInstitute(instituteIdee)
    if (response) {
        setIsBookmarked(!isBookmarked)
    }
    console.log('RESPOSTA DA UPDATE', response)
  }

    return (
        <View className="flex flex-row items-center bg-[#1C1C1C] rounded-full p-2 justify-between mb-4">
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
            <TouchableOpacity onPress={updateInstitute} className="pr-3">
                <SvgUri
                    uri={
                        process.env.EXPO_PUBLIC_URL_S3 +
                        (isBookmarked ? "/bookmark.svg" : "/bookmark_empty.svg")
                    }
                    width="14"
                    height="18"
                />
            </TouchableOpacity>
        </View>
    )
}
