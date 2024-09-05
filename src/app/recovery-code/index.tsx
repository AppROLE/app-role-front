import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useRouter } from 'expo-router'
import { RecoveryCodeInput } from '@/src/components/OTPInput'
import { useRef, useState } from 'react'
import Background from '@/src/components/background'
import RoleMainButton from '@/src/components/roleMainButton'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    flex: 1,
    // position: 'absolute',
    top: 0,
    left: 0
    // width: 500
    // height: 500
    // backgroundColor: '#0553'
  }
})

const statusBarHeight = Constants.statusBarHeight

export default function RecoveryCode() {
  const navigation = useRouter()
  const [codes, setCodes] = useState<string[]>(Array(6).fill(''))
  const windowWidth = Dimensions.get('window').width
  const refs = Array(6)
    .fill(null)
    .map(() => useRef<TextInput>(null))

  const onChangeCode = (text: string, index: number) => {
    const newCodes = [...codes]
    newCodes[index] = text
    setCodes(newCodes)

    if (text && index < codes.length - 1) {
      refs[index + 1]?.current?.focus()
    }
  }

  function handleVoltar() {
    navigation.push({ pathname: '/home' })
  }

  return (
    <Background>
      <View className="flex h-[89%] flex-col items-center gap-16 rounded-t-[54px] bg-background pt-12">
        <View className="flex items-center">
          <View className="flex flex-row justify-center">
            <Text className="w-[60%] text-center text-2xl font-normal text-white max-[320px]:text-xl">
              Escreva o código de 6 dígitos enviado ao seu e-mail
            </Text>
          </View>
        </View>
        <View className="flex w-full justify-center items-center gap-6">
          <View className='flex flex-col gap-6'>
            <View className="flex w-[84%] flex-row justify-center ">
              <RecoveryCodeInput
                codes={codes!}
                onChangeCode={onChangeCode}
                refs={refs}
              />
            </View>
            <View className="ml-[2%] flex flex-col gap-4">
              <View className="-mt-2 flex w-full flex-row gap-4">
                <Text className="text-[10px] text-white">
                  Não recebeu um código?
                </Text>
                <Link href={'/'} className="text-[10px] text-[#D8A9FF]">
                  Reenviar
                </Link>
              </View>
            </View>
          </View>
        </View>

        <View className='w-[100vw] gap-12 px-[8%]'>
          <RoleMainButton type="gradient">
            <Text className="text-white">Entrar</Text>
          </RoleMainButton>
          <RoleMainButton type="simple" buttonFunction={() => handleVoltar()}>
            <Text className="text-white">Voltar</Text>
          </RoleMainButton>
        </View>
      </View>
    </Background>
  )
}
