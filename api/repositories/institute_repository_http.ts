import AsyncStorage from "@react-native-async-storage/async-storage"
import { http, httpEvent } from "../http"
import { getInstituteByPartnerTypeResponseDTO } from "../types/institute_dto"


export class InstituteRepositoryHttp {
  async getAll() {
    try {
      const response = await http.get('/get-all-institutes')
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  }

  async getInstituteById(instituteId: string) {
    try {
      const idToken = await AsyncStorage.getItem('idToken') || ''
      if (idToken === '') return
      const response = await httpEvent.get(`/get-institute-by-id?instituteId=${instituteId}`, {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      })
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  }

  async getAllInstitutesByPartnerType(partnerType: string) {
    try {
      const idToken = await AsyncStorage.getItem('idToken') || ''
      if (idToken === '') return
      const response = await httpEvent.get(`/get-all-institutes-by-partner-type?partnerType=${partnerType}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        }
      });
      return response.data as getInstituteByPartnerTypeResponseDTO
    } catch (error: any) {
      return error.response.data
    }
  }

  async getAllFavoritesInstitutes() {
    try {
      const idToken = await AsyncStorage.getItem('idToken') || ''
      if (idToken === '') return
      const response = await httpEvent.get(`/get-all-favorites-institutes`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        }
      });
      return response.data
    } catch (error: any) {
      return error.response.data
    }
  }


  async updateFavoriteInstitute(instituteId: string) {
    try {
      const idToken = await AsyncStorage.getItem('idToken') || ''
      if (idToken === '') return
      const response = await httpEvent.post(`/update-favorite-institute?instituteId=${instituteId}`, {
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