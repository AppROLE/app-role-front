import { CATEGORY } from "../enums/catetegory_enum";
import { FEATURE } from "../enums/feature_enum";
import { MUSIC_TYPE } from "../enums/music_type_enum";
import { PACKAGE_TYPE } from "../enums/package_type";
import { STATUS } from "../enums/status_enum";

export type Presence = {
    user_id: string
    event_id: string;
    username: string;
    nickname: string;
    profilePhoto?: string; 
    confirmed: boolean;
    promoterCode: string;
    checkedInAt: Date;
}

export type Events = {
    eventId?: string;
    name: string;
    description: string;
    address: string;
    price: number;
    ageRange: string;
    eventDate: Date; 
    districtId: string;
    instituteId: string;
    eventStatus: STATUS;
    musicType?: MUSIC_TYPE[];
    menuLink?: string;
    eventPhotoLink?: string;
    galeryLink?: string[];
    bannerUrl?: string;
    features?: FEATURE[];
    packageType?: PACKAGE_TYPE[];
    category?: CATEGORY;
    ticketUrl?: string;
}



export type getAllConfirmedUsersResponseDTO = {
   users: Presence[];
   message: string;
}

export type confirmEventResponseDTO = { 
    message: string;
}

export type getAllConfirmedEventsResponseDTO = { 
    events: Events[];
    message: string;
}