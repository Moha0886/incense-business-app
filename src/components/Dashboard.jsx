import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, ShoppingCart, AlertTriangle, Search, Filter } from 'lucide-react';
import AnimatedStatCard from './AnimatedStatCard';
import QuickStatsWidget from './QuickStatsWidget';
import LoadingSpinner from './LoadingSpinner';

function Dashboard({ theme, showNotification }) {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalProfit: 0,
    totalProducts: 0,
    lowStockItems: 0
  });

  const [recentProductions, setRecentProductions] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simulate loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Load data from localStorage
      const productions = JSON.parse(localStorage.getItem('productions') || '[]');
      const sales = JSON.parse(localStorage.getItem('sales') || '[]');
      const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');

      // Calculate stats
      const totalRevenue = sales.reduce((sum, sale) => sum + (sale.totalAmount || 0), 0);
      const totalProductionCost = productions.reduce((sum, prod) => sum + (prod.totalCost || 0), 0);
      const totalProfit = totalRevenue - totalProductionCost;
      const lowStockItems = inventory.filter(item => item.quantity < 10).length;

      setStats({
        totalRevenue,
        totalProfit,
        totalProducts: inventory.length,
        lowStockItems
      });

      // Get recent items
      setRecentProductions(productions.slice(-5).reverse());
      setRecentSales(sales.slice(-5).reverse());
      setLoading(false);
    };

    loadData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  // Filter recent activities based on search and filter
  const filteredActivities = () => {
    let activities = [];
    
    if (filterType === 'all' || filterType === 'productions') {
      activities = [...activities, ...recentProductions.map(p => ({ ...p, type: 'production' }))];
    }
    
    if (filterType === 'all' || filterType === 'sales') {
      activities = [...activities, ...recentSales.map(s => ({ ...s, type: 'sale' }))];
    }
    
    // Sort by date (newest first)
    activities.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
    
    // Apply search filter
    if (searchTerm) {
      activities = activities.filter(activity => 
        (activity.productName || activity.incenseType || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (activity.type || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return activities.slice(0, 10);
  };

  const quickStats = [
    { key: 'revenue', label: 'Revenue', value: formatCurrency(stats.totalRevenue), color: '#10b981' },
    { key: 'profit', label: 'Profit', value: formatCurrency(stats.totalProfit), color: '#3b82f6' },
    { key: 'products', label: 'Products', value: stats.totalProducts, color: '#8b5cf6' },
    { key: 'lowStock', label: 'Low Stock', value: stats.lowStockItems, color: '#ef4444' }
  ];

  const handleStatClick = (statKey) => {
    showNotification?.(`Navigating to ${statKey} details`, 'info');
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '60vh' 
      }}>
        <LoadingSpinner theme={theme} size="large" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Welcome Section */}
      <div style={{
        background: theme?.cardBg || 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '32px',
        border: `1px solid ${theme?.cardBorder || 'rgba(255, 255, 255, 0.3)'}`,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.5rem',
          fontWeight: '800',
          margin: '0 0 16px 0',
          textAlign: 'center'
        }}>
          � Abeer Business Dashboard
        </h1>
        <p style={{
          color: theme?.textSecondary || '#6b7280',
          fontSize: '1.1rem',
          textAlign: 'center',
          margin: '0 0 8px 0'
        }}>
          Luxury Abeer & Areej incense production management
        </p>
        <p style={{
          color: theme?.textSecondary || '#6b7280',
          fontSize: '0.9rem',
          textAlign: 'center',
          margin: 0,
          opacity: 0.8
        }}>
          Follow us @abeer.ng
        </p>
      </div>

      {/* Quick Stats Widget */}
      <QuickStatsWidget 
        stats={quickStats} 
        theme={theme} 
        onStatClick={handleStatClick}
      />

      {/* Main Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <AnimatedStatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={<TrendingUp />}
          color="#10b981"
          bgColor="rgba(16, 185, 129, 0.1)"
          change="+12.5%"
          theme={theme}
          animationDelay={100}
          onClick={() => handleStatClick('revenue')}
        />
        
        <AnimatedStatCard
          title="Total Profit"
          value={formatCurrency(stats.totalProfit)}
          icon={<TrendingUp />}
          color="#3b82f6"
          bgColor="rgba(59, 130, 246, 0.1)"
          change="+8.2%"
          theme={theme}
          animationDelay={200}
          onClick={() => handleStatClick('profit')}
        />
        
        <AnimatedStatCard
          title="Products in Stock"
          value={stats.totalProducts}
          icon={<Package />}
          color="#8b5cf6"
          bgColor="rgba(139, 92, 246, 0.1)"
          change="+5"
          theme={theme}
          animationDelay={300}
          onClick={() => handleStatClick('products')}
        />
        
        <AnimatedStatCard
          title="Low Stock Alerts"
          value={stats.lowStockItems}
          icon={<AlertTriangle />}
          color="#ef4444"
          bgColor="rgba(239, 68, 68, 0.1)"
          change={stats.lowStockItems > 0 ? "⚠️" : "✅"}
          theme={theme}
          animationDelay={400}
          onClick={() => handleStatClick('lowStock')}
        />
      </div>

      {/* Recent Activities Section */}
      <div style={{
        background: theme?.cardBg || 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        padding: '24px',
        border: `1px solid ${theme?.cardBorder || 'rgba(255, 255, 255, 0.3)'}`,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <h2 style={{
            margin: 0,
            color: theme?.textPrimary || '#1f2937',
            fontSize: '20px',
            fontWeight: '700'
          }}>
            📈 Recent Activity
          </h2>
          
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search 
                size={16} 
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: theme?.textSecondary || '#6b7280'
                }}
              />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  paddingLeft: '40px',
                  paddingRight: '12px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  border: `1px solid ${theme?.cardBorder || 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '8px',
                  background: theme?.inputBg || 'rgba(255, 255, 255, 0.7)',
                  fontSize: '14px',
                  color: theme?.textPrimary || '#1f2937',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
              />
            </div>

            {/* Filter Dropdown */}
            <div style={{ position: 'relative' }}>
              <Filter 
                size={16} 
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: theme?.textSecondary || '#6b7280'
                }}
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={{
                  paddingLeft: '40px',
                  paddingRight: '12px',
                  paddingTop: '8px',
                  paddingBottom: '8px',
                  border: `1px solid ${theme?.cardBorder || 'rgba(255, 255, 255, 0.3)'}`,
                  borderRadius: '8px',
                  background: theme?.inputBg || 'rgba(255, 255, 255, 0.7)',
                  fontSize: '14px',
                  color: theme?.textPrimary || '#1f2937',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Activities</option>
                <option value="productions">Productions</option>
                <option value="sales">Sales</option>
              </select>
            </div>
          </div>
        </div>

        {/* Activities List */}
        <div style={{
          display: 'grid',
          gap: '12px'
        }}>
          {filteredActivities().length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: theme?.textSecondary || '#6b7280'
            }}>
              <Package size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <p style={{ margin: 0, fontSize: '16px' }}>No activities found</p>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Try adjusting your search or filter</p>
            </div>
          ) : (
            filteredActivities().map((activity, index) => (
              <div 
                key={index}
                style={{
                  background: activity.type === 'production' 
                    ? 'rgba(59, 130, 246, 0.05)' 
                    : 'rgba(16, 185, 129, 0.05)',
                  border: `1px solid ${activity.type === 'production' 
                    ? 'rgba(59, 130, 246, 0.1)' 
                    : 'rgba(16, 185, 129, 0.1)'}`,
                  borderRadius: '8px',
                  padding: '16px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => showNotification?.(`Opening ${activity.type} details`, 'info')}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px'
                    }}>
                      <span style={{
                        background: activity.type === 'production' ? '#3b82f6' : '#10b981',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>
                        {activity.type === 'production' ? '🏭 Production' : '💰 Sale'}
                      </span>
                    </div>
                    <h4 style={{
                      margin: '0 0 4px 0',
                      color: theme?.textPrimary || '#1f2937',
                      fontSize: '16px',
                      fontWeight: '600'
                    }}>
                      {activity.productName || activity.incenseType || 'Unknown Product'}
                    </h4>
                    <p style={{
                      margin: 0,
                      color: theme?.textSecondary || '#6b7280',
                      fontSize: '14px'
                    }}>
                      {activity.type === 'production' 
                        ? `Produced ${activity.quantity || 0} units`
                        : `Sold ${activity.quantity || 0} units to ${activity.customerName || 'Unknown Customer'}`
                      }
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      color: activity.type === 'production' ? '#3b82f6' : '#10b981',
                      fontWeight: '700',
                      fontSize: '16px'
                    }}>
                      {formatCurrency(activity.totalCost || activity.totalAmount || 0)}
                    </div>
                    <div style={{
                      color: theme?.textSecondary || '#6b7280',
                      fontSize: '12px'
                    }}>
                      {new Date(activity.date || activity.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
