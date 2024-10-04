import Background from "@/src/components/background";
import ModalReview from "@/src/components/modalReview";
import React, { useState } from "react";
import {SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import ReviewCard from "@/src/components/reviewCard";
import Svg from "@/src/components/svg";
import ModalReviewList from "@/src/components/modalReviewList";

export default function RoleDescription() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalListVisible, setModalListVisible] = useState(false);
    const stars = [1, 2, 3, 4, 5];

    return (
        <>
            <Background>
                <SafeAreaView className="w-11/12">
                    <View>
                        <View>
                            <Text className="text-2xl font-bold text-white mb-3 ">Reviews</Text>

                            <ReviewCard image={process.env.EXPO_PUBLIC_URL_S3 + "/images/profile_default.png"}
                            opacity={0} nickname="Isabela" at="isa.saab" stars={4} full={false} onOpen={() => setModalListVisible(!modalListVisible)}
                                        review={"Foi incrível! Música e bebida muito boas. O único problema que eu tive foi com a fila de entrada kkk mas eu estava com as minhas amigas que marcamos pelo app ROLE!"}></ReviewCard>

                            <View className="items-center mb-4">
                                <Text className="text-LILAC font-light" onPress={() => setModalListVisible(true)}>Ver todas as reviews</Text>
                            </View>

                        </View>
                        <TouchableOpacity className="flex-row items-center bg-[#1C1C1C] rounded-full px-4 py-2" onPress={() => setModalVisible(true)}>
                            <View className="flex-row gap-2">
                                {stars.map(() => (
                                    <Svg
                                        uri={process.env.EXPO_PUBLIC_URL_S3 + "/star_empty.svg"}
                                        width="16"
                                        height="16"
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
                    <ModalReviewList
                        visible={modalListVisible}
                        onClose={() => setModalListVisible(false)}
                    />
                </SafeAreaView>
            </Background>
        </>
    )
}
