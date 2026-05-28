import { test as setup } from "@playwright/test"
import { pages } from "../../po/index.js"
import { generateValidUser } from "../../configs/utils/testData.js"
import fs from "fs"
import path from "path"

const authFile = path.join(process.cwd(), "playwright", ".auth", "user.json")

setup("authenticate", async ({ page }) => {
	const dir = path.dirname(authFile)
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true })
	}

	const user = generateValidUser()
	const signUpPage = pages("signup", page)
	const signInPage = pages("signin", page)
	const myAccountPage = pages("myaccount", page)

	await signUpPage.navigateToSignUp()
	await signUpPage.completeRegistration(user)

	await signInPage.navigateToSignIn()
	await signInPage.logIn(user.email, user.password)
	await myAccountPage.waitForUserNameVisible()

	await page.context().storageState({ path: authFile })
})
