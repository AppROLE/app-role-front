import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  Pressable
} from 'react-native'
import Constants from 'expo-constants'
import { LinearGradient } from 'expo-linear-gradient'
import Entypo from '@expo/vector-icons/Entypo'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Link } from 'expo-router'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

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
            <View className="flex flex-row gap-[5px]">
              <Text className="text-2xl text-white">
                Já tá com saudade de um
              </Text>
              <Text className="text-2xl font-bold text-white">ROLE?</Text>
            </View>
            <Text className="text-2xl font-bold text-white">
              Bem vindo(a) de volta!
            </Text>
          </View>

          <View className="w-[65%]">
            <View className="w-full">
              <View className="flex w-full flex-row gap-2 border-b-[1px] border-WHITE">
                <Entypo name="mail" size={24} color="white" />
                <TextInput
                  placeholder="E-mail"
                  className="w-[80%] text-white placeholder:text-white"
                />
              </View>
              <TextInput />
            </View>
            <View className="w-full">
              <View className="flex w-full flex-row gap-2 border-b-[1px] border-WHITE">
                <Ionicons name="key" size={24} color="white" />
                <TextInput
                  placeholder="Senha"
                  className="w-[80%] text-white placeholder:text-white"
                  secureTextEntry
                />
              </View>
              <TextInput />
            </View>
            <View className="-mt-2 flex w-[65%] flex-row gap-4">
              <Text className="text-[10px] text-white">
                Esqueceu sua senha?
              </Text>
              <Link href={'/'} className="text-[10px] text-blue-500">
                Recuperar senha
              </Link>
            </View>
          </View>

          <LinearGradient
            style={{
              width: '65%',
              borderRadius: 16,
              shadowColor: 'rgba(51, 104, 240, 0.55)', // Cor da sombra
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
          <Pressable className="-mt-6 flex w-[65%] flex-row items-center justify-center gap-3 rounded-2xl bg-button-color py-2">
            <FontAwesome6 name="google" size={16} color="white" />
            <Text className="text-white">Entre via Google</Text>
          </Pressable>
          <View className="mt-52 flex flex-row gap-2">
            <Text className="text-sm text-white">Não possui uma conta?</Text>
            <Link href={'/'} className="text-sm text-blue-500">
              Criar conta
            </Link>
            <Link href={'/almost-there'} className='text-white'>Sign In</Link>
          </View>
        </View>
      </View>
    </LinearGradient>
  )
}
