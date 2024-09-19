import { http } from "../http"
import { createReviewRequestDTO, createReviewResponseDTO } from "../types/review_dto"



export class ReviewRepositoryHttp {
    async createReview(data: createReviewRequestDTO) {
        try {
            const response = await http.post('/review', data)
            return response.data as createReviewResponseDTO
        } catch (error: any) {
            return error.response.data
        }
    }
}