import { http } from "../http"


export class InstituteRepositoryHttp {
  async create(data: object) {
    try {
      const response = await http.post('/institute', data)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  }

  async getAll() { 
    try {
      const response = await http.get('/get-all-institutes')
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  }

  async getById(id: string) { 
    try {
      const response = await http.get(`/institute/${id}`)
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  }
}