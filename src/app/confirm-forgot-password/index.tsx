import Background from '@/src/components/background'
import { Text, View } from 'react-native'
import RoleInput from '@/src/components/input'
import RoleMainButton from '@/src/components/roleMainButton'
import { useState } from 'react'

export default function ConfirmForgotPassword() {
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

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

  function handlePasswordChange(text: string) {
    setPassword(text)
    if (passwordError) setPasswordError('') // Reseta o erro ao digitar
  }

  function handleConfirmPasswordChange(text: string) {
    setConfirmPassword(text)
    if (confirmPasswordError) setConfirmPasswordError('') // Reseta o erro ao digitar
  }

  return (
    <>
      <Background>
        <View className="w-full">
          <View>
            <Text className="text-center text-[22px] font-bold text-white">
              Crie sua nova senha
            </Text>
          </View>
          <View className="my-12 gap-4 px-[15%]">
            <RoleInput
              type="password"
              value={password}
              onChangeText={handlePasswordChange}
              error={passwordError}
            />
            <RoleInput
              type="confirm-password"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              error={confirmPasswordError}
            />
          </View>
          <View className="px-[8%]">
            <RoleMainButton type="gradient" buttonFunction={changePassword}>
              <Text className="text-white">Trocar Senha</Text>
            </RoleMainButton>
          </View>
        </View>
      </Background>
    </>
  )
}
