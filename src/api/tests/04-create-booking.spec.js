import { expect } from 'chai';
import { BookingService } from '../business/BookingService.js';
import { newBookingPayload } from '../utilities/booking.payloads.js';
import { createdBookingSchema } from '../utilities/booking.schemas.js';
import { validateObject } from '../utilities/validators.js';
import { timed } from '../utilities/time.js';

describe('POST /booking - Create a new booking – boundary value 0', () => {
  let res;

  before(async () => {
    res = await timed(() => BookingService.create(newBookingPayload));
  });

  it('returns 200 status', () => {
    expect(res.status).to.equal(200);
  });

  it('Content-Type header is application/json', () => {
    expect(res.headers['content-type']).to.match(/application\/json/);
  });

  it('response contains new bookingid', () => {
    expect(res.body).to.have.property('bookingid').that.is.a('number');
  });

  it('totalprice in response equals 0 (boundary)', () => {
    expect(res.body.booking.totalprice).to.equal(0);
  });

  it('response schema is valid', () => {
    validateObject(res.body, createdBookingSchema);
  });

  it('response time is under 1500 ms', () => {
    expect(res.duration).to.be.below(1500);
  });
});