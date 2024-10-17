import { UserContext } from '@/context/user_context';
import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Animated, Image, Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;

interface BackgroundProps {
  children: any
  text?: any
  scrollable?: boolean
  themeMode?: string
  lockScroll?: boolean
  function1?: any
}

export default function Background({ children, text, scrollable, themeMode, lockScroll, function1 }: BackgroundProps) {
  const [scrolled, setScrolled] = useState(false)
  const slideAnim = useRef(new Animated.Value(0)).current // Animação de deslocamento
  const textOpacity = useRef(new Animated.Value(1)).current // Animação de opacidade
  const textSize = useRef(new Animated.Value(22)).current // Animação de tamanho do texto
  const buttonOpacity = useRef(new Animated.Value(0)).current // Animação de opacidade do botão
  const [buttonVisible, setButtonVisible] = useState(false) // Controle de visibilidade do botão
  const [animateImage, setAnimateImage] = useState(false) // Controle de animação da imagem
  const [themeModeS, setThemeModeS] = useState('dark'); // Modo do tema

  useEffect(() => {
    if (scrolled) {
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(textSize, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setButtonVisible(true);
      });

      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setButtonVisible(false);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });

      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(textSize, {
          toValue: 22,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [scrolled, slideAnim, textOpacity, textSize, buttonVisible]);

  useFocusEffect(
    useCallback(() => {
      const loadTheme = async () => {
        const value = await AsyncStorage.getItem('themeMode');
        if (value) {
          setThemeModeS(value);
        }
      };
      loadTheme();
    }, [])
  );

  useEffect(() => {
    if (themeMode) {
      setThemeModeS(themeMode);
    }
  }, [themeMode]);

  const backgroundColor = themeModeS === 'dark' ? '#121212' : '#FFFFFF';

  function handleScroll(event: any) {
    getToFinalFunc(event);
    if (event.nativeEvent.contentOffset.y > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }
  function getToFinalFunc(event: any) {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const containerHeight = event.nativeEvent.layoutMeasurement.height;

    if (Platform.OS === 'android') {
      if (scrollPosition + containerHeight >= contentHeight - 4) {
        console.log('Chegou ao final Android');
        function1 && function1();
        // return true;
      } else {
        // console.log('Não chegou ao final');
      }
    } else if (Platform.OS === 'ios') {
      if (scrollPosition + containerHeight == contentHeight) {
        console.log('Chegou ao final IOS');
        function1 && function1();
        // return true;
      } else {
        // console.log('Não chegou ao final');
      }
    }
  }

  useEffect(() => {
    console.log(text);
  }, [])

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['#10002B', '#9C4EDC', '#DFA9FD']}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={{ marginTop: statusBarHeight }} className="flex h-full w-full flex-col justify-between">
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
          <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
            <Image style={{ width: 140, height: 70 }} source={require('../../../assets/images/ROLE.png')} />
          </Animated.View>
          {buttonVisible && (
            <Animated.View style={{ opacity: buttonOpacity, marginLeft: 10 }}>
              <TouchableOpacity
                className="flex flex-row border-2 border-white rounded-lg bg-transparent gap-2"
                style={{ paddingHorizontal: 8, paddingVertical: 4 }}
                onPress={() => alert('Botão pressionado!')}
              >
                <Entypo name="rocket" size={24} color="#FFFFFF" />
                <Text className="text-white text-sm">Suporte um promoter!</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
        {text && (
          <Animated.View style={{ opacity: textOpacity }}>
            <Animated.Text style={{ fontSize: textSize }} className="text-center text-md text-white mb-8">
              {text}
            </Animated.Text>
          </Animated.View>
        )}
        {!scrollable ? (
          <View className="flex h-[89%] flex-col items-center rounded-t-[54px] pt-12" style={{ backgroundColor }}>
            {children}
          </View>
        ) : (
          <ScrollView
            onScroll={handleScroll}
            scrollEventThrottle={16}
            className="bg-background rounded-t-[54px] pt-12 flex-grow"
            contentContainerStyle={{ justifyContent: 'flex-start', paddingBottom: 60 }}
            nestedScrollEnabled={true}
            scrollEnabled={!lockScroll}
            bounces={false}
          >
            {children}
          </ScrollView>
        )}
      </View>
    </LinearGradient>
  );
}


