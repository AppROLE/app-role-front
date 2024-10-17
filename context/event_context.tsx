import { createContext, PropsWithChildren } from "react"
import { EventRepositoryHttp } from "@/api/repositories/event_repository_http"
import { getAllEventsResponseDTO, getEventByIdResponseDTO, getReviewsEventByIdResponseDTO } from "@/api/types/event_dto"

type EventContextType = {
    getAll: () => Promise<getAllEventsResponseDTO>
    getEventById: (id: string) => Promise<getEventByIdResponseDTO>
    getReviewsEventById(id: string): Promise<getReviewsEventByIdResponseDTO>
    getRoleBombando: () => Promise<any>
    getEventsByFilter: (filters: any) => Promise<any>
}

const defaultEventContext = {
    getAll: async () => {
        return {
            events: [],
            message: ''
        }
    },
    getEventById: async (_id: string) => {
        return {
            address: '',
            ageRange: '',
            bannerUrl: '',
            category: '',
            description: '',
            districtId: '',
            eventDate: '',
            eventId: '',
            eventPhotoLink: '',
            features: [],
            galeryLink: [],
            instituteId: '',
            menuLink: '',
            musicType: [],
            name: '',
            packageType: [],
            price: 0,
            rating: 0,
            reviews: [],
            ticketUrl: ''
        }
    },
    getReviewsEventById: async (_id: string) => {
        return {
            message: '',
            reviews: []
        }
    },
    getRoleBombando: async () => {
        return {}
    },
    getEventsByFilter: async () => {
        return {}
    }
}

export const EventContext = createContext<EventContextType>(defaultEventContext)

export function EventContextProvider({ children }: PropsWithChildren) {
    const eventRepository = new EventRepositoryHttp()

    async function getAll() {
        try {
            const response = await eventRepository.getAll()
            return response as getAllEventsResponseDTO
        } catch (error: any) {
            return error
        }
    }

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

    async function getRoleBombando() {
        try {
            const response = await eventRepository.getRoleBombando()
            return response
        } catch (error: any) {
            return error
        }
    }

    async function getEventsByFilter(filters: any) {
        try {
            const response = await eventRepository.getEventsByFilter(filters)
            return response
        } catch (error: any) {
            return error
        }
    }

    return (
        <EventContext.Provider value={{ getAll, getEventById, getReviewsEventById, getRoleBombando, getEventsByFilter }}>
            {children}
        </EventContext.Provider>
    )
}