import { expect } from 'chai';
import { apiClient } from '../utilities/apiClient.js';

console.log('Verifying API Health Check');

export default {
  beforeAll: async function() {
    this.timeout(5000);

    try {
      const res = await apiClient.get('/ping');
      expect(res.status).to.equal(201, 'API Health Check Failed: /ping did not return 201');
    } catch (error) {
      console.error('❌ API is down or not responding correctly.');
      console.error(error.message);
      throw new Error('Halting test execution: API health check failed.');
    }
  }
};