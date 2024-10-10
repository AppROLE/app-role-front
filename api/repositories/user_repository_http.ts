import AsyncStorage from "@react-native-async-storage/async-storage";
import { http, httpEvent } from "../http";
import { getPhraseResponseDTO } from "../types/user_dto";


export class UserRepositoryHttp {
   async getProfile() { 
    try {
      const idToken = await AsyncStorage.getItem('idToken') || '';
      if (idToken === '') return; 
      const response = await http.get('/get-profile', {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }

    async getPhrase() {
        try {
            const response = await httpEvent.get('/get-phrase')
            return response.data as getPhraseResponseDTO
        } catch (error: any) {
            return error.response.data
        }
    }

    async getFriends() {
        try {
          const idToken = await AsyncStorage.getItem('idToken') || '';
          if (idToken === '') return; 
          const response = await http.get('/get-friends', {
            headers: {
              'Authorization': `Bearer ${idToken}`
            }
          });
          return response.data;
        } catch (error: any) {
          return error.response.data;
        }
      }
}