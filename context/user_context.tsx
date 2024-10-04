import { UserRepositoryHttp } from "@/api/repositories/user_repository_http"
import { getPhraseResponseDTO } from "@/api/types/user_dto"
import { createContext, PropsWithChildren } from "react"

type UserContextType = {
    getPhrase: () => Promise<getPhraseResponseDTO>
}

const defaultUserContext = {
    getPhrase: async () => {
        return { phrase: '' }
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

    return (
        <UserContext.Provider value={{ getPhrase }}>
            {children}
        </UserContext.Provider>
    )
}