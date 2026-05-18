# AI Driven Full Stack Development (AI308B) - Final Project Report

**Name:** [Your Name]
**Roll Number:** [Your Roll Number]
**Semester:** B.Tech, 4th SEMESTER (Even Sem. - 2025-26)

---

## 1. GitHub Repository & Live URLs (Q8)

- **GitHub Repository Link:** [Paste your GitHub Repo Link Here]
- **Backend API URL (Render):** [Paste your Backend URL Here, e.g., https://your-backend.onrender.com]
- **Frontend Live URL (Render):** [Paste your Frontend URL Here, e.g., https://your-frontend.onrender.com]

---

## 2. Render Deployment Screenshots (Q8, Q9)

### 2.1 Backend Deployment Successful
*[Insert Screenshot of Render Dashboard showing Backend deployment 'Live' and successful]*

### 2.2 Frontend Deployment Successful
*[Insert Screenshot of Render Dashboard showing Frontend deployment 'Live' and successful]*

### 2.3 Render Testing Live URL for Endpoints
*[Insert Screenshot of the live deployed frontend application working in the browser]*
*[Insert Screenshot of a successful GET request to your LIVE backend URL via browser or Postman]*

---

## 3. Database Implementation & Screenshots (Q3)

### 3.1 MongoDB Atlas Connection & Collections
*[Insert Screenshot of your MongoDB Atlas Database showing the 'users' and 'employees' collections]*

### 3.2 Data Stored in MongoDB
*[Insert Screenshot of the 'employees' collection documents, showing fields like name, email, department, skills, etc.]*
*[Insert Screenshot of the 'users' collection showing the encrypted password (bcrypt)]*

---

## 4. Postman / Thunder Client Testing Screenshots (Q2, Q6)

### 4.1 Authentication Testing (Q6)
- **Valid Login (JWT Token generated)**
  *[Insert Postman Screenshot: POST /api/auth/login]*

- **Access Protected Route without Token (Access Denied)**
  *[Insert Postman Screenshot: GET /api/employees without Authorization header]*

### 4.2 Employee CRUD API Testing (Q2, Q3)
- **Add Employee (POST /api/employees)**
  *[Insert Postman Screenshot: Adding valid employee]*

- **Duplicate Email Validation Error**
  *[Insert Postman Screenshot: Trying to add the same email twice]*

- **Missing Performance Score Validation Error**
  *[Insert Postman Screenshot: Missing a required field]*

- **Search Employee (GET /api/employees/search?department=Development)**
  *[Insert Postman Screenshot: Fetching filtered employees]*

### 4.3 AI Recommendation API Testing (Q5)
- **AI Recommendation generation (POST /api/ai/recommend)**
  *[Insert Postman Screenshot: Successfully calling the AI recommendation endpoint]*

---

## 5. Application Code Output & UI Screenshots (Q1, Q4, Q5)

### 5.1 Registration & Login UI
*[Insert Screenshot of the Login and Signup screens (Rich aesthetics, dark mode)]*

### 5.2 Employee Registration Form & List Page (Q1)
*[Insert Screenshot of the main Dashboard showing the "Add Employee" form and the list of employees]*

### 5.3 Search & Filter Section
*[Insert Screenshot showing the user searching for "Development" and the filtered list]*

### 5.4 AI Recommendation Display Page (Q5)
*[Insert Screenshot of the AI Insights page showing promotions, ranking, training, and feedback]*

---

## 6. Code Snippets & Architecture (Q9)

*Note: The project was structured cleanly with separated frontend and backend directories, using functional components, context for state, and MVC architecture for the backend.*

### 6.1 Backend: AI Integration Controller (`backend/controllers/aiController.js`)
\`\`\`javascript
const axios = require('axios');
const Employee = require('../models/Employee');

exports.getRecommendations = async (req, res, next) => {
  try {
    const { employeeIds } = req.body;
    let employees = employeeIds && employeeIds.length > 0 
      ? await Employee.find({ _id: { $in: employeeIds } }) 
      : await Employee.find();

    const employeeData = employees.map(emp => ({
      name: emp.name, department: emp.department, skills: emp.skills,
      performanceScore: emp.performanceScore, experience: emp.experience
    }));

    const prompt = `You are an HR AI assistant. Analyze data: ${JSON.stringify(employeeData)}`;
    
    // Makes request to AI API using standard endpoints...
    // See full code in repository.
  } catch (err) {
    next(err);
  }
};
\`\`\`

### 6.2 Frontend: Protected Routes & App Structure (`frontend/src/App.jsx`)
\`\`\`javascript
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
// ... imports

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {isAuthenticated && <Navbar />}
      <div className="container">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/ai-recommendations" element={<ProtectedRoute><AIRecommendations /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}
export default App;
\`\`\`
