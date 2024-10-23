import { UserRepositoryHttp } from "@/api/repositories/user_repository_http"
import { findPersonResponseDTO, getFriendsResponseDTO, getPhraseResponseDTO, getProfileResponseDTO, getProfileToFollowResponseDTO } from "@/api/types/user_dto"
import { createContext, PropsWithChildren } from "react"


type UserContextType = {
    getPhrase: () => Promise<getPhraseResponseDTO>;
    getFriends: () => Promise<getFriendsResponseDTO>;
    getProfile: () => Promise<getProfileResponseDTO>;
    getProfileToFollow: (personUsername: string) => Promise<getProfileToFollowResponseDTO>;
    findPerson: (searchTerm: string) => Promise<findPersonResponseDTO>;
}

const defaultUserContext = {
    getPhrase: async () => {
        return { 
            phrase: '' ,
            username: ''
        }
    },
    getFriends: async () => {
        return {
            friends: [],
        }
    },
    getProfile: async () => {
        return {
            user_id: '',
            name: '',
            username: '',
            nickname: '',
            profilePhoto: '',
            followers: 0,
            following: 0
        }
    },
    getProfileToFollow: async (_personUsername: string) => {
        return {
            user_id: '',
            name: '',
            username: '',
            nickname: '',
            profilePhoto: '',
            followers: 0,
            following: 0
        }
    },
    findPerson: async () => {
        return {
            users: [],
            message: ''
        }
    }
}

export const UserContext = createContext<UserContextType>(defaultUserContext)

export default function UserContextProvider({ children }: PropsWithChildren) {
    const userRepository = new UserRepositoryHttp()

    async function getPhrase() {
        try {
            const response = await userRepository.getPhrase()
            return response as getPhraseResponseDTO
        } catch (error: any) {
            return error
        }
    }

    async function getFriends() {
        try {
            const response = await userRepository.getFriends();
            return response;
        } catch (error: any) {
            return error
        }
    }

    async function getProfile() { 
        try {
            const response = await userRepository.getProfile()
            return response as getProfileResponseDTO
        } catch (error: any) {
            return error
        }
    }


    async function findPerson(searchTerm: string) {
        try {
            const response = await userRepository.findPerson(searchTerm)
            return response as findPersonResponseDTO
        } catch (error: any) {
            return error
        }

    }

    async function getProfileToFollow(personUsername: string) {
        try {
            const response =  await userRepository.getProfileToFollow(personUsername);
            return response as getProfileToFollowResponseDTO;
        } catch (error: any) {
            return error
        }
    }

    return (
        <UserContext.Provider value={{ getPhrase, getFriends, getProfile, findPerson, getProfileToFollow }}>
            {children}
        </UserContext.Provider>
    )
}