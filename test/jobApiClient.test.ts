// test/jobApiClient.test.ts

import { JobApiClient } from '../src/jobApiClient';
import fetchMock from 'jest-fetch-mock';

// Use fetchMock instead of the actual fetch function
global.fetch = fetchMock;

describe('JobApiClient', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('fetchJobs should call fetch with correct URL and options', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));

    const client = new JobApiClient('https://example.com/api');
    await client.fetchJobs();

    expect(fetchMock).toHaveBeenCalledWith('https://example.com/api', {
      method: 'GET',
      headers: undefined,
      body: null,
    });
  });

  test('fetchJobs should return fetched data', async () => {
    const mockData = [
      {
        id: 1,
        title: 'Job 1',
      },
      {
        id: 2,
        title: 'Job 2',
      },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const client = new JobApiClient('https://example.com/api');
    const jobs = await client.fetchJobs();

    expect(jobs).toEqual(mockData);
  });

  test('fetchJobs should throw an error if fetch fails', async () => {
    fetchMock.mockRejectOnce(new Error('Fetch failed'));

    const client = new JobApiClient('https://example.com/api');
    await expect(client.fetchJobs()).rejects.toThrow('Fetch failed');
  });

  // Add more tests for other methods and scenarios, such as testing fetchWorkdayJobs and error handling.
//   it('test job-openings.JobApiClient.fetchJobs', function(done) {
//     this.timeout(10000);
//     job_openings.JobApiClient.fetchJobs().then(function (result) {
//         assert.isNotNull(result);
//         assert.isTrue(result.length > 0);
//         done();
//     }).catch(function (err) {
//         done(err);
//     });
// })
});


describe('test job_openings', function() {
  
})