import { UserContext } from '@/context/user_context';
import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, Image, Text, View, ScrollView, TouchableOpacity, Platform, Modal, KeyboardAvoidingView } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useState, useEffect, useRef, useCallback } from 'react';
import { SvgUri } from 'react-native-svg';
import { TextInput } from 'react-native-gesture-handler';
import RoleMainButton from '../roleMainButton';
import Toast from 'react-native-toast-message';

const statusBarHeight = Constants.statusBarHeight;

interface BackgroundProps {
  children: any
  text?: any
  scrollable?: boolean
  themeMode?: string
  lockScroll?: boolean
  function1?: any
  centralize?: boolean;
}

export default function Background({ children, text, scrollable, themeMode, lockScroll, function1, centralize }: BackgroundProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false); // Controle do modal original
  const [isSecondModalVisible, setSecondModalVisible] = useState(false); // Controle do segundo modal
  const [inputValue, setInputValue] = useState(''); // Estado para o valor do TextInput
  const slideAnim = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const textSize = useRef(new Animated.Value(22)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const [buttonVisible, setButtonVisible] = useState(false);
  const [themeModeS, setThemeModeS] = useState('dark');
  const navigation = useRouter();
  const [promoterCode, setPromoterCode] = useState(''); // Estado para armazenar o código do promoter
  const [buttonText, setButtonText] = useState('Suporte um promoter');
  const scrollRef = useRef();

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

  const handlePromoter = async () => {
    try {
      const token = await AsyncStorage.getItem('idToken'); // Verifica se existe um token
      if (!token) {
        // Se não houver token, exibe um toast e redireciona o usuário para a tela de login
        Toast.show({
          type: 'error',
          text1: 'Usuário não autenticado',
          text2: 'Por favor, faça login para continuar.',
        });
        navigation.push('/sign-in'); // Redireciona para a tela de login
        return;
      }
      
      setModalVisible(false); // Fecha o primeiro modal
      setSecondModalVisible(true); // Abre o segundo modal
      setPromoterCode(inputValue); // Armazena o valor do inputValue
      setButtonText(inputValue);
      setInputValue('');
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
    }
  };

  const handleRemovePromoter = () => {
    setPromoterCode(''); // Limpa o código do promoter
    setButtonText('Suporte um promoter'); // Reseta o texto do botão
    setSecondModalVisible(false); // Fecha o segundo modal
  };

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

    if (scrollPosition + containerHeight >= contentHeight - 4) {
      function1 && function1();
    }
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleSecondModal = () => {
    setSecondModalVisible(!isSecondModalVisible);
  };

  return (
    <LinearGradient
      style={{ flex: 1 }}
      colors={['#10002B', '#9C4EDC', '#DFA9FD']}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
    >
      <Toast/>
      <View style={{ marginTop: statusBarHeight }} className="flex h-full w-full flex-col justify-between">
        <View style={{ flexDirection: 'row', alignItems: centralize ? 'center' : 'start', justifyContent: centralize ? 'center' : 'left', marginTop: 32, paddingHorizontal: 20 }}>
          <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
            <Image style={{ width: 140, height: 70 }} source={require('../../../assets/images/ROLE.png')} />
          </Animated.View>
          {buttonVisible && (
            <Animated.View style={{ opacity: buttonOpacity, marginLeft: 1 }}>
              <TouchableOpacity
                className={`flex flex-row border-2 ${buttonText !== 'Suporte um promoter' ? 'border-white bg-white' : 'border-white bg-transparent'
                  } rounded-lg gap-2`}
                style={{ paddingHorizontal: 8, paddingVertical: 4 }}
                onPress={() => {
                  if (buttonText !== 'Suporte um promoter') {
                    setSecondModalVisible(true);  // Abre o segundo modal
                  } else {
                    toggleModal();  // Abre o primeiro modal
                  }
                }} // Abre o modal ao clicar
              >
                <Entypo name="rocket" size={24} color={buttonText !== 'Suporte um promoter' ? "#DFA9FD" : "#FFFFFF"} />
                <Text className={`text-sm pt-1 ${buttonText !== 'Suporte um promoter' ? 'text-[#DFA9FD]' : 'text-white'}`}>
                  {buttonText}
                </Text>
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

        {scrollable2 ?
          <>
            <View className="flex h-[89%] flex-col items-center rounded-t-[54px] pt-5" style={{ backgroundColor }}>
              <View className='w-full'>
                <Text className="text-3xl text-center font-nunitoBold text-white">Pacotes</Text>
              </View>
              <View className="w-full mt-5">
                <View className="border border-['#2C2B2B'] w-full"></View>
              </View>
              <ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={16}
                className="rounded-t-[54px] pt-12 flex-grow w-[100%]"
                contentContainerStyle={{ justifyContent: 'flex-start', paddingBottom: 60 }}
                nestedScrollEnabled={true}
              >
                {children}
              </ScrollView>
            </View>
          </>
          :
          !scrollable ? (
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
            >
              {children}
            </ScrollView>
          )}
      
        {/* Modal original */}

        <Modal
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
          animationType="fade"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Define o comportamento do teclado
            style={{ flex: 1 }}
          >
            <View className="flex-1 justify-end bg-black/75">
              <View className="bg-[#121212] p-5 rounded-t-3xl h-[350px]">
                <View className='flex flex-row items-center gap-11 mt-2'>
                  <TouchableOpacity
                    onPress={toggleModal}
                    className={`ml-5 flex h-12 w-12 justify-center items-center rounded-full bg-[#1C1C1C]`}
                  >
                    <SvgUri
                      uri={process.env.EXPO_PUBLIC_URL_S3 + '/left_arrow.svg'}
                      width={20}
                      height={20}
                    />
                  </TouchableOpacity>
                  <Text adjustsFontSizeToFit className="text-white text-2xl text-center">
                    Indique um <Text className="text-[#DFA9FD]">Promoter</Text>
                  </Text>
                </View>
                <Text className="text-[#BDBDBD] text-center mt-10 text-base max-w-[265px] mx-auto">
                  Alguém te convidou para o ROLE? Digite o código da pessoa que te chamou para conhecer o paraíso dos ROLEs!
                </Text>
                <View className="bg-[#1C1C1C] flex-row items-center rounded-2xl mt-10 px-3 py-2 w-[300px] mx-auto gap-2">
                  <Entypo name="rocket" size={22} color="#FFFFFF" />
                  <TextInput
                    placeholder="Código:"
                    placeholderTextColor="#D9D9D9"
                    className="text-white flex-1"
                    style={{ height: 30, borderBottomWidth: 1, borderBottomColor: '#D9D9D9' }}
                    value={inputValue}
                    onChangeText={setInputValue}
                  />
                </View>
                <View className='w-[300px] mx-auto mt-10'>
                  <RoleMainButton buttonFunction={handlePromoter} type={'gradient'} disabled={!inputValue.trim()}>
                    <Text className="text-white">Salvar</Text>
                  </RoleMainButton>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>

        {/* Segundo Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isSecondModalVisible}
          onRequestClose={toggleSecondModal}
        >
          <View className="flex-1 justify-end bg-black/75">
            <View className="bg-[#121212] p-5 rounded-t-3xl h-[350px]">
              <View className='flex flex-row items-center gap-11 mt-2'>
                <TouchableOpacity
                  onPress={toggleSecondModal}
                  className={`ml-5 flex h-12 w-12 justify-center items-center rounded-full bg-[#1C1C1C]`}
                >
                  <SvgUri
                    uri={process.env.EXPO_PUBLIC_URL_S3 + '/left_arrow.svg'}
                    width={20}
                    height={20}
                  />
                </TouchableOpacity>
                <Text className="text-white text-2xl text-center">
                  Indique um <Text className="text-[#DFA9FD]">Promoter</Text>
                </Text>
              </View>
              <Text className='text-[#BDBDBD] text-base text-center mt-14'>Você está apoiando:</Text>
              <View className='justify-center items-center mt-6'>
                <View className='bg-[#1C1C1C] w-[330px] items-center h-10 rounded-2xl justify-center flex flex-row gap-1'>
                  <Entypo name="rocket" size={22} color="#DFA9FD" />
                  <Text className='text-[#DFA9FD]'>{promoterCode}</Text>
                </View>
              </View>
              <Text className='text-[#B4B4B4] text-xs ml-8 mt-1'>*Este código ficará salvo por 1 mês após sua ativação.</Text>
              <View className='mt-20'>
                <RoleMainButton type={''} buttonFunction={handleRemovePromoter}>
                  <Text className='text-white'>Remover Promoter</Text>
                </RoleMainButton>
              </View> 
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
}
