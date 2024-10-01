import { EventRepositoryHttp } from "@/api/repositories/event_repository_http"
import { getAllConfirmedUsersResponseDTO } from "@/api/types/event_dto"
import { createContext } from "react"


type EventContextType = {
    getAllConfirmedUsers: (idToken: string) => Promise<getAllConfirmedUsersResponseDTO>
}

const defaultEventContext = { 
    getAllConfirmedUsers: async () => {
        return {
            users: []
        }
    }
}


export const EventContext = createContext<EventContextType>(defaultEventContext)

export function EventContextProvider({ children }: any) {
    const eventRepository = new EventRepositoryHttp()

    async function getAllConfirmedUsers(idToken: string) {
        try {
            const response = await eventRepository.getAllConfirmedUsers(idToken)
            return response
        } catch (error: any) {
            return error
        }
    }

    return (
        <EventContext.Provider value={{ getAllConfirmedUsers, }}>
            {children}
        </EventContext.Provider>
    )
}