interface Review {
    comment: string,
    nickname: string,
    profilePhoto: string,
    reviewedAt: string,
    star: number,
    useName: string
}

interface Event {
    address: string,
    ageRange: string,
    bannerUrl: string,
    category: string,
    description: string,
    districtId: string,
    eventDate: string,
    eventId: string,
    eventPhotoLink: string,
    features: string[],
    galeryLink: string[],
    instituteId: string,
    menuLink: string,
    musicType: string[],
    name: string,
    packageType: string[],
    price: number,
    ticketUrl: string
}

interface Bombando {
    date: string,
    event: Array<Event>,
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

export type	getAllEventsResponseDTO = {
    events: Array<Event>
    message: string
}

export type getRoleBombandoResponseDTO = {
    data: Array<Bombando>
    message: string
}