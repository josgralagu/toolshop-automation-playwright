import { apiClient, HeaderSets } from "../utilities/apiClient.js"
import { Endpoints } from "./booking.endpoints.js"

export class AuthService {
	static async createToken() {
		return await apiClient
			.post(Endpoints.auth())
			.set(HeaderSets.content_Type)
			.send({ username: "admin", password: "password123" })
	}
}
