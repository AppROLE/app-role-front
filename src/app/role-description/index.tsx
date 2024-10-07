import Background from "@/src/components/background";
import ModalReview from "@/src/components/modalReview";import ReviewCard from "@/src/components/reviewCard";
import Svg from "@/src/components/svg";
import ModalReviewList from "@/src/components/modalReviewList";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, Text, Image, TouchableOpacity, View } from "react-native";
import ComfirmedListModal from "@/src/components/comfirmedListModal";
import RoleMainButton from "@/src/components/roleMainButton";
import { UserContext } from "@/context/user_context";
import { getProfileResponseDTO } from "@/api/types/user_dto";
import { PresenceContext } from "@/context/presence_context";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RoleDescriptionProps {
    eventId: string;
}

export default function RoleDescription({ eventId }: RoleDescriptionProps) {
    const [modalListVisible, setModalListVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [comfirmedListModalVisible, setConfirmedListModalVisible] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<string | undefined>();
    const { getProfile } = useContext(UserContext);
    const { confirmEvent } = useContext(PresenceContext);
    const stars = [1, 2, 3, 4, 5];

    const avatars = [
        { id: 1, uri: require('../../../assets/images/profile1 (1).png') },
        { id: 2, uri: require('../../../assets/images/profile2 (1).png') },
        { id: 3, uri: require('../../../assets/images/profile3 (1).png') },
    ];

    const data = {
        avatar: require('../../../assets/images/profile1 (1).png'),
        nickname: "João",
        star: 5,
        username: "jotape",
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae nulla sit amet nunc.",
    }

    const maxParticipantsToShow = 3;

    async function fetchGetProfile() {
        try {
            const response = await getProfile();
            const final = response as getProfileResponseDTO;
            console.log("RESPOSTA DO GETPROFILE ", final);
            if (response) {
                setProfilePhoto(final.profilePhoto);
                return response;
            }
        } catch (error: any) {
            console.error("Erro ao buscar perfil: ", error);
            throw new Error("Erro ao buscar perfil: ", error);
        }
    }

    async function fetchConfirmEvent() {
        try {
            const promoterCode = await AsyncStorage.getItem('promoterCode') || '';
            if (promoterCode === '') return;
            const response = await confirmEvent(eventId, profilePhoto, promoterCode);
            console.log("RESPOSTA DA CONFIRMEVENT ", response);
            if (response) {
                return response;
            }
        } catch (error: any) {
            console.error("Erro ao confirmar presença: ", error);
            throw new Error("Erro ao confirmar presença: ", error);
        }

    }

    useEffect(() => {
        fetchGetProfile();
    }, [])

    return (
        <>
            <Background>
                <SafeAreaView className="flex-1">
                    <TouchableOpacity onPress={() => setConfirmedListModalVisible(true)} className="w-full self-end">
                        <View className="flex items-center mb-12 ">
                            <View className="flex-row absolute justify-center items-center">
                                {avatars.slice(0, maxParticipantsToShow).map((avatar) => (
                                    <Image
                                        key={avatar.id}
                                        source={avatar.uri}
                                        className="w-14 h-14 rounded-full relative -ml-4 "
                                    />
                                ))}
                                <View className="w-8 h-8 ml-4 rounded-full bg-[#333] absolute left-[100px] flex items-center justify-center">
                                    <Text className="text-white">
                                        +
                                    </Text>
                                </View>
                            </View>
                            <View className="mt-12">
                                <Text className="text-[#DFA9FD] text-md mt-5 font-sans">Lista de confirmados</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <ComfirmedListModal
                        visible={comfirmedListModalVisible}
                        onClose={() => setConfirmedListModalVisible(false)}
                        eventId={"1"}
                    />

                    <ModalReview
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                    />
                    <ModalReviewList
                        visible={modalListVisible}
                        onClose={() => setModalListVisible(false)}
                        eventId={eventId}
                    />
                    <View className="w-11/12">
                        <Text className="text-2xl font-bold text-white mb-3 ">Reviews</Text>

                        {/* IMAGE TEM QUE TIPAR NO CARD (preciso saber o tipo da imagem na request) */}
                        <ReviewCard image={process.env.EXPO_PUBLIC_URL_S3 + "/images/profile_default.png"}
                                    opacity={0} nickname={data.nickname} at={data.username} stars={4} full={false} onOpen={() => setModalListVisible(!modalListVisible)}
                                    review={data.review}></ReviewCard>

                        <View className="items-center mb-4">
                            <Text className="text-LILAC font-light" onPress={() => setModalListVisible(true)}>
                                Ver todas as reviews</Text>
                        </View>
                    </View>
                    <View>
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
                            <Text className="text-sm text-white font-sans">
                                Deixe sua Avaliação
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="mt-20">
                        <RoleMainButton type='gradient' buttonFunction={fetchConfirmEvent} >
                            <Text className="text-white text-lg font-sans">
                                Confirmar Presença
                            </Text>
                        </RoleMainButton>
                    </View>
                </SafeAreaView>
            </Background>
        </>
    )
}
