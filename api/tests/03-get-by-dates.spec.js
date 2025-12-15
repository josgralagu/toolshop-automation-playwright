import { expect } from "chai"
import { BookingService } from "../business/BookingService.js"
import {
	nonEmptyBookingIdListSchema,
	emptyBookingIdListSchema
} from "../utilities/booking.schemas.js"
import { validateObject } from "../utilities/validators.js"
import { timed } from "../utilities/time.js"
import { newBookingPayload } from "../utilities/booking.payloads.js"

describe("GET /booking - Get booking IDs – equivalence class for future date filters", () => {
	let res

	before(async () => {
		res = await timed(() =>
			BookingService.getByDates("2026-01-01", "2026-01-02")
		)
	})

	it("returns 200 status", () => {
		expect(res.status).to.equal(200)
	})

	it("Content-Type header is application/json", () => {
		expect(res.headers["content-type"]).to.match(/application\/json/)
	})

	it("response body is an empty array (no future bookings)", () => {
		expect(res.body).to.be.an("array").that.is.empty
	})

	it("response schema is still valid", () => {
		validateObject(res.body, emptyBookingIdListSchema)
	})

	it("response time is under 1500 ms", () => {
		expect(res.duration).to.be.below(1500)
	})
})

describe("GET /booking - Get booking IDs – equivalence class for an old date filters", () => {
	let res

	before(async () => {
		await BookingService.create(newBookingPayload)
		res = await timed(() =>
			BookingService.getByDates("2018-01-01", "2019-01-01")
		)
	})

	it("returns 200 status", () => {
		expect(res.status).to.equal(200)
	})

	it("Content-Type header is application/json", () => {
		expect(res.headers["content-type"]).to.match(/application\/json/)
	})

	it("response body is an array", () => {
		expect(res.body).to.be.an("array")
	})

	it("response body is has at least one booking matching", () => {
		expect(res.body.length).to.be.greaterThan(0)
	})

	it("response schema is still valid", () => {
		validateObject(res.body, nonEmptyBookingIdListSchema)
	})

	it("response time is under 1500 ms", () => {
		expect(res.duration).to.be.below(1500)
	})
})
