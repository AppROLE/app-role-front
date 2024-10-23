import ReviewCard from "@/src/components/reviewCard";
import Svg from "@/src/components/svg";
import { Reviews } from "@/api/types/review_dto";
import { ReviewContext } from "@/context/review_context";
import { useContext, useEffect, useState } from "react";
import { Modal, FlatList, Text, TouchableOpacity, View } from "react-native";

interface ModalReviewProps {
    visible: boolean;
    onClose: () => void;
    // eventId: string;
}

export default function ModalReviewList({ visible, onClose }: ModalReviewProps) {
    const { getAllReviewsByEvent } = useContext(ReviewContext);
    const [review, setReview] = useState<Reviews[]>([]);


    async function fetchGetReviews() {
        try {
            const eventId = "d942a349-f74a-4d94-b591-ffb1fd143ad8";
            const response = await getAllReviewsByEvent(eventId);
            console.log("RESPOSTA DO GET ALL REVIEWS ", response);
            if (response) {
                setReview(response.reviews); 
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
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end items-center bg-black/70">
                <View className="flex-end bg-background rounded-t-[50px] p-3 h-[695px] w-full">
                    <View className="relative flex flex-row h-24 w-full items-center gap-3 mb-3">
                        <TouchableOpacity
                            onPress={onClose}
                            className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-button_color left-6"
                        >
                            <Svg
                                uri={process.env.EXPO_PUBLIC_URL_S3 + "/left_arrow.svg"}
                            />
                        </TouchableOpacity>
                        <View className="flex-1 justify-center">
                            <Text className="absolute left-1/2 transform -translate-x-1/2 text-white text-3xl font-nunitoBold">
                                Reviews
                            </Text>
                        </View>
                    </View>
                    <FlatList
                        data={review}
                        keyExtractor={(item) => item.eventId}
                        renderItem={
                            ({item}) => <ReviewCard full={true} image={item.profilePhoto}
                            stars={item.star} nickname={item.nickname} username={item.username} review={item.comment} opacity={1}/>
                        }
                    />
                </View>
            </View>
        </Modal>
    )
}