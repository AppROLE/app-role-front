import { InstituteRepositoryHttp } from "@/api/repositories/institute_repository_http"
import { getAllFavoritesInstitutesResponseDTO, getAllInstituteByIdResponseDTO, getInstituteByIdResponseDTO, getInstituteByPartnerTypeResponseDTO, updateFavoriteInstituteResponseDTO } from "@/api/types/institute_dto"
import { createContext, PropsWithChildren } from "react"

type InstituteContextType = { 
    getAll: () => Promise<getAllInstituteByIdResponseDTO>
    getInstituteById: (instituteId: string) => Promise<getInstituteByIdResponseDTO>
    getAllInstitutesByPartnerType: (idToken: string, partnerType: string) => Promise<getInstituteByPartnerTypeResponseDTO>
    getAllFavoritesInstitutes: (idToken: string) => Promise<getAllFavoritesInstitutesResponseDTO>
    updateFavoriteInstitute: (instituteId: string) => Promise<updateFavoriteInstituteResponseDTO>
}

const defaultInstituteContext = { 
    getAll: async () => {
        return {
            institutes: [],
            message: ''
        }
    },
    getInstituteById: async (_id: string) => {
        return {
            addres: '',
            description: '',
            district_id: '',
            events_id: [],
            institute_id: '',
            institute_type: '',
            logo_photo: '',
            name: '',
            partner_type: '',
            phone: '',
            photos_url: [],
            price: 0, 
        }
    },
    getAllInstitutesByPartnerType: async (_idToken: string, _partnerType: string) => {
        return {
            institutes: [],
            message: ''
        }
    },
    getAllFavoritesInstitutes: async (_idToken: string) => {
        return {
            institutes: [],
            message: ''
        }
    },
    updateFavoriteInstitute: async ( _instituteId: string) => {
        return {
            message: ''
        }
    },
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

  async function getInstituteById(instituteId: string) { 
    try {
      const response = await instituteRepository.getInstituteById(instituteId)
      return response as getInstituteByIdResponseDTO
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

  async function getAllFavoritesInstitutes(idToken: string) { 
    try { 
      const response = await instituteRepository.getAllFavoritesInstitutes(idToken)
      return response
    } catch (error: any) { 
      return error
    }
  }

  async function updateFavoriteInstitute(instituteId: string) { 
    try {
      const response = await instituteRepository.updateFavoriteInstitute(instituteId)
      return response
    } catch (error: any) {
      return error
    }
  }

  return (
    <InstituteContext.Provider value={{ getAll, getInstituteById, getAllInstitutesByPartnerType, getAllFavoritesInstitutes, updateFavoriteInstitute }}>
      {children}
    </InstituteContext.Provider>
  )
}