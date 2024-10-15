import AsyncStorage from "@react-native-async-storage/async-storage";
import { httpEvent, http } from "../http";

export class EventRepositoryHttp {
    async getAll() {
        try {
            const response = await httpEvent.get('/get-all-events');
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    }

    async getEventById(id: string) {
        try {
            const response = await httpEvent.get(`/get-event-by-id?eventId=${id}`);
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    }

    async getReviewsEventById(id: string) {
        try {
            const token = await AsyncStorage.getItem('idToken');
            const response = await http.get(`/get-all-reviews-by-event?eventId=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            return error.response.data;
        }
    }
}