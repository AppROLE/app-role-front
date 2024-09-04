import { confirmForgotPasswordResponseDTO, forgotPaaswordResponseDTO, signUpRequestDTO } from '@/api/types/auth_dto'
import { createContext, PropsWithChildren } from 'react'
import { AuthRepositoryHttp } from '@/api/repositories/auth_repository_http'
import { confirmForgotPasswordRequestDTO } from '@/api/types/auth_dto';

type AuthContextType = {
  signIn: (email: string, password: string) => Promise<object>
  signUp: (data: signUpRequestDTO) => Promise<object>
  forgotPassword: (email: string) => Promise<forgotPaaswordResponseDTO>
  confirmForgotPassword: (data: confirmForgotPasswordRequestDTO) => Promise<confirmForgotPasswordResponseDTO>
}

const defaultAuthContext = {
  signIn: async (_email: string, _password: string) => {
    return {}
  },
  signUp: async (_data: signUpRequestDTO) => {
    return {}
  },
  forgotPassword: async (_email: string) => {
    return {
      message: ''
    }
  },
  confirmForgotPassword: async (_data: confirmForgotPasswordRequestDTO) => {
    return {
      message: ''
    }
  }
}

export const AuthContext = createContext<AuthContextType>(defaultAuthContext)

export function AuthContextProvider({ children }: PropsWithChildren) {
  const authRepository = new AuthRepositoryHttp()

  async function signIn(email: string, password: string) {
    try {
      const response = await authRepository.signIn(email, password)
      return response
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
  
  async function confirmForgotPassword(data: confirmForgotPasswordRequestDTO) {
    try {
      const response = await authRepository.confirmForgotPassword(data)
      console.log('response')
      console.log(response)
      return response as confirmForgotPasswordResponseDTO
    } catch (error: any) {
      console.log('error')
      console.log(error.reponse)
      return error
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, forgotPassword, confirmForgotPassword }}>
      {children}
    </AuthContext.Provider>
  )
}
