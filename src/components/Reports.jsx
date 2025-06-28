import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Calendar, Download, Filter } from 'lucide-react';
import AnimatedStatCard from './AnimatedStatCard';
import LoadingSpinner from './LoadingSpinner';
import SimpleChart from './SimpleChart';

function Reports() {
  const [productions, setProductions] = useState([]);
  const [sales, setSales] = useState([]);
  const [distributions, setDistributions] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [reportType, setReportType] = useState('profit_loss');

  useEffect(() => {
    const savedProductions = localStorage.getItem('productions');
    const savedSales = localStorage.getItem('sales');
    const savedDistributions = localStorage.getItem('distributions');
    const savedInventory = localStorage.getItem('inventory');
    
    if (savedProductions) setProductions(JSON.parse(savedProductions));
    if (savedSales) setSales(JSON.parse(savedSales));
    if (savedDistributions) setDistributions(JSON.parse(savedDistributions));
    if (savedInventory) setInventory(JSON.parse(savedInventory));
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const filterByDateRange = (items) => {
    return items.filter(item => {
      const itemDate = new Date(item.date);
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  const getFilteredData = () => {
    return {
      productions: filterByDateRange(productions),
      sales: filterByDateRange(sales),
      distributions: filterByDateRange(distributions)
    };
  };

  const calculateProfitLoss = () => {
    const filtered = getFilteredData();
    
    const totalRevenue = filtered.sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalProductionCost = filtered.productions.reduce((sum, prod) => sum + prod.totalCost, 0);
    const grossProfit = totalRevenue - totalProductionCost;
    const grossMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;
    
    return {
      totalRevenue,
      totalProductionCost,
      grossProfit,
      grossMargin,
      totalSales: filtered.sales.length,
      totalProductions: filtered.productions.length
    };
  };

  const getProductPerformance = () => {
    const filtered = getFilteredData();
    const productStats = {};
    
    // Calculate sales by product
    filtered.sales.forEach(sale => {
      if (!productStats[sale.productName]) {
        productStats[sale.productName] = {
          name: sale.productName,
          totalSales: 0,
          totalRevenue: 0,
          totalQuantitySold: 0,
          totalProductionCost: 0,
          totalQuantityProduced: 0
        };
      }
      productStats[sale.productName].totalSales += 1;
      productStats[sale.productName].totalRevenue += sale.totalAmount;
      productStats[sale.productName].totalQuantitySold += sale.quantity;
    });
    
    // Add production costs
    filtered.productions.forEach(prod => {
      if (!productStats[prod.productName]) {
        productStats[prod.productName] = {
          name: prod.productName,
          totalSales: 0,
          totalRevenue: 0,
          totalQuantitySold: 0,
          totalProductionCost: 0,
          totalQuantityProduced: 0
        };
      }
      productStats[prod.productName].totalProductionCost += prod.totalCost;
      productStats[prod.productName].totalQuantityProduced += prod.quantity;
    });
    
    // Calculate profit for each product
    Object.keys(productStats).forEach(productName => {
      const stats = productStats[productName];
      stats.profit = stats.totalRevenue - stats.totalProductionCost;
      stats.profitMargin = stats.totalRevenue > 0 ? (stats.profit / stats.totalRevenue) * 100 : 0;
    });
    
    return Object.values(productStats).sort((a, b) => b.totalRevenue - a.totalRevenue);
  };

  const getLocationPerformance = () => {
    const filtered = getFilteredData();
    const locationStats = {};
    
    filtered.sales.forEach(sale => {
      if (!locationStats[sale.location]) {
        locationStats[sale.location] = {
          name: sale.location,
          totalSales: 0,
          totalRevenue: 0,
          totalQuantitySold: 0
        };
      }
      locationStats[sale.location].totalSales += 1;
      locationStats[sale.location].totalRevenue += sale.totalAmount;
      locationStats[sale.location].totalQuantitySold += sale.quantity;
    });
    
    return Object.values(locationStats).sort((a, b) => b.totalRevenue - a.totalRevenue);
  };

  const getInventoryReport = () => {
    const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * (item.costPerUnit || 0)), 0);
    const totalItems = inventory.length;
    const totalQuantity = inventory.reduce((sum, item) => sum + item.quantity, 0);
    const lowStockItems = inventory.filter(item => item.quantity < 10);
    const outOfStockItems = inventory.filter(item => item.quantity === 0);
    
    return {
      totalValue,
      totalItems,
      totalQuantity,
      lowStockItems: lowStockItems.length,
      outOfStockItems: outOfStockItems.length,
      lowStockProducts: lowStockItems,
      outOfStockProducts: outOfStockItems
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(2)}%`;
  };

  const exportReport = () => {
    const reportData = {
      dateRange,
      profitLoss: calculateProfitLoss(),
      productPerformance: getProductPerformance(),
      locationPerformance: getLocationPerformance(),
      inventory: getInventoryReport(),
      generatedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `business-report-${dateRange.start}-to-${dateRange.end}.json`;
    link.click();
  };

  const profitLoss = calculateProfitLoss();
  const productPerformance = getProductPerformance();
  const locationPerformance = getLocationPerformance();
  const inventoryReport = getInventoryReport();

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
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '8px',
            letterSpacing: '-1px'
          }}>
            📈 Abeer Business Reports
          </h1>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '16px', 
            margin: 0,
            fontWeight: '500'
          }}>
            Comprehensive Abeer & Areej business analytics | @abeer.ng
          </p>
        </div>
        <button 
          onClick={exportReport}
          style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 20px rgba(6, 182, 212, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(6, 182, 212, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(6, 182, 212, 0.3)';
          }}
        >
          <Download size={16} />
          Export Report
        </button>
      </div>

      {/* Report Controls */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '20px'
        }}>⚙️ Report Settings</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '8px'
            }}>Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="form-control"
            >
              <option value="profit_loss">Profit & Loss</option>
              <option value="product_performance">Product Performance</option>
              <option value="location_performance">Location Performance</option>
              <option value="inventory_summary">Inventory Summary</option>
            </select>
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="form-control"
            />
          </div>
        </div>
        <p style={{ color: '#666', marginTop: '10px' }}>
          Showing data from {new Date(dateRange.start).toLocaleDateString()} to {new Date(dateRange.end).toLocaleDateString()}
        </p>
      </div>

      {/* Profit & Loss Report */}
      {reportType === 'profit_loss' && (
        <div className="card mb-20">
          <h2>Profit & Loss Summary</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}>
            <AnimatedStatCard
              title="Total Revenue"
              value={formatCurrency(profitLoss.totalRevenue)}
              icon="💰"
              color="#8B4513"
              subtitle="gross sales income"
              loading={loading}
            />
            <AnimatedStatCard
              title="Production Costs"
              value={formatCurrency(profitLoss.totalProductionCost)}
              icon="🏭"
              color="#f59e0b"
              subtitle="manufacturing expenses"
              loading={loading}
            />
            <AnimatedStatCard
              title="Gross Profit"
              value={formatCurrency(profitLoss.grossProfit)}
              icon="📈"
              color={profitLoss.grossProfit >= 0 ? "#059669" : "#dc2626"}
              subtitle={profitLoss.grossProfit >= 0 ? "net profit earned" : "net loss incurred"}
              loading={loading}
            />
            <AnimatedStatCard
              title="Gross Margin"
              value={formatPercentage(profitLoss.grossMargin)}
              icon="📊"
              color="#8b5cf6"
              subtitle="profit percentage"
              loading={loading}
            />
          </div>
          
          {/* Charts Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '24px',
            marginTop: '32px',
            marginBottom: '24px'
          }}>
            <SimpleChart
              title="Monthly Sales Trend"
              data={filtered.sales.reduce((acc, sale) => {
                const month = new Date(sale.date).toLocaleDateString('en-US', { month: 'short' });
                const existing = acc.find(item => item.label === month);
                if (existing) {
                  existing.value += sale.totalAmount;
                } else {
                  acc.push({ label: month, value: sale.totalAmount });
                }
                return acc;
              }, [])}
              color="#8B4513"
            />
            
            <SimpleChart
              title="Product Sales Performance"
              data={filtered.sales.reduce((acc, sale) => {
                const existing = acc.find(item => item.label === sale.productName);
                if (existing) {
                  existing.value += sale.quantity;
                } else {
                  acc.push({ label: sale.productName, value: sale.quantity });
                }
                return acc;
              }, [])}
              color="#8b5cf6"
            />
          </div>
          
          <div className="grid grid-2 mt-20">
            <div>
              <h3>Sales Performance</h3>
              <p>Total Sales: <strong>{profitLoss.totalSales}</strong></p>
              <p>Average Sale Value: <strong>{formatCurrency(profitLoss.totalSales > 0 ? profitLoss.totalRevenue / profitLoss.totalSales : 0)}</strong></p>
            </div>
            <div>
              <h3>Production Performance</h3>
              <p>Total Productions: <strong>{profitLoss.totalProductions}</strong></p>
              <p>Average Production Cost: <strong>{formatCurrency(profitLoss.totalProductions > 0 ? profitLoss.totalProductionCost / profitLoss.totalProductions : 0)}</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* Product Performance Report */}
      {reportType === 'product_performance' && (
        <div className="card mb-20">
          <h2>Product Performance</h2>
          {productPerformance.length === 0 ? (
            <p>No product data available for the selected period.</p>
          ) : (
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Units Sold</th>
                    <th>Units Produced</th>
                    <th>Revenue</th>
                    <th>Production Cost</th>
                    <th>Profit</th>
                    <th>Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {productPerformance.map((product, index) => (
                    <tr key={index}>
                      <td><strong>{product.name}</strong></td>
                      <td>{product.totalQuantitySold}</td>
                      <td>{product.totalQuantityProduced}</td>
                      <td>{formatCurrency(product.totalRevenue)}</td>
                      <td>{formatCurrency(product.totalProductionCost)}</td>
                      <td className={product.profit >= 0 ? 'text-success' : 'text-danger'}>
                        {formatCurrency(product.profit)}
                      </td>
                      <td>{formatPercentage(product.profitMargin)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Location Performance Report */}
      {reportType === 'location_performance' && (
        <div className="card mb-20">
          <h2>Location Performance</h2>
          {locationPerformance.length === 0 ? (
            <p>No location data available for the selected period.</p>
          ) : (
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Total Sales</th>
                    <th>Units Sold</th>
                    <th>Revenue</th>
                    <th>Avg Sale Value</th>
                  </tr>
                </thead>
                <tbody>
                  {locationPerformance.map((location, index) => (
                    <tr key={index}>
                      <td><strong>{location.name}</strong></td>
                      <td>{location.totalSales}</td>
                      <td>{location.totalQuantitySold}</td>
                      <td>{formatCurrency(location.totalRevenue)}</td>
                      <td>{formatCurrency(location.totalSales > 0 ? location.totalRevenue / location.totalSales : 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Inventory Summary Report */}
      {reportType === 'inventory_summary' && (
        <div className="card mb-20">
          <h2>Inventory Summary</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}>
            <AnimatedStatCard
              title="Product Types"
              value={inventoryReport.totalItems}
              icon="📦"
              color="#8B4513"
              subtitle="different products"
              loading={loading}
            />
            <AnimatedStatCard
              title="Total Units"
              value={inventoryReport.totalQuantity}
              icon="📊"
              color="#3b82f6"
              subtitle="units in stock"
              loading={loading}
            />
            <AnimatedStatCard
              title="Total Value"
              value={formatCurrency(inventoryReport.totalValue)}
              icon="💰"
              color="#8b5cf6"
              subtitle="inventory worth"
              loading={loading}
            />
            <AnimatedStatCard
              title="Low Stock Items"
              value={inventoryReport.lowStockItems}
              icon="⚠️"
              color={inventoryReport.lowStockItems > 0 ? "#f59e0b" : "#8B4513"}
              subtitle="need restocking"
              loading={loading}
            />
          </div>

          {inventoryReport.outOfStockItems > 0 && (
            <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '4px', marginBottom: '15px' }}>
              <h4 style={{ color: '#856404' }}>⚠️ Out of Stock Items</h4>
              <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                {inventoryReport.outOfStockProducts.map((item, index) => (
                  <li key={index} style={{ color: '#856404' }}>{item.name}</li>
                ))}
              </ul>
            </div>
          )}

          {inventoryReport.lowStockItems > 0 && (
            <div style={{ backgroundColor: '#d1ecf1', padding: '15px', borderRadius: '4px' }}>
              <h4 style={{ color: '#0c5460' }}>📉 Low Stock Items (Less than 10 units)</h4>
              <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                {inventoryReport.lowStockProducts.map((item, index) => (
                  <li key={index} style={{ color: '#0c5460' }}>
                    {item.name} - {item.quantity} units remaining
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Key Insights */}
      <div className="card">
        <h2>Key Insights & Recommendations</h2>
        <div className="grid grid-2">
          <div>
            <h3>Financial Health</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>
                Your gross profit margin is {formatPercentage(profitLoss.grossMargin)}
                {profitLoss.grossMargin >= 20 ? ' - Excellent!' : profitLoss.grossMargin >= 10 ? ' - Good' : ' - Needs improvement'}
              </li>
              <li>
                Total profit: {formatCurrency(profitLoss.grossProfit)}
                {profitLoss.grossProfit > 0 ? ' ✅' : ' ❌ Loss incurred'}
              </li>
              <li>
                {profitLoss.totalSales > 0 
                  ? `Average sale value: ${formatCurrency(profitLoss.totalRevenue / profitLoss.totalSales)}`
                  : 'No sales recorded in this period'
                }
              </li>
            </ul>
          </div>
          <div>
            <h3>Operational Insights</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
              <li>
                {inventoryReport.lowStockItems > 0 
                  ? `${inventoryReport.lowStockItems} products need restocking`
                  : 'All products are well stocked ✅'
                }
              </li>
              <li>
                {inventoryReport.outOfStockItems > 0 
                  ? `${inventoryReport.outOfStockItems} products are out of stock - priority restocking needed`
                  : 'No products are out of stock ✅'
                }
              </li>
              <li>
                {productPerformance.length > 0 
                  ? `Best performing product: ${productPerformance[0]?.name || 'N/A'}`
                  : 'No product performance data available'
                }
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
