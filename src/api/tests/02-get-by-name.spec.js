import { expect } from 'chai';
import { BookingService } from '../business/BookingService.js';
import { bookingIdListSchema_nonEmpty, bookingIdListSchema_mustBeEmpty } from '../utilities/booking.schemas.js';
import { validateObject } from '../utilities/validators.js';
import { timed } from '../utilities/time.js';

describe('GET /booking - Get booking IDs filtered by name', () => {
  let res;

  before(async () => {
    res = await timed(() => BookingService.getByName('Jim', 'Brown'));
  });

  it('returns 200 status', () => {
    expect(res.status).to.equal(200);
  });

  it('Content-Type header is application/json', () => {
    expect(res.headers['content-type']).to.match(/^application\/json(;.*)?$/);
  });

  it('every returned object contains bookingid', () => {
    expect(res.body).to.be.an('array');
    res.body.forEach(item => {
      expect(item).to.have.property('bookingid').that.is.a('number');
    });
  });

  it('response schema is valid', () => {
    validateObject(res.body, bookingIdListSchema_nonEmpty);
  });

  it('response time is under 1500 ms', () => {
    expect(res.duration).to.be.below(1500);
  });
});

describe('GET /booking - Getting 0 booking IDs filtered by name', () => {
  let res;

  before(async () => {
    res = await timed(() => BookingService.getByName('Sally', 'Trown'));
  });

  it('returns 200 status', () => {
    expect(res.status).to.equal(200);
  });

  it('Content-Type header is application/json', () => {
    expect(res.headers['content-type']).to.match(/^application\/json(;.*)?$/);
  });

  it('response body is an empty array', () => {
    expect(res.body).to.be.an('array').that.is.empty;
  });

  it('response schema is valid', () => {
    validateObject(res.body, bookingIdListSchema_mustBeEmpty);
  });

  it('response time is under 1500 ms', () => {
    expect(res.duration).to.be.below(1500);
  });
});