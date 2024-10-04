import { createReviewRequestDTO, createReviewResponseDTO } from "@/api/types/review_dto";
import { ReviewContext } from "@/context/review_context";
import Background from "@/src/components/background";
import ModalReview from "@/src/components/modalReview";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { Modal, SafeAreaView, Text, Image, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import ComfirmedListModal from "@/src/components/comfirmedListModal";
import RoleMainButton from "@/src/components/roleMainButton";
import { UserContext } from "@/context/user_context";
import { getProfileResponseDTO } from "@/api/types/user_dto";
import { PresenceContext } from "@/context/presence_context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReviewCard from "@/src/components/modalReviewList";
import ModalReviewList from "@/src/components/modalReviewList";

interface RoleDescriptionProps {
    eventId: string;
}


export default function RoleDescription({ eventId }: RoleDescriptionProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [comfirmedListModalVisible, setConfirmedListModalVisible] = useState(false);
    const [modalReviewListVisible, setModalReviewListVisible] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState<string | undefined>();
    const { getProfile } = useContext(UserContext);
    const { confirmEvent } = useContext(PresenceContext);
    const stars = [1, 2, 3, 4, 5];

    const avatars = [
        { id: 1, uri: require('../../../assets/images/profile1 (1).png') },
        { id: 2, uri: require('../../../assets/images/profile2 (1).png') },
        { id: 3, uri: require('../../../assets/images/profile3 (1).png') },
    ];

    const data ={
        avatar: require('../../../assets/images/profile1 (1).png'),
        nickname: "João",
        star: 5,
        username: "jotape",
        review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae nulla sit amet nunc.",
    }

    const maxParticipantsToShow = 3;

    async function fetchGetProfile() {
        const response = await getProfile();
        const final = response as getProfileResponseDTO;
        if (response) {
            setProfilePhoto(final.profilePhoto);
            return response;
        }
    }

    async function fetchConfirmEvent() {
        const promoterCode = await AsyncStorage.getItem('promoterCode') || '';
        if (promoterCode === '') return;
        const response = await confirmEvent(eventId, profilePhoto, promoterCode);
        if (response) {
            alert(response.message);
            return response;
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
                                    <Ionicons name="add" size={18} color="#fff" />
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
                            <Text className="text-sm text-white font-sans">
                                Deixe sua Avaliação
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ModalReview
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                    />
                    <View className="mt-10">
                        <Text className="text-lg font-bold text-white">Reviews</Text>
                        <View className="bg-button_color p-4 rounded-3xl flex-row">
                            {/* Avatar */}
                            <Image
                                source={{ uri: data.avatar }}
                                className="w-12 h-12 rounded-full mr-4"
                                resizeMode="cover"
                            />

                            {/* Text Content */}
                            <View className="flex-1">
                                {/* User Info */}
                                <View className="flex-row items-center justify-between">
                                    <View>
                                        <Text className="text-white font-bold text-base">{data.nickname}</Text>
                                        <Text className="text-sub_text text-xs">@{data.username}</Text>
                                    </View>
                                    <View className="flex-row">
                                        {data.star}
                                    </View>
                                </View>
                                <Text className="text-sub_text text-sm mt-2">
                                    {data.review}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity className="items-center mt-5" onPress={() => setModalReviewListVisible(true)}>
                            <Text className="text-md text-[#DFA9FD]">Ver todas as reviews</Text>
                        </TouchableOpacity>
                    </View>
                    <ModalReviewList 
                        visible={modalReviewListVisible}
                        onClose={() => setModalReviewListVisible(false)}
                        eventId={eventId}
                    />
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
