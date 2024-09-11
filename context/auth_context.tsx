import { forgotPaaswordResponseDTO, signInRequestDTO, signInResponseDTO, signUpRequestDTO } from '@/api/types/auth_dto'
import { createContext, PropsWithChildren } from 'react'
import { AuthRepositoryHttp } from '@/api/repositories/auth_repository_http'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

type AuthContextType = {
  signIn: (data: signInRequestDTO) => Promise<signInResponseDTO>
  signUp: (data: signUpRequestDTO) => Promise<object>
  forgotPassword: (email: string) => Promise<forgotPaaswordResponseDTO>
}

const defaultAuthContext = {
  signIn: async (_data: signInRequestDTO) => {
    return {
      access_token: '',
      id_token: '',
      refresh_token: ''
    }
  },
  signUp: async (_data: signUpRequestDTO) => {
    return {}
  },
  forgotPassword: async (_email: string) => {
    return {
      message: ''
    }
  }
}

export const AuthContext = createContext<AuthContextType>(defaultAuthContext)

export function AuthContextProvider({ children }: PropsWithChildren) {
  const authRepository = new AuthRepositoryHttp()

  async function signIn(data: signInRequestDTO) {
    try {
      const response = await authRepository.signIn(data)
      if (response.access_token) {
        await AsyncStorage.setItem('access_token', response.access_token)
        await AsyncStorage.setItem('id_token', response.id_token)
        await AsyncStorage.setItem('refresh_token', response.refresh_token)
        router.replace('/(tabs)/home')
        return ''
      }
      else {
        return response
      }
    } catch (error: any) {
      return error
    }
  }

  async function signUp(data: signUpRequestDTO) {
    try {
      const response = await authRepository.signUp(data)
      return response
    } catch (error: any) {
      return error
    }
  }

  async function forgotPassword(email: string) {
    try {
      const response = await authRepository.forgotPassword({ email })
      return response
    } catch (error: any) {
      return error
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  )
}
