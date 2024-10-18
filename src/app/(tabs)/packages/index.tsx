import { getInstituteByPartnerTypeResponseDTO, Institute } from "@/api/types/institute_dto";
import { InstituteContext } from "@/context/institute_context";
import Background from "@/src/components/background";
import RoleMainButton from "@/src/components/roleMainButton";
import AnimatedOption from "@/src/components/selectedCard";
import { FontAwesome6 } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";
import { Animated, Image, KeyboardAvoidingView, Linking, Platform, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";



export default function Packages() {
    const [selected, setSelected] = useState<number | null>(null);
    const [selectedCard, setSelectedCard] = useState<string | number | null>(null);

    const { getAllInstitutesByPartnerType } = useContext(InstituteContext);

    const [institutes, setInstitutes] = useState<Institute[]>([]);
    
    const [date, setDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState('DD/MM/YYYY')
    const [dateSelected, setDateSelected] = useState(false)
    const [showPicker, setShowPicker] = useState(false)

    const data = [
        { id: 1, imageSource: require('@/assets/images/aniversarios.png'), grayImageSource: require('@/assets/images/aniversarioGray.png'), label: 'Aniversário' },
        { id: 2, imageSource: require('@/assets/images/combin.png'), grayImageSource: require('@/assets/images/comboGray.png'), label: 'Combos' },
        { id: 3, imageSource: require('@/assets/images/camarotees.png'), grayImageSource: require('@/assets/images/camaroteGray.png'), label: 'Camarotes' }
        // Adicione mais objetos conforme necessário
    ];

    const partnerType = "PROMOTER_PARTNER"


    const handleSelect = (id: number) => {
        setSelected(prevSelected => (prevSelected === id ? null : id));
    };

    const handleSelectCard = (id: string) => {
        setSelectedCard(prevSelectedCard => (prevSelectedCard === id ? null : id));
    }

    const handleWhatsAppRedirect = () => {
        if (selectedCard !== null) {
            const selectedPhoneNumber = institutes.find(institute => institute.instituteId === selectedCard)?.phone;
            if (selectedPhoneNumber) {
                const url = `https://wa.me/${selectedPhoneNumber.replace(/[^0-9]/g, '')}`;
                Linking.openURL(url);
            }
        }
    };

    async function getInstitutes() {
        const response = await getAllInstitutesByPartnerType(partnerType);
        console.log("RESPOSTA DA GET ALL", response)
        if (response) {
            const data = response as getInstituteByPartnerTypeResponseDTO
            setInstitutes(data.institutes)
        }
    }

    function handleClosePicker() {
        setShowPicker(false)
    }

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || date
        setShowPicker(false)
        setDate(currentDate)

        const day = String(currentDate.getDate()).padStart(2, '0')
        const month = String(currentDate.getMonth() + 1).padStart(2, '0')
        const year = currentDate.getFullYear()

        setFormattedDate(`${day}/${month}/${year}`)
        setDateSelected(true)
    }

    useEffect(() => {
        getInstitutes();
    }, []);

    return (
        <Background scrollable2 >
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <SafeAreaView className="flex-1 justify-center items-center">
                    <ScrollView className="flex-1 w-[100%]" contentContainerStyle={{ paddingBottom: 90 }}>
                        <View className="w-full pl-6">
                            <Text className="text-2xl text-white">Selecione</Text>
                        </View>
                        <View className="px-5 flex-row justify-between gap-3 mt-5">
                            {data.map(item => (
                                <TouchableOpacity onPress={() => handleSelect(item.id)} className="h-[20%]">
                                    <View key={item.id} className="flex gap-2 items-center">
                                        <View className={`flex items-center p-2 bg-button_color rounded-xl w-32 h-[190px]`}>
                                            <Image source={selected === item.id ? item.imageSource : item.grayImageSource} className={` h-[175px] w-28 `} />
                                        </View>
                                        {selected === item.id ? (
                                            <View className="rounded-full mt-3">
                                                <Pressable onPress={() => handleSelect(item.id)}>
                                                    <LinearGradient
                                                        key={item.id}
                                                        colors={["#5A189A", "#9C4EDC"]}
                                                        style={{ borderRadius: 999, padding: 0.5 }}
                                                    >
                                                        <View className="rounded-full">
                                                            <Text className="text-lg text-center px-4 py-1 text-white">
                                                                {item.label}
                                                            </Text>
                                                        </View>
                                                    </LinearGradient>
                                                </Pressable>
                                            </View>
                                        ) : (
                                            <View className="bg-button_color mt-3 rounded-full">
                                                <Text className="text-lg text-center px-4 py-1 text-white">
                                                    {item.label}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View className="w-full mt-10 pl-6">
                            <Text className="text-2xl text-white">Estabelecimento</Text>
                        </View>
                        <ScrollView className="w-full flex flex-1 mt-5 ">
                            <View className="flex flex-wrap flex-row justify-start pl-5">
                                {institutes.map((institute: Institute) => (
                                    <TouchableOpacity className="flex h-[76px]" onPress={() => handleSelectCard(institute.instituteId)}>
                                        {selectedCard?.toString() === institute.instituteId ? (
                                            <View
                                                className="flex-row  bg-button_color m-2 h-[75%] justify-center items-center rounded-full"
                                            >
                                                <Pressable onPress={() => handleSelectCard(institute.instituteId)}>
                                                    <LinearGradient
                                                        key={institute.instituteId}
                                                        colors={["#5A189A", "#9C4EDC"]}
                                                        style={{ borderRadius: 999, flexDirection: 'row', alignItems: 'center', height: '100%', width: 157 }}
                                                    >
                                                        <View className="mx-1">
                                                            <Image source={institute.logoPhoto ? { uri: institute.logoPhoto } : { uri: process.env.EXPO_PUBLIC_URL_S3 + "/images/profile_default.png" }} />
                                                        </View>
                                                        <Text className="text-white text-center text-lg mx-3">{institute.name}</Text>
                                                    </LinearGradient>
                                                </Pressable>
                                            </View>
                                        ) : (
                                            <View
                                                key={institute.instituteId}
                                                className="flex-row w-[157px] bg-button_color m-2 h-[75%] justify-center items-center rounded-full"
                                            >
                                                <View className="mx-1">
                                                    <Image source={institute.logoPhoto ? { uri: institute.logoPhoto } : { uri: process.env.EXPO_PUBLIC_URL_S3 + "/images/profile_default.png" }} />
                                                </View>
                                                <Text className="text-white text-center text-lg mx-3">{institute.name}</Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                        <View className="w-full mt-5 pl-6">
                            <Text className="text-2xl text-white">Data</Text>
                        </View>
                        <View
                            className={` mb-8 flex flex-col gap-2  pb-2 pt-5`}
                        >
                            <View className="mx-2 mt-2 flex flex-row flex-wrap">
                                <AnimatedOption
                                    label={formattedDate}
                                    selected={dateSelected}
                                    onPress={() => setShowPicker(true)}
                                />
                            </View>
                        </View>
                        <View className="w-[100%] px-4 mt-10">
                            <RoleMainButton type="gradient" buttonFunction={handleWhatsAppRedirect} >
                                <View className="flex flex-row items-center gap-3">
                                    <FontAwesome6 name="whatsapp" size={24} color="white" />
                                    <Text className="text-white">Fale com o estabelecimento</Text>
                                </View>
                            </RoleMainButton>
                        </View>
                    </ScrollView>
                    {showPicker && (
                        <View className="absolute inset-0 flex z-50 bg-transparent mt-20 w-[100vw] p-5">
                            <View className="relative flex justify-center items-center bg-black rounded-3xl">
                                <View className="w-[90%] flex p-4 rounded-lg mx-auto">
                                    <DateTimePicker
                                        value={date}
                                        mode="date"
                                        display="inline"
                                        accentColor="#9C4EDC"
                                        themeVariant='dark'
                                        minimumDate={new Date()}
                                        onChange={handleDateChange}
                                    />
                                    <TouchableOpacity
                                        onPress={handleClosePicker}
                                        className="mt-4 p-2 bg-[#1C1C1C] rounded-full items-center justify-center"
                                    >
                                        <Text className="text-white">Fechar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                </SafeAreaView>
            </KeyboardAvoidingView>
        </Background >
    )
}