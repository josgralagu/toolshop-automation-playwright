export const newBookingPayload = {
	firstname: "Jim",
	lastname: "Brown",
	totalprice: 0,
	depositpaid: true,
	bookingdates: { checkin: "2018-01-01", checkout: "2019-01-01" },
	additionalneeds: "Breakfast"
}

export const updateBookingPayload = {
	...newBookingPayload,
	firstname: "James",
	totalprice: 113
}
