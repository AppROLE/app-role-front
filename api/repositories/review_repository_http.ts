import AsyncStorage from "@react-native-async-storage/async-storage"
import { http } from "../http"
import { createReviewRequestDTO, createReviewResponseDTO, getAllReviewsByEventResponseDTO } from "../types/review_dto"



export class ReviewRepositoryHttp {
    async createReview(data: createReviewRequestDTO) {
        try {
            const idToken = await AsyncStorage.getItem('idToken')
            if (!idToken) {
                throw new Error('Token não encontrado')
            }
            const response = await http.post('/create-review', data, {
                headers: {'Authorization': `Bearer ${idToken}`}
            })
            return response.data as createReviewResponseDTO
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async getAllReviewsByEvent(eventId: string) {
        try {
            const idToken = await AsyncStorage.getItem('idToken') || '';
            if (idToken === '') return;
            const response = await http.get(`/get-reviews-by-event?eventId=${eventId}`, {
                headers: {'Authorization': `Bearer ${idToken}`}
            })
            return response.data as getAllReviewsByEventResponseDTO[]
        } catch (error: any) {
            throw new Error(error)
        }
    }
}