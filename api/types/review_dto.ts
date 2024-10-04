
export type createReviewRequestDTO = { 
    instituteId: string;
    reviewedAt: number;
    star: number;
    review: string;
}

export type createReviewResponseDTO = {
    message: string;
}

export type getAllReviewsByEventResponseDTO = {
    instituteId: string;
    eventId: string;
    nickname: string;
    reviewedAt: number;
    star: number;
    review: string;
    profilePhoto: string;
}[]