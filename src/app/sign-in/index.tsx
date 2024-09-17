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
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

WebBrowser.maybeCompleteAuthSession()
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '@/context/auth_context'

export default function Index() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const { signIn } = useContext(AuthContext)
  const [disabledB, setDisabledB] = useState(true)

  const [request, responseGoogle, promptAsyncGoogle] = Google.useIdTokenAuthRequest({
    clientId: '469140650893-s1ajgpbpvtkhmg607hlgksmkvo8fmj42.apps.googleusercontent.com',
    scopes: ['email', 'profile'],
    iosClientId: '469140650893-hlqn9g7ngejghi571aevjpqnp570mh58.apps.googleusercontent.com',
    androidClientId: '469140650893-3op6l9dvib6q2vi2kbq52uclcqqmog6m.apps.googleusercontent.com'
  })

  async function getUserInfoFromOAuth(accessToken: string) {
    const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    const userInfo = await response.json()
    console.log(userInfo)
  }

  useEffect(() => {
    if (responseGoogle?.type === 'success') {
      console.log(responseGoogle);
      const { authentication } = responseGoogle;
      console.log(authentication);
      const accessToken = authentication?.accessToken
      accessToken && getUserInfoFromOAuth(accessToken);
    }
  }, [responseGoogle])


  function handleEmailChange(text: string) {
    setEmail(text)
    if (emailError) setEmailError('') // Reseta o erro ao digitar
  }

  function handlePasswordChange(text: string) {
    setPassword(text)
    if (passwordError) setPasswordError('') // Reseta o erro ao digitar
  }

  async function Login() {
    if (!email || !password) {
      if (!email) setEmailError('Email obrigatório')
      if (!password) setPasswordError('Senha obrigatória')
      return
    }

    const response = await signIn({ email, password })
    setEmailError(response.toString())
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
              <Text className="text-xs text-white">Esqueceu sua senha?</Text>
              <Link className="text-xs text-[#D8A9FF]" href="/forgot-password">
                Recuperar senha
              </Link>
            </View>
          </View>
        </View>
        <View className="gap-12 px-[8%]">
          <RoleMainButton type="gradient" buttonFunction={Login}>
            <Text className="text-white">Entrar</Text>
          </RoleMainButton>
          <RoleMainButton type="simple" buttonFunction={() => promptAsyncGoogle()}>
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
