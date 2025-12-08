import { expect } from 'chai';
import { BookingService } from '../business/BookingService.js';
import { newBookingPayload } from '../utilities/booking.payloads.js';
import { bookingSchema } from '../utilities/booking.schemas.js';
import { validateObject } from '../utilities/validators.js';
import { timed } from '../utilities/time.js';

describe('GET /booking/{id} - Retrieve a single booking by ID', () => {
  let bookingId;
  let res;

  before(async () => {
    const createRes = await BookingService.create(newBookingPayload);
    bookingId = createRes.body.bookingid;
  });

  after(async () => {
    await BookingService.deleteWithAuth(bookingId);
  });

  beforeEach(async () => {
    res = await timed(() => BookingService.getById(bookingId));
  });

  it('returns 200 status', () => {
    expect(res.status).to.equal(200);
  });

  it('Content-Type header is application/json', () => {
    expect(res.headers['content-type']).to.match(/application\/json/);
  });

  it('response contains all required fields', () => {
    expect(res.body).to.include.all.keys(
      'firstname', 'lastname', 'totalprice', 'depositpaid',
      'bookingdates', 'additionalneeds'
    );
  });

  it('response schema is valid', () => {
    validateObject(res.body, bookingSchema);
  });

  it('response time is under 1500 ms', () => {
    expect(res.duration).to.be.below(1500);
  });
});