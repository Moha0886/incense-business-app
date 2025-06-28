import React from 'react';

const QuickStatsWidget = ({ stats, theme, onStatClick }) => {
  return (
    <div style={{
      background: theme?.cardBg || 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      borderRadius: '16px',
      padding: '20px',
      border: `1px solid ${theme?.cardBorder || 'rgba(255, 255, 255, 0.3)'}`,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      marginBottom: '24px'
    }}>
      <h3 style={{
        margin: '0 0 16px 0',
        color: theme?.textPrimary || '#1f2937',
        fontSize: '18px',
        fontWeight: '700'
      }}>
        📊 Quick Overview
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '12px'
      }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={() => onStatClick && onStatClick(stat.key)}
            style={{
              background: `${stat.color}10`,
              border: `1px solid ${stat.color}20`,
              borderRadius: '8px',
              padding: '12px',
              textAlign: 'center',
              cursor: onStatClick ? 'pointer' : 'default',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (onStatClick) {
                e.currentTarget.style.background = `${stat.color}20`;
                e.currentTarget.style.transform = 'scale(1.02)';
              }
            }}
            onMouseLeave={(e) => {
              if (onStatClick) {
                e.currentTarget.style.background = `${stat.color}10`;
                e.currentTarget.style.transform = 'scale(1)';
              }
            }}
          >
            <div style={{ fontSize: '16px', marginBottom: '4px' }}>
              {stat.icon}
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: '700',
              color: stat.color,
              marginBottom: '2px'
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '10px',
              color: theme?.textSecondary || '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStatsWidget;
