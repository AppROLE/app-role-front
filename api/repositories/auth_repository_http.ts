import { http } from '../http'

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

  async forgotPassword(data: object) {
    try {
      const response = await http.post('', data)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  }
}
