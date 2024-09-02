import TermsAndConditionsModal from '@/src/components/TermsAndConditionsModal'
import Background from '@/src/components/background'
import RoleInput from '@/src/components/input'
import RoleMainButton from '@/src/components/roleMainButton'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Link } from 'expo-router'
import React from 'react'
import { View, Pressable, Text } from 'react-native'

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

  function changePassword() {
    verifyPassword()
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
            <Text className="text-2xl font-bold text-white max-[320px]:text-xl">
              Crie sua conta
            </Text>
          </View>
          <Text className="text-2xl text-white max-[320px]:text-xl">
            O <Text className="font-bold">ROLE</Text> vai te surpreender!
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
          <View className="mt-4 flex w-full items-center">
            <View className="w-[72%]">
              <RoleInput
                type="email"
                value={email}
                onChangeText={handleEmailChange}
                error={emailError}
              />
            </View>
            <View className="mt-4 flex w-full items-center">
              <View className="w-[72%]">
                <RoleInput
                  type="hidden-password"
                  value={password}
                  onChangeText={handlePasswordChange}
                  error={passwordError}
                />
              </View>
            </View>
            <View className="mt-4 flex w-full items-center">
              <View className="w-[72%]">
                <RoleInput
                  type="hidden-confirm-password"
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  error={confirmPasswordError}
                />
              </View>
            </View>
            <View className="mt-14 flex flex-row justify-center gap-3">
              <Pressable onPress={() => setIsChecked(!isChecked)}>
                {isChecked ? (
                  <Ionicons name="checkbox-outline" size={24} color="white" />
                ) : (
                  <Ionicons name="square-outline" size={24} color="white" />
                )}
              </Pressable>
              <Text className="w-3/4 text-xs text-white">
                Eu li e concordo com os {''}
                <Pressable onPress={handleIsVisible()}>
                  <Text className="text-[#D8A9FF]">termos de uso</Text>
                </Pressable>{' '}
                e política de privacidade
              </Text>
            </View>
          </View>
        </View>
        <View className="w-full gap-12 px-[8%]">
          <RoleMainButton
            type="gradient"
            buttonFunction={() => changePassword()}
          >
            <Text className="text-white">Entrar</Text>
          </RoleMainButton>
          <RoleMainButton type="simple">
            <FontAwesome6 name="google" size={24} color="white" />
            <Text className="text-white">Entrar via Google</Text>
          </RoleMainButton>
        </View>
        <View className="mt-7 flex flex-row gap-2">
          <Text className="text-sm text-white">Ja possui uma conta?</Text>
          <Link href={'/'} className="text-sm text-[#D8A9FF]">
            Entrar
          </Link>
        </View>
      </View>
      <TermsAndConditionsModal isVisible={isVisible} />
    </Background>
  )
}
