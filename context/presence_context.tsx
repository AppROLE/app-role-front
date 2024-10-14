import { PresenceRepositoryHttp } from "@/api/repositories/presence_repository_http"
import { confirmEventResponseDTO, getAllConfirmedEventsResponseDTO, getAllConfirmedUsersResponseDTO } from "@/api/types/presence_dto"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext } from "react"
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry"


type PresenceContextType = {
    getAllPresence: (eventId: string) => Promise<getAllConfirmedUsersResponseDTO>
    confirmEvent: (eventId: string, profilePhoto?: string, promoterCode?: string) => Promise<confirmEventResponseDTO>
    getAllConfirmedEvents: (idToken: string) => Promise<getAllConfirmedEventsResponseDTO>
}

const defaultPresenceContext = { 
    getAllPresence: async () => {
        return {
            users: [],
            message: ''
        }
    },
    confirmEvent: async () => {
        return {
            message: ''
        }
    },
    getAllConfirmedEvents: async (_idToken: string) => {
        return {
            events: [],
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

    async function confirmEvent(eventId: string, profilePhoto?: string, promoterCode?: string) { 
        try {
            const response = await presenceRepository.confirmEvent(eventId, profilePhoto, promoterCode)
            return response
        } catch (error: any) {
            return error
        }
    }

    async function getAllConfirmedEvents(idToken: string) { 
        try {
            const response = await presenceRepository.getAllConfirmedEvents(idToken)
            return response
        } catch (error: any) {
            return error
        }
    }

    return (
        <PresenceContext.Provider value={{ getAllPresence, confirmEvent, getAllConfirmedEvents }}>
            {children}
        </PresenceContext.Provider>
    )
}