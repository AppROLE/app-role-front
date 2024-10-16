import { createContext, PropsWithChildren } from "react"
import { EventRepositoryHttp } from "@/api/repositories/event_repository_http"
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry"
import { getEventByIdResponseDTO, getReviewsEventByIdResponseDTO } from "@/api/types/event_dto"

type EventContextType = {
    // getAll: () => Promise<getAllEventByIdResponseDTO>
    getEventById: (id: string) => Promise<getEventByIdResponseDTO>
    getReviewsEventById(id: string): Promise<getReviewsEventByIdResponseDTO>
}

const defaultEventContext = {
    // getAll: async () => {
    //     return {
    //         events: [],
    //         message: ''
    //     }
    // },
    getEventById: async (_id: string) => {
        return {
            eventId: '',
            name: '',
            address: '',
            price: 0,
            description: '',
            ageRange: '',
            eventDate: new Date(),
            districtId: '',
            instituteId: '',
            features: []
        }
    },
    getReviewsEventById: async (_id: string) => {
        return {
            message: '',
            reviews: []
        }
    }
}

export const EventContext = createContext<EventContextType>(defaultEventContext)

export function EventContextProvider({ children }: PropsWithChildren) {
    const eventRepository = new EventRepositoryHttp()

    // async function getAll() {
    //     try {
    //         const response = await eventRepository.getAll()
    //         return response
    //     } catch (error: any) {
    //         return error
    //     }
    // }

    async function getEventById(id: string) {
        try {
            const response = await eventRepository.getEventById(id)
            return response as getEventByIdResponseDTO
        } catch (error: any) {
            return error
        }
    }

    async function getReviewsEventById(id: string) {
        try {
            const response = await eventRepository.getReviewsEventById(id)
            return response as getReviewsEventByIdResponseDTO
        } catch (error: any) {
            return error
        }
    }

    return (
        <EventContext.Provider value={{ getEventById, getReviewsEventById }}>
            {children}
        </EventContext.Provider>
    )
}