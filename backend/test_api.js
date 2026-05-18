const axios = require('axios');

async function testSignup() {
  try {
    console.log('Testing Signup on production backend...');
    const res = await axios.post('https://ai-backend-q7l2.onrender.com/api/auth/register', {
      name: 'Test Agent',
      email: `test${Date.now()}@agent.com`,
      password: 'password123'
    });
    console.log('Signup Success:', res.data);
  } catch (err) {
    console.error('Signup Error:', err.response ? err.response.data : err.message);
  }
}

testSignup();
