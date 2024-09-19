
export type createReviewRequestDTO = { 
    reviewed_at: Date
    star: number
    comment: string
}

export type createReviewResponseDTO = {
    message: string
}