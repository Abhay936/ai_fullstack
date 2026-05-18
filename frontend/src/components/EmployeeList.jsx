import { Trash2 } from 'lucide-react';

const EmployeeList = ({ employees, onDelete }) => {
  if (employees.length === 0) {
    return (
      <div className="glass-panel" style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No employees found.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px', fontWeight: 500, color: 'var(--text-secondary)' }}>Name</th>
              <th style={{ padding: '16px', fontWeight: 500, color: 'var(--text-secondary)' }}>Department</th>
              <th style={{ padding: '16px', fontWeight: 500, color: 'var(--text-secondary)' }}>Score</th>
              <th style={{ padding: '16px', fontWeight: 500, color: 'var(--text-secondary)' }}>Exp (Yrs)</th>
              <th style={{ padding: '16px', fontWeight: 500, color: 'var(--text-secondary)' }}>Skills</th>
              <th style={{ padding: '16px', fontWeight: 500, color: 'var(--text-secondary)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: 500 }}>{emp.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{emp.email}</div>
                </td>
                <td style={{ padding: '16px' }}>{emp.department}</td>
                <td style={{ padding: '16px' }}>
                   <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '12px',
                      background: emp.performanceScore >= 80 ? 'rgba(16, 185, 129, 0.2)' : emp.performanceScore < 50 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: emp.performanceScore >= 80 ? 'var(--success)' : emp.performanceScore < 50 ? 'var(--danger)' : '#fcd34d'
                   }}>
                     {emp.performanceScore}
                   </span>
                </td>
                <td style={{ padding: '16px' }}>{emp.experience}</td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {emp.skills.map((skill, idx) => (
                      <span key={idx} style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <button onClick={() => onDelete(emp._id)} className="btn btn-secondary" style={{ padding: '6px', color: 'var(--danger)', borderColor: 'transparent' }}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
