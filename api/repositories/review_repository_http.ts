import AsyncStorage from "@react-native-async-storage/async-storage"
import { http, httpEvent } from "../http"
import { createReviewRequestDTO, createReviewResponseDTO, getAllReviewsByEventResponseDTO } from "../types/review_dto"



export class ReviewRepositoryHttp {
    async createReview(data: createReviewRequestDTO) {
        try {
            const idToken = await AsyncStorage.getItem('idToken')
            if (idToken === '') return;
            const response = await httpEvent.post('/create-review', data, {
                headers: {'Authorization': `Bearer ${idToken}`}
            })
            return response.data as createReviewResponseDTO
        } catch (error: any) {
            // console.log("ERRO NA REQUEST", error.response)
            throw new Error(error)
        }
    }

    async getAllReviewsByEvent(eventId: string) {
        try {
            const idToken = await AsyncStorage.getItem('idToken') || '';
            if (idToken === '') return;
            const response = await http.get(`/get-all-reviews-by-event?eventId=${eventId}`, {
                headers: {'Authorization': `Bearer ${idToken}`}
            })
            return response.data as getAllReviewsByEventResponseDTO[]
        } catch (error: any) {
            throw new Error(error)
        }
    }
}