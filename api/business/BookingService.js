import { apiClient, HeaderSets } from "../utilities/apiClient.js"
import { getAuthToken } from "../utilities/authWrapper.js"
import { Endpoints } from "./booking.endpoints.js"

export class BookingService {
	static getAll() {
		return apiClient.get(Endpoints.base())
	}

	static getById(id) {
		return apiClient.get(Endpoints.byId(id)).set(HeaderSets.accept)
	}

	static getByName(firstname, lastname) {
		return apiClient
			.get(Endpoints.byName())
			.set(HeaderSets.accept)
			.query({ firstname, lastname })
	}

	static getByDates(checkin, checkout) {
		return apiClient
			.get(Endpoints.byDates())
			.set(HeaderSets.accept)
			.query({ checkin, checkout })
	}

	static create(payload) {
		return apiClient
			.post(Endpoints.create())
			.set(HeaderSets.common)
			.send(payload)
	}

	static updateWithAuth(id, payload) {
		return apiClient
			.put(Endpoints.update(id))
			.set(HeaderSets.common)
			.set(HeaderSets.authorization())
			.send(payload)
	}

	static async updateWithToken(id, payload) {
		const token = await getAuthToken()

		return apiClient
			.put(Endpoints.update(id))
			.set(HeaderSets.common)
			.set(HeaderSets.cookie(token))
			.send(payload)
	}

	static deleteWithAuth(id) {
		return apiClient
			.delete(Endpoints.delete(id))
			.set(HeaderSets.authorization())
	}

	static async deleteWithToken(id) {
		const token = await getAuthToken()

		return apiClient
			.delete(Endpoints.delete(id))
			.set(HeaderSets.cookie(token))
	}
}
