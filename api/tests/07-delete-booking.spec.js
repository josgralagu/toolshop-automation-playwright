import { expect } from 'chai';
import { BookingService } from '../business/BookingService.js';
import { newBookingPayload } from '../utilities/booking.payloads.js';
import { timed } from '../utilities/time.js';

describe('DELETE /booking/{id} - Delete a booking with Basic Auth', () => {
  let bookingId;
  let delRes;

  before(async () => {
    const createRes = await BookingService.create(newBookingPayload);
    bookingId = createRes.body.bookingid;
  });

  beforeEach(async () => {                
    delRes = await timed(() => BookingService.deleteWithAuth(bookingId));
  });

  it('returns 201 status', () => {
    expect(delRes.status).to.equal(201);
  });

  it('response time is under 1500 ms', () => {
    expect(delRes.duration).to.be.below(1500);
  });

  it('booking no longer exists', async () => {
    const getRes = await BookingService.getById(bookingId);
    expect(getRes.status).to.equal(404);
  });
});

describe('DELETE /booking/{id} - Delete a booking with a token', () => {
  let bookingId;
  let delRes;

  before(async () => {
    const createRes = await BookingService.create(newBookingPayload);
    bookingId = createRes.body.bookingid;
  });

  beforeEach(async () => {                
    delRes = await timed(() => BookingService.deleteWithToken(bookingId));
  });

  it('returns 201 status', () => {
    expect(delRes.status).to.equal(201);
  });

  it('response time is under 1500 ms', () => {
    expect(delRes.duration).to.be.below(1500);
  });

  it('booking no longer exists', async () => {
    const getRes = await BookingService.getById(bookingId);
    expect(getRes.status).to.equal(404);
  });
});