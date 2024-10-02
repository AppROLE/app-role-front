
export type createReviewRequestDTO = { 
    instituteId: string
    reviewedAt: number
    star: number
    review: string
}

export type createReviewResponseDTO = {
    message: string
}