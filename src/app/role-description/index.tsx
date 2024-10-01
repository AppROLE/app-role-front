import { createReviewRequestDTO, createReviewResponseDTO } from "@/api/types/review_dto";
import { ReviewContext } from "@/context/review_context";
import Background from "@/src/components/background";
import ModalReview from "@/src/components/modalReview";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Modal, SafeAreaView, Text, Image, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import ComfirmedListModal from "@/src/components/comfirmedListModal";




export default function RoleDescription() {
    const [modalVisible, setModalVisible] = useState(false);
    const [comfirmedListModalVisible, setConfirmedListModalVisible] = useState(false);
    const stars = [1, 2, 3, 4, 5];

    const avatars = [
        { id: 1, uri: require('../../../assets/images/profile1 (1).png') },
        { id: 2, uri: require('../../../assets/images/profile2 (1).png') },
        { id: 3, uri: require('../../../assets/images/profile3 (1).png') },
    ];

    return (
        <>
            <Background>
                <SafeAreaView>
                        <TouchableOpacity onPress={() => setConfirmedListModalVisible(true)}>
                            <View className="flex items-center mb-12">
                                {/* Lista de Avatares */}
                                <View className="flex-row space-x-2">
                                    {avatars.map((avatar) => (
                                        <Image
                                            key={avatar.id}
                                            source={avatar.uri}
                                            className="w-12 h-12 rounded-full"
                                        />
                                    ))}
                                    {/* Botão de Adicionar */}
                                    <View className="w-12 h-12 rounded-full bg-[#333] flex items-center justify-center">
                                        <Ionicons name="add" size={20} color="#fff" />
                                    </View>
                                </View>
                                <Text className="text-[#DFA9FD] text-sm mt-5">Lista de confirmados</Text>
                            </View>
                        </TouchableOpacity>
                        <ComfirmedListModal
                            visible={comfirmedListModalVisible}
                            onClose={() => setConfirmedListModalVisible(false)}
                        />
                        <View>
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
