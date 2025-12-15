import { expect } from "chai"
import { BookingService } from "../business/BookingService.js"
import {
	newBookingPayload,
	updateBookingPayload
} from "../utilities/booking.payloads.js"
import { bookingSchema } from "../utilities/booking.schemas.js"
import { validateObject } from "../utilities/validators.js"
import { timed } from "../utilities/time.js"

describe("PUT /booking/{id} - Update a booking with Basic Auth", () => {
	let bookingId
	let res

	before(async () => {
		const createRes = await BookingService.create(newBookingPayload)
		bookingId = createRes.body.bookingid
	})

	after(async () => {
		await BookingService.deleteWithAuth(bookingId)
	})

	beforeEach(async () => {
		res = await timed(() =>
			BookingService.updateWithAuth(bookingId, updateBookingPayload)
		)
	})

	it("returns 200 status", () => {
		expect(res.status).to.equal(200)
	})

	it("Content-Type header is application/json", () => {
		expect(res.headers["content-type"]).to.match(/application\/json/)
	})

	it("firstname was updated to James", () => {
		expect(res.body.firstname).to.equal(updateBookingPayload.firstname)
	})

	it("totalprice was updated to 113", () => {
		expect(res.body.totalprice).to.equal(updateBookingPayload.totalprice)
	})

	it("response schema is valid", () => {
		validateObject(res.body, bookingSchema)
	})

	it("response time is under 1500 ms", () => {
		expect(res.duration).to.be.below(1500)
	})
})

describe("PUT /booking/{id} - Update a booking with a token", () => {
	let bookingId
	let res

	before(async () => {
		const createRes = await BookingService.create(newBookingPayload)
		bookingId = createRes.body.bookingid
	})

	after(async () => {
		await BookingService.deleteWithAuth(bookingId)
	})

	beforeEach(async () => {
		res = await timed(() =>
			BookingService.updateWithToken(bookingId, updateBookingPayload)
		)
	})

	it("returns 200 status", () => {
		expect(res.status).to.equal(200)
	})

	it("Content-Type header is application/json", () => {
		expect(res.headers["content-type"]).to.match(/application\/json/)
	})

	it("firstname was updated to James", () => {
		expect(res.body.firstname).to.equal(updateBookingPayload.firstname)
	})

	it("totalprice was updated to 113", () => {
		expect(res.body.totalprice).to.equal(updateBookingPayload.totalprice)
	})

	it("response schema is valid", () => {
		validateObject(res.body, bookingSchema)
	})

	it("response time is under 1500 ms", () => {
		expect(res.duration).to.be.below(1500)
	})
})
