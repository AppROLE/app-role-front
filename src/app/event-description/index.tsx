import { EventContext } from "@/context/event_context";
import { InstituteContext } from "@/context/institute_context";
import ModalListaConfirmados from "@/src/components/modalListaConfirmados";
import ModalReview from "@/src/components/modalReview";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { openURL } from "expo-linking";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState, useRef, useContext } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Animated, Easing } from "react-native";

export default function EventDescription(eventId: string) {
    // Interfaces
    interface Review {
        review: string;
        reviewedAt: string;
        star: number;
        username: string;
        name: string;
        photoUrl: string;
    }

    // States
    const [darkLight, setDarkLight] = useState(false);
    const [price, setPrice] = useState('');
    const [blanckPrice, setBlanckPrice] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionHeight, setDescriptionHeight] = useState(false);
    const [features, setFeatures] = useState<string[]>([]);
    const [gallery, setGallery] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalList, setModalList] = useState(false);
    const stars = [1, 2, 3, 4, 5];
    const [reviews, setReviews] = useState<Review[]>([]);
    const [showAllReviews, setShowAllReviews] = useState(false)
    const [selectedImagePosition, setSelectedImagePosition] = useState(0)
    const [openGalletyModal, setOpenGalleryModal] = useState(false)
    const [imageSize, setImageSize] = useState(true)
    const animatedHeight = useRef(new Animated.Value(40)).current;
    const [typePartner, setTypePartner] = useState('global');
    const [bannerUrl, setBannerUrl] = useState('https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png');
    const [confirmedPeople, setConfirmedPeople] = useState([
        {
            id: 1,
            name: 'Isabella',
            at: '@isa.saab',
            image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png',
            friends: true,
        },
        {
            id: 2,
            name: 'Gabriel Marola',
            at: '@merolinhaG',
            image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png',
            friends: true,
        },
        {
            id: 3,
            name: 'Yurão',
            at: '@yurinho.aabb',
            image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png',
            friends: false,
        },
        {
            id: 4,
            name: 'Izaque',
            at: '@izaq.vine',
            image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png',
            friends: true,
        }
    ]);
    const [packagesImages, setPackagesImages] = useState([
        { name: 'COMBO', image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png' },
        { name: 'ANIVERSARIO', image: 'https://placehold.co/600x400' },
        { name: 'CAMAROTE', image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png' },
    ]);
    const [packages, setPackages] = useState<string[]>([]);
    const [buttonCondition, setButtonCondition] = useState(true);
    const [roleStars, setRoleStars] = useState(0);
    const [musicsTypes, setMusicsTypes] = useState<string[]>([]);
    const [category, setCategory] = useState('');
    const [ageRange, setAgeRange] = useState('');
    const [date, setDate] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [hour, setHour] = useState('');
    const [address, setAddress] = useState('');
    const [menuLink, setMenuLink] = useState('');
    const [logo_photo, setLogoPhoto] = useState('');
    const gradientColors = buttonCondition
        ? ['rgba(90, 24, 154, 0.25)', 'rgba(156, 78, 220, 0.25)'] // Cores do gradiente com brilho reduzido
        : ['#5A189A', '#9C4EDC']; // Cores normais do gradiente

    const { getEventById } = useContext(EventContext);
    const { getReviewsEventById } = useContext(EventContext);
    const { getById } = useContext(InstituteContext);

    function priceDesign(value: number) {
        const tempPrice = '$'.repeat(value);
        const tempBlanckPrice = '$'.repeat(5 - value);
        setPrice(tempPrice);
        setBlanckPrice(tempBlanckPrice);
    }

    function handleScrollImages(side: 'left' | 'right') {
        if (side === 'left') {
            if (selectedImagePosition === 0) return;
            setSelectedImagePosition(selectedImagePosition - 1);
        } else {
            if (selectedImagePosition === gallery.length - 1) return;
            setSelectedImagePosition(selectedImagePosition + 1);
        }
    }

    function handleScrollScreen(event: any) {
        if (event.nativeEvent.contentOffset.y > 10) {
            setImageSize(false);
        } else {
            setImageSize(true);
        }
    }

    async function getInfosEvent() {
        const id = await AsyncStorage.getItem('eventId');
        if (id) {
            const response = await getEventById(id);
            // console.log(response);
            if (response) {
                priceDesign(response.price);
                setMusicsTypes(response.musicType ?? []);
                setCategory(response.category ?? '');
                setAgeRange(response.ageRange ?? '');

                let dateR = new Date(response.eventDate).toISOString().split('T')[0];
                let dateD = dateR.split('-')[2];
                let mouth = dateR.split('-')[1];
                switch (mouth) {
                    case '01': mouth = 'JAN'; break;
                    case '02': mouth = 'FEV'; break;
                    case '03': mouth = 'MAR'; break;
                    case '04': mouth = 'ABR'; break;
                    case '05': mouth = 'MAI'; break;
                    case '06': mouth = 'JUN'; break;
                    case '07': mouth = 'JUL'; break;
                    case '08': mouth = 'AGO'; break;
                    case '09': mouth = 'SET'; break;
                    case '10': mouth = 'OUT'; break;
                    case '11': mouth = 'NOV'; break;
                    case '12': mouth = 'DEZ'; break;
                }
                setDate(`${dateD} ${mouth}`);
                let hourR = new Date(response.eventDate).toISOString().split('T')[1].split('.')[0];
                setHour(hourR.split(':')[0] + ':' + hourR.split(':')[1]);

                const weekDayR = new Date(response.eventDate).getUTCDay();
                // console.log('Dia: ' + weekDayR);
                let days = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
                setWeekDay(days[weekDayR]);

                setDescription(response.description);
                setGallery(response.galeryLink ?? []);
                setBannerUrl(response.bannerUrl ?? 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png');
                setAddress(response.address);
                setMenuLink(response.menuLink ?? '');
                setFeatures(response.features);
                setRoleStars(response.rating ?? 0);
                setPackages(response.packageType ?? []);
                setReviews(response.reviews ?? []);
            }
        } else {
            router.push('/home');
        }
    }

    async function getInstituteEvent() {
        const response = await getById('2f3073ac-3633-4fc7-9cfe-c2084399bbc3');
        // console.log(response);
        if (response) {
            setTypePartner(response.partner_type);
            if (response.partner_type === 'PROMOTER_PARTNER' || response.partner_type === 'GLOBAL_PARTNER') {
                setButtonCondition(false);
            }
            if (response.logo_photo === '') {
                setLogoPhoto('https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png');
            } else {
                setLogoPhoto(response.logo_photo ?? 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png');
            }
        }
    }

    useEffect(() => {
        getInfosEvent();
    }, []);

    useEffect(() => {
        getInstituteEvent();
    }, []);

    useEffect(() => {
        if (!modalVisible){
            getInfosEvent();
        }
    }, [modalVisible]);

    useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: imageSize ? 40 : 16, // Muda entre 40% e 16% de altura
            duration: 300, // Duração da animação em milissegundos
            useNativeDriver: false,
            easing: imageSize
                ? Easing.out(Easing.ease) // Ease-out quando aumenta
                : Easing.in(Easing.ease), // Ease-in quando diminui
        }).start();
    }, [imageSize]);

    return (
        <View className="bg-background w-full h-full flex-1">
            {/* Image */}
            <Animated.View
                style={{
                    height: animatedHeight.interpolate({
                        inputRange: [16, 40],
                        outputRange: ['16%', '40%'], // Ajusta a altura proporcional corretamente
                    }),
                }}
                className="w-full rounded-b-[45px] bg-blue-500"
            >
                <Image
                    source={{
                        uri: bannerUrl ? bannerUrl : 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png',
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderBottomLeftRadius: 45,
                        borderBottomRightRadius: 45,
                    }}
                />
                <TouchableOpacity className="w-12 h-12 bg-black flex justify-center items-center rounded-full absolute top-20 left-8"
                    onPress={async () => {
                            await AsyncStorage.removeItem('eventId')
                            router.push('/home')
                        }
                    }>
                    <FontAwesome name="arrow-left" size={32} color="white" />
                </TouchableOpacity>
                <View className="w-11/12 h-16 mx-auto bg-black mt-auto rounded-full flex flex-row items-center p-2 gap-4 mb-4">
                    <View className="w-12 h-12 rounded-full">
                        <Image
                            source={{
                                uri: logo_photo ? logo_photo : 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png',
                            }}
                            style={{ width: '100%', height: '100%', borderRadius: 9999 }}
                        />
                    </View>
                    <View>
                        <Text className="text-white text-2xl">Mahau Bar</Text>
                    </View>
                    <View className="ms-auto me-4">
                        <FontAwesome name="upload" size={24} color="white" />
                    </View>
                </View>
            </Animated.View>
            {/* Content */}
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="p-8" onScroll={handleScrollScreen}>
                {/* Details */}
                <View className="flex flex-row justify-between">
                    <View className="flex flex-col gap-2 w-1/2">
                        <View>
                            <Text className="text-white text-2xl font-bold">Detalhes</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center bg-[#1C1C1C] rounded-full px-2 py-1 self-start">
                            <FontAwesome name="question" size={20} color="white" />
                            <Text className="text-[#BDBDBD] text-base">{category}</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center bg-[#1C1C1C] rounded-full px-2 py-1 self-start">
                            <FontAwesome name="question" size={20} color="white" />
                            <Text className="text-[#BDBDBD] text-base">
                                <Text className="text-purple-500">{price}</Text>
                                {blanckPrice}
                            </Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center w-full flex-wrap rounded-full self-start">
                            {musicsTypes ? musicsTypes.map((type, index) => (
                                <View key={`viewtype-${type}-${index}`} className="flex flex-row gap-2 items-center bg-[#1C1C1C] rounded-full px-2 py-1 self-start">
                                    <FontAwesome name="question" size={20} color="white" />
                                    <Text className="text-[#BDBDBD] text-base">{type}</Text>
                                </View>
                            )) : (
                                <View key={`viewtype-`} className="flex flex-row gap-2 items-center bg-[#1C1C1C] rounded-full px-2 py-1 self-start">
                                    <FontAwesome name="question" size={20} color="white" />
                                    <Text className="text-[#BDBDBD] text-base">Não Definido</Text>
                                </View>
                            )}
                        </View>
                        <View className="flex flex-row gap-2 items-center bg-[#1C1C1C] rounded-full px-2 py-1 self-start">
                            <FontAwesome name="star" size={20} color="white" />
                            <Text className="text-[#BDBDBD] text-base">{roleStars}</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center bg-[#1C1C1C] rounded-full px-2 py-1 self-start">
                            <FontAwesome name="question" size={20} color="white" />
                            <Text className="text-[#BDBDBD] text-base">{ageRange}</Text>
                        </View>
                    </View>
                    <View className="flex flex-col gap-4 w-1/2 items-end">
                        {typePartner === 'PROMOTER_PARTNER' || typePartner === 'GLOBAL_PARTNER' && (
                            <View className="w-36 rounded-xl items-center justify-center flex flex-row">
                                {confirmedPeople.length <= 3 ? (
                                    confirmedPeople.slice(0, 3).map((person, index) => (
                                        <>
                                            <TouchableOpacity key={`viewperson-${person.id}-${index}`} className="w-12 h-12 rounded-full flex flex-row"  onPress={() => setModalList(true)}>
                                                <Image source={{ uri: person.image }} style={{ width: '100%', height: '100%', borderRadius: 9999 }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setModalList(true)}>
                                                <Text className="text-purple-500 text-lg">Lista de confirmados</Text>
                                            </TouchableOpacity>
                                        </>
                                    ))
                                )
                                :
                                (
                                    <View className="flex flex-col">
                                        <View className="flex flex-row items-center">
                                            {confirmedPeople.slice(0, 3).map((person, index) => (
                                                <TouchableOpacity key={`viewperson-${person.id}-${index}`} style={{zIndex: confirmedPeople.length - index}}
                                                    className={`w-12 h-12 rounded-full flex flex-row ${index > 0 && 'ml-[-12]'}`}
                                                    onPress={() => setModalList(true)}>
                                                    <Image source={{ uri: person.image }} style={{ width: '100%', height: '100%', borderRadius: 9999, borderColor: '#000', borderWidth: 3 }} />
                                                </TouchableOpacity>
                                            ))}
                                            <TouchableOpacity className="w-4 h-4 rounded-full flex justify-center items-center bg-[#1D1D1D]" onPress={() => setModalList(true)}>
                                                <Text className="text-white text-xs" style={{lineHeight: 12}}>+</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity onPress={() => setModalList(true)}>
                                            <Text className="text-purple-500 text-sm">Lista de confirmados</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        )}
                        <View className="w-36 py-3 bg-[#1C1C1C] rounded-xl items-center">
                            <View className="flex flex-row gap-2">
                                <FontAwesome name="calendar" size={24} color="white" />
                                <Text className="text-white text-lg">{date}</Text>
                            </View>
                            <View>
                                <Text className="text-white text-lg">{weekDay}</Text>
                            </View>
                        </View>
                        <View className="flex flex-row gap-2 bg-[#1C1C1C] justify-center w-36 py-3 rounded-xl">
                            <FontAwesome name="clock-o" size={24} color="white" />
                            <Text className="text-white text-lg">{hour}</Text>
                        </View>
                    </View>
                    <ModalListaConfirmados
                        visible={modalList}
                        onClose={() => setModalList(false)}
                        people={confirmedPeople}
                    />
                </View>
                {/* Description */}
                <View>
                    <Text className="text-white text-2xl font-bold mt-8">Descrição</Text>
                    <Text className={`text-white text-base mt-2 ${descriptionHeight ? '' : 'max-h-[200px]'}`}>
                        {description}
                    </Text>
                    {description.length > 200 && (
                        <TouchableOpacity className="mt-4" onPress={() => setDescriptionHeight(!descriptionHeight)}>
                            <Text className="text-purple-500 text-base text-center">{descriptionHeight ? 'Ler menos' : 'Ler mais'}</Text>
                        </TouchableOpacity>
                    )}
                </View>
                {/* Adress */}
                <View className="mt-8">
                    <Text className="text-white text-2xl font-bold">Endereço</Text>
                    <View className="flex flex-row gap-2 mt-2">
                        <></>
                    </View>
                    <Text className="text-white text-base">{address}</Text>
                </View>
                {/* Features */}
                <View className="mt-8">
                    <Text className="text-white text-2xl font-bold">Features</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 16, marginTop: 8}}>
                        {features.map((type, index) => (
                            <View key={`viewtype-${type}-${index}`} className="mx-2">
                                <View className="bg-[#1C1C1C] rounded-xl px-2 py-1 flex flex-col gap-2 items-center min-w-32">
                                    <FontAwesome name={type == 'ESTACIONAMENTO' ? 'question' :
                                                        type == 'FUMODROMO' ? 'question' :
                                                        type == 'VALET' ? 'question' :
                                                        type == 'AREA_ABERTA' ? 'question' :
                                                        type == 'WELCOME SHOT' ? 'question' :
                                                        type == 'MESAS' ? 'question' :
                                                        type == 'OPEN_BAR' ? 'question' :
                                                        type == 'A0_VIVO' ? 'question' :
                                                        type == 'ESQUENTA' ? 'question' :
                                                        type == 'AFTER' ? 'question' : 'question'
                                    } 
                                    size={20} color="purple" />
                                    <Text className="text-purple-500 text-base">{type}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                {/* Menu */}
                <View className="mt-8">
                    <Text className="text-white text-2xl font-bold mb-2">Cardápio</Text>
                    <TouchableOpacity className="flex flex-row bg-[#1C1C1C] items-center justify-center gap-2 py-2 rounded-lg" onPress={() => {
                        openURL(menuLink)
                    }}>
                        <Text className="text-[#BDBDBD] text-lg mt-2" style={{lineHeight: 16}}>Acesse o cadápio digital</Text>
                        <FontAwesome name="question" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                {/* Packages */}
                {typePartner === 'GLOBAL_PARTNER' && (
                    <View className="mt-8">
                        <Text className="text-white text-2xl font-bold mb-2">Pacotes</Text>
                        <View className="flex flex-row gap-2">
                            {packages.map((packageE, index) => (
                                <TouchableOpacity key={`viewpackage-${index}`} className="w-[32%] h-20 bg-[#1C1C1C] rounded-xl">
                                    <Image 
                                        source={{ uri: packagesImages.map((image) => image.name).includes(packageE) ? packagesImages.find((image) => image.name === packageE).image : 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png' }} 
                                        className="w-full h-full rounded-xl" 
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>                            
                            ))}
                        </View>
                        <TouchableOpacity className="flex flex-row bg-[#1C1C1C] items-center justify-center gap-2 py-2 rounded-lg mt-3">
                            <Text className="text-[#BDBDBD] text-lg mt-2" style={{lineHeight: 16}}>Ver pacotes</Text>
                            <FontAwesome name="question" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
                {/* Gallery */}
                <View className="mt-8">
                    <Text className="text-white text-2xl font-bold mb-2">Galeria</Text>
                    <View className="mt-2 flex flex-row gap-2">
                        {gallery.length === 0 ? (
                            <Text className="text-white text-base">Nenhuma imagem disponível</Text>
                        ) : gallery.length < 5 ? (
                            gallery.map((image, index) => (
                                <TouchableOpacity key={`viewimage-${image.id}-${index}`} className="w-[5.6em] h-36 bg-[#1C1C1C] rounded-xl"
                                    onPress={() => {
                                        setSelectedImagePosition(index)
                                        setOpenGalleryModal(true)
                                    }}>
                                    <Image source={{ uri: image.image }} className="w-full h-36 object-cover rounded-xl" />
                                </TouchableOpacity>
                            ))
                        ) : (
                            <>
                            {gallery.slice(0, 3).map((image, index) => (
                                <TouchableOpacity key={`viewimage-${image.id}-${index}`} className="w-[5.6em] h-36 bg-[#1C1C1C] rounded-xl"
                                    onPress={() => {
                                        setSelectedImagePosition(index)
                                        setOpenGalleryModal(true)
                                    }}>
                                    <Image source={{ uri: image.image }} className="w-full h-36 object-cover rounded-xl" />
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity className="w-[5.6em] h-36 bg-[#1C1C1C] rounded-xl flex justify-end pb-4"
                                onPress={() => {
                                    setSelectedImagePosition(3)
                                    setOpenGalleryModal(true)
                                }}>
                                <Text className="text-white text-2xl text-center">+{gallery.length - 3}</Text>
                            </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
                {/* Review */}
                <View>
                    <Text className="text-white text-2xl font-bold mt-8">Reviews</Text>
                    <View>
                        { reviews.length === 0 ? (
                            <Text className="text-white text-base text-center mt-2">Nenhuma avaliação disponível</Text>
                        ) :
                        showAllReviews ? (
                            reviews.map((review, index) => (
                                <View key={`viewreview-${review['name']}-${index}`} className="flex flex-col gap-2 mt-4 bg-[#1C1C1C] p-4 rounded-xl">
                                    <View className="flex flex-row">
                                        <View className="flex flex-row w-3/5 gap-2">
                                            <View className="w-12 h-12 rounded-full flex flex-row">
                                                <Image source={{ uri: review['photoUrl'] }} style={{ width: '100%', height: '100%', borderRadius: 9999 }} />
                                            </View>
                                            <View className="h-full flex flex-col">
                                                <Text className="text-white text-lg font-bold" style={{lineHeight: 18}}>{review['name']}</Text>
                                                <Text className="text-[#BDBDBD] text-sm" style={{lineHeight: 14}}>@{review['username']}</Text>
                                            </View>
                                        </View>
                                        <View className="flex flex-row gap-1 items-start w-2/5 justify-end">
                                            {Array.from({ length: review['star'] ?? 0 }).map((_, i) => (
                                                <Ionicons
                                                    name='star'
                                                    size={16}
                                                    color="white"
                                                    key={i}
                                                />
                                            ))}
                                            {Array.from({ length: 5 - (review['star'] ?? 0) }).map((_, i) => (
                                                <Ionicons
                                                    name='star-outline'
                                                    size={16}
                                                    color="white"
                                                    key={i}
                                                />
                                            ))}
                                        </View>
                                    </View>
                                    <View className="flex flex-col">
                                        <Text className="text-[#BDBDBD] text-xs text-center">{review['review']}</Text>
                                    </View>
                                </View>
                            ))) 
                        : (
                            reviews.slice(0, 1).map((review, index) => (
                                <View key={`viewreview-${review['username']}-${index}`} className="flex flex-col gap-2 mt-4 bg-[#1C1C1C] p-4 rounded-xl">
                                    <View className="flex flex-row">
                                        <View className="flex flex-row w-3/5 gap-2">
                                            <View className="w-12 h-12 rounded-full flex flex-row">
                                                <Image source={{ uri: review['photoUrl'] }} style={{ width: '100%', height: '100%', borderRadius: 9999 }} />
                                            </View>
                                            <View className="h-full flex flex-col">
                                                <Text className="text-white text-lg font-bold" style={{lineHeight: 18}}>{review['name']}</Text>
                                                <Text className="text-[#BDBDBD] text-sm" style={{lineHeight: 14}}>@{review['username']}</Text>
                                            </View>
                                        </View>
                                        <View className="flex flex-row gap-1 items-start w-2/5 justify-end">
                                            {Array.from({ length: review['star'] ?? 0 }).map((_, i) => (
                                                <Ionicons
                                                    name='star'
                                                    size={16}
                                                    color="white"
                                                    key={i}
                                                />
                                            ))}
                                            {Array.from({ length: 5 - (review['star'] ?? 0) }).map((_, i) => (
                                                <Ionicons
                                                    name='star-outline'
                                                    size={16}
                                                    color="white"
                                                    key={i}
                                                />
                                            ))}
                                        </View>
                                    </View>
                                    <View className="flex flex-col">
                                        <Text className="text-[#BDBDBD] text-xs text-center">{review['review']}</Text>
                                    </View>
                                </View>
                            ))
                        )}
                        {reviews.length > 1 && (
                            <TouchableOpacity className="mt-2" onPress={() => setShowAllReviews(!showAllReviews)}>
                                <Text className="text-purple-500 text-base text-center">{showAllReviews ? 'Ver menos' : 'Ver mais'}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View className="mt-4">
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
                            <Text className="text-sm text-white">
                                Deixe sua Avaliação
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ModalReview
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                    />
                </View>
            </ScrollView>
            {/* Footer */}
            <View className="absolute bottom-0 w-full flex flex-row justify-center items-center bg-[#1C1C1C] pt-4 pb-2">
                <TouchableOpacity
                    disabled = {buttonCondition}
                    className="drop-shadow-2xl shadow-[#9C4EDC4D] text-white text-[16px] w-10/12 self-center p-0"
                    activeOpacity={0.9}
                >
                    <LinearGradient
                        colors={gradientColors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            paddingVertical: 4,
                            borderRadius: 20,
                            alignItems: 'center',
                            shadowColor: 'rgba(156, 78, 220, 1)',
                            shadowOffset: { width: 0, height: 7 },
                            shadowOpacity: 1,
                            shadowRadius: 11,
                            elevation: 10,
                        }}
                    >
                        <Text className="text-center text-white">{typePartner === 'GLOBAL_PARTNER' ? 'CONFIRMAR ROLE' : typePartner === 'PROMOTER_PARTNER' ? 'POR NOME NA LISTA' : 'EU VOU'}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            {/* Gallery Modal */}
            {openGalletyModal && (
                <>
                    <View className="absolute top-28 flex flex-row z-10 w-full">
                        <TouchableOpacity className="bg-transparent w-1/2 h-[77vh]" onPress={() => handleScrollImages('left')}></TouchableOpacity>
                        <TouchableOpacity className="bg-trasparent w-1/2 h-[77vh]" onPress={() => handleScrollImages('right')}></TouchableOpacity>
                    </View>
                    <View className="absolute w-full h-full py-28 px-8" style={{backgroundColor: 'rgba(0,0,0,0.8)'}}>
                        <TouchableOpacity className="absolute top-16 right-4" onPress={() => setOpenGalleryModal(false)}>
                            <FontAwesome name="close" size={24} color="white" />
                        </TouchableOpacity>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="w-full h-full">
                            <View className="w-full h-full bg-white border-2 border-purple-600">
                                <Image source={{ uri: gallery[selectedImagePosition] }} className="w-full h-full object-cover" />
                            </View>
                        </ScrollView>
                        <View className="flex flex-row justify-center mt-2 gap-2">
                            {Array.from({ length: gallery.length }).map((_, i) => (
                                <TouchableOpacity key={`touchablegallery-${i}`} className={`w-[12px] h-[12px] ${selectedImagePosition == i ? 'bg-purple-600 border-purple-500 border-2' : 'bg-white'} rounded-full flex justify-center items-center`} 
                                onPress={() => setSelectedImagePosition(i)}/>
                            ))}
                        </View>
                    </View>
                </>
            )}
        </View>
    )
}
