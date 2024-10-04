import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import {Link, router, useRouter} from 'expo-router'
import { RecoveryCodeInput } from '@/src/components/OTPInput'
import { useContext, useRef, useState } from 'react'
import Background from '@/src/components/background'
import RoleMainButton from '@/src/components/roleMainButton'
import { AuthContext } from '@/context/auth_context'
import React from 'react'
import { resendCodeResponseDTO } from '@/api/types/auth_dto'
import Toast from 'react-native-toast-message'
import AsyncStorage from "@react-native-async-storage/async-storage";

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   image: {
//     flex: 1,
//     // position: 'absolute',
//     top: 0,
//     left: 0
//     // width: 500
//     // height: 500
//     // backgroundColor: '#0553'
//   }
// })

// const statusBarHeight = Constants.statusBarHeight

export default function RecoveryCode() {
  const navigation = useRouter()
  const [codes, setCodes] = useState<string[]>(Array(6).fill(''))
  const [incorrectMessage, setIncorrectMessage] = useState('');
  const {confirmCode} = useContext(AuthContext);

  // const windowWidth = Dimensions.get('window').width
  const refs = Array(6)
    .fill(null)
    .map(() => useRef<TextInput>(null))
  const { resendCode } = React.useContext(AuthContext)

  async function handleResendCode(email: string) {
  
    try {
      const response: resendCodeResponseDTO = await resendCode(email);
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: response.message || 'Código reenviado com sucesso!',
        visibilityTime: 3000,
        topOffset: 0,
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: error.message || 'Ocorreu um erro ao realizar o cadastro.',
        visibilityTime: 3000,
        topOffset: 0,
      });
    }
  }

  const onChangeCode = (text: string, index: number) => {
    const newCodes = [...codes]
    newCodes[index] = text
    setCodes(newCodes)

    if (text && index < codes.length - 1) {
      refs[index + 1]?.current?.focus()
    }
  }

  const email = 'tiagomassuda123@gmail.com'

  function handleVoltar() {
    navigation.push({ pathname: '/home' })
  }

  const handlePost = async () => {
    if(codes.includes("")){
      setIncorrectMessage("*Código incompleto")
    }
    else{
      try{
        const code = codes.join("")
        const email = await AsyncStorage.getItem('user_email')
        console.log(email)
        if (email == null){
            setIncorrectMessage("*Email não encontrado no sistema, tente novamente")
            return
        }
        const response = await confirmCode(email, code );
        if(response.message != "Código validado com sucesso!"){
          setIncorrectMessage("*Código incorreto")
            return
        }
        setIncorrectMessage("")
        AsyncStorage.getItem('ScreenRequestToCode').then((value) => {
          if(value == 'sign-up'){
            navigation.push({ pathname: '/almost-there' })
          }
          else if(value == 'forgot-password'){
            navigation.push({ pathname: '/confirm-forgot-password' })
          }
          else{
            navigation.push({ pathname: '/' })
          }
        }) 
      }
      catch (error){
        console.log(error)
        setIncorrectMessage("*Erro no sistema, tente novamente")
      }
    }
  }

  return (
    <Background>
      <View className="flex h-[89%] flex-col items-center gap-14 rounded-t-[54px] bg-background ">
        <View className="flex items-center">
          <View className="flex flex-row justify-center">
            <Text adjustsFontSizeToFit={true} numberOfLines={2} className="w-[70%] text-center text-2xl  text-white max-[320px]:text-xl font-sans">
              Escreva o código de 6 dígitos enviado ao seu e-mail
            </Text>
          </View>
        </View>
        <View className="flex w-full justify-center items-center">
          <View className='flex flex-col gap-6'>
            <View className='w-[84%]'>
              <Text adjustsFontSizeToFit numberOfLines={1} className='text-red-500 mb-2'>{incorrectMessage}</Text>
              <View className="flex flex-row justify-center ">
                <RecoveryCodeInput
                  codes={codes!}
                  onChangeCode={onChangeCode}
                  refs={refs}
                />
              </View>
            </View>
              
            <View className="ml-[2%] flex flex-col gap-4">
              <View className="-mt-2 flex w-full flex-row gap-4">
                <Text className="text-xs text-white font-sans">
                  Não recebeu um código?
                </Text>
                  <Text onPress={()=> handleResendCode(email)} className='text-[#D8A9FF] text-xs font-sansBold'>Reenviar</Text>
              </View>
            </View>
          </View>
        </View>

        <View className='w-[100vw] gap-12 px-[8%]'>
          <RoleMainButton type="gradient" buttonFunction={() => handlePost()}>
            <Text className="text-white font-sans">Continuar</Text>
          </RoleMainButton>
          <RoleMainButton type="simple" buttonFunction={() => handleVoltar()}>
            <Text className="text-white font-sans">Voltar</Text>
          </RoleMainButton>
        </View>
      </View>
    </Background>
  )
}
