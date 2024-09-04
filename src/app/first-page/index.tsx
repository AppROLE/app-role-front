import RoleMainButton from "@/src/components/roleMainButton";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router"; 
import { useState, useRef } from "react";
import { Dimensions, FlatList, Image, Text, View, StyleSheet } from "react-native";

const handlePress = (router: any) => {
    router.push('/sign-up'); 
}

const images = [
    require('../../../assets/images/image_carrosel_1.png'),
    require('../../../assets/images/image_carrosel_2.png'),
    require('../../../assets/images/image_carrosel_3.png'),
    require('../../../assets/images/image_carrosel_4.png'),
];

const { width } = Dimensions.get('window');

export default function FirstPage() {
    const router = useRouter(); 
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);

    const renderItem = ({ item }: { item: any }) => (
        <View style={{ width: width, height: 600, justifyContent: 'center', alignItems: 'center', padding: 10}}>
            <Image
                source={item}
                style={{ width: width, height: 600 }}
                resizeMode="cover"
            />
            <LinearGradient 
                colors={['rgba(179, 115, 235, 0)', 'rgba(29, 25, 33, 0)', 'rgba(18, 18, 18, 1)']}
                style={{
                    position: 'absolute',
                    width: width,
                    height: 600,
                    bottom: 0,
                }}
            />
        </View>
    );

    const onViewRef = useRef((viewableItems : any) => {
        if (viewableItems.viewableItems.length > 0) {
            setActiveIndex(viewableItems.viewableItems[0].index);
        }
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    return (
        <View className="bg-background h-full">
            <FlatList 
                data={images}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={width} // Ajuste para centralizar a imagem no viewport
                decelerationRate="fast"
                pagingEnabled
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
            />
            <Image
                 style={{
                    position: 'absolute',
                    top: 68,
                    left: 32,
                    width: 140, 
                    height: 70 
                    }}
                source={require('../../../assets/images/ROLE.png')}
            />
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
                <Text className="text-white text-xl">Suas melhores histórias começam aqui.</Text>
                <Text className="text-white text-xl mt-2">Bora dar um <Text className="font-bold text-white text-xl ">ROLE</Text>?</Text>
                
                <View className="w-[80%] mt-8">
                    <RoleMainButton type="gradient" buttonFunction={() => handlePress(router)}>
                        <Text className="text-white text-base">Cadastre-se</Text>
                    </RoleMainButton> 
                </View> 
                <View className="mt-16">
                    <Text className="text-[#BDBDBD]">Já possui uma conta?  <Link href={'/sign-in'} className="text-[#D8A9FF]">Entrar</Link></Text>
                </View>
            </View>
        </View>
    )
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
