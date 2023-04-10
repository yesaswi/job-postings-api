import express = require('express');
import { JobApiClient } from './jobApiClient';
import clientConfig from './companyConfig';

const app = express();
const port = 3000;

function createClient(config: any): JobApiClient {
  return new JobApiClient(config.baseUrl, config.fetchMethod, config.fetchBody, config.isWorkday);
}

const clients = {
  ibm: createClient(clientConfig.ibm),
  amzn: createClient(clientConfig.amzn),
  salesforce: createClient(clientConfig.salesforce),
  fidelity: createClient(clientConfig.fidelity),
};

app.get('/api/:company', async (req, res) => {
  const { company } = req.params;

  if (!clients[company]) {
    res.status(400).json({ error: 'Invalid company' });
    return;
  }

  try {
    const jobs = await clients[company].fetchJobs();
    res.json({ jobs });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: `Error fetching ${company} jobs: ${error.message}` });
    } else {
      res.status(500).json({ error: `Error fetching ${company} jobs` });
    }
  }
});

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  
});

export { app, server };
