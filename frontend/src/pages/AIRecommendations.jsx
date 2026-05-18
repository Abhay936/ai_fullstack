import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bot, RefreshCw } from 'lucide-react';

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      // First fetch all employees to send their IDs
      const empRes = await axios.get('http://localhost:5000/api/employees');
      const employees = empRes.data.data;
      
      if (employees.length === 0) {
        setError('No employees available to analyze.');
        setLoading(false);
        return;
      }

      const empIds = employees.map(emp => emp._id);

      const res = await axios.post('http://localhost:5000/api/ai/recommend', { employeeIds: empIds });
      setRecommendations(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch AI recommendations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Bot size={28} color="var(--accent-color)" /> AI HR Insights
        </h2>
        <button className="btn btn-primary" onClick={fetchRecommendations} disabled={loading}>
          <RefreshCw size={18} className={loading ? 'spin' : ''} /> {loading ? 'Analyzing...' : 'Refresh Insights'}
        </button>
      </div>

      {error && <div className="glass-panel" style={{ color: 'var(--danger)' }}>{error}</div>}

      {!loading && !error && recommendations && (
        <div className="glass-panel">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            {recommendations.message || "AI Analysis Complete"}
          </p>
          
          <div style={{ display: 'grid', gap: '24px' }}>
            {recommendations.recommendations?.map((rec, index) => (
              <div key={index} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>{rec.name}</h3>
                  <span style={{ 
                    background: 'var(--accent-color)', 
                    color: 'white', 
                    padding: '4px 12px', 
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 500
                  }}>Rank #{rec.ranking}</span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Promotion Recommendation</strong>
                    <div style={{ color: rec.promotion.toLowerCase() === 'yes' ? 'var(--success)' : 'var(--text-primary)' }}>
                      {rec.promotion}
                    </div>
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>Training Suggestions</strong>
                    <div>{rec.training}</div>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <strong style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '4px' }}>AI Feedback</strong>
                    <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', fontStyle: 'italic' }}>
                      "{rec.feedback}"
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '60px' }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            <Bot size={48} className="animate-pulse" style={{ color: 'var(--accent-color)' }} />
          </div>
          <p>AI is analyzing employee performance and skills...</p>
        </div>
      )}
      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
      `}</style>
    </div>
  );
};

export default AIRecommendations;
