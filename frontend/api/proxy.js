// Vercel serverless function to proxy API requests and bypass CORS
const axios = require('axios');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const backendUrl = 'https://resumeanalyserbackend-production-2e0c.up.railway.app';
    const { url, method, headers, body } = req;
    
    // Remove host header to avoid conflicts
    const { host, ...cleanHeaders } = headers;
    
    // Forward request to backend
    const response = await axios({
      method: method || 'GET',
      url: `${backendUrl}${url}`,
      headers: {
        ...cleanHeaders,
        'Content-Type': 'application/json',
      },
      data: body ? JSON.parse(body) : undefined,
      validateStatus: () => true, // Don't throw on HTTP errors
    });

    // Forward response
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Proxy error',
      message: error.message 
    });
  }
};
