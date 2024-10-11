export type Friends = {
    user_id: string;
    username: string;
    profilePhoto: string;
    nickname: string;
}

export type getFriendsResponseDTO = {
    friends: Friends[];
}

export type getPhraseResponseDTO = {
    phrase: string
}

export type getProfileResponseDTO = { 
    user_id: string;
    name: string;
    backgroundPhoto?: string;
    username: string;
    linkInstagram?: string;
    linkTiktok?: string;
    biography?: string;
    profilePhoto?: string;
    nickname: string;
    followers: number;
    folowing: number;
}