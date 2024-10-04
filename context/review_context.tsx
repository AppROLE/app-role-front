import { ReviewRepositoryHttp } from "@/api/repositories/review_repository_http";
import { createReviewRequestDTO, createReviewResponseDTO, getAllReviewsByEventResponseDTO } from "@/api/types/review_dto";
import { createContext, PropsWithChildren } from "react";

type ReviewContextType = { 
    createReview: (data: createReviewRequestDTO) => Promise<createReviewResponseDTO>
    getAllReviewsByEvent: (eventId: string) => Promise<getAllReviewsByEventResponseDTO>
}

const defaultReviewContext = { 
    createReview: async (_data: createReviewRequestDTO) => {
        return {
            message: ''
        }
    },
    getAllReviewsByEvent: async (_eventId: string) => {
        return []
    }
}

export const ReviewContext = createContext<ReviewContextType>(defaultReviewContext)

export default function ReviewContextProvider({ children }: PropsWithChildren) { 
    const reviewRepository = new ReviewRepositoryHttp()

    async function createReview(data: createReviewRequestDTO) {
        try {
            const response = await reviewRepository.createReview(data)
            return response
        } catch (error: any) {
            return error
        }
    }

    async function getAllReviewsByEvent(eventId: string) {
        try {
            const response = await reviewRepository.getAllReviewsByEvent(eventId)
            return response
        } catch (error: any) {
            return error
        }
    }

    return (
        <ReviewContext.Provider value={{ createReview, getAllReviewsByEvent }}>
            {children}
        </ReviewContext.Provider>
    )
}