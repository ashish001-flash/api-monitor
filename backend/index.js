const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/proxy', async (req, res) => {
  const { method, url, headers, data } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const startTime = Date.now();

  try {
    const response = await axios({
      method: method || 'GET',
      url,
      headers: headers || {},
      data: data || null,
      validateStatus: () => true, // Don't throw on error statuses
    });

    const latency = Date.now() - startTime;
    const payloadSize = JSON.stringify(response.data).length;

    res.json({
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      latency,
      size: payloadSize,
    });
  } catch (error) {
    const latency = Date.now() - startTime;
    res.status(500).json({
      error: 'Proxy request failed',
      message: error.message,
      latency,
    });
  }
});

app.listen(PORT, () => {
  console.log(`API Tester Proxy running on http://localhost:${PORT}`);
});
