import { getAllConfirmedUsersResponseDTO, Users } from "@/api/types/event_dto";
import { ImageSourcePropType } from "react-native";
import { EventContext } from "@/context/event_context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { Keyboard, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View, Image } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

interface ModalReviewProps {
    visible: boolean;
    onClose: () => void;
}

export default function ComfirmedListModal({ visible, onClose }: ModalReviewProps) {
    const [users, setUsers] = useState<(Users & { image: ImageSourcePropType })[]>([]);
    const { getAllConfirmedUsers } = useContext(EventContext);  

    const comfirmed = [
        { event_id: 1, iamge: require('../../../assets/images/profile1 (1).png'), username: 'João', nickname: 'jotape', comfirmed: true },
        { event_id: 2, image: require('../../../assets/images/profile2 (1).png'), username: 'Gabriel', nickname: 'gabs', comfirmed: true },
        { event_id: 3, image: require('../../../assets/images/profile3 (1).png'), username: 'Rodrigo', nickname: 'digos', comfirmed: false }
    ]

    useEffect(() => {
        async function fetchAllConfirmedUsers() {
            const idToken = (await AsyncStorage.getItem('idToken')) || ''
            if (idToken === '') return;
            const response = await getAllConfirmedUsers(idToken);
            if (response) {
                setUsers(response.users);
            }
        }
        fetchAllConfirmedUsers();
    }, [])


    return (
        <>
            <Modal
                transparent={true}
                visible={visible}
                animationType="slide"
                onRequestClose={onClose}
            >
                <View className="flex-1 justify-end items-center bg-black/70">
                    <View className="flex-end bg-background rounded-t-[40px] p-3 h-[89%] w-full">
                        <View className="flex-row items-center justify-center pt-[15px]">
                            <TouchableOpacity className="rounded-full bg-button_color mr-5 absolute left-[10px] top-[12px]" onPress={onClose}>
                                <Ionicons name="arrow-back" size={22} color='#fff' className="p-2" />
                            </TouchableOpacity>
                            <View className="flex justify-center items-center ">
                                <Text className="text-2xl text-white">
                                    Lista de Confirmados
                                </Text>
                            </View>
                        </View>
                        <ScrollView className="w-full mt-8">
                            {comfirmed.map((user) => (
                                <View className="w-full bg-button_color mt-5 rounded-full" key={user.event_id}>
                                    <View
                                        className="w-full flex-row items-center justify-between rounded-full p-2"
                                    >
                                        <Image
                                            source={user.image}
                                            className={`w-16 h-16 rounded-full mr-4 ${user.comfirmed ? 'border-2 border-green-500' : ''}`}
                                            resizeMode="cover"
                                        />
                                        <View className="flex-1">
                                            <Text className="text-white font-bold text-xl">
                                                {user.username}
                                            </Text>
                                            <Text className="text-gray-400 text-md">
                                                @{user.nickname}
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