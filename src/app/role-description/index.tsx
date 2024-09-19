import { createReviewRequestDTO, createReviewResponseDTO } from "@/api/types/review_dto";
import { ReviewContext } from "@/context/review_context";
import Background from "@/src/components/background";
import ModalReview from "@/src/components/modalReview";
import RoleMainButton from "@/src/components/roleMainButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";




export default function RoleDescription() {
    const [modalVisible, setModalVisible] = useState(false);
    const stars = [1, 2, 3, 4, 5];



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
                    <ModalReview
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                    />
                </SafeAreaView>
            </Background>
        </>
    )
}
