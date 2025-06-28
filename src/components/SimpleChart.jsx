import React from 'react';

const SimpleChart = ({ data, type = 'bar', title, color = '#8B4513' }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        padding: '24px',
        textAlign: 'center',
        color: '#6b7280'
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#374151' }}>{title}</h3>
        <p>No data available for chart</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
    }}>
      <h3 style={{ 
        margin: '0 0 24px 0', 
        color: '#374151',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        {title}
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              minWidth: '80px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#6b7280'
            }}>
              {item.label}
            </div>
            
            <div style={{
              flex: 1,
              height: '24px',
              background: '#f3f4f6',
              borderRadius: '12px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div style={{
                height: '100%',
                width: `${(item.value / maxValue) * 100}%`,
                background: `linear-gradient(135deg, ${color}dd, ${color})`,
                borderRadius: '12px',
                transition: 'width 0.8s ease',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'white',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)'
                }}>
                  {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleChart;
