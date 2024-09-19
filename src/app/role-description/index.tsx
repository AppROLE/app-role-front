import { createReviewRequestDTO, createReviewResponseDTO } from "@/api/types/review_dto";
import { ReviewContext } from "@/context/review_context";
import Background from "@/src/components/background";
import RoleMainButton from "@/src/components/roleMainButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";




export default function RoleDescription() {
    const [modalVisible, setModalVisible] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [selectedStars, setSelectedStars] = useState(0);
    const { createReview } = useContext(ReviewContext);
    const stars = [1, 2, 3, 4, 5];
    const maxChars = 250;

    async function create() {
        const data: createReviewRequestDTO = {
            reviewed_at: new Date(),
            star: selectedStars,
            comment: reviewText
        }
        if (reviewText.length === 0) {
            alert('Por favor, digite uma avaliação')
            return
        }
        if (reviewText.length > maxChars) {
            alert('A avaliação não pode ter mais de 250 caracteres')
            return
        }
        console.log("DADOS ENVIADOS NA REQ CREATE " + data)
        try {
            const response: createReviewResponseDTO = await createReview(data);
            console.log("RESPOSTA DA REQ CREATE " + response)
            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: response.message || 'Feedback criado com sucesso!',
                visibilityTime: 3000,
                topOffset: 0,
            });
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: error.message || 'Ocorreu um erro ao criar o feedback.',
                visibilityTime: 3000,
                topOffset: 0
            })
        }



    }
    return (
        <>
            <Background>
                <SafeAreaView>
                    <View >
                        <TouchableOpacity className="flex-row items-center bg-[#1C1C1C] rounded-full px-4 py-2" onPress={() => setModalVisible(true)}>
                            <View className="flex-row">
                                {stars.map((star) => (
                                    <Ionicons
                                        name='star-outline'
                                        size={20}
                                        color="#fff"
                                        className="mr-1"
                                        key={star}
                                    />

                                ))}
                            </View>
                            <View className="w-px h-6 bg-white mx-3"></View>
                            <Text className="text-sm text-white">
                                Deixe sua Avaliação
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        animationType="fade"
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View className="flex-1 justify-end items-center bg-black/70">
                            <View className="flex-end bg-background rounded-t-3xl p-3 h-[45%] w-full">
                                <View className="flex-row flex items-center justify-center p-3">
                                    <TouchableOpacity className="rounded-full bg-button_color mr-5 absolute left-[12px] top-[12px]" onPress={() => setModalVisible(false)}>
                                        <Ionicons name="arrow-back" size={24} color='#fff' className="p-2" />
                                    </TouchableOpacity>
                                    <Text className="text-3xl text-white">
                                        Escreva sua Review
                                    </Text>
                                </View>
                                <View className="w-full mt-5">
                                    <Text className="text-white text-center text-lg">
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
                                        <Text className="text-white text-md">Publicar</Text>
                                    </RoleMainButton>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
            </Background>
        </>
    )
}
