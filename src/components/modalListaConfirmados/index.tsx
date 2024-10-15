import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View, Image, ScrollView } from "react-native";

interface people {
    id: string;
    name: string;
    at: string;
    image: string;
    friends: boolean;
}

interface ModalReviewProps {
    visible: boolean;
    onClose: () => void;
    people: Array<people>;
}

export default function ModalListaConfirmados({ visible, onClose, people }: ModalReviewProps) {
    const [confirmedPeople, setConfirmedPeople] = useState(people);

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
                    <View className="flex-1 justify-end items-center bg-black/70">
                        <View className="flex-end bg-background rounded-t-3xl p-3 h-[85%] w-full">
                            <View className="flex-row flex items-center justify-center p-3">
                                <TouchableOpacity className="rounded-full bg-button_color mr-5 absolute left-[12px] top-[12px]" onPress={onClose}>
                                    <Ionicons name="arrow-back" size={24} color='#fff' className="p-2" />
                                </TouchableOpacity>
                                <Text className="text-3xl text-white">
                                    Lista de Confirmados
                                </Text>
                            </View>
                            <ScrollView>
                                {confirmedPeople.map((person, index) => (
                                    <View key={index} className="flex-row items-center p-2 gap-2 bg-[#1C1C1C] rounded-full w-full mb-4">
                                        <View className="flex-row items-center">
                                            <Image source={{ uri: person.image }} style={{ width: 50, height: 50, borderRadius: 50, borderColor: '#1CD14F', 
                                                borderWidth: person.friends ? 2 : 0 }} />
                                        </View>
                                        <View className="flex-col">
                                            <Text className="text-white text-xl font-bold">
                                                {person.name}
                                            </Text>
                                            <Text className="text-[#BEBEBE] text-sm">
                                                {person.at}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
        </Modal>
    )
}