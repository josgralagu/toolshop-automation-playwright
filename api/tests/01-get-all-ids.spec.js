import { expect } from "chai"
import { BookingService } from "../business/BookingService.js"
import { nonEmptyBookingIdListSchema } from "../utilities/booking.schemas.js"
import { validateObject } from "../utilities/validators.js"
import { timed } from "../utilities/time.js"

describe("GET /booking - Get all booking IDs without filters", () => {
	let res

	before(async () => {
		res = await timed(BookingService.getAll)
	})

	it("returns 200 status", () => {
		expect(res.status).to.equal(200)
	})

	it("Content-Type header is application/json", () => {
		expect(res.headers["content-type"]).to.match(
			/^application\/json(;.*)?$/
		)
	})

	it("response body is an array of booking IDs", () => {
		expect(res.body).to.be.an("array")
		expect(res.body.length).to.be.greaterThan(0)
	})

	it("schema of the list is valid", () => {
		validateObject(res.body, nonEmptyBookingIdListSchema)
	})

	it("response time is under 1500 ms", () => {
		expect(res.duration).to.be.below(1500)
	})
})
