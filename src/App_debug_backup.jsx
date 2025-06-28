import React, { useState, useEffect } from 'react';

// Test components one by one
import Dashboard from './components/Dashboard';
import Production from './components/Production';
import Sales from './components/Sales';
import Inventory from './components/Inventory';
import Distribution from './components/Distribution';
import Reports from './components/Reports';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const theme = {
    background: 'linear-gradient(135deg, #F5E6D3 0%, #E8D7C3 100%)',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280'
  };

  return (
    <div style={{ 
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      minHeight: '100vh', 
      background: theme.background,
      padding: '20px'
    }}>
      <h1 style={{ color: '#8B4513', marginBottom: '20px' }}>
        🌟 Abeer - Component Testing Mode
      </h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setActiveTab('dashboard')}
          style={{ 
            margin: '5px', 
            padding: '10px 20px', 
            background: activeTab === 'dashboard' ? '#8B4513' : '#ddd',
            color: activeTab === 'dashboard' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Dashboard
        </button>
        
        <button 
          onClick={() => setActiveTab('production')}
          style={{ 
            margin: '5px', 
            padding: '10px 20px', 
            background: activeTab === 'production' ? '#8B4513' : '#ddd',
            color: activeTab === 'production' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Production
        </button>
        
        <button 
          onClick={() => setActiveTab('sales')}
          style={{ 
            margin: '5px', 
            padding: '10px 20px', 
            background: activeTab === 'sales' ? '#8B4513' : '#ddd',
            color: activeTab === 'sales' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Sales
        </button>
        
        <button 
          onClick={() => setActiveTab('inventory')}
          style={{ 
            margin: '5px', 
            padding: '10px 20px', 
            background: activeTab === 'inventory' ? '#8B4513' : '#ddd',
            color: activeTab === 'inventory' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Inventory
        </button>
        
        <button 
          onClick={() => setActiveTab('distribution')}
          style={{ 
            margin: '5px', 
            padding: '10px 20px', 
            background: activeTab === 'distribution' ? '#8B4513' : '#ddd',
            color: activeTab === 'distribution' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Distribution
        </button>
        
        <button 
          onClick={() => setActiveTab('reports')}
          style={{ 
            margin: '5px', 
            padding: '10px 20px', 
            background: activeTab === 'reports' ? '#8B4513' : '#ddd',
            color: activeTab === 'reports' ? 'white' : 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Reports
        </button>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        minHeight: '300px'
      }}>
        {activeTab === 'dashboard' && (
          <div>
            <h2>Dashboard Component Test</h2>
            <p>Testing dashboard - loading actual component</p>
            <Dashboard theme={theme} addNotification={addNotification} />
          </div>
        )}
        
        {activeTab === 'production' && (
          <div>
            <h2>Production Component Test</h2>
            <p>Testing production - loading actual component</p>
            <Production theme={theme} addNotification={addNotification} />
          </div>
        )}

        {activeTab === 'sales' && (
          <div>
            <h2>Sales Component Test</h2>
            <p>Testing sales - loading actual component</p>
            <Sales theme={theme} addNotification={addNotification} />
          </div>
        )}

        {activeTab === 'inventory' && (
          <div>
            <h2>Inventory Component Test</h2>
            <p>Testing inventory - loading actual component</p>
            <Inventory theme={theme} addNotification={addNotification} />
          </div>
        )}
        
        {activeTab === 'distribution' && (
          <div>
            <h2>Distribution Component Test</h2>
            <p>Testing distribution - loading actual component</p>
            <Distribution theme={theme} addNotification={addNotification} />
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div>
            <h2>Reports Component Test</h2>
            <p>Testing reports - loading actual component</p>
            <Reports theme={theme} addNotification={addNotification} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
