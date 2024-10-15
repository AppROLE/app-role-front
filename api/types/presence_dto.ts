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


export type getAllConfirmedUsersResponseDTO = {
   users: Presence[];
   message: string;
}

export type confirmEventResponseDTO = { 
    message: string;
}