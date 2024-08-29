<<<<<<< HEAD
import Background from '@/src/components/background'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Ionicons from '@expo/vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'
import React from 'react'
import { View, TextInput, Pressable, Text } from 'react-native'

export default function SignUp() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [isChecked, setIsChecked] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [passwordError, setPasswordError] = React.useState('')
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
            <View className="flex w-full flex-row gap-2 border-b-[1px] border-WHITE">
              <Ionicons name="person" size={24} color="white" />
              <TextInput
                placeholder="Nome Completo:"
                className="w-[86%] text-sm text-white placeholder:text-white max-[320px]:text-xs"
              />
            </View>
          </View>
          <View className="mt-4 flex w-full items-center">
            <View className="w-[72%]">
              <View className="flex w-full flex-row gap-2 border-b-[1px] border-WHITE">
                <Entypo name="mail" size={24} color="white" />
                <TextInput
                  placeholder="E-mail:"
                  className="w-[86%] text-sm text-white placeholder:text-white max-[320px]:text-xs"
                />
              </View>
            </View>
            <View className="mt-4 flex w-full items-center">
              <View className="w-[72%]">
                <View className="flex w-full flex-row gap-2 border-b-[1px] border-WHITE">
                  <Ionicons name="key" size={24} color="white" />
                  <TextInput
                    placeholder="Senha:"
                    className="w-[86%] text-sm text-white placeholder:text-white max-[320px]:text-xs"
                    secureTextEntry={!isVisible}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <Pressable onPress={() => setIsVisible(!isVisible)}>
                    {isVisible ? (
                      <Ionicons name="eye-outline" size={24} color="white" />
                    ) : (
                      <Ionicons
                        name="eye-off-outline"
                        size={24}
                        color="white"
                      />
                    )}
                  </Pressable>
                </View>
                {passwordError ? (
                  <Text className="mt-1 text-xs text-red-400">
                    {passwordError}
                  </Text>
                ) : null}
              </View>
            </View>
            <View className="mt-4 flex w-full items-center">
              <View className="w-[72%]">
                <View className="flex w-full flex-row gap-2 border-b-[1px] border-WHITE">
                  <Ionicons name="key" size={24} color="white" />
                  <TextInput
                    placeholder="Confirme sua senha:"
                    className="w-[86%] text-sm text-white placeholder:text-white max-[320px]:text-xs"
                    secureTextEntry={!isVisible}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <Pressable onPress={() => setIsVisible(!isVisible)}>
                    {isVisible ? (
                      <Ionicons name="eye-outline" size={24} color="white" />
                    ) : (
                      <Ionicons
                        name="eye-off-outline"
                        size={24}
                        color="white"
                      />
                    )}
                  </Pressable>
                </View>
                {confirmPasswordError ? (
                  <Text className="mt-1 text-xs text-red-400">
                    {confirmPasswordError}
                  </Text>
                ) : null}
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
                Eu li e concordo com os{' '}
                <Text className="text-[#D8A9FF]">termos de uso</Text> e política
                de privacidade
              </Text>
            </View>
          </View>
        </View>
        <LinearGradient
          style={{
            width: '86%',
            borderRadius: 16,
            shadowColor: 'rgba(255, 255, 255, 0.264)', // Cor da sombra
            shadowOffset: { width: 0, height: 0 }, // Deslocamento da sombra
            shadowOpacity: 1, // Opacidade da sombra
            shadowRadius: 11, // Raio de desfoque
            elevation: 10
          }}
          colors={['#3C096C', '#5A189A', '#9C4EDC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Pressable
            className="w-full items-center py-2"
            onPress={() => changePassword()}
          >
            <Text className="text-white">Cadastrar</Text>
          </Pressable>
        </LinearGradient>
        <Pressable className="-mt-6 flex w-[86%] flex-row items-center justify-center gap-3 rounded-2xl bg-button-color py-2">
          <FontAwesome6 name="google" size={16} color="white" />
          <Text className="text-white">Cadastrar-se via Google</Text>
        </Pressable>
        <View className="mt-7 flex flex-row gap-2">
          <Text className="text-sm text-white">Ja possui uma conta?</Text>
          <Link href={'/'} className="text-sm text-[#D8A9FF]">
            Entrar
          </Link>
        </View>
      </View>
    </Background>
  )
=======
export default function SignUp() {
  return <></>
>>>>>>> dev
}
