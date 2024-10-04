import { PresenceRepositoryHttp } from "@/api/repositories/presence_repository_http"
import { getAllConfirmedUsersResponseDTO } from "@/api/types/presence_dto"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext } from "react"


type PresenceContextType = {
    getAllPresence: (eventId: string) => Promise<getAllConfirmedUsersResponseDTO>
}

const defaultPresenceContext = { 
    getAllPresence: async () => {
        return {
            users: [],
            message: ''
        }
    }
}


export const PresenceContext = createContext<PresenceContextType>(defaultPresenceContext)

export function PresenceContextProvider({ children }: any) {
    const presenceRepository = new PresenceRepositoryHttp()

    async function getAllPresence(eventId: string) {
        try {
            const response = await presenceRepository.getAllPresences(eventId)
            return response
        } catch (error: any) {
            return error
        }
    }

    return (
        <PresenceContext.Provider value={{ getAllPresence }}>
            {children}
        </PresenceContext.Provider>
    )
}