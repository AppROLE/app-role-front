import Background from '@/src/components/background'
import {ActivityIndicator, Text, View} from 'react-native'
import RoleInput from '@/src/components/input'
import RoleMainButton from '@/src/components/roleMainButton'
import React, { useState, useContext } from 'react'
import { AuthContext } from '@/context/auth_context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import Toast, {ErrorToast} from "react-native-toast-message";

export default function ConfirmForgotPassword() {
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [buttonDebounce, setButtonDebounce] = useState(false)
  const {confirmForgotPassword} = useContext(AuthContext)

  function verifyPassword() {
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/
  
    if (!passwordRegex.test(password)) {
      setPasswordError('A senha deve ter no mínimo 6 caracteres, incluindo pelo menos um caractere especial, uma letra maiúscula, uma letra minúscula e um número!')
      return false
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Senhas não conferem!')
      return false
    } else {
      return true
    }
  }

  async function changePassword() {
    setButtonDebounce(true)
    if(verifyPassword()){
      const email = (await AsyncStorage.getItem('user_email')) || ''
      const response = await confirmForgotPassword({email: email, newPassword: password})
      if(response.message === 'Redefinição de senha realizada com sucesso!'){
        setButtonDebounce(false)
        router.push('/sign-in')
      }
      else{
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: response.message || 'Ocorreu um erro ao trocar a senha.',
          visibilityTime: 3000,
          topOffset: 0,
        });
      }
    }
    setButtonDebounce(false)
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
            <Text className="text-center text-[22px] font-nunitoBold text-white">
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
            <RoleMainButton type="gradient" buttonFunction={changePassword} disabled={buttonDebounce}>
              {buttonDebounce ?
                  <ActivityIndicator color={'white'}/>
                  :
                  <Text className="text-white font-nunito">Trocar Senha</Text>
              }
            </RoleMainButton>
          </View>
          <Toast config={{
            error: (props) => (
                <ErrorToast
                    {...props}
                    style={{
                      backgroundColor: '#240046',
                    }}
                    text1Style={{
                      fontSize: 17,
                      color: 'white',
                      fontFamily: 'NunitoBold',
                    }}
                    text2Style={{
                      fontSize: 15,
                      color: 'white',
                      fontFamily: 'Nunito',
                    }}
                />
            ),
          }}/>
        </View>
      </Background>
    </>
  )
}
