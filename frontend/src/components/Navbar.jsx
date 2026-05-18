import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Sparkles } from 'lucide-react';

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderRadius: '0 0 16px 16px', padding: '16px 24px', borderTop: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <h2 style={{ color: 'var(--accent-color)', margin: 0 }}>AI HRMS</h2>
        <Link to="/" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link to="/ai-recommendations" style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="var(--accent-color)" /> AI Insights
        </Link>
      </div>
      <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 16px' }}>
        <LogOut size={16} /> Logout
      </button>
    </nav>
  );
};

export default Navbar;
