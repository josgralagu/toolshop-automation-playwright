// src/support/hooks.ts
import {
	Before,
	After,
	BeforeAll,
	AfterAll,
	Status,
	ITestCaseHookParameter,
	setDefaultTimeout
} from "@cucumber/cucumber"
import { chromium, firefox } from "playwright"
import * as fs from "fs"
import * as path from "path"
import { ToolshopWorld } from "./world"

setDefaultTimeout(60000)

BeforeAll(async function () {
	console.log("🎬 Starting Cucumber Test Suite")

	const reportDirs = [
		"reports/cucumber",
		"reports/cucumber/screenshots",
		"reports/cucumber/videos"
	]

	reportDirs.forEach((dir) => {
		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true })
			console.log(`📁 Created directory: ${dir}`)
		}
	})
})

Before(async function (
	this: ToolshopWorld,
	{ pickle }: ITestCaseHookParameter
) {
	// Get browser from worldParameters (default to chromium)
	const browserName = this.parameters.browser || 'chromium'

	console.log("\n" + "=".repeat(80))
	console.log(`🚀 Starting: ${pickle.name}`)
	console.log(`📂 Feature: ${pickle.uri}`)
	console.log(`🏷️  Tags: ${pickle.tags.map((t) => t.name).join(", ")}`)
	console.log(`🌐 Browser: ${browserName}`)
	console.log("=".repeat(80))

	// Select browser type
	const browserType = browserName === 'firefox' ? firefox : chromium

	this.browser = await browserType.launch({
		headless: false,
		args: ["--start-maximized"]
	})

	this.context = await this.browser.newContext({
		viewport: { width: 1920, height: 1080 },
		ignoreHTTPSErrors: true,
		locale: "en-US",
		timezoneId: "America/New_York"
	})

	this.page = await this.context.newPage()
	this.page.setDefaultTimeout(this.parameters.timeout ?? 60000)

	this.testData = {
		scenarioName: pickle.name,
		scenarioUri: pickle.uri,
		startTime: Date.now(),
		tags: pickle.tags.map((tag) => tag.name),
		browser: browserName
	}

	console.log("✅ Browser, context, and page initialized")
})

After(async function (
	this: ToolshopWorld,
	{ result, pickle }: ITestCaseHookParameter
) {
	const duration = Date.now() - this.testData.startTime
	const durationSeconds = (duration / 1000).toFixed(2)

	const isPassed = result?.status === Status.PASSED
	const isFailed = result?.status === Status.FAILED

	if (isFailed && this.page) {
		const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
		const scenarioNameSafe = pickle.name.replace(/[^a-zA-Z0-9]/g, "_")
		const screenshotPath = path.join(
			"reports/cucumber/screenshots",
			`${scenarioNameSafe}_${timestamp}.png`
		)

		try {
			const screenshot = await this.page.screenshot({
				path: screenshotPath,
				fullPage: true
			})

			console.log(`📸 Screenshot saved: ${screenshotPath}`)
			await this.attach(screenshot, "image/png")
		} catch (error) {
			console.error(`❌ Failed to capture screenshot: ${error}`)
		}
	}

	console.log("=".repeat(80))
	if (isPassed) {
		console.log(`✅ PASSED: ${pickle.name} (${durationSeconds}s)`)
	} else if (isFailed) {
		console.log(`❌ FAILED: ${pickle.name} (${durationSeconds}s)`)
		if (result?.message) {
			console.log(`💬 Error: ${result.message}`)
		}
	}
	console.log("=".repeat(80) + "\n")

	try {
		if (this.page) await this.page.close()
		if (this.context) await this.context.close()
		if (this.browser) await this.browser.close()
	} catch (error) {
		console.error(`⚠️  Error during cleanup: ${error}`)
	}
})

AfterAll(async function () {
	console.log("\n" + "=".repeat(80))
	console.log("🏁 Cucumber Test Suite Completed")
	console.log("📊 Check reports at: reports/cucumber/cucumber-report.html")
	console.log("=".repeat(80))
})
