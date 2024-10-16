import { signUpRequestDTO } from '@/api/types/auth_dto'
import { AuthContext } from '@/context/auth_context'
import TermsAndConditionsModal from '@/src/components/TermsAndConditionsModal'
import Background from '@/src/components/background'
import RoleInput from '@/src/components/input'
import RoleMainButton from '@/src/components/roleMainButton'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Link, router } from 'expo-router'
import React from 'react'
import { View, Pressable, Text, TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SignUp() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isChecked, setIsChecked] = React.useState(false)
  const [user, setUser] = React.useState('')
  const [userError, setUserError] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordError, setPasswordError] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('')
  const { signUp } = React.useContext(AuthContext)

  function verifyPassword() {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/
    const uppercaseLetterRegex = /[A-Z]/
    const lowercaseLetterRegex = /[a-z]/
    const numberRegex = /[0-9]/

    if (password.length < 6) {
      setPasswordError('Senha muito curta!')
    } else if (!specialCharacterRegex.test(password)) {
      setPasswordError('A senha deve conter pelo menos um caractere especial!')
    } else if (!uppercaseLetterRegex.test(password)) {
      setPasswordError('A senha deve conter pelo menos uma letra maiúscula!')
    } else if (!lowercaseLetterRegex.test(password)) {
      setPasswordError('A senha deve conter pelo menos uma letra minúscula!')
    } else if (!numberRegex.test(password)) {
      setPasswordError('A senha deve conter pelo menos um número!')
    } else if (password.trim() === '') {
      setPasswordError('Senha inválida!')
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Senhas não conferem!')
    } else {
      console.log('Senha válida!')
    }
  }

  interface SignUpResponse {
    message?: string
  }

  async function changePassword() {
    verifyPassword()

    const data = {
      name: user,
      email: email,
      password: password,
      acceptedTerms: isChecked
    }

    try {
      const response: SignUpResponse = await signUp(data)
      console.log(response)
      Toast.show({
        type: 'success',
        text1: 'Sucesso',
        text2: response.message || 'Cadastro realizado com sucesso!',
        visibilityTime: 3000,
        topOffset: 0,
      });
      await AsyncStorage.setItem('ScreenRequestToCode', 'sign-up')
      await AsyncStorage.setItem('user_email', email)
      await AsyncStorage.setItem('user_password', password)
      router.push('/recovery-code');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: error.message || 'Ocorreu um erro ao realizar o cadastro.',
        visibilityTime: 3000,
        topOffset: 0
      })
    }
  }

  function handleIsVisible() {
    return () => setIsVisible(!isVisible)
  }

  function handleUserChange(text: string) {
    setUser(text)
    if (userError) setUserError('') // Reseta o erro ao digitar
  }

  function handleEmailChange(text: string) {
    setEmail(text)
    if (emailError) setEmailError('') // Reseta o erro ao digitar
  }

  function handlePasswordChange(text: string) {
    setPassword(text)
    if (passwordError) setPasswordError('') // Reseta o erro ao digitar
  }

  function handleConfirmPasswordChange(text: string) {
    setConfirmPassword(text)
    if (confirmPasswordError) setConfirmPasswordError('') // Reseta o erro ao digitar
  }

  return (
    <Background>
      <View className="flex h-[89%] w-full flex-col items-center gap-11 rounded-t-[54px] bg-background">
        <View className="flex items-center">
          <View className="flex flex-row gap-[5px]">
            <Text className="text-2xl font-nunitoBold text-white max-[320px]:text-xl">
              Crie sua conta
            </Text>
          </View>
          <Text className="text-2xl text-white max-[320px]:text-xl font-nunito">
            O <Text className="font-nunitoBold">ROLE</Text> vai te surpreender!
          </Text>
        </View>
        <View className="flex w-full items-center">
          <View className="w-[72%]">
            <RoleInput
              type="user"
              value={user}
              onChangeText={handleUserChange}
              error={userError}
            />
          </View>
          <View className="mt-2 flex w-full items-center">
            <View className="w-[72%]">
              <RoleInput
                type="email"
                value={email}
                onChangeText={handleEmailChange}
                error={emailError}
              />
            </View>
            <View className="mt-2 flex w-full items-center">
              <View className="w-[72%]">
                <RoleInput
                  type="hidden-password"
                  value={password}
                  onChangeText={handlePasswordChange}
                  error={passwordError}
                />
              </View>
            </View>
            <View className="mt-2 flex w-full items-center">
              <View className="w-[72%]">
                <RoleInput
                  type="hidden-confirm-password"
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  error={confirmPasswordError}
                />
              </View>
            </View>
            <View className="mt-5 w-2/3 flex flex-row items-center  justify-center gap-3">
              <Pressable onPress={() => setIsChecked(!isChecked)}>
                {isChecked ? (
                  <Ionicons name="checkbox-outline" size={24} color="white" />
                ) : (
                  <Ionicons name="square-outline" size={24} color="white" />
                )}
              </Pressable>
              <Text className="flex items-center font-nunito justify-center text-xs text-white">
                Eu li e concordo com os{' '}
                <Text onPress={handleIsVisible()} className="text-[#D8A9FF] font-nunitoBold">
                  termos de uso
                </Text>{' '}
                e política de privacidade
              </Text>
            </View>
          </View>
        </View>
        <View className="w-full gap-8 px-[8%]">
          <RoleMainButton
            type="gradient"
            buttonFunction={() => changePassword()}
          >
            <Text className="text-white font-nunito">Cadastrar</Text>
          </RoleMainButton>
          <RoleMainButton type="simple">
            <FontAwesome6 name="google" size={24} color="white" />
            <Text className="text-white font-nunito">Cadastrar via Google</Text>
          </RoleMainButton>
        </View>
        <View className="flex flex-row gap-2">
          <Text className="text-sm text-white font-nunito">Já possui uma conta?</Text>
          <Link href={'/'} className="text-sm text-[#D8A9FF] font-nunitoBold">
            Entrar
          </Link>
        </View>
      </View>
      <TermsAndConditionsModal isVisible={isVisible} />
    </Background>
  )
}
