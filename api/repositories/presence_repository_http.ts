import Toast from "react-native-toast-message";
import { http, httpEvent } from "../http";
import AsyncStorage from "@react-native-async-storage/async-storage";


export class PresenceRepositoryHttp {
    async getAllPresences(eventId: string) {
        try {
            const idToken = await AsyncStorage.getItem('idToken') || ''
            if (idToken === '') return;
            const response = await httpEvent.get(`/get-all-presences-by-event-id?eventId=${eventId}`, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });
            console.log("RESPOSTA DA REQUEST", response.data)
            return response.data
        } catch (error: any) {
            console.log("ERRO NA REQUEST", error.response.data.message)
            return error.response.data.message
        }
    }

    async confirmEvent(eventId: string, profilePhoto?: string, promoterCode?: string) {
        try {
            const idToken = await AsyncStorage.getItem('idToken') || ''
            if (idToken === '') return;
            const response = await httpEvent.post(`/confirm-event?eventId=${eventId}`, {
                profilePhoto,
                promoterCode
            }, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });
            console.log("RESPOSTA DA REQUEST", response.data)
            return response.data
        } catch (error: any) {
            // console.log("ERRO NA REQUEST", error.response.data.message)
            return error.response.data.message
        }
    }

    async getAllConfirmedEvents(idToken: string) { 
        try {
            const response = await httpEvent.get(`/get-all-confirmed-events-by-profile`, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });
            console.log("RESPOSTA DA REQUEST", response.data)
            return response.data
        } catch (error: any) {
            console.log("ERRO NA REQUEST", error.response.data.message)
            return error.response.data.message
        }
    }
}