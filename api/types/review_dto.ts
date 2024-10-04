
export type createReviewRequestDTO = { 
    instituteId: string;
    reviewedAt: number;
    star: number;
    review: string;
}

export type createReviewResponseDTO = {
    message: string;
}

export type Reviews = {
    instituteId: string;
    eventId: string;
    nickname: string;
    reviewedAt: number;
    star: number;
    comment: string;
    profilePhoto: string;
}

export type getAllReviewsByEventResponseDTO = {
    reviews: Reviews[];
    message: string;
}