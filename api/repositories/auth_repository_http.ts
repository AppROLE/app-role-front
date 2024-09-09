import { http } from '../http'
import { forgotPasswordRequestDTO } from '../types/auth_dto'
import { confirmCodeRequestDTO } from '../types/auth_dto'

export class AuthRepositoryHttp {
  async signIn(email: string, password: string) {
    try {
      if (!email || !password) {
        return {
          message: 'Email ou Senha inválidos'
        }
      }
      const response = await http.post('', {
        email,
        password
      })
      return response.data
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

  async confirmCode(data: confirmCodeRequestDTO){
    try {
      const response = await http.post('confirm-code', data)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  }
}
