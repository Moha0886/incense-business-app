import React, { useState, useEffect } from 'react';

const AnimatedStatCard = ({ 
  title, 
  value, 
  icon, 
  color, 
  bgColor, 
  change, 
  onClick,
  theme,
  animationDelay = 0 
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Animate number counting up
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      const numericValue = parseFloat(value.toString().replace(/[^0-9.-]+/g, '')) || 0;
      
      if (numericValue > 0) {
        const duration = 1500;
        const steps = 60;
        const increment = numericValue / steps;
        let current = 0;

        const counter = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            setDisplayValue(numericValue);
            clearInterval(counter);
          } else {
            setDisplayValue(current);
          }
        }, duration / steps);

        return () => clearInterval(counter);
      }
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [value, animationDelay]);

  const formatDisplayValue = (val) => {
    if (value.toString().includes('₦')) {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
      }).format(val);
    }
    return Math.floor(val).toString();
  };

  return (
    <div 
      onClick={onClick}
      style={{
        background: theme?.cardBg || 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        padding: '24px',
        border: `1px solid ${theme?.cardBorder || 'rgba(255, 255, 255, 0.3)'}`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: onClick ? 'pointer' : 'default',
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        opacity: isVisible ? 1 : 0,
        transformOrigin: 'center bottom'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = isVisible ? 'translateY(-4px) scale(1.02)' : e.currentTarget.style.transform;
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = isVisible ? 'translateY(0) scale(1)' : e.currentTarget.style.transform;
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
          transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }}>
          {icon}
        </div>
        {change && (
          <div style={{
            color: color,
            backgroundColor: `${color}15`,
            padding: '4px 8px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '600',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
            transition: 'all 0.4s ease 0.3s'
          }}>
            {change}
          </div>
        )}
      </div>
      <h3 style={{ 
        margin: '0 0 8px 0', 
        color: theme?.textSecondary || '#374151',
        fontSize: '14px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.4s ease 0.2s'
      }}>
        {title}
      </h3>
      <p style={{ 
        fontSize: '28px', 
        margin: '0', 
        color: color, 
        fontWeight: '800',
        letterSpacing: '-1px',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.4s ease 0.4s'
      }}>
        {isVisible ? (typeof value === 'string' && value.includes('₦') ? formatDisplayValue(displayValue) : value) : '0'}
      </p>
    </div>
  );
};

export default AnimatedStatCard;
