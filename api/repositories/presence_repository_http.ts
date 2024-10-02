import Toast from "react-native-toast-message";
import { http } from "../http";


export class PresenceRepositoryHttp {
    async getAllPresences(idToken: string, eventId: string) { 
        try {
            const response = await http.get(`/get-all-presences?eventId=${eventId}`, {
                headers: {
                    Authorization: `Bearer ${idToken}` 
                }
            });
            if (response.status === 200 && response.data.message === 'Nenhuma presença encontrada') {
                alert(response.data.message)
                return []
            }
            return response.data
        } catch (error: any) {
            return error.response.data
        }
    }
}