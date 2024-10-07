import { http } from "../http"


export class InstituteRepositoryHttp {
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

  async getAllInstitutesByPartnerType(idToken: string) { 
    try { 
      const response = await http.get('/get-institute-by-partnertype', {
        headers: {
          Authorization: `Bearer ${idToken}` 
        }
      });
      return response.data
    } catch (error: any) { 
      return error.response.data
    }
  }
}