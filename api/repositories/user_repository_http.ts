import { httpEvent } from "../http";
import { getPhraseResponseDTO } from "../types/user_dto";


export class UserRepositoryHttp {
    async getPhrase() {
        try {
            const response = await httpEvent.get('/get-phrase')
            return response.data as getPhraseResponseDTO
        } catch (error: any) {
            return error.response.data
        }
    }
}