import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import RoleMainButton from "../roleMainButton";
import { createReviewRequestDTO, createReviewResponseDTO } from "@/api/types/review_dto";
import { ReviewContext } from "@/context/review_context";


interface ModalReviewProps {
    visible: boolean;
    onClose: () => void;
    // eventId: string;
    // instituteId: string;
}

export default function ModalReview({ visible, onClose }: ModalReviewProps) {
    const [selectedStars, setSelectedStars] = useState(0);
    const stars = [1, 2, 3, 4, 5];
    const [reviewText, setReviewText] = useState("");
    const maxChars = 250;
    const { createReview } = useContext(ReviewContext);

    const clearFields = () => {
        setSelectedStars(0);
        setReviewText("");
    };

    async function create() {
        const data: createReviewRequestDTO = {
            eventId: "da1c716a-b4d2-4c85-b139-27740a9b5f89",
            reviewedAt: new Date().getTime(),
            star: selectedStars,
            review: reviewText
        }

        if (reviewText.length === 0) {
            alert('Por favor, digite uma avaliação')
            return
        }
        if (reviewText.length > maxChars) {
            alert('A avaliação não pode ter mais de 250 caracteres')
            return
        }

        try {
            const response: createReviewResponseDTO = await createReview(data);
            console.log("RESPOSTA DO CREATE REVIEW", response)
            clearFields();
            onClose();
        } catch (error: any) {
            throw new Error(error)
        }
    }


    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <View className="flex-1 justify-end items-center bg-black/70">
                        <View className="flex-end bg-background rounded-t-3xl p-3 h-[45%] w-full">
                            <View className="flex-row flex items-center justify-center pt-[15px]">
                                <TouchableOpacity className="rounded-full bg-button_color mr-5 absolute left-[12px] top-[12px]" onPress={onClose}>
                                    <Ionicons name="arrow-back" size={24} color='#fff' className="p-2" />
                                </TouchableOpacity>
                                <Text className="text-3xl text-white font-nunitoBold">
                                    Escreva sua Review
                                </Text>
                            </View>
                            <View className="w-full mt-5">
                                <Text className="text-white text-center text-lg font-nunito">
                                    Como foi a sua experiência nesse ROLE?
                                </Text>
                                <Text className="text-white text-center text-lg">Conta pra gente!</Text>
                            </View>
                            <View className="flex-row items-center justify-center mt-5">
                                {stars.map((star) => (
                                    <TouchableOpacity key={star} onPress={() => setSelectedStars(star)}>
                                        <Ionicons
                                            name={star <= selectedStars ? 'star' : 'star-outline'}
                                            size={32}
                                            color="#fff"
                                            className="mr-2"

                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View className="w-[90%] mx-auto mt-5 bg-button_color rounded-lg p-3">
                                <TextInput
                                    className="text-white"
                                    multiline
                                    maxLength={maxChars}
                                    placeholder="Digite sua avaliação"
                                    placeholderTextColor="#888"
                                    value={reviewText}
                                    onChangeText={(text) => setReviewText(text)}
                                />
                                {/* Contador de caracteres */}
                                <Text className="text-white text-right text-xs">
                                    {reviewText.length}/{maxChars}
                                </Text>
                            </View>
                            <View className="w-[80%] mx-auto mt-10">
                                <RoleMainButton type="gradient" buttonFunction={() => create()}>
                                    <Text className="text-white text-md font-nunito">Publicar</Text>
                                </RoleMainButton>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    )
}