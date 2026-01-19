// src/support/world-setup.ts
import { setWorldConstructor } from "@cucumber/cucumber"
import { ToolshopWorld } from "./world"

setWorldConstructor(ToolshopWorld)
