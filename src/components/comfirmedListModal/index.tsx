import { Presence } from "@/api/types/presence_dto";
import { ImageSourcePropType } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PresenceContext } from "@/context/presence_context";
import { UserContext } from "@/context/user_context";
import { Friends } from "@/api/types/user_dto";

interface ModalReviewProps {
    visible: boolean;
    onClose: () => void;
    // eventId: string;
}

export default function ComfirmedListModal({ visible, onClose }: ModalReviewProps) {
    const [presence, setPresence] = useState<(Presence & { profilePhoto?: ImageSourcePropType })[]>([]);
    const [friends, setFriends] = useState<(Friends)[]>([]);
    const [loading, setLoading] = useState(true);
    const { getAllPresence } = useContext(PresenceContext);
    const { getFriends } = useContext(UserContext);
    // Função para buscar amigos
    async function fetchFriends() {
        try {
            const response = await getFriends();
            if (response) {
                setFriends(response.friends || []); // Garantir que seja um array
            }
        } catch (error) {
            console.error("Erro ao buscar amigos: ", error);
        }
    }

    // Função para buscar usuários confirmados
    async function fetchAllConfirmedUsers() {
        try {
            const eventId = "d942a349-f74a-4d94-b591-ffb1fd143ad8";
            const response = await getAllPresence(eventId);
            console.log("RESPOSTA DA GET ALL PRECENSE", response)
            if (response) {
                setPresence(response.users); 
            }
        } catch (error) {
            console.error("Erro ao buscar presenças: ", error);
        }
    }

    // UseEffect para carregar dados
    useEffect(() => {
        async function fetchData() {
            await fetchFriends();
            await fetchAllConfirmedUsers();
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <Modal transparent={true} visible={visible} animationType="slide" onRequestClose={onClose}>
                <View className="flex-1 justify-center items-center bg-black/70">
                    <Text className="text-white text-xl">Carregando...</Text>
                </View>
            </Modal>
        );
    }

    // Mapeia usuários confirmados e verifica se são amigos
    const confirmeds = presence.map(user => {
        const isFriend = friends.some(friend => friend.username === user.username);
        return {
            ...user,
            isFriend,
        };
    });

    return (
        <Modal transparent={true} visible={visible} animationType="fade" onRequestClose={onClose}>
            <View className="flex-1 justify-end items-center bg-black/70">
                <View className="flex-end bg-background rounded-t-[50px] p-3 h-[695px] w-full">
                    <View className="flex-row items-center justify-center pt-[15px]">
                        <TouchableOpacity className="rounded-full bg-button_color mr-5 absolute left-[10px] top-[12px]" onPress={onClose}>
                            <Ionicons name="arrow-back" size={22} color='#fff' className="p-2" />
                        </TouchableOpacity>
                        <Text className="text-2xl text-white text-center font-nunitoBold">Lista de Confirmados</Text>
                    </View>
                    <ScrollView className="w-full mt-8">
                        {confirmeds.map((user) => (
                            <View className="w-full bg-button_color mt-5 rounded-full" key={user.event_id}>
                                <View className="w-full flex-row items-center justify-between rounded-full p-2">
                                    <Image
                                        source={user.profilePhoto as ImageSourcePropType}
                                        className={`w-16 h-16 rounded-full mr-4 ${user.isFriend ? 'border-2 border-green-500' : ''}`}
                                        resizeMode="cover"
                                    />
                                    <View className="flex-1">
                                        <Text className="text-white font-nunitoBold text-xl">{user.username}</Text>
                                        <Text className="text-gray-400 text-md font-nunito">@{user.nickname}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}