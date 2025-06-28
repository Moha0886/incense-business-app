import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, TrendingUp, TrendingDown, Search } from 'lucide-react';
import AnimatedStatCard from './AnimatedStatCard';
import LoadingSpinner from './LoadingSpinner';

function Inventory({ theme, showNotification }) {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const saved = localStorage.getItem('inventory');
      if (saved) {
        setInventory(JSON.parse(saved));
      }
      setLoading(false);
    };
    
    loadData();
  }, []);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'low_stock') {
      return matchesSearch && item.quantity < 10;
    } else if (filterBy === 'out_of_stock') {
      return matchesSearch && item.quantity === 0;
    } else if (filterBy === 'in_stock') {
      return matchesSearch && item.quantity > 0;
    }
    
    return matchesSearch;
  });

  const getTotalValue = () => {
    return inventory.reduce((sum, item) => sum + (item.quantity * (item.costPerUnit || 0)), 0);
  };

  const getTotalProducts = () => {
    return inventory.length;
  };

  const getTotalQuantity = () => {
    return inventory.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getLowStockCount = () => {
    return inventory.filter(item => item.quantity < 10).length;
  };

  const getOutOfStockCount = () => {
    return inventory.filter(item => item.quantity === 0).length;
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { status: 'Out of Stock', class: 'text-danger' };
    if (quantity < 10) return { status: 'Low Stock', class: 'text-warning' };
    return { status: 'In Stock', class: 'text-success' };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  // Calculate inventory stats
  const calculateStats = () => {
    const totalItems = inventory.length;
    const totalQuantity = inventory.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = getTotalValue();
    const lowStockItems = inventory.filter(item => item.quantity < 10).length;
    const outOfStockItems = inventory.filter(item => item.quantity === 0).length;
    
    return { totalItems, totalQuantity, totalValue, lowStockItems, outOfStockItems };
  };

  const stats = calculateStats();

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
      {/* Header Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '24px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
          letterSpacing: '-1px'
        }}>
          📦 Abeer Inventory Management
        </h1>
        <p style={{ 
          color: '#6b7280', 
          fontSize: '16px', 
          margin: '0 0 16px 0',
          fontWeight: '500'
        }}>
          Monitor stock levels for Abeer luxury & Areej products | @abeer.ng
        </p>
        <p style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#1f2937',
          margin: 0
        }}>
          Total Inventory Value: <span style={{ color: '#3b82f6' }}>{formatCurrency(getTotalValue())}</span>
        </p>
      </div>

      {/* Inventory Summary Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        marginBottom: '24px'
      }}>
        {[
          {
            title: 'Total Products',
            value: getTotalProducts().toString(),
            icon: '📦',
            color: '#3b82f6',
            bgColor: 'rgba(59, 130, 246, 0.1)'
          },
          {
            title: 'Total Quantity',
            value: getTotalQuantity().toString(),
            icon: '📈',
            color: '#8B4513',
            bgColor: 'rgba(16, 185, 129, 0.1)'
          },
          {
            title: 'Low Stock Items',
            value: getLowStockCount().toString(),
            icon: '⚠️',
            color: '#f59e0b',
            bgColor: 'rgba(245, 158, 11, 0.1)'
          },
          {
            title: 'Out of Stock',
            value: getOutOfStockCount().toString(),
            icon: '🚨',
            color: '#ef4444',
            bgColor: 'rgba(239, 68, 68, 0.1)'
          }
        ].map((stat, index) => (
          <div key={index} style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            textAlign: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: stat.bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              margin: '0 auto 12px auto'
            }}>
              {stat.icon}
            </div>
            <h3 style={{ 
              margin: '0 0 4px 0', 
              color: '#374151',
              fontSize: '12px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {stat.title}
            </h3>
            <p style={{ 
              fontSize: '24px', 
              margin: '0', 
              color: stat.color, 
              fontWeight: '800'
            }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="mb-20">
          <h2>Current Inventory</h2>
          <p style={{ color: '#666', marginTop: '5px' }}>
            Total Inventory Value: {formatCurrency(getTotalValue())}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="form-row mb-20">
          <div className="form-group">
            <div style={{ position: 'relative' }}>
              <Search size={20} style={{ 
                position: 'absolute', 
                left: '10px', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                color: '#666' 
              }} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>
          <div className="form-group">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="form-control"
            >
              <option value="all">All Items</option>
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock (Less than 10)</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Inventory Table */}
        {filteredInventory.length === 0 ? (
          <div className="text-center" style={{ padding: '40px', color: '#666' }}>
            {inventory.length === 0 ? (
              <>
                <Package size={48} style={{ marginBottom: '15px', opacity: '0.5' }} />
                <p>No inventory items yet.</p>
                <p>Start by recording your first production to build your inventory.</p>
              </>
            ) : (
              <p>No items match your search criteria.</p>
            )}
          </div>
        ) : (
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Cost per Unit</th>
                  <th>Selling Price</th>
                  <th>Total Value</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item, index) => {
                  const stockStatus = getStockStatus(item.quantity);
                  const totalValue = item.quantity * (item.costPerUnit || 0);
                  
                  return (
                    <tr key={index}>
                      <td>
                        <strong>{item.name}</strong>
                      </td>
                      <td>
                        <span style={{ 
                          fontSize: '1.1em', 
                          fontWeight: '500',
                          color: item.quantity === 0 ? '#dc3545' : item.quantity < 10 ? '#ffc107' : '#28a745'
                        }}>
                          {item.quantity}
                        </span>
                      </td>
                      <td>{formatCurrency(item.costPerUnit || 0)}</td>
                      <td>{formatCurrency(item.sellingPrice || 0)}</td>
                      <td>{formatCurrency(totalValue)}</td>
                      <td>
                        <span className={stockStatus.class} style={{ fontWeight: '500' }}>
                          {stockStatus.status}
                        </span>
                      </td>
                      <td>
                        {item.lastUpdated 
                          ? new Date(item.lastUpdated).toLocaleDateString()
                          : '-'
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Low Stock Alert */}
      {getLowStockCount() > 0 && (
        <div className="card mt-20" style={{ borderLeft: '4px solid #ffc107' }}>
          <h3 style={{ color: '#ffc107', marginBottom: '15px' }}>
            <AlertTriangle size={20} style={{ marginRight: '8px' }} />
            Low Stock Alert
          </h3>
          <p>The following items are running low on stock (less than 10 units):</p>
          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            {inventory
              .filter(item => item.quantity < 10 && item.quantity > 0)
              .map((item, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>
                  <strong>{item.name}</strong>: {item.quantity} units remaining
                </li>
              ))
            }
          </ul>
          {getOutOfStockCount() > 0 && (
            <>
              <p style={{ marginTop: '15px', color: '#dc3545' }}>
                <strong>Out of Stock Items:</strong>
              </p>
              <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                {inventory
                  .filter(item => item.quantity === 0)
                  .map((item, index) => (
                    <li key={index} style={{ marginBottom: '5px', color: '#dc3545' }}>
                      <strong>{item.name}</strong>
                    </li>
                  ))
                }
              </ul>
            </>
          )}
        </div>
      )}

      {/* Inventory Tips */}
      <div className="card mt-20">
        <h3>Inventory Management Tips</h3>
        <ul style={{ marginTop: '10px', paddingLeft: '20px', lineHeight: '1.6' }}>
          <li>Keep track of your inventory levels regularly to avoid stockouts</li>
          <li>Set up reorder points for your products (e.g., when quantity drops below 10)</li>
          <li>Monitor your product turnover rates to identify fast and slow-moving items</li>
          <li>Consider seasonal demand patterns when planning production</li>
          <li>Use the low stock alerts to plan your next production runs</li>
        </ul>
      </div>
    </div>
  );
}

export default Inventory;
