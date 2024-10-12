import AsyncStorage from "@react-native-async-storage/async-storage"
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
      const response = await httpEvent.get(`/get-all-institutes-by-partner-type?partnerType=${partnerType}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        }
      });
      return response.data
    } catch (error: any) { 
      return error.response.data
    }
  }
}