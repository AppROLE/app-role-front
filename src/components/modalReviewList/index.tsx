import ReviewCard from "@/src/components/reviewCard";
import Svg from "@/src/components/svg";
import { Reviews } from "@/api/types/review_dto";
import { ReviewContext } from "@/context/review_context";
import { useContext, useEffect, useState } from "react";
import { Modal, FlatList, Text, TouchableOpacity, View } from "react-native";

interface ModalReviewProps {
    visible: boolean;
    onClose: () => void;
    eventId: string;
}

export default function ModalReviewList({ visible, onClose, eventId }: ModalReviewProps) {

    const json = [
        {
            "id": 1,
            "nickname": "Isabela",
            "at": "isa.saab",
            "stars": 4,
            "review": "Foi incrível! Música e bebida muito boas. O único problema que eu tive foi com a fila de entrada kkk mas eu estava com as minhas amigas que marcamos pelo app ROLE!",
            "image": process.env.EXPO_PUBLIC_URL_S3 + "/images/profile_default.png"
        },
        {
            "id": 2,
            "nickname": "Zoletti",
            "at": "zozo",
            "stars": 5,
            "review": "Segura o App ROLE",
            "image": process.env.EXPO_PUBLIC_URL_S3 + "/images/profile_default.png"
        },
        {
            "id": 3,
            "nickname": "Lucão",
            "at": "luca",
            "stars": 3,
            "review": "Cade o PIX?",
            "image": process.env.EXPO_PUBLIC_URL_S3 + "/images/profile_default.png"
        },
    ]

    // const reviews = [
    //     {
    //         id: 1,
    //         profilePhoto: require('../../../assets/images/profile1 (1).png'),
    //         nickname: 'User1',
    //         username: 'user1',
    //         comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae nulla sit amet',
    //         stars: 4
    //     },
    //     {
    //         id: 2,
    //         profilePhoto: require('../../../assets/images/profile2 (1).png'),
    //         nickname: 'User2',
    //         username: 'user2',
    //         comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae nulla sit amet',
    //         stars: 5
    //     },
    //
    // ];

    const { getAllReviewsByEvent } = useContext(ReviewContext);
    const [review, setReview] = useState<(Reviews)[]>([]);

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
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-end items-center bg-black/70">
                <View className="flex-end bg-background rounded-t-3xl p-3 h-[80%] w-full">
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
                            <Text className="absolute left-1/2 transform -translate-x-1/2 text-white text-3xl font-bold">
                                Reviews
                            </Text>
                        </View>
                    </View>
                    <FlatList
                        data={json}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={
                            ({item}) => <ReviewCard full={true} image={item.image}
                            stars={item.stars} nickname={item.nickname} at={item.at} review={item.review} opacity={1}/>
                        }
                    />
                </View>
            </View>
        </Modal>
    )
}