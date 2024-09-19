import { ReviewRepositoryHttp } from "@/api/repositories/review_repository_http";
import { createReviewRequestDTO, createReviewResponseDTO } from "@/api/types/review_dto";
import { createContext, PropsWithChildren } from "react";

type ReviewContextType = { 
    createReview: (data: createReviewRequestDTO) => Promise<createReviewResponseDTO>
}

const defaultReviewContext = { 
    createReview: async (_data: createReviewRequestDTO) => {
        return {
            message: ''
        }
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

    return (
        <ReviewContext.Provider value={{ createReview }}>
            {children}
        </ReviewContext.Provider>
    )
}