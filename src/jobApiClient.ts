/*
The JobApiClient class is used to fetch jobs from the API.
The JobApiClient class has 4 properties:
  - baseUrl: string
    - This is the url that we will fetch from.
  - fetchMethod: 'GET' | 'POST'
    - This is the method that we will use to fetch from the baseUrl.
  - fetchBody: string | null  
    - This is the body that we will use to fetch from the baseUrl.
  - isWorkday: boolean
    - This is a boolean that tells us if the company uses Workday or not.
    - If the company uses Workday, we will use a different fetch method to get the data.
    - If the company does not use Workday, we will use the default fetch method to get the data.
*/

export class JobApiClient {
  protected baseUrl: string;
  protected fetchMethod: 'GET' | 'POST';
  protected fetchBody: string | null;
  protected isWorkday: boolean;

  constructor(
    baseUrl: string,
    fetchMethod: 'GET' | 'POST' = 'GET',
    fetchBody: string | null = null,
    isWorkday: boolean = false
  ) {
    this.baseUrl = baseUrl;
    this.fetchMethod = fetchMethod;
    this.fetchBody = fetchBody;
    this.isWorkday = isWorkday;
  }

  async fetchJobs(): Promise<any[]> {
    if (this.isWorkday) {
      return await this.fetchWorkdayJobs();
    }

    const url = `${this.baseUrl}`;
    const options: RequestInit = {
      method: this.fetchMethod,
      headers: this.fetchMethod === 'POST' ? { 'Content-Type': 'application/json' } : undefined,
      body: this.fetchBody,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText}`);
    }

    const data: any[] = await response.json();
    return data;
  }

  private async fetchWorkdayJobs(): Promise<any[]> {
    let allData: any[] = [];
    let offset = 0;
    let hasMoreData = true;

    while (hasMoreData) {
      const url = `${this.baseUrl}`;
      const fetchBody = this.fetchBody ? JSON.parse(this.fetchBody) : null;

      if (fetchBody) {
        fetchBody.offset = offset;
      }

      const options: RequestInit = {
        method: this.fetchMethod,
        headers: this.fetchMethod === 'POST' ? { 'Content-Type': 'application/json' } : undefined,
        body: fetchBody ? JSON.stringify(fetchBody) : null,
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      allData = allData.concat(data.jobPostings);

      if (data.jobPostings.length === fetchBody.limit) {
        offset += fetchBody.limit;
      } else {
        hasMoreData = false;
      }
    }

    return allData;
  }
}

/* 
Here is the explanation for the code above:

1. The fetchJobs() function will call the fetchWorkdayJobs() function if the isWorkday variable is true. 
Otherwise, it will call the fetch() function to get the jobs from the API.

2. The fetchWorkdayJobs() function is a private function that will get the jobs from the API. The function will use the fetch() 
function to get the jobs, and it will iterate over the API to get all the jobs. The fetch() function will get the jobs in batches. 
The API will return only a certain number of jobs at a time. Therefore, the fetchWorkdayJobs() function will loop over the API while 
there are still more jobs to fetch. The API will return a boolean value in the hasMoreData variable. This value will be set to true 
if there are still more jobs to fetch. Otherwise, the value will be set to false. The function will loop over the API until the 
hasMoreData variable is set to false. 

*/