import { Ionicons } from "@expo/vector-icons";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface ModalReviewProps {
    visible: boolean;
    onClose: () => void;
    eventId: string;
}

export default function ModalReviewList({ visible, onClose, eventId }: ModalReviewProps) {
    return (
        <>
            <Modal
                transparent={true}
                visible={visible}
                animationType="slide"
                onRequestClose={onClose}
            >
                <View className="flex-1 justify-end items-center bg-black/70">
                    <View className="flex-end bg-background rounded-t-[50px] p-3 h-[695px] w-full">
                    <View className="flex-row items-center justify-center pt-[15px]">
                            <TouchableOpacity className="rounded-full bg-button_color mr-5 absolute left-[10px] top-[12px]" onPress={onClose}>
                                <Ionicons name="arrow-back" size={22} color='#fff' className="p-2" />
                            </TouchableOpacity>
                            <View className="flex justify-center items-center ">
                                <Text className="text-2xl text-white">
                                    Reviews
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}