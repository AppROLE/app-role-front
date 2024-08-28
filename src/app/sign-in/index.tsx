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
    setEmail(text);
    if (emailError) setEmailError(''); // Reseta o erro ao digitar
  }
  
  function handlePasswordChange(text: string) {
    setPassword(text);
    if (passwordError) setPasswordError(''); // Reseta o erro ao digitar
}

  return (
    <Background>
      <View className='flex-1 w-full'>
        <View className='px-[8%] flex flex-col justify-center'>
          <Text className='text-white text-center text-xl'>Já está com saudade de um <Text className='font-bold'>ROLE</Text>?</Text>
          <Text className='text-white text-xl font-bold text-center'>Bem vindo(a) de volta!</Text>
        </View>
        <View className='px-[15%] my-12 gap-8'>
          <RoleInput type='email' value={email} onChangeText={handleEmailChange} error={emailError}/>
          <View className='gap-2'>
            <RoleInput type='hidden-password' value={password} onChangeText={handlePasswordChange} error={passwordError}/>
            <View className='text-xs gap-4 flex flex-row'>
              <Text className='text-white'>Esqueceu sua senha?</Text>
              <Link className='text-[#D8A9FF]' href='/forgot-password'>
                Recuperar senha
              </Link>
            </View>
          </View>
        </View>
        <View className='px-[8%] gap-12'>
          <RoleMainButton type="gradient">
            Entrar
          </RoleMainButton>
          <RoleMainButton type="simple">
            <FontAwesome6 name="google" size={24} color="white" />
            Entrar via Google
          </RoleMainButton>
        </View>
        <View className='flex-grow' />
        <View className='py-4 mb-12'>
          <View className='flex flex-row justify-center mx-auto gap-2'>
            <Text className='text-[#BDBDBD]'>Não possui uma conta?</Text>
            <Link className='text-[#D8A9FF]' href='/'>Criar Conta</Link>
          </View>
        </View>
      </View>
    </Background>
  )
}
