export type Friends = {
    user_id: string;
    username: string;
    profilePhoto: string;
    nickname: string;
}

export type getFriendsResponseDTO = {
    friends: Friends[];
}

type personResponseDTO = {
    username: string;
    profilePhoto: string;
    nickname: string;
}

export type findPersonResponseDTO = {
    users: personResponseDTO[];
    message: string;
}


export type getPhraseResponseDTO = {
    phrase: string
    username: string
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
    following: number;
}