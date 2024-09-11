import { http } from '../http'
import { signInRequestDTO, signInResponseDTO } from '../types/auth_dto'

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

  async forgotPassword(data: object) {
    try {
      const response = await http.post('', data)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  }
}
