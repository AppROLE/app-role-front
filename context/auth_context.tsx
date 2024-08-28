import { signUpRequestDTO } from '@/api/types/auth_dto'
import { createContext, PropsWithChildren } from 'react'
import { AuthRepositoryHttp } from '@/api/repositories/auth_repository_http'

type AuthContextType = {
  signIn: (email: string, password: string) => Promise<object>
  signUp: (data: signUpRequestDTO) => Promise<object>
}

const defaultAuthContext = {
  signIn: async (_email: string, _password: string) => {
    return {}
  },
  signUp: async (_data: signUpRequestDTO) => {
    return {}
  }
}

const AuthContext = createContext<AuthContextType>(defaultAuthContext)

export function AuthContextProvider({ children }: PropsWithChildren) {
  const authRepository = new AuthRepositoryHttp()

  async function signIn(email: string, password: string) {
    try {
      const response = await authRepository.signIn(email, password)
      return response
    } catch (error) {
      return error
    }
  }

  async function signUp(data: signUpRequestDTO) {
    try {
      const response = await authRepository.signUp(data)
      return response
    } catch (error) {
      return error
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}