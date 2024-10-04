import { Reviews } from "@/api/types/review_dto";
import { ReviewContext } from "@/context/review_context";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { Modal, ScrollView, Image, Text, TouchableOpacity, View } from "react-native";

interface ModalReviewProps {
    visible: boolean;
    onClose: () => void;
    eventId: string;
}

export default function ModalReviewList({ visible, onClose, eventId }: ModalReviewProps) {
    const { getAllReviewsByEvent } = useContext(ReviewContext);
    const [review, setReview] = useState<(Reviews)[]>([]);
    const reviews = [
        {
            id: 1,
            profilePhoto: require('../../../assets/images/profile1 (1).png'),
            nickname: 'User1',
            username: 'user1',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae nulla sit amet',
            stars: 4
        },
        {
            id: 2,
            profilePhoto: require('../../../assets/images/profile2 (1).png'),
            nickname: 'User2',
            username: 'user2',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae nulla sit amet',
            stars: 5
        },
        
    ];

    const renderStars = (rating: number) => {
        const totalStars = 5;
        return (
            <View className="flex-row self-stretch">
                {[...Array(totalStars)].map((_, index) => (
                    <Ionicons
                        key={index}
                        name={index < rating ? 'star' : 'star-outline'} 
                        size={16}
                        color={index < rating ? '#fff' : '#fff'}  
                        className="mr-1"
                    />
                ))}
            </View>
        );
    };

    async function fetchGetReviews() { 
        try {
            const response = await getAllReviewsByEvent(eventId);
            console.log("RESPOSTA DO GETREVIEWS ", response);
            if (response) {
                setReview(response.reviews || []); // Garantir que seja um array
                return response;
            }
        } catch (error: any) {
            console.error("Erro ao buscar reviews: ", error);
            throw new Error("Erro ao buscar reviews: ", error);
        }
    }


    useEffect(() => { 
        fetchGetReviews();
    }, []);

    return (
        <>
            <Modal
                transparent={true}
                visible={visible}
                animationType="slide"
                onRequestClose={onClose}
            >
                <View className="flex-1 justify-end items-center bg-black/70">
                    <View className="flex-end bg-background rounded-t-[50px] p-3 h-[695px] w-full">
                        <View className="flex-row items-center justify-center pt-[15px]">
                            <TouchableOpacity className="rounded-full bg-button_color mr-5 absolute left-[10px] top-[12px]" onPress={onClose}>
                                <Ionicons name="arrow-back" size={22} color='#fff' className="p-2" />
                            </TouchableOpacity>
                            <View className="flex justify-center items-center ">
                                <Text className="text-2xl text-white">
                                    Reviews
                                </Text>
                            </View>
                        </View>    
                            <ScrollView className="flex-1 w-full p-4 mt-5">
                                {reviews.map((data) => (
                                    <View className="w-full ">
                                        <View className="bg-button_color p-4 rounded-3xl flex-row mt-5" key={data.id}>
                                            <View className="flex-1">
                                                <View className="flex-row items-center justify-between">
                                                    <View className="flex-row ">
                                                        <Image
                                                            source={data.profilePhoto}  // Certifique-se de passar uma URI correta para as imagens
                                                            className="w-10 h-10 rounded-full mr-4 self-start"
                                                            resizeMode="cover"
                                                        />
                                                        <View className="flex justify-center self-start">
                                                            <Text className="text-white font-bold text-base">{data.nickname}</Text>
                                                            <Text className="text-sub_text text-xs">@{data.username}</Text>
                                                        </View>
                                                    </View>
                                                  {renderStars(data.stars)}
                                                </View>
                                                <Text className="text-sub_text text-sm mt-2">
                                                    {data.comment}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
            </Modal>
        </>
    )
}