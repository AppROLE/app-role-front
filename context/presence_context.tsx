import { PresenceRepositoryHttp } from "@/api/repositories/presence_repository_http"
import { getAllConfirmedUsersResponseDTO } from "@/api/types/presence_dto"
import { createContext } from "react"


type PresenceContextType = {
    getAllPresence: (idToken: string, eventId: string) => Promise<getAllConfirmedUsersResponseDTO>
}

const defaultPresenceContext = { 
    getAllPresence: async () => {
        return {
            users: []
        }
    }
}


export const PresenceContext = createContext<PresenceContextType>(defaultPresenceContext)

export function PresenceContextProvider({ children }: any) {
    const presenceRepository = new PresenceRepositoryHttp()

    async function getAllPresence(idToken: string, eventId: string) {
        try {
            const response = await presenceRepository.getAllPresences(idToken, eventId)
            return response
        } catch (error: any) {
            return error
        }
    }

    return (
        <PresenceContext.Provider value={{ getAllPresence, }}>
            {children}
        </PresenceContext.Provider>
    )
}