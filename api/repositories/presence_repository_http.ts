import Toast from "react-native-toast-message";
import { http, httpEvent } from "../http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllConfirmedEventsByUserToFollowResponseDTO, getAllConfirmedEventsResponseDTO } from "../types/presence_dto";


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
            // console.log("ERRO NA REQUEST", error.response.data.message)
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

    async getAllConfirmedEvents() {
        try {
            const idToken = await AsyncStorage.getItem('idToken') || ''
            if (idToken === '') return
            const response = await http.get(`/get-all-confirmed-events`, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            });
            console.log("RESPOSTA DA REQUEST", response.data)
            return response.data as getAllConfirmedEventsResponseDTO
        } catch (error: any) {
            // console.log("ERRO NA REQUEST", error.response.data)
            return error.response.data.message
        }
    }

    async getAllConfirmedEventsByUserToFollow(personUsername: string) {
        try {
            const idToken = await AsyncStorage.getItem('idToken') || '';
            if (idToken) return
            const response = await http.get(`/get-all-confirmed-events?personUsername${personUsername}`, {
                headers: {
                    Authorization: `Bearer ${idToken}`
                }
            })
            console.log("RESPOSTA DA REQUEST ", response.data)
            return response.data as getAllConfirmedEventsByUserToFollowResponseDTO
        } catch (error: any) {
            return error.response.data.message
        }
    }
}