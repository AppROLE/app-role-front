import { finishSignUpRequestDTO, finishSignUpResponseDTO, forgotPaaswordResponseDTO, signUpRequestDTO } from '@/api/types/auth_dto'
import { createContext, PropsWithChildren } from 'react'
import { AuthRepositoryHttp } from '@/api/repositories/auth_repository_http'

type AuthContextType = {
  signIn: (email: string, password: string) => Promise<object>
  signUp: (data: signUpRequestDTO) => Promise<object>
  forgotPassword: (email: string) => Promise<forgotPaaswordResponseDTO>
  finishSignUp: (data: finishSignUpRequestDTO) => Promise<finishSignUpResponseDTO>
  uploadImageProfile: (formData: FormData) => Promise<object>
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
  finishSignUp: async (_data: finishSignUpRequestDTO) => {
    return {
      message: ''
    }
  },
  uploadImageProfile: async (_formData: FormData) => {
    return {}
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

  async function finishSignUp(data: finishSignUpRequestDTO) {
    try {
      const response = await authRepository.finishSignUp(data)
      console.log("RESPOSTA DA REQ FINISH SIGN UP CONTEXT" + response);
      return response
    } catch (error: any) {
      return error
    }
  }

  async function uploadImageProfile(formData: FormData) { 
    try {
      const response = await authRepository.uploadImageProfile(formData);
      console.log("RESPOSTA DO UPLOAD IMAGE PROFILE CONTEXT" + response);
      return response;
    } catch (error: any) { 
      console.log(error);
      return error;
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signUp, forgotPassword, finishSignUp, uploadImageProfile }}>
      {children}
    </AuthContext.Provider>
  )
}
