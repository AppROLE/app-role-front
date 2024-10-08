import ModalListaConfirmados from "@/src/components/modalListaConfirmados";
import ModalReview from "@/src/components/modalReview";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState, useRef } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Animated, Easing } from "react-native";

export default function EventDescription() {
    const [darkLight, setDarkLight] = useState(false);
    const [price, setPrice] = useState('');
    const [blanckPrice, setBlanckPrice] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionHeight, setDescriptionHeight] = useState(false);
    const [features, setFeatures] = useState([
        { id: 1, name: 'Estacionamento' },
        { id: 2, name: 'Fumódromo' },
        { id: 3, name: 'Valet' },
        { id: 4, name: 'Wi-fi' },
        { id: 5, name: 'DJ' },
    ]);
    const [gallery, setGallery] = useState([
        { id: 1, image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png' },
        { id: 2, image: 'https://placehold.co/600x400' },
        { id: 3, image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png' },
        { id: 4, image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png' },
        { id: 5, image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png' },
        { id: 6, image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png' },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalList, setModalList] = useState(false);
    const stars = [1, 2, 3, 4, 5];
    const [reviews, setReviews] = useState([
        { 
            id: 1, 
            imageProfile: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png', 
            userName: 'Isabella', 
            at: '@isa.saab', 
            opnion: 'Foi incrível! Música e bebida muito boas. O único problema que eu tive foi com a fila de entrada kkk mas eu estava com as minhas amigas que marcamos pelo app ROLE!',
            stars: 4,
        },
        {
            id: 2,
            imageProfile: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png', 
            userName: 'Gabriel Marola', 
            at: '@merolinhaG',
            opnion: 'lorem epsilum!',
            stars: 5,
        },
        {
            id: 3,
            imageProfile: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png', 
            userName: 'Yurão',
            at: '@yurinho.aabb',
            opnion: 'lorem epsilum',
            stars: 1
        },
    ]);
    const [showAllReviews, setShowAllReviews] = useState(false)
    const [selectedImagePosition, setSelectedImagePosition] = useState(0)
    const [openGalletyModal, setOpenGalleryModal] = useState(false)
    const [imageSize, setImageSize] = useState(true)
    const animatedHeight = useRef(new Animated.Value(40)).current;
    const [typePartner, setTypePartner] = useState('global');
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
        { id: 1, image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png' },
        { id: 2, image: 'https://placehold.co/600x400' },
        { id: 3, image: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png' },
    ]);
    const [buttonCondition, setButtonCondition] = useState(false);
    const gradientColors = buttonCondition
        ? ['rgba(90, 24, 154, 0.25)', 'rgba(156, 78, 220, 0.25)'] // Cores do gradiente com brilho reduzido
        : ['#5A189A', '#9C4EDC']; // Cores normais do gradiente

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

    useEffect(() => {
        priceDesign(3);
    }, []);

    useEffect(() => {
        setDescription(`
🚀 React Native Expo: Uma Introdução Completa 🚀\n
1️⃣ O que é React Native Expo?\n
Expo é uma plataforma baseada em React Native que facilita o desenvolvimento de aplicativos móveis. Com ele, você pode criar apps nativos de forma rápida, sem a necessidade de configurar manualmente cada componente nativo.\n
✨ Principais Características:\n
- Rápida configuração: Sem necessidade de lidar com Xcode ou Android Studio para começar.\n
- Acesso a APIs nativas: Como câmera, localização e notificações com simplicidade.\n
- Atualizações OTA: Distribua atualizações diretamente aos usuários sem necessidade de passar por lojas de aplicativos.\n
- Compatível com plataformas: Funciona tanto para iOS quanto para Android.\n
2️⃣ Como começar?\n
Para começar a desenvolver com React Native Expo, você precisa instalar o Expo CLI. Para isso, basta rodar o comando:\n
npm install -g expo-cli
`);
    }, []);

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
                        uri: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png',
                    }}
                    style={{
                        width: '100%',
                        height: '100%',
                        borderBottomLeftRadius: 45,
                        borderBottomRightRadius: 45,
                    }}
                />
                <View className="w-12 h-12 bg-black flex justify-center items-center rounded-full absolute top-20 left-8">
                    <FontAwesome name="arrow-left" size={32} color="white" />
                </View>
                <View className="w-11/12 h-16 mx-auto bg-black mt-auto rounded-full flex flex-row items-center p-2 gap-4 mb-4">
                    <View className="w-12 h-12 rounded-full">
                        <Image
                            source={{
                                uri: 'https://d2sw4frthbnrzj.cloudfront.net/teste/role_bombando_teste.png',
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
                            <Text className="text-[#BDBDBD] text-base">Universitário</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center bg-[#1C1C1C] rounded-full px-2 py-1 self-start">
                            <FontAwesome name="question" size={20} color="white" />
                            <Text className="text-[#BDBDBD] text-base">
                                <Text className="text-purple-500">{price}</Text>
                                {blanckPrice}
                            </Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center bg-[#1C1C1C] rounded-full px-2 py-1 self-start">
                            <FontAwesome name="question" size={20} color="white" />
                            <Text className="text-[#BDBDBD] text-base">Funk</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center bg-[#1C1C1C] rounded-full px-2 py-1 self-start">
                            <FontAwesome name="star" size={20} color="white" />
                            <Text className="text-[#BDBDBD] text-base">4,5</Text>
                        </View>
                        <View className="flex flex-row gap-2 items-center bg-[#1C1C1C] rounded-full px-2 py-1 self-start">
                            <FontAwesome name="question" size={20} color="white" />
                            <Text className="text-[#BDBDBD] text-base">18-20 anos</Text>
                        </View>
                    </View>
                    <View className="flex flex-col gap-4 w-1/2 items-end">
                        {/* {typePartner === 'promoter' || typePartner === 'global' && ( */}
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
                        {/* )} */}
                        <View className="w-36 py-3 bg-[#1C1C1C] rounded-xl items-center">
                            <View className="flex flex-row gap-2">
                                <FontAwesome name="calendar" size={24} color="white" />
                                <Text className="text-white text-lg">16 DEZ</Text>
                            </View>
                            <View>
                                <Text className="text-white text-lg">Sexta-feira</Text>
                            </View>
                        </View>
                        <View className="flex flex-row gap-2 bg-[#1C1C1C] justify-center w-36 py-3 rounded-xl">
                            <FontAwesome name="clock-o" size={24} color="white" />
                            <Text className="text-white text-lg">22:00</Text>
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
                    <TouchableOpacity className="mt-4" onPress={() => setDescriptionHeight(!descriptionHeight)}>
                        <Text className="text-purple-500 text-base text-center">{descriptionHeight ? 'Ler menos' : 'Ler mais'}</Text>
                    </TouchableOpacity>
                </View>
                {/* Adress */}
                <View className="mt-8">
                    <Text className="text-white text-2xl font-bold">Endereço</Text>
                    <View className="flex flex-row gap-2 mt-2">
                        <></>
                    </View>
                    <Text className="text-white text-base">Rua dos Bobos, 0 - São Paulo</Text>
                </View>
                {/* Features */}
                <View className="mt-8">
                    <Text className="text-white text-2xl font-bold">Features</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 16, marginTop: 8}}>
                        {features.map((type, index) => (
                            <View key={`viewtype-${type.name}-${index}`} className="mx-2">
                                <View className="bg-[#1C1C1C] rounded-xl px-2 py-1 flex flex-col gap-2 items-center min-w-32">
                                    <FontAwesome name={type.name == 'Estacionamento' ? 'question' :
                                                        type.name == 'Fumódromo' ? 'question' :
                                                        type.name == 'Valet' ? 'question' :
                                                        type.name == 'Área Aberta' ? 'question' :
                                                        type.name == 'Welcome Shot' ? 'question' :
                                                        type.name == 'Mesas' ? 'question' :
                                                        type.name == 'Open Bar' ? 'question' :
                                                        type.name == 'Ao Vivo' ? 'question' :
                                                        type.name == 'Esquenta' ? 'question' :
                                                        type.name == 'After' ? 'question' : 'question'
                                    } 
                                    size={20} color="purple" />
                                    <Text className="text-purple-500 text-base">{type.name}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                {/* Menu */}
                <View className="mt-8">
                    <Text className="text-white text-2xl font-bold mb-2">Cardápio</Text>
                    <TouchableOpacity className="flex flex-row bg-[#1C1C1C] items-center justify-center gap-2 py-2 rounded-lg">
                        <Text className="text-[#BDBDBD] text-lg mt-2" style={{lineHeight: 16}}>Acesse o cadápio digital</Text>
                        <FontAwesome name="question" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                {/* Packages */}
                {typePartner === 'global' && (
                    <View className="mt-8">
                        <Text className="text-white text-2xl font-bold mb-2">Pacotes</Text>
                        <View className="flex flex-row gap-2">
                            {packagesImages.map((packageImage, index) => (
                                <TouchableOpacity key={`viewpackage-${packageImage.id}-${index}`} className="w-[32%] h-20 bg-[#1C1C1C] rounded-xl">
                                    <Image 
                                        source={{ uri: packageImage.image }} 
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
                        {showAllReviews ? (
                            reviews.map((review, index) => (
                                <View key={`viewreview-${review.id}-${index}`} className="flex flex-col gap-2 mt-4 bg-[#1C1C1C] p-4 rounded-xl">
                                    <View className="flex flex-row">
                                        <View className="flex flex-row w-3/5 gap-2">
                                            <View className="w-12 h-12 rounded-full flex flex-row">
                                                <Image source={{ uri: review.imageProfile }} style={{ width: '100%', height: '100%', borderRadius: 9999 }} />
                                            </View>
                                            <View className="h-full flex flex-col">
                                                <Text className="text-white text-lg font-bold" style={{lineHeight: 18}}>{review.userName}</Text>
                                                <Text className="text-[#BDBDBD] text-sm" style={{lineHeight: 14}}>{review.at}</Text>
                                            </View>
                                        </View>
                                        <View className="flex flex-row gap-1 items-start w-2/5 justify-end">
                                            {Array.from({ length: review.stars ?? 0 }).map((_, i) => (
                                                <Ionicons
                                                    name='star'
                                                    size={16}
                                                    color="white"
                                                    key={i}
                                                />
                                            ))}
                                            {Array.from({ length: 5 - (review.stars ?? 0) }).map((_, i) => (
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
                                        <Text className="text-[#BDBDBD] text-xs text-center">{review.opnion}</Text>
                                    </View>
                                </View>
                            ))) 
                        : (
                            reviews.slice(0, 1).map((review, index) => (
                                <View key={`viewreview-${review.id}-${index}`} className="flex flex-col gap-2 mt-4 bg-[#1C1C1C] p-4 rounded-xl">
                                    <View className="flex flex-row">
                                        <View className="flex flex-row w-3/5 gap-2">
                                            <View className="w-12 h-12 rounded-full flex flex-row">
                                                <Image source={{ uri: review.imageProfile }} style={{ width: '100%', height: '100%', borderRadius: 9999 }} />
                                            </View>
                                            <View className="h-full flex flex-col">
                                                <Text className="text-white text-lg font-bold" style={{lineHeight: 18}}>{review.userName}</Text>
                                                <Text className="text-[#BDBDBD] text-sm" style={{lineHeight: 14}}>{review.at}</Text>
                                            </View>
                                        </View>
                                        <View className="flex flex-row gap-1 items-start w-2/5 justify-end">
                                            {Array.from({ length: review.stars ?? 0 }).map((_, i) => (
                                                <Ionicons
                                                    name='star'
                                                    size={16}
                                                    color="white"
                                                    key={i}
                                                />
                                            ))}
                                            {Array.from({ length: 5 - (review.stars ?? 0) }).map((_, i) => (
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
                                        <Text className="text-[#BDBDBD] text-xs text-center">{review.opnion}</Text>
                                    </View>
                                </View>
                            ))
                        )}
                        <TouchableOpacity className="mt-2" onPress={() => setShowAllReviews(!showAllReviews)}>
                            <Text className="text-purple-500 text-base text-center">{showAllReviews ? 'Ver menos' : 'Ver mais'}</Text>
                        </TouchableOpacity>
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
                        <Text className="text-center text-white">{typePartner === 'global' ? 'CONFIRMAR ROLE' : typePartner === 'promoter' ? 'POR NOME NA LISTA' : 'EU VOU'}</Text>
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
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="w-full h-full" onScroll={()=>console.log('ola')}>
                            <View className="w-full h-full bg-white border-2 border-purple-600">
                                <Image source={{ uri: gallery[selectedImagePosition].image }} className="w-full h-full object-cover" />
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
