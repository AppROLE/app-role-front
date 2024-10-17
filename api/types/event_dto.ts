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

export type getEventByIdResponseDTO = {
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
    musicType: [string],
    name: string,
    packageType: [string],
    price: number,
    rating: number,
    reviews: Review[],
    ticketUrl: string
  }

export type getReviewsEventByIdResponseDTO = {
    message: string,
    reviews: Array<Review>
}

export type	getAllEventsResponseDTO = {
    events: Array<Event>
    message: string
}