import { getAllInstituteByIdResponseDTO, Institute } from "@/api/types/institute_dto";
import { InstituteContext } from "@/context/institute_context";
import Background from "@/src/components/background";
import RoleMainButton from "@/src/components/roleMainButton";
import { FontAwesome6 } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";
import { Animated, Image, KeyboardAvoidingView, Linking, Platform, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";



export default function Packages() {
    const [selected, setSelected] = useState<number | null>(null);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [date, setDate] = useState('');
    const [isDateFocused, setIsDateFocused] = useState(false);
    const { getAllInstitutesByPartnerType } = useContext(InstituteContext);
    const [institutes, setInstitutes] = useState<Institute[]>([]);

    const data = [
        { id: 1, imageSource: require('@/assets/images/aniversarios.png'), grayImageSource: require('@/assets/images/aniversarioGray.png'), label: 'Aniversário' },
        { id: 2, imageSource: require('@/assets/images/combin.png'), grayImageSource: require('@/assets/images/comboGray.png'), label: 'Combos' },
        { id: 3, imageSource: require('@/assets/images/camarotees.png'), grayImageSource: require('@/assets/images/camaroteGray.png'), label: 'Camarotes' }
        // Adicione mais objetos conforme necessário
    ];

    const handleSelect = (id: number) => {
        setSelected(prevSelected => (prevSelected === id ? null : id));
    };

    const handleSelectCard = (id: number) => {
        setSelectedCard(prevSelectedCard => (prevSelectedCard === id ? null : id));
    }

    const cards = [
        { id: 1, image: require('@/assets/images/galeria.png'), title: 'Galleria Bar', phoneNumber: '+5511987654321' },
        { id: 2, image: require('@/assets/images/galeria.png'), title: 'Galleria Bar 2', phoneNumber: '+5511987654322' },
        { id: 3, image: require('@/assets/images/galeria.png'), title: 'Galleria Bar 3', phoneNumber: '+5511987654323' },
        { id: 4, image: require('@/assets/images/galeria.png'), title: 'Galleria Bar 4', phoneNumber: '+5511987654324' },
        { id: 5, image: require('@/assets/images/galeria.png'), title: 'Galleria Bar 5', phoneNumber: '+5511987654325' },
        { id: 6, image: require('@/assets/images/galeria.png'), title: 'Galleria Bar 6', phoneNumber: '+5511987654326' },
        { id: 7, image: require('@/assets/images/galeria.png'), title: 'Galleria Bar 7', phoneNumber: '+5511987654327' }
    ];

    const handleDateChange = (input: string) => {
        // Remove tudo que não seja número
        let cleanInput = input.replace(/[^0-9]/g, '');

        // Formatação de acordo com o padrão "DD / MM / AAAA"
        if (cleanInput.length <= 2) {
            cleanInput = cleanInput;
        } else if (cleanInput.length <= 4) {
            cleanInput = `${cleanInput.slice(0, 2)} / ${cleanInput.slice(2)}`;
        } else if (cleanInput.length <= 8) {
            cleanInput = `${cleanInput.slice(0, 2)} / ${cleanInput.slice(2, 4)} / ${cleanInput.slice(4)}`;
        }

        setDate(cleanInput);
    };

  
    const handleWhatsAppRedirect = () => {
        if (selectedCard !== null) {
            const selectedPhoneNumber = cards.find(card => card.id === selectedCard)?.phoneNumber;
            if (selectedPhoneNumber) {
                const url = `https://wa.me/${selectedPhoneNumber.replace(/[^0-9]/g, '')}`;
                Linking.openURL(url);
            }
        }
    };

    useEffect(() => { 
        async function getInstitutes() { 
            const idToken = (await AsyncStorage.getItem('idToken')) || ''
            const response = getAllInstitutesByPartnerType(idToken)
            response.then((res : any) => {
                setInstitutes(res.institutes)
                console.log(res.institutes)
            }).catch((error) => {
                console.log("error "+ error)
            })
        }
        getInstitutes();
    }, []);

    return (
        <Background>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}>
                <SafeAreaView className="flex-1 justify-center items-center">
                    <ScrollView className="flex-1 w-[80%] mx-14" contentContainerStyle={{ paddingBottom: 90 }}>
                        <View>
                            <Text className="text-3xl text-center text-white">Pacotes</Text>
                        </View>
                        <View className="w-full mt-5">
                            <View className="border border-['#2C2B2B'] w-full"></View>
                        </View>
                        <View className="w-full mt-10 ml-10">
                            <Text className="text-2xl text-white">Selecione:</Text>
                        </View>
                        <View className="mx-10 flex-row justify-between gap-3 mt-5">
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
                        <View className="w-full mt-10 ml-10">
                            <Text className="text-2xl text-white">Estabelecimento</Text>
                        </View>
                        <ScrollView className="w-full flex flex-1 mt-5 ">
                            <View className="flex flex-wrap flex-row justify-start ml-10">
                                {institutes.map((institute : Institute) => (
                                    <TouchableOpacity className="flex h-[76px]" onPress={() => handleSelectCard(institute.id)}>
                                        {selectedCard === institute.id ? (
                                            <View
                                                className="flex-row  bg-button_color m-2 h-[75%] justify-center items-center rounded-full"
                                            >
                                                <Pressable onPress={() => handleSelectCard(institute.id)}>
                                                    <LinearGradient
                                                        key={institute.id}
                                                        colors={["#5A189A", "#9C4EDC"]}
                                                        style={{ borderRadius: 999, flexDirection: 'row', alignItems: 'center', height: '100%', width: 157 }}
                                                    >
                                                        <View className="mx-1">
                                                            <Image source={institute.image} />
                                                        </View>
                                                        <Text className="text-white text-center text-lg mx-3">{institute.title}</Text>
                                                    </LinearGradient>
                                                </Pressable>
                                            </View>
                                        ) : (
                                            <View
                                                key={institute.id}
                                                className="flex-row w-[157px] bg-button_color m-2 h-[75%] justify-center items-center rounded-full"
                                            >
                                                <View className="mx-1">
                                                    <Image source={institute.image} />
                                                </View>
                                                <Text className="text-white text-center text-lg mx-3">{institute.title}</Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                        <View className="w-full mt-10 ml-10">
                            <Text className="text-2xl text-white">Data</Text>
                        </View>
                        <View className="mt-5 ml-10">
                            <LinearGradient
                                colors={isDateFocused || date ? ["#5A189A", "#9C4EDC"] : ["transparent", "transparent"]}
                                style={{ borderRadius: 8, padding: isDateFocused || date ? 1 : 0, width: 125 }}
                            >
                                <TextInput
                                    value={date}
                                    onChangeText={handleDateChange}
                                    placeholder="DD / MM / AAAA"
                                    placeholderTextColor="white"
                                    keyboardType="numeric"
                                    maxLength={14}
                                    onFocus={() => setIsDateFocused(true)}
                                    onBlur={() => setIsDateFocused(false)}
                                    className={`text-white text-center  py-2 px-4 rounded-md ${isDateFocused || date ? "bg-transparent" : "bg-[#2C2B2B]"}`}
                                />
                            </LinearGradient>
                        </View>
                        <View className="w-[85%] mx-10 mt-10">
                            <RoleMainButton type="gradient" >
                                <View className="flex flex-row items-center gap-3">
                                    <FontAwesome6 name="whatsapp" size={24} color="white" />
                                    <Text className="text-white">Fale com o estabelecimento</Text>
                                </View>
                            </RoleMainButton>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </Background >
    )
}