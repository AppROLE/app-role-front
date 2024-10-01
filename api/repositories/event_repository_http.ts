import { http } from "../http";


export class EventRepositoryHttp {
    async getAllConfirmedUsers(idToken: string) { 
        try {
            const response = await http.get('/get-all-confirmed-users', {
                headers: {
                    Authorization: `Bearer ${idToken}` 
                }
            });
            return response.data
        } catch (error: any) {
            return error.response.data
        }
    }
}