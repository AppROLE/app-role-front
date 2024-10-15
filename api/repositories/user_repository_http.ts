import AsyncStorage from "@react-native-async-storage/async-storage";
import { http, httpEvent } from "../http";
import { findPersonResponseDTO, getPhraseResponseDTO } from "../types/user_dto";


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

    async findPerson(searchTerm: string) {
      try {
        const idToken = await AsyncStorage.getItem('idToken') || '';
        if (idToken === '') return; 
        const response = await http.get<findPersonResponseDTO>('/find-person?searchTerm=' + searchTerm, {
          headers: {
            'Authorization': `Bearer ${idToken}`
          },
        });
        return response.data;
      }
      catch (error: any) {
        console.log("user_repository_http. findPerson - ", error);
        console.log("user_repository_http. findPerson errorResponse. - ", error.response);
        if (error.response.status === 404) {
          return "Nenhum usuário encontrado!";
        }
        return error.response.data;
      }
      
    }
}