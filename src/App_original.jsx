import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Production from './components/Production';
import Sales from './components/Sales';
import Inventory from './components/Inventory';
import Distribution from './components/Distribution';
import Reports from './components/Reports';

// Notification Component
const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: '#8B4513', border: '#A0522D' },
    error: { bg: '#ef4444', border: '#dc2626' },
    info: { bg: '#3b82f6', border: '#2563eb' },
    warning: { bg: '#f59e0b', border: '#d97706' }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: colors[type].bg,
      color: 'white',
      padding: '16px 20px',
      borderRadius: '12px',
      border: `2px solid ${colors[type].border}`,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
      maxWidth: '400px',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: '600' }}>{message}</span>
        <button 
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            marginLeft: '12px'
          }}
        >×</button>
      </div>
    </div>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  // Mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add notification function
  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case '1': setActiveTab('dashboard'); e.preventDefault(); break;
          case '2': setActiveTab('production'); e.preventDefault(); break;
          case '3': setActiveTab('sales'); e.preventDefault(); break;
          case '4': setActiveTab('inventory'); e.preventDefault(); break;
          case '5': setActiveTab('distribution'); e.preventDefault(); break;
          case '6': setActiveTab('reports'); e.preventDefault(); break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const theme = {
    background: isDarkMode 
      ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
      : 'linear-gradient(135deg, #F5E6D3 0%, #E8D7C3 100%)',
    cardBg: isDarkMode ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.95)',
    textPrimary: isDarkMode ? '#f9fafb' : '#1f2937',
    textSecondary: isDarkMode ? '#d1d5db' : '#6b7280'
  };

  return (
    <div style={{ 
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      minHeight: '100vh', 
      background: theme.background,
      display: 'flex' 
    }}>
      {/* Notifications */}
      {notifications.map(notif => (
        <Notification 
          key={notif.id}
          message={notif.message}
          type={notif.type}
          onClose={() => removeNotification(notif.id)}
        />
      ))}

      {/* Add CSS animations */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .pulse { animation: pulse 2s infinite; }
      `}</style>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <nav style={{ 
        width: '280px',
        background: theme.cardBg, 
        backdropFilter: 'blur(20px)',
        borderRight: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(255, 255, 255, 0.2)'}`,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.1)',
        position: isMobile ? 'fixed' : 'relative',
        left: isMobile ? (sidebarOpen ? '0' : '-280px') : '0',
        zIndex: 1000,
        transition: 'left 0.3s ease'
      }}>
        {/* Logo/Brand in Sidebar */}
        <div style={{
          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
          color: 'white',
          padding: '24px 20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3
          }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ 
              margin: '0 0 8px 0', 
              fontSize: '20px', 
              fontWeight: '700',
              letterSpacing: '-0.5px'
            }}>🌟 Abeer</h1>
            <p style={{ 
              margin: 0, 
              opacity: 0.9, 
              fontSize: '13px',
              fontWeight: '500'
            }}>Luxury Incense Business</p>
          </div>
        </div>

        {/* Menu Items */}
        <div style={{ padding: '20px 0', flex: 1 }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊', color: '#8B4513' },
            { id: 'production', label: 'Production', icon: '🏭', color: '#A0522D' },
            { id: 'sales', label: 'Sales', icon: '🛒', color: '#8B4513' },
            { id: 'inventory', label: 'Inventory', icon: '📦', color: '#D2691E' },
            { id: 'distribution', label: 'Distribution', icon: '📍', color: '#CD853F' },
            { id: 'reports', label: 'Reports', icon: '📈', color: '#DEB887' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                width: 'calc(100% - 24px)',
                margin: '0 12px 8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 16px',
                background: activeTab === tab.id 
                  ? `linear-gradient(135deg, ${tab.color}15, ${tab.color}08)` 
                  : 'transparent',
                color: activeTab === tab.id ? tab.color : '#374151',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? '600' : '500',
                textAlign: 'left',
                borderRadius: '12px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: activeTab === tab.id ? `1px solid ${tab.color}20` : '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.background = 'rgba(0, 0, 0, 0.03)';
                  e.target.style.transform = 'translateX(4px)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateX(0)';
                }
              }}
            >
              <span style={{ 
                fontSize: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px'
              }}>{tab.icon}</span>
              <span style={{ fontWeight: 'inherit' }}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Footer in sidebar */}
        <div style={{ 
          padding: '20px', 
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          background: 'rgba(0, 0, 0, 0.02)',
          fontSize: '12px',
          color: '#6b7280',
          textAlign: 'center'
        }}>
          <p style={{ margin: '0 0 4px 0', fontWeight: '600' }}>Abeer | @abeer.ng</p>
          <p style={{ margin: 0, opacity: 0.7 }}>Version 1.0.0</p>
        </div>
      </nav>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <header style={{ 
          background: theme.cardBg, 
          backdropFilter: 'blur(20px)',
          padding: '20px 32px',
          borderBottom: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.3)' : 'rgba(255, 255, 255, 0.2)'}`,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: '28px', 
                color: theme.textPrimary,
                fontWeight: '700',
                letterSpacing: '-0.5px'
              }}>
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h1>
              <p style={{ margin: '4px 0 0 0', color: theme.textSecondary, fontSize: '15px' }}>
                Manage Abeer luxury & Areej incense business operations
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                style={{
                  background: isDarkMode ? '#374151' : '#f3f4f6',
                  border: 'none',
                  borderRadius: '20px',
                  padding: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  width: '48px',
                  height: '28px',
                  position: 'relative'
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'white',
                  transform: isDarkMode ? 'translateX(20px)' : 'translateX(0)',
                  transition: 'transform 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px'
                }}>
                  {isDarkMode ? '🌙' : '☀️'}
                </div>
              </button>
              
              <div style={{
                background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Nigerian Naira
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ 
          flex: 1, 
          padding: isMobile ? '16px' : '32px', 
          overflow: 'auto',
          background: isDarkMode ? 'rgba(17, 24, 39, 0.3)' : 'rgba(255, 255, 255, 0.1)'
        }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                position: 'fixed',
                top: '20px',
                left: '20px',
                zIndex: 1001,
                background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '12px',
                fontSize: '18px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
              }}
            >
              ☰
            </button>
          )}

          {/* Floating Action Button */}
          <div style={{
            position: 'fixed',
            bottom: '80px',
            right: '30px',
            zIndex: 100
          }}>
            <button
              onClick={() => {
                switch(activeTab) {
                  case 'dashboard': setActiveTab('production'); break;
                  case 'production': addNotification('Quick production added!', 'success'); break;
                  case 'sales': addNotification('Sale recorded!', 'success'); break;
                  case 'inventory': addNotification('Inventory updated!', 'info'); break;
                  default: setActiveTab('dashboard');
                }
              }}
              style={{
                background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '56px',
                height: '56px',
                fontSize: '24px',
                cursor: 'pointer',
                boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(16, 185, 129, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(16, 185, 129, 0.4)';
              }}
              className="pulse"
            >
              +
            </button>
          </div>

          {/* Keyboard Shortcuts Hint */}
          {!isMobile && (
            <div style={{
              position: 'fixed',
              bottom: '20px',
              left: '20px',
              background: theme.cardBg,
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '12px',
              color: theme.textSecondary,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              zIndex: 100
            }}>
              💡 Press Ctrl+1-6 for quick navigation
            </div>
          )}

          {activeTab === 'dashboard' && <Dashboard theme={theme} addNotification={addNotification} />}
          {activeTab === 'production' && <Production theme={theme} addNotification={addNotification} />}
          {activeTab === 'sales' && <Sales theme={theme} addNotification={addNotification} />}
          {activeTab === 'inventory' && <Inventory theme={theme} addNotification={addNotification} />}
          {activeTab === 'distribution' && <Distribution theme={theme} addNotification={addNotification} />}
          {activeTab === 'reports' && <Reports theme={theme} addNotification={addNotification} />}
        </main>
      </div>
    </div>
  );
}

export default App;
