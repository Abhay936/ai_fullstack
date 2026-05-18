import { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import { Search } from 'lucide-react';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchEmployees = async (search = '') => {
    try {
      const url = search 
        ? `http://localhost:5000/api/employees/search?department=${search}`
        : 'http://localhost:5000/api/employees';
      const res = await axios.get(url);
      setEmployees(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(searchTerm);
  };

  const handleEmployeeAdded = () => {
    fetchEmployees();
    setIsFormOpen(false);
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        fetchEmployees();
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Employee Directory</h2>
        <button className="btn btn-primary" onClick={() => setIsFormOpen(!isFormOpen)}>
          {isFormOpen ? 'Close Form' : 'Add Employee'}
        </button>
      </div>

      {isFormOpen && (
        <div style={{ marginBottom: '24px' }}>
          <EmployeeForm onAdded={handleEmployeeAdded} />
        </div>
      )}

      <div className="glass-panel" style={{ marginBottom: '24px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
             <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-secondary)' }} />
             <input
              type="text"
              className="input-field"
              style={{ paddingLeft: '40px', marginBottom: 0 }}
              placeholder="Search by Department (e.g. Development)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-secondary">Search</button>
          <button type="button" className="btn btn-secondary" onClick={() => { setSearchTerm(''); fetchEmployees(''); }}>Clear</button>
        </form>
      </div>

      <EmployeeList employees={employees} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;
