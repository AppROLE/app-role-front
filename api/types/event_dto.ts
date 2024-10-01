export type Users = {
    event_id: string;
    username: string;
    nickname: string;
    image: string; 
    confirmed: boolean;
}


export type getAllConfirmedUsersResponseDTO = {
   users: Users[];
}