import React, { useState, useEffect } from 'react';

function App() {
  console.log('🎯 App component is rendering!');
  
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F5E6D3 0%, #E8D7C3 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          color: '#8B4513', 
          fontSize: '2.5rem',
          marginBottom: '20px',
          fontWeight: '700'
        }}>
          🌟 Abeer - Luxury Incense Business
        </h1>
        
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#6b7280',
          marginBottom: '30px'
        }}>
          Welcome to your business management system!
        </p>
        
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#8B4513', marginBottom: '15px' }}>✅ System Status</h2>
          <p>✅ React is working</p>
          <p>✅ Vite dev server running</p>
          <p>✅ Coffee theme loaded</p>
          <p>🕐 Current time: {new Date().toLocaleString()}</p>
        </div>
        
        <button 
          onClick={() => alert('🎉 Button works! Ready to add full features.')}
          style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '10px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Test Interaction
        </button>
      </div>
    </div>
  );
}

export default App;
