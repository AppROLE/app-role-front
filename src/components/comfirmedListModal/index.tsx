import { Presence } from "@/api/types/presence_dto";
import { ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import { Keyboard, Modal, Text, TouchableOpacity, View, Image } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { PresenceContext } from "@/context/presence_context";
import { AuthContext } from "@/context/auth_context";
import { Friends } from "@/api/types/auth_dto";

interface ModalReviewProps {
    visible: boolean;
    onClose: () => void;
}

export default function ComfirmedListModal({ visible, onClose }: ModalReviewProps) {
    const [presence, setPresence] = useState<(Presence & {profilePhoto?: ImageSourcePropType})[]>([]);
    const [friends, setFriends] = useState<(Friends)[]>([]);
    const { getAllPresence} = useContext(PresenceContext);  
    const { getFriends } = useContext(AuthContext);

    // const comfirmed = [
    //     { event_id: 1, iamge: require('../../../assets/images/profile1 (1).png'), username: 'João', nickname: 'jotape', comfirmed: true },
    //     { event_id: 2, image: require('../../../assets/images/profile2 (1).png'), username: 'Gabriel', nickname: 'gabs', comfirmed: true },
    //     { event_id: 3, image: require('../../../assets/images/profile3 (1).png'), username: 'Rodrigo', nickname: 'digos', comfirmed: false }
    // ]

    async function get() {
        const idToken = (await AsyncStorage.getItem('idToken')) || ''
        if (idToken === '') return;
        const response = await getFriends(idToken);
        if (response) {
            setFriends(response.friends);
        } 
    }

    async function fetchAllConfirmedUsers() {
        const idToken = (await AsyncStorage.getItem('idToken')) || ''
        if (idToken === '') return;
        const eventId = (await AsyncStorage.getItem('eventId')) || ''
        if (eventId === '') return;

        const response = await getAllPresence(idToken, eventId);
        if (response) {
            setPresence(response.users);
        }
    }

    useEffect(() => {
        fetchAllConfirmedUsers();
        get();
    }, [])

    const confirmeds = presence.map(user => {
        const isFriend = friends.some(friend => friend.username === user.username);

        return {
            ...user,
            isFriend,
        };
    });

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
                            {confirmeds.map((user) => (
                                <View className="w-full bg-button_color mt-5 rounded-full" key={user.event_id}>
                                    <View
                                        className="w-full flex-row items-center justify-between rounded-full p-2"
                                    >
                                        <Image
                                            source={user.profilePhoto as ImageSourcePropType}
                                            className={`w-16 h-16 rounded-full mr-4 ${user.isFriend ? 'border-2 border-green-500' : ''}`}
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