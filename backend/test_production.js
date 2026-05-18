const axios = require('axios');

const API_URL = 'https://ai-backend-q7l2.onrender.com/api';

async function testFullFlow() {
  try {
    console.log('1. Registering user...');
    const authRes = await axios.post(`${API_URL}/auth/register`, {
      name: 'Test Admin',
      email: `admin_${Date.now()}@test.com`,
      password: 'password123'
    });
    
    const token = authRes.data.token;
    console.log('Login successful! Token:', token.substring(0, 15) + '...');
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    console.log('2. Adding employee...');
    const empRes = await axios.post(`${API_URL}/employees`, {
      name: 'John Doe',
      email: `john_${Date.now()}@test.com`,
      department: 'Development',
      skills: ['React', 'Node'],
      performanceScore: 85,
      experience: 5
    });
    console.log('Employee added:', empRes.data.data.name);

    console.log('3. Requesting AI recommendations...');
    const aiRes = await axios.post(`${API_URL}/ai/recommend`, {
       employeeIds: [empRes.data.data._id]
    });
    
    console.log('AI Response SUCCESS:');
    console.log(JSON.stringify(aiRes.data, null, 2));
    
  } catch (err) {
    console.error('\n--- API ERROR ---');
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Data:', err.response.data);
    } else {
      console.error(err.message);
    }
  }
}

testFullFlow();
