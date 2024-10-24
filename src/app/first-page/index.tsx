import RoleMainButton from "@/src/components/roleMainButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router, useRouter } from "expo-router"; 
import { useState, useRef, useEffect } from "react";
import { Dimensions, FlatList, Image, Text, View, StyleSheet, ImageSourcePropType, ViewToken } from "react-native";

const handlePress = (router: any) => {
    router.push('/sign-up'); 
}

const images = [
    require('../../../assets/images/image_carrosel_1.png'),
    require('../../../assets/images/image_carrosel_2.png'),
    require('../../../assets/images/image_carrosel_3.png'),
    require('../../../assets/images/image_carrosel_4.png'),
];

const { width, height } = Dimensions.get('window');

export default function FirstPage() {
    const router = useRouter(); 
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);

    async function validateToken() {
        const token = await AsyncStorage.getItem('refresh_token');
        if (token) {
            router.push('/home');
        }
    }
    
    useEffect(() => {
        validateToken();
    }, []);

    const renderItem = ({ item } : { item: ImageSourcePropType }) => (
        <View style={{ width, height: height * 0.8, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
            <Image
                source={item}
                style={{ width, height: height * 0.8 }}
                resizeMode="cover"
            />
        </View>
    );

    const onViewRef = useRef((viewableItems: { viewableItems: ViewToken[] }) => {
        if (viewableItems.viewableItems.length > 0) {
            setActiveIndex(viewableItems.viewableItems[0].index!);
        }
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    return (
        <View className="bg-background h-full">
            <View pointerEvents="box-none" className="flex-1 relative ">
                <FlatList 
                    data={images}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={width}
                    decelerationRate="fast"
                    pagingEnabled
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}
                />
                <LinearGradient 
                    colors={['rgba(18, 18, 18, 1)', 'rgba(18, 18, 18, 0.1)', 'rgba(18, 18, 18, 0)']}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: height * 0.8,
                    }}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    pointerEvents="none"
                />
            </View>
            
            <View>
                <View style={styles.dotsContainer}>
                    {images.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                { 
                                    opacity: index === activeIndex ? 1 : 0.5,
                                    width: index === activeIndex ? 32 : 8,
                                }
                            ]}
                        />
                    ))}
                </View>
                <View className="items-center pb-20">
                    <Text adjustsFontSizeToFit numberOfLines={1} className="text-white font-nunito text-xl">Suas melhores histórias começam aqui.</Text>
                    <Text adjustsFontSizeToFit numberOfLines={1} className="text-white text-xl font-nunito mt-2">Bora dar um <Text className="font-nunitoBold text-white text-xl">ROLE</Text>?</Text>
                    
                    <View className="w-[80%] mt-8">
                        <RoleMainButton type="gradient" buttonFunction={() => handlePress(router)}>
                            <Text className="text-white font-nunito text-base">Cadastre-se</Text>
                        </RoleMainButton> 
                    </View> 
                    <View className="mt-16">
                        <Text className="text-[#BDBDBD] font-nunito">Já possui uma conta?  <Link href={'/sign-in'} className="text-[#D8A9FF] font-nunito">Entrar</Link></Text>
                    </View>
                </View>
            </View>

            {/* Logo posicionada acima de tudo */}
            <Image
                style={{
                    position: 'absolute',
                    top: 50,
                    left: 32,
                    width: 140,
                    height: 70,
                }}
                source={require('../../../assets/images/ROLE.png')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
        marginHorizontal: 4,
        marginBottom: 20,
    },
});