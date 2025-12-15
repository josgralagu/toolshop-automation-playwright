const BASE_PATH = "/booking"
const AUTH_PATH = "/auth"

export const Endpoints = {
	auth: () => AUTH_PATH,
	base: () => BASE_PATH,
	byId: (id) => `${BASE_PATH}/${id}`,
	byName: () => BASE_PATH,
	byDates: () => BASE_PATH,
	create: () => BASE_PATH,
	update: (id) => `${BASE_PATH}/${id}`,
	delete: (id) => `${BASE_PATH}/${id}`
}
