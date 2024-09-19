
export type createReviewRequestDTO = { 
    reviewed_at: number
    star: number
    comment: string
}

export type createReviewResponseDTO = {
    message: string
}