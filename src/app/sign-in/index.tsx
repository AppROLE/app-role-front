import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  Pressable
} from 'react-native'
import { Link } from 'expo-router'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Background from '@/src/components/background'
import RoleMainButton from '@/src/components/roleMainButton'
import RoleInput from '@/src/components/input'
import { useState } from 'react'

export default function Index() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function handleEmailChange(text: string) {
    setEmail(text)
    if (emailError) setEmailError('') // Reseta o erro ao digitar
  }

  function handlePasswordChange(text: string) {
    setPassword(text)
    if (passwordError) setPasswordError('') // Reseta o erro ao digitar
  }

  return (
    <Background>
      <View className="w-full flex-1">
        <View className="flex flex-col justify-center px-[8%]">
          <Text className="text-center text-xl text-white">
            Já está com saudade de um <Text className="font-bold">ROLE</Text>?
          </Text>
          <Text className="text-center text-xl font-bold text-white">
            Bem vindo(a) de volta!
          </Text>
        </View>
        <View className="my-12 gap-1 px-[15%]">
          <RoleInput
            type="email"
            value={email}
            onChangeText={handleEmailChange}
            error={emailError}
          />
          <View className="gap-0">
            <RoleInput
              type="hidden-password"
              value={password}
              onChangeText={handlePasswordChange}
              error={passwordError}
            />
            <View className="flex flex-row gap-2">
              <Text className="text-white text-xs">Esqueceu sua senha?</Text>
              <Link className="text-[#D8A9FF] text-xs" href="/forgot-password">
                Recuperar senha
              </Link>
            </View>
          </View>
        </View>
        <View className="gap-12 px-[8%]">
          <RoleMainButton type="gradient">
            <Text className="text-white">Entrar</Text>
          </RoleMainButton>
          <RoleMainButton type="simple">
            <FontAwesome6 name="google" size={24} color="white" />
            <Text className="text-white">Entrar via Google</Text>
          </RoleMainButton>
        </View>
        <View className="flex-grow" />
        <View className="mb-16 py-4">
          <View className="mx-auto flex flex-row justify-center gap-2">
            <Text className="text-[#BDBDBD]">Não possui uma conta?</Text>
            <Link className="text-[#D8A9FF]" href="/">
              Criar Conta
            </Link>
          </View>
        </View>
      </View>
    </Background>
  )
}
