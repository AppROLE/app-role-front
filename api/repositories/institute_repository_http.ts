import { http, httpEvent } from "../http"


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

  async getAllInstitutesByPartnerType(idToken: string, partnerType: string) { 
    try { 

      console.log('idToken:', idToken);
      console.log('partnerType:', partnerType);
  
      const response = await httpEvent.get(`/get-all-institutes-by-partner-type?partnerType=${partnerType}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        }
      });
      console.log("RESPOSTA DA REQUEST", response)
      return response.data
    } catch (error: any) { 
      return error.response.data
    }
  }
}