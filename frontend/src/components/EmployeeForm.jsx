import { useState } from 'react';
import axios from 'axios';
import { Save } from 'lucide-react';

const EmployeeForm = ({ onAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    performanceScore: '',
    experience: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        performanceScore: Number(formData.performanceScore),
        experience: Number(formData.experience)
      };
      await axios.post('/api/employees', payload);
      onAdded();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee');
    }
  };

  return (
    <div className="glass-panel">
      <h3 style={{ marginBottom: '16px' }}>Register New Employee</h3>
      {error && <div style={{ color: 'var(--danger)', marginBottom: '16px' }}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Full Name</label>
          <input type="text" name="name" className="input-field" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Email</label>
          <input type="email" name="email" className="input-field" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Department</label>
          <input type="text" name="department" className="input-field" value={formData.department} onChange={handleChange} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Skills (comma separated)</label>
          <input type="text" name="skills" className="input-field" placeholder="React, Node.js, MongoDB" value={formData.skills} onChange={handleChange} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Performance Score (0-100)</label>
          <input type="number" name="performanceScore" className="input-field" min="0" max="100" value={formData.performanceScore} onChange={handleChange} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>Years of Experience</label>
          <input type="number" name="experience" className="input-field" min="0" value={formData.experience} onChange={handleChange} required />
        </div>
        
        <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="btn btn-primary">
            <Save size={18} /> Save Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
