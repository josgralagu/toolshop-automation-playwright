import supertest from 'supertest';
import { API_CONFIG } from '../configs/api.config.js';

const request = supertest(API_CONFIG.baseURL);

export const apiClient = {
  get: (path) => request.get(path),
  post: (path) => request.post(path),
  put: (path) => request.put(path),
  delete: (path) => request.delete(path)
};

export const HeaderSets = {
  common: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  accept: {
    'Accept': 'application/json'
  },
  content_Type: {
    'Content-Type': 'application/json',
  },
  authorization: () => ({
    'Authorization': 'Basic ' + Buffer.from('admin:password123').toString('base64')
  }),
  cookie: (token) => ({
    'Cookie': `token=${token}`
  })
};