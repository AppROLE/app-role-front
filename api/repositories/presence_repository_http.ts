import Toast from "react-native-toast-message";
import { http } from "../http";
import AsyncStorage from "@react-native-async-storage/async-storage";


export class PresenceRepositoryHttp {
    async getAllPresences(eventId: string) {
        try {
            const idToken = await AsyncStorage.getItem('idToken') || ''
            if (idToken === '') return;
            const response = await http.get(`/get-all-presences?eventId=${eventId}`, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });
            console.log("RESPOSTA DA REQUEST", response)
            return response.data
        } catch (error: any) {
            console.log("ERRO NA REQUEST", error)
            return error.response.data.message
        }
    }

    async confirmEvent(eventId: string, profilePhoto?: string, promoterCode?: string) {
        try {
            const idToken = await AsyncStorage.getItem('idToken') || ''
            if (idToken === '') return;
            const response = await http.post('/confirm-presence', {
                eventId,
                profilePhoto,
                promoterCode
            }, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });
            console.log("RESPOSTA DA REQUEST", response)
            Toast.show({
                type: 'success',
                text1: 'Presença confirmada',
                text2: 'Você confirmou presença no evento'
            })
            return response.data
        } catch (error: any) {
            console.log("ERRO NA REQUEST", error.response.data.message)
            return error.response.data.message
        }
    }
}