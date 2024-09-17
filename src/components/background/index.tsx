import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Animated, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';

const statusBarHeight = Constants.statusBarHeight;

interface BackgroundProps {
  children: any;
  text?: string;
  scrollable?: boolean;
  themeMode?: string;
}

export default function Background({ children, text, scrollable, themeMode }: BackgroundProps) {
  const [scrolled, setScrolled] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const textSize = useRef(new Animated.Value(22)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const [buttonVisible, setButtonVisible] = useState(false);
  const [themeModeS, setThemeModeS] = useState('dark');

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

  function handleScroll(event: any) {
    setScrolled(event.nativeEvent.contentOffset.y > 0);
  }

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
            <Animated.Text style={{ fontSize: textSize }} className="text-center font-bold text-white mb-8">
              {text}
            </Animated.Text>
          </Animated.View>
        )}
        {!scrollable ? (
          <View className="flex h-[89%] flex-col items-center rounded-t-[54px] pt-12" style={{ paddingBottom: 60, backgroundColor }}>
            {children}
          </View>
        ) : (
          <ScrollView
            onScroll={handleScroll}
            scrollEventThrottle={16}
            className="rounded-t-[54px] pt-12 flex-grow"
            contentContainerStyle={{ justifyContent: 'flex-start', paddingBottom: 60, backgroundColor }}
          >
            {children}
          </ScrollView>
        )}
      </View>
    </LinearGradient>
  );
}
