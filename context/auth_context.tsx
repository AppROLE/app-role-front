import {
  confirmCodeResponseDTO, signUpRequestDTO, finishSignUpRequestDTO, finishSignUpResponseDTO,
  signInRequestDTO, signInResponseDTO, confirmForgotPasswordResponseDTO, forgotPasswordResponseDTO,
  confirmForgotPasswordRequestDTO, deleteAccountResponseDTO,
  updateProfileRequestDTO,
  updateProfileResponseDTO,
  followResponseDTO,
  updateImageProfileResponseDTO,
} from '@/api/types/auth_dto'
import { createContext, PropsWithChildren } from 'react'
import { AuthRepositoryHttp } from '@/api/repositories/auth_repository_http'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'

type AuthContextType = {
  signIn: (data: signInRequestDTO) => Promise<signInResponseDTO>
  signUp: (data: signUpRequestDTO) => Promise<object>
  resendCode: (email: string) => Promise<{ message: string }>
  confirmForgotPassword: (data: confirmForgotPasswordRequestDTO) => Promise<confirmForgotPasswordResponseDTO>
  forgotPassword: (email: string) => Promise<forgotPasswordResponseDTO>
  finishSignUp: (data: finishSignUpRequestDTO) => Promise<finishSignUpResponseDTO>
  uploadImageProfile: (formData: FormData) => Promise<updateImageProfileResponseDTO>
  confirmCode: (email: string, code: string) => Promise<confirmCodeResponseDTO>
  deleteAccount: () => Promise<deleteAccountResponseDTO>
  updateProfile: (data: updateProfileRequestDTO) => Promise<updateProfileResponseDTO>
  followUser: (followedUsername: string) => Promise<followResponseDTO>
}

const defaultAuthContext = {
  signIn: async (_data: signInRequestDTO) => {
    return {
      accessToken: '',
      idToken: '',
      refreshToken: ''
    }
  },
  signUp: async (_data: signUpRequestDTO) => {
    return {}
  },
  forgotPassword: async (_email: string) => {
    return {
      message: ''
    }
  },
  resendCode: async (_email: string) => {
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
    return {
      message: ''
    }
  },
  confirmCode: async (_email: string, _code: string) => {
    return {
      message: ''
    }
  },
  confirmForgotPassword: async (_data: confirmForgotPasswordRequestDTO) => {
    return {
      message: ''
    }
  },
  deleteAccount: async () => {
    return {
      message: ''
    }
  },
  updateProfile: async (_data: updateProfileRequestDTO) => {
    return {
      message: ''
    }
  },
  followUser: async (_followedUsername: string) => {
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
      if (response.accessToken) {
        await AsyncStorage.setItem('accessToken', response.accessToken)
        await AsyncStorage.setItem('idToken', response.idToken)
        await AsyncStorage.setItem('refreshToken', response.refreshToken)
        router.replace('/(tabs)/profile')
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
      await AsyncStorage.setItem('email', data.email);
      await AsyncStorage.setItem('password', data.password);

      return response
    } catch (error: any) {
      throw error
    }
  }

  async function forgotPassword(email: string) {
    try {
      const response = await authRepository.forgotPassword({ email: email })
      return response
    } catch (error: any) {
      return error
    }
  }

  async function finishSignUp(data: finishSignUpRequestDTO) {
    try {
      const response = await authRepository.finishSignUp(data)
      console.log("RESPOSTA DA REQ FINISH SIGN UP CONTEXT ", response);
      await AsyncStorage.removeItem('email');
      return response
    } catch (error: any) {
      return {
        message: error
      }
    }
  }

  async function uploadImageProfile(formData: FormData) {
    try {
      const response = await authRepository.uploadImageProfile(formData);
      console.log("RESPOSTA DO UPLOAD IMAGE PROFILE CONTEXT ", response);
      return response as updateImageProfileResponseDTO;
    } catch (error: any) {
      console.log(error);
      return {
        message: error
      }
    }
  }

  async function confirmCode(email: string, code: string) {
    try {
      const response = await authRepository.confirmCode({ email, code })
      return response
    } catch (error: any) {
      return error
    }
  }

  async function confirmForgotPassword(data: confirmForgotPasswordRequestDTO) {
    try {
      const response = await authRepository.confirmForgotPassword(data)
      return response as confirmForgotPasswordResponseDTO
    } catch (error: any) {
      return {
        message: error
      }
    }
  }

  async function resendCode(email: string) {
    try {
      const response = await authRepository.resendCode({ email })
      return response
    } catch (error: any) {
      return error
    }
  }

  async function deleteAccount() {
    try {
      const response = await authRepository.deleteAccount();
      return response;
    } catch (error: any) {
      return error;

    }
  }

  async function updateProfile(data: updateProfileRequestDTO) { 
    try {
      const response = await authRepository.updateProfile(data)
      return response
    } catch (error: any) {
      return error
    }
  }

  async function followUser(followedUsername: string) {
    try {
      const response = await authRepository.follow(followedUsername)
      return response
    } catch (error: any) {
      return error
    }
  }

  return (

    <AuthContext.Provider value={{ signIn, signUp, forgotPassword, confirmCode, finishSignUp, uploadImageProfile, confirmForgotPassword, resendCode, deleteAccount, updateProfile, followUser }}>
      {children}
    </AuthContext.Provider>
  )
}
