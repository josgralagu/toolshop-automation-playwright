import { AuthService } from "../business/AuthService.js"

export async function getAuthToken() {
	const res = await AuthService.createToken()
	return res.body.token
}
