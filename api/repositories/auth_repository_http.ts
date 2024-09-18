import { router } from 'expo-router';
import { http } from '../http'
import { signInRequestDTO, signInResponseDTO } from '../types/auth_dto'
import { finishSignUpRequestDTO } from '../types/auth_dto'
import { confirmForgotPasswordRequestDTO, confirmForgotPasswordResponseDTO } from '../types/auth_dto'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { forgotPasswordRequestDTO } from '../types/auth_dto'
import { confirmCodeRequestDTO } from '../types/auth_dto'


export class AuthRepositoryHttp {
  async signIn(data: signInRequestDTO) {
    try {
      const response = await http.post(`/sign-in`, data)
      return response.data as signInResponseDTO
    } catch (error: any) {
      return error.response.data
    }
  }

  async signUp(data: object) {
    try {
      const response = await http.post('/sign-up', data)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  }

  async forgotPassword(data: forgotPasswordRequestDTO) {
    try {
      const response = await http.post('/forgot-password', data)
      return response.data as forgotPasswordRequestDTO
    } catch (error: any) {
      return error.response.data
    }
  }

  async finishSignUp(data: object) {
    try {
      const response = await http.post('/finish-sign-up', data)
      
      if (response?.status === 201) {
        router.replace('/home');
      }
      if (response?.status === 409) { 
        alert('Usuário já cadastrado');
      }

      console.log("RESPOSTA DA REQ FINISH SIGN UP");
      console.log(response.data);

      return response.data as finishSignUpRequestDTO;
    } catch (error: any) {
      console.log(error)
      return error.response.data
    }
  }

  async uploadImageProfile(formData: FormData) {
    try {
      const response = await http.post('/upload-image-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("RESPOSTA DA REQ IMAGE PROFILE" + response);
      return response;
    } catch (error: any) {
      console.log(error);
      return error.response.data;
    }
  }
  
  async confirmCode(data: confirmCodeRequestDTO){
    try {
      const response = await http.post('confirm-code', data)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  }

  async resendCode(data: object) {
    try {
      const response = await http.post('/resend-code', data)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  }


  async confirmForgotPassword(data: confirmForgotPasswordRequestDTO) {
    try {
      const response = await http.post(`/confirm-forgot-password`, data)
      return response.data as confirmForgotPasswordResponseDTO
    } catch (error: any) {
      return error.response.data
    }
  }
}
