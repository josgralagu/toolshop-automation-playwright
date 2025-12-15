import Joi from "joi"

export const emptyBookingIdListSchema = Joi.array().length(0)
emptyBookingIdListSchema
export const nonEmptyBookingIdListSchema = Joi.array()
	.min(1)
	.items(Joi.object({ bookingid: Joi.number().integer().positive() }))

export const bookingSchema = Joi.object({
	firstname: Joi.string().required(),
	lastname: Joi.string().required(),
	totalprice: Joi.number().min(0).required(),
	depositpaid: Joi.boolean().required(),
	bookingdates: Joi.object({
		checkin: Joi.date().iso().required(),
		checkout: Joi.date().iso().required()
	}).required(),
	additionalneeds: Joi.string().allow("")
})

export const createdBookingSchema = Joi.object({
	bookingid: Joi.number().integer().positive().required(),
	booking: bookingSchema.required()
})
