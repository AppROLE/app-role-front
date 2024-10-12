import { InstituteRepositoryHttp } from "@/api/repositories/institute_repository_http"
import { getAllInstituteByIdResponseDTO, getInstituteByPartnerTypeResponseDTO } from "@/api/types/institute_dto"
import { createContext, PropsWithChildren } from "react"

type InstituteContextType = { 
    getAll: () => Promise<getAllInstituteByIdResponseDTO>
    getById: (id: string) => Promise<object>
    getAllInstitutesByPartnerType: (idToken: string, partnerType: string) => Promise<getInstituteByPartnerTypeResponseDTO>
}

const defaultInstituteContext = { 
    getAll: async () => {
        return {
            institutes: [],
            message: ''
        }
    },
    getById: async (_id: string) => {
        return {}
    },
    getAllInstitutesByPartnerType: async (_idToken: string, _partnerType: string) => {
        return {
            institutes: [],
            message: ''
        }
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

  async function getAllInstitutesByPartnerType(idToken: string, partnerType: string) { 
    try { 
      const response = await instituteRepository.getAllInstitutesByPartnerType(idToken, partnerType)
      return response
    } catch (error: any) { 
      return error
    }
  }

  return (
    <InstituteContext.Provider value={{ getAll, getById, getAllInstitutesByPartnerType }}>
      {children}
    </InstituteContext.Provider>
  )
}