// Proxy for authentication endpoints
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
    const { query, method, headers, body } = req;
    
    // Get the endpoint from the query (e.g., /login, /register)
    const endpoint = req.url.replace('/api/auth', '') || '/';
    
    console.log('Proxy request:', { method, endpoint, body });
    
    // Forward request to backend
    const response = await axios({
      method: method || 'GET',
      url: `${backendUrl}/api/auth${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': headers.authorization || '',
      },
      data: body ? JSON.parse(body) : undefined,
      validateStatus: () => true, // Don't throw on HTTP errors
    });

    console.log('Proxy response:', response.status, response.data);
    
    // Forward response
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Auth proxy error:', error);
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ 
        error: 'Proxy error',
        message: error.message 
      });
    }
  }
};
