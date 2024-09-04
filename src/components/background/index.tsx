import Entypo from '@expo/vector-icons/Entypo'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import { useState, useEffect, useRef } from 'react'
import { Animated, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native'

const statusBarHeight = Constants.statusBarHeight

interface BackgroundProps {
  children: any
  text?: string
  scrollable?: boolean
}

export default function Background({ children, text, scrollable }: BackgroundProps) {
  const [scrolled, setScrolled] = useState(false)
  const slideAnim = useRef(new Animated.Value(0)).current // Animação de deslocamento
  const textOpacity = useRef(new Animated.Value(1)).current // Animação de opacidade
  const textSize = useRef(new Animated.Value(22)).current // Animação de tamanho do texto
  const buttonOpacity = useRef(new Animated.Value(0)).current // Animação de opacidade do botão
  const [buttonVisible, setButtonVisible] = useState(false) // Controle de visibilidade do botão
  const [animateImage, setAnimateImage] = useState(false) // Controle de animação da imagem

  useEffect(() => {
    if (scrolled) {
      // Se estiver rolando para baixo
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
        setButtonVisible(true); // Torna o botão visível após as animações
      });

      Animated.timing(slideAnim, {
        toValue: -20,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Se estiver rolando para cima
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setButtonVisible(false); // Torna o botão invisível após a animação
        // Inicia a animação da imagem para a posição original
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });

      // Animações de texto
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
  }, [scrolled, slideAnim, textOpacity, textSize, buttonVisible])

  function handleScroll(event: any) {
    if (event.nativeEvent.contentOffset.y > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  return (
    <LinearGradient
      style={{ flex: 1 }}
      className="flex h-screen w-full"
      colors={[
        '#10002B',
        '#9C4EDC',
        '#DFA9FD'
      ]}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
    >
      <View
        style={{ marginTop: statusBarHeight }}
        className="flex h-full w-full flex-col justify-between"
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 32, // Adiciona margem superior
          }}
        >
          <Animated.View
            style={{
              transform: [{ translateX: slideAnim }],
              alignSelf: 'center', // Centraliza a imagem horizontalmente
            }}
          >
            <Image
              style={{
                width: 140, // Ajuste aqui para o tamanho desejado
                height: 70, // Ajuste aqui para o tamanho desejado
              }}
              source={require('../../../assets/images/ROLE.png')}
            />
          </Animated.View>
          {buttonVisible && (
            <Animated.View style={{ opacity: buttonOpacity, marginLeft: 10 }}>
              <TouchableOpacity 
                className='flex flex-row border-2 border-white rounded-lg bg-transparent gap-2'
                style={{
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => alert('Botão pressionado!')}
              >
                <Entypo name='rocket' size={24} color='#FFFFFF' />
                <Text className='text-white text-sm'>Suporte um promoter!</Text>
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
          <View 
            className="flex h-[89%] flex-col items-center rounded-t-[54px] bg-background pt-12" 
            style={{ paddingBottom: 60 }}
          >
            {children}
          </View>
        ) : (
          <ScrollView
            onScroll={handleScroll}
            scrollEventThrottle={16}
            className="bg-background rounded-t-[54px] pt-12 flex-grow"
            contentContainerStyle={{ justifyContent: 'flex-start', paddingBottom: 60 }}
          >
            {children}
          </ScrollView>
        )}
      </View>
    </LinearGradient>
  )
}
