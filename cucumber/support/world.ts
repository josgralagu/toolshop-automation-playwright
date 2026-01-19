// src/support/world.ts
import { World, IWorldOptions } from "@cucumber/cucumber"
import type { Page, Browser, BrowserContext } from "playwright"

export interface CustomWorld extends World {
	page?: Page
	browser?: Browser
	context?: BrowserContext
	testData?: Record<string, any>
}

export class ToolshopWorld extends World implements CustomWorld {
	page?: Page
	browser?: Browser
	context?: BrowserContext
	testData: Record<string, any> = {}

	constructor(options: IWorldOptions) {
		super(options)
	}
}
