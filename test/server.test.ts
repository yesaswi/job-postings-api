import request = require('supertest');
import { app } from '../src/server';
import { server } from '../src/server';

describe('Server', () => {
  it('should return jobs for a valid company', async () => {
    const response = await request(app).get('/api/ibm');
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('jobs');
  });

  it('should return an error for an invalid company', async () => {
    const response = await request(app).get('/api/invalid-company');
    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('error');
  });
  
  afterAll(() => {
    server.close()
  });
});
