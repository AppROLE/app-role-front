import { UserRepositoryHttp } from "@/api/repositories/user_repository_http"
import { getFriendsResponseDTO, getPhraseResponseDTO, getProfileResponseDTO } from "@/api/types/user_dto"
import { createContext, PropsWithChildren } from "react"


type UserContextType = {
    getPhrase: () => Promise<getPhraseResponseDTO>
    getFriends: () => Promise<getFriendsResponseDTO>
    getProfile: () => Promise<getProfileResponseDTO>
}

const defaultUserContext = {
    getPhrase: async () => {
        return { phrase: '' }
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
            folowing: 0
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

    return (
        <UserContext.Provider value={{ getPhrase, getFriends, getProfile }}>
            {children}
        </UserContext.Provider>
    )
}