interface Review {
    comment: string,
    nickname: string,
    profilePhoto: string,
    reviewedAt: string,
    star: number,
    useName: string
}

export type getEventByIdResponseDTO = {
    eventId: string;
    name: string;
    bannerUrl?: string;
    address: string;
    price: number;
    description: string;
    ageRange: string;
    eventDate: Date;
    districtId: string;
    instituteId: string;
    features: string[];
    musicType?: string[];
    menuLink?: string;
    eventPhotoLink?: string;
    galeryLink?: string[];
    packageType?: string[];
    category?: string;
    ticketUrl?: string;
}

export type getReviewsEventByIdResponseDTO = {
    message: string,
    reviews: Array<Review>
}