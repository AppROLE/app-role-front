import { InstituteRepositoryHttp } from "@/api/repositories/institute_repository_http"
import { getAllInstituteByIdResponseDTO } from "@/api/types/institute_dto"
import { createContext, PropsWithChildren } from "react"

type InstituteContextType = { 
    getAll: () => Promise<getAllInstituteByIdResponseDTO>
    getById: (id: string) => Promise<object>
}

const defaultInstituteContext = { 
    create: async (_data: object) => {
        return {}
    },
    getAll: async () => {
        return {
            institutes: [],
            message: ''
        }
    },
    getById: async (_id: string) => {
        return {}
    }
}

export const InstituteContext = createContext<InstituteContextType>(defaultInstituteContext)

export function InstituteContextProvider({ children }: PropsWithChildren) {
  const instituteRepository = new InstituteRepositoryHttp()

  async function getAll() {
    try {
      const response = await instituteRepository.getAll()
      return response
    } catch (error: any) {
      return error
    }
  }

  async function getById(id: string) { 
    try {
      const response = await instituteRepository.getById(id)
      return response
    } catch (error: any) {
      return error
    }
  }

  return (
    <InstituteContext.Provider value={{ getAll, getById }}>
      {children}
    </InstituteContext.Provider>
  )
}