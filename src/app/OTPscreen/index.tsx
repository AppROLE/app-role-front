import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity
} from 'react-native'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useNavigation, useRouter } from 'expo-router'
import { OTPInput } from '@/src/components/OTPInput'
import { useRef, useState } from 'react'

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

export default function Index() {
  const navigation = useRouter()
  const [codes, setCodes] = useState<string[]>(Array(6).fill(''))
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

  return (
    <LinearGradient
      style={{ flex: 1 }}
      className="flex h-screen w-full"
      colors={[
        '#10002B',
        '#240046',
        '#3C096C',
        '#5A189A',
        '#9C4EDC',
        '#DFA9FD'
      ]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View
        style={{ marginTop: statusBarHeight }}
        className="flex h-full w-full flex-col justify-between gap-4"
      >
        <Image
          style={{
            width: 140, // Ajuste aqui para o tamanho desejado
            height: 70 // Ajuste aqui para o tamanho desejado
          }}
          source={require('../../../assets/images/ROLE.png')}
          className="ml-6 mt-4"
        />
        <View className="flex h-[89%] flex-col items-center gap-16 rounded-t-[54px] bg-background pt-12">
          <View className="flex items-center">
            <View className="flex flex-row justify-center">
              <Text className="w-[89%] text-center text-2xl font-normal text-white max-[320px]:text-xl">
                Escreva o código de 6 dígitos enviado ao seu e-mail
              </Text>
            </View>
          </View>
          <View className="flex w-full gap-6">
            <View className="flex w-full flex-row justify-center">
              <OTPInput
                codes={codes!}
                onChangeCode={onChangeCode}
                refs={refs}
              />
            </View>
            <View className="ml-[10%] flex flex-col gap-4">
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

          <LinearGradient
            style={{
              width: '86%',
              borderRadius: 16,
              shadowColor: 'rgba(255, 255, 255, 0.134)', // Cor da sombra
              shadowOffset: { width: 0, height: 0 }, // Deslocamento da sombra
              shadowOpacity: 1, // Opacidade da sombra
              shadowRadius: 11, // Raio de desfoque
              elevation: 10
            }}
            colors={['#3C096C', '#5A189A', '#9C4EDC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Pressable className="w-full items-center py-2">
              <Text className="text-white">Entrar</Text>
            </Pressable>
          </LinearGradient>
          <Pressable
            className="-mt-6 flex w-[86%] flex-row items-center justify-center gap-3 rounded-2xl bg-button-color py-2"
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.back()
              } else {
                navigation.push({pathname: '/sign-in'})
              }
            }}
          >
            <Text className="text-white">Voltar</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  )
}
