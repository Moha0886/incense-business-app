import React, { useState, useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  
  // Your Actual Raw Materials with Editable Costs
  const [rawMaterials, setRawMaterials] = useState([
    { id: 1, name: 'Wood', quantity: 100, unit: 'pieces', cost: 5000 },
    { id: 2, name: 'Sandal Powder', quantity: 500, unit: 'grams', cost: 12500 },
    { id: 3, name: 'Farce', quantity: 200, unit: 'grams', cost: 3000 },
    { id: 4, name: 'Jawee', quantity: 150, unit: 'grams', cost: 8000 },
    { id: 5, name: 'Sandalia', quantity: 300, unit: 'grams', cost: 6000 },
    { id: 6, name: 'Sandal Oil', quantity: 100, unit: 'ml', cost: 15000 },
    { id: 7, name: 'Water Base', quantity: 500, unit: 'ml', cost: 2000 },
    { id: 8, name: 'Oils', quantity: 200, unit: 'ml', cost: 10000 },
    { id: 9, name: 'Mask', quantity: 50, unit: 'pieces', cost: 2500 },
    { id: 10, name: 'Sugar', quantity: 1000, unit: 'grams', cost: 1500 },
    { id: 11, name: 'Stickers', quantity: 200, unit: 'pieces', cost: 3000 },
    { id: 12, name: 'Bottles', quantity: 100, unit: 'pieces', cost: 8000 },
    { id: 13, name: 'Transport Fare', quantity: 1, unit: 'trip', cost: 5000 }
  ]);
  
  // Sample Products - You can create more using the form
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Khumra - Premium Blend',
      category: 'Khumra',
      icon: '🧴',
      recipe: [
        { materialId: 2, quantity: 15 }, // 15g sandal powder per batch
        { materialId: 6, quantity: 20 }, // 20ml sandal oil per batch
        { materialId: 7, quantity: 30 }, // 30ml water base per batch
        { materialId: 12, quantity: 10 }, // 10 bottles per batch
        { materialId: 13, quantity: 1 }  // 1 transport fare per batch
      ],
      outputPerBatch: 10, // 10 bottles per batch
      unit: 'bottles (50ml each)',
      price: 15000 // Price in Naira
    },
    {
      id: 2,
      name: 'Abeer - Luxury Sticks',
      category: 'Abeer (Luxury)',
      icon: '🌟',
      recipe: [
        { materialId: 1, quantity: 5 },   // 5 pieces wood per batch
        { materialId: 2, quantity: 25 },  // 25g sandal powder per batch
        { materialId: 4, quantity: 10 },  // 10g jawee per batch
        { materialId: 6, quantity: 15 },  // 15ml sandal oil per batch
        { materialId: 10, quantity: 20 }, // 20g sugar per batch
        { materialId: 11, quantity: 20 }  // 20 stickers per batch
      ],
      outputPerBatch: 20, // 20 sticks per batch
      unit: 'premium sticks',
      price: 8000 // Price in Naira
    }
  ]);

  // Product Creation State
  const [showProductForm, setShowProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Khumra',
    icon: '🧴',
    price: '',
    outputPerBatch: '',
    unit: '',
    recipe: []
  });

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };
  
  // Production Calculator Functions
  const calculateMaxBatches = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    
    let maxBatches = Infinity;
    
    product.recipe.forEach(ingredient => {
      const material = rawMaterials.find(m => m.id === ingredient.materialId);
      if (material) {
        const possibleBatches = Math.floor(material.quantity / ingredient.quantity);
        maxBatches = Math.min(maxBatches, possibleBatches);
      }
    });
    
    return maxBatches === Infinity ? 0 : maxBatches;
  };
  
  const calculateTotalOutput = (productId) => {
    const product = products.find(p => p.id === productId);
    const maxBatches = calculateMaxBatches(productId);
    return maxBatches * (product?.outputPerBatch || 0);
  };
  
  const calculateMaterialCost = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    
    return product.recipe.reduce((total, ingredient) => {
      const material = rawMaterials.find(m => m.id === ingredient.materialId);
      if (material) {
        const costPerUnit = material.cost / material.quantity;
        return total + (costPerUnit * ingredient.quantity);
      }
      return total;
    }, 0);
  };
  
  const updateMaterialQuantity = (materialId, newQuantity) => {
    setRawMaterials(prev => 
      prev.map(material => 
        material.id === materialId 
          ? { ...material, quantity: Math.max(0, newQuantity) }
          : material
      )
    );
  };

  const updateMaterialCost = (materialId, newCost) => {
    setRawMaterials(prev => 
      prev.map(material => 
        material.id === materialId 
          ? { ...material, cost: Math.max(0, newCost) }
          : material
      )
    );
  };

  // Product Creation Functions
  const addNewProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.outputPerBatch && newProduct.unit && newProduct.recipe.length > 0) {
      const product = {
        id: Date.now(),
        name: newProduct.name,
        category: newProduct.category,
        icon: newProduct.icon,
        price: parseInt(newProduct.price),
        outputPerBatch: parseInt(newProduct.outputPerBatch),
        unit: newProduct.unit,
        recipe: newProduct.recipe.filter(ingredient => ingredient.materialId && ingredient.quantity > 0)
      };
      
      setProducts(prev => [...prev, product]);
      
      // Reset form
      setNewProduct({
        name: '',
        category: 'Khumra',
        icon: '🧴',
        price: '',
        outputPerBatch: '',
        unit: '',
        recipe: []
      });
      
      setShowProductForm(false);
      addNotification(`New product "${product.name}" created successfully! 🎉`, 'success');
    } else {
      addNotification('Please fill all required fields and add at least one ingredient', 'error');
    }
  };

  const addIngredient = () => {
    setNewProduct(prev => ({
      ...prev,
      recipe: [...prev.recipe, { materialId: '', quantity: '' }]
    }));
  };

  const updateIngredient = (index, field, value) => {
    setNewProduct(prev => ({
      ...prev,
      recipe: prev.recipe.map((ingredient, i) => 
        i === index ? { ...ingredient, [field]: value } : ingredient
      )
    }));
  };

  const removeIngredient = (index) => {
    setNewProduct(prev => ({
      ...prev,
      recipe: prev.recipe.filter((_, i) => i !== index)
    }));
  };

  const theme = {
    background: 'linear-gradient(135deg, #F5E6D3 0%, #E8D7C3 100%)',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280'
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', color: '#8B4513' },
    { id: 'production', label: 'Production', icon: '🏭', color: '#A0522D' },
    { id: 'sales', label: 'Sales', icon: '🛒', color: '#8B4513' },
    { id: 'inventory', label: 'Inventory', icon: '📦', color: '#D2691E' },
    { id: 'distribution', label: 'Distribution', icon: '📍', color: '#CD853F' },
    { id: 'reports', label: 'Reports', icon: '📊', color: '#DEB887' }
  ];

  return (
    <div style={{ 
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
      minHeight: '100vh', 
      background: theme.background,
      display: 'flex' 
    }}>
      {/* Notifications */}
      {notifications.map(notif => (
        <div 
          key={notif.id}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: notif.type === 'error' ? '#dc2626' : '#8B4513',
            color: 'white',
            padding: '16px 20px',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            maxWidth: '400px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '600' }}>{notif.message}</span>
            <button 
              onClick={() => removeNotification(notif.id)}
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
      ))}

      {/* Sidebar */}
      <div style={{ 
        width: '280px', 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(139, 69, 19, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ 
          padding: '32px 24px', 
          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.15) 0%, transparent 70%)',
            pointerEvents: 'none'
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
          {menuItems.map(tab => (
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
            >
              <span style={{ fontSize: '16px' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div style={{ 
          padding: '24px', 
          borderTop: '1px solid rgba(139, 69, 19, 0.1)',
          textAlign: 'center'
        }}>
          <button 
            onClick={() => addNotification('Welcome to Abeer! 🌟', 'success')}
            style={{
              background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Test Notification
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        padding: '40px',
        overflow: 'auto'
      }}>
        <div style={{
          background: theme.cardBg,
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          minHeight: '500px'
        }}>
          <h2 style={{ 
            color: theme.textPrimary, 
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            {menuItems.find(item => item.id === activeTab)?.icon}
            {menuItems.find(item => item.id === activeTab)?.label}
          </h2>
          
          {activeTab === 'dashboard' && (
            <div>
              <p style={{ color: theme.textSecondary, fontSize: '16px', marginBottom: '30px' }}>
                Welcome to your luxury incense business management system.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                  color: 'white',
                  padding: '24px',
                  borderRadius: '15px'
                }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>🏭 Production</h3>
                  <p style={{ margin: 0, opacity: 0.9 }}>Manage your incense manufacturing</p>
                </div>
                
                <div style={{
                  background: 'linear-gradient(135deg, #D2691E 0%, #CD853F 100%)',
                  color: 'white',
                  padding: '24px',
                  borderRadius: '15px'
                }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>🛒 Sales</h3>
                  <p style={{ margin: 0, opacity: 0.9 }}>Track orders and customers</p>
                </div>
                
                <div style={{
                  background: 'linear-gradient(135deg, #A0522D 0%, #8B4513 100%)',
                  color: 'white',
                  padding: '24px',
                  borderRadius: '15px'
                }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>📦 Inventory</h3>
                  <p style={{ margin: 0, opacity: 0.9 }}>Monitor stock levels</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'production' && (
            <div>
              <p style={{ color: theme.textSecondary, fontSize: '16px', marginBottom: '30px' }}>
                Manage your raw materials and calculate production based on your actual ingredients.
              </p>
              
              {/* Raw Materials Inventory */}
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ color: theme.textPrimary, fontSize: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📦 Raw Materials & Costs
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                  {rawMaterials.map(material => (
                    <div key={material.id} style={{
                      background: 'rgba(139, 69, 19, 0.05)',
                      border: '1px solid rgba(139, 69, 19, 0.1)',
                      padding: '20px',
                      borderRadius: '12px'
                    }}>
                      <h4 style={{ margin: '0 0 16px 0', color: theme.textPrimary, fontSize: '16px', fontWeight: '600' }}>
                        {material.name}
                      </h4>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <label style={{ fontSize: '12px', color: theme.textSecondary, minWidth: '60px' }}>Quantity:</label>
                        <input
                          type="number"
                          value={material.quantity}
                          onChange={(e) => updateMaterialQuantity(material.id, parseInt(e.target.value) || 0)}
                          style={{
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            width: '100px'
                          }}
                        />
                        <span style={{ color: theme.textSecondary, fontSize: '14px' }}>{material.unit}</span>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <label style={{ fontSize: '12px', color: theme.textSecondary, minWidth: '60px' }}>Total Cost:</label>
                        <input
                          type="number"
                          value={material.cost}
                          onChange={(e) => updateMaterialCost(material.id, parseInt(e.target.value) || 0)}
                          placeholder="Enter total cost in ₦"
                          style={{
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            width: '120px'
                          }}
                        />
                        <span style={{ color: theme.textSecondary, fontSize: '14px' }}>₦</span>
                      </div>
                      
                      <div style={{ 
                        marginTop: '12px',
                        padding: '8px 12px',
                        background: 'rgba(139, 69, 19, 0.1)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: theme.textPrimary,
                        fontWeight: '600'
                      }}>
                        Cost per {material.unit.slice(0, -1)}: ₦{material.quantity > 0 ? Math.round(material.cost / material.quantity).toLocaleString() : '0'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Production Calculator */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ color: theme.textPrimary, fontSize: '20px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🧮 Production Calculator
                  </h3>
                  <button
                    onClick={() => setShowProductForm(!showProductForm)}
                    style={{
                      background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    ➕ Add New Product
                  </button>
                </div>
                
                {/* Product Creation Form */}
                {showProductForm && (
                  <div style={{
                    background: 'rgba(139, 69, 19, 0.05)',
                    border: '2px solid rgba(139, 69, 19, 0.2)',
                    padding: '24px',
                    borderRadius: '12px',
                    marginBottom: '30px'
                  }}>
                    <h4 style={{ color: theme.textPrimary, fontSize: '18px', marginBottom: '20px' }}>
                      ➕ Create New Product
                    </h4>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                      {/* Product Name */}
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                          Product Name *
                        </label>
                        <input
                          type="text"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="e.g., Abeer - Mystic Oud"
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      
                      {/* Category */}
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                          Category *
                        </label>
                        <select
                          value={newProduct.category}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value }))}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        >
                          <option value="Khumra">🧴 Khumra</option>
                          <option value="Abeer (Luxury)">🌟 Abeer (Luxury)</option>
                          <option value="Areej (Standard)">🎋 Areej (Standard)</option>
                        </select>
                      </div>
                      
                      {/* Price */}
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                          Selling Price (₦) *
                        </label>
                        <input
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                          placeholder="e.g., 2500"
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      
                      {/* Product Icon */}
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                          Product Icon
                        </label>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {['🧴', '🌟', '🎋', '💎', '🔥', '🌿', '🏺', '✨', '🎭', '🎪'].map(icon => (
                            <button
                              key={icon}
                              onClick={() => setNewProduct(prev => ({ ...prev, icon }))}
                              style={{
                                background: newProduct.icon === icon ? 'rgba(139, 69, 19, 0.2)' : 'rgba(139, 69, 19, 0.05)',
                                border: `1px solid ${newProduct.icon === icon ? 'rgba(139, 69, 19, 0.4)' : 'rgba(139, 69, 19, 0.1)'}`,
                                padding: '8px',
                                borderRadius: '6px',
                                fontSize: '20px',
                                cursor: 'pointer'
                              }}
                            >
                              {icon}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Output per Batch */}
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                          Output per Batch *
                        </label>
                        <input
                          type="number"
                          value={newProduct.outputPerBatch}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, outputPerBatch: e.target.value }))}
                          placeholder="e.g., 20"
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                      
                      {/* Unit */}
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                          Unit Description *
                        </label>
                        <input
                          type="text"
                          value={newProduct.unit}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, unit: e.target.value }))}
                          placeholder="e.g., premium sticks"
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Recipe Builder */}
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                          Recipe (Raw Materials) *
                        </label>
                        <button
                          onClick={addIngredient}
                          style={{
                            background: 'rgba(139, 69, 19, 0.1)',
                            color: '#8B4513',
                            border: '1px solid rgba(139, 69, 19, 0.3)',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            cursor: 'pointer'
                          }}
                        >
                          + Add Ingredient
                        </button>
                      </div>
                      
                      {newProduct.recipe.map((ingredient, index) => (
                        <div key={index} style={{ 
                          display: 'flex', 
                          gap: '12px', 
                          alignItems: 'center', 
                          marginBottom: '8px',
                          padding: '12px',
                          background: 'rgba(255, 255, 255, 0.6)',
                          borderRadius: '6px'
                        }}>
                          <select
                            value={ingredient.materialId}
                            onChange={(e) => updateIngredient(index, 'materialId', parseInt(e.target.value))}
                            style={{
                              flex: 1,
                              padding: '8px 12px',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontSize: '14px'
                            }}
                          >
                            <option value="">Select Material</option>
                            {rawMaterials.map(material => (
                              <option key={material.id} value={material.id}>
                                {material.name} ({material.unit})
                              </option>
                            ))}
                          </select>
                          
                          <input
                            type="number"
                            value={ingredient.quantity}
                            onChange={(e) => updateIngredient(index, 'quantity', parseInt(e.target.value) || '')}
                            placeholder="Qty"
                            style={{
                              width: '80px',
                              padding: '8px 12px',
                              border: '1px solid #d1d5db',
                              borderRadius: '6px',
                              fontSize: '14px'
                            }}
                          />
                          
                          <button
                            onClick={() => removeIngredient(index)}
                            style={{
                              background: '#dc2626',
                              color: 'white',
                              border: 'none',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    {/* Form Actions */}
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => setShowProductForm(false)}
                        style={{
                          background: '#6b7280',
                          color: 'white',
                          border: 'none',
                          padding: '12px 20px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                      
                      <button
                        onClick={addNewProduct}
                        style={{
                          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 20px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Create Product
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Products by Category */}
                {[...new Set(products.map(p => p.category))].map(category => {
                  const categoryProducts = products.filter(p => p.category === category);
                  const categoryIcon = categoryProducts[0]?.icon || '📦';
                  
                  return (
                    <div key={category} style={{ marginBottom: '40px' }}>
                      <h4 style={{ 
                        color: theme.textPrimary, 
                        fontSize: '18px', 
                        marginBottom: '16px',
                        padding: '12px 16px',
                        background: 'rgba(139, 69, 19, 0.08)',
                        borderRadius: '8px',
                        border: '1px solid rgba(139, 69, 19, 0.15)'
                      }}>
                        {categoryIcon} {category}
                      </h4>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px' }}>
                        {categoryProducts.map(product => {
                          const maxBatches = calculateMaxBatches(product.id);
                          const totalOutput = calculateTotalOutput(product.id);
                          const costPerBatch = calculateMaterialCost(product.id);
                          const totalCost = maxBatches * costPerBatch;
                          const revenue = maxBatches * product.price;
                          const profit = revenue - totalCost;
                          
                          return (
                            <div key={product.id} style={{
                              background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.08) 0%, rgba(160, 82, 45, 0.08) 100%)',
                              border: '1px solid rgba(139, 69, 19, 0.15)',
                              padding: '20px',
                              borderRadius: '12px'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                                <span style={{ fontSize: '24px' }}>{product.icon}</span>
                                <h5 style={{ margin: 0, color: theme.textPrimary, fontSize: '16px', fontWeight: '600' }}>
                                  {product.name}
                                </h5>
                              </div>
                              
                              {/* Recipe */}
                              <div style={{ marginBottom: '16px' }}>
                                <h6 style={{ margin: '0 0 8px 0', color: theme.textPrimary, fontSize: '13px', fontWeight: '600' }}>
                                  Recipe per batch:
                                </h6>
                                {product.recipe.map(ingredient => {
                                  const material = rawMaterials.find(m => m.id === ingredient.materialId);
                                  return (
                                    <div key={ingredient.materialId} style={{ 
                                      display: 'flex', 
                                      justifyContent: 'space-between', 
                                      marginBottom: '3px',
                                      fontSize: '12px',
                                      color: theme.textSecondary
                                    }}>
                                      <span>{material?.name}</span>
                                      <span>{ingredient.quantity} {material?.unit}</span>
                                    </div>
                                  );
                                })}
                                <div style={{ 
                                  borderTop: '1px solid rgba(139, 69, 19, 0.2)', 
                                  paddingTop: '6px', 
                                  marginTop: '6px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  color: theme.textPrimary
                                }}>
                                  Output: {product.outputPerBatch} {product.unit} @ ₦{product.price.toLocaleString()} per batch
                                </div>
                              </div>
                              
                              {/* Calculations */}
                              <div style={{
                                background: 'rgba(255, 255, 255, 0.6)',
                                padding: '14px',
                                borderRadius: '8px',
                                border: '1px solid rgba(139, 69, 19, 0.1)'
                              }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '12px' }}>
                                  <div>
                                    <div style={{ color: theme.textSecondary, marginBottom: '3px' }}>Max Batches:</div>
                                    <div style={{ color: theme.textPrimary, fontWeight: '600', fontSize: '14px' }}>{maxBatches}</div>
                                  </div>
                                  
                                  <div>
                                    <div style={{ color: theme.textSecondary, marginBottom: '3px' }}>Total Output:</div>
                                    <div style={{ color: '#8B4513', fontWeight: '600', fontSize: '14px' }}>{totalOutput}</div>
                                  </div>
                                  
                                  <div>
                                    <div style={{ color: theme.textSecondary, marginBottom: '3px' }}>Cost/Batch:</div>
                                    <div style={{ color: theme.textPrimary, fontWeight: '600' }}>₦{Math.round(costPerBatch).toLocaleString()}</div>
                                  </div>
                                  
                                  <div>
                                    <div style={{ color: theme.textSecondary, marginBottom: '3px' }}>Revenue:</div>
                                    <div style={{ color: '#27AE60', fontWeight: '600' }}>₦{Math.round(revenue).toLocaleString()}</div>
                                  </div>
                                  
                                  <div>
                                    <div style={{ color: theme.textSecondary, marginBottom: '3px' }}>Total Cost:</div>
                                    <div style={{ color: '#D2691E', fontWeight: '600' }}>₦{Math.round(totalCost).toLocaleString()}</div>
                                  </div>
                                  
                                  <div>
                                    <div style={{ color: theme.textSecondary, marginBottom: '3px' }}>Profit:</div>
                                    <div style={{ color: profit >= 0 ? '#16A085' : '#dc2626', fontWeight: '600' }}>₦{Math.round(profit).toLocaleString()}</div>
                                  </div>
                                </div>
                                
                                {maxBatches > 0 && (
                                  <button
                                    onClick={() => {
                                      // Simulate production - reduce raw materials
                                      product.recipe.forEach(ingredient => {
                                        updateMaterialQuantity(
                                          ingredient.materialId, 
                                          rawMaterials.find(m => m.id === ingredient.materialId)?.quantity - (ingredient.quantity * maxBatches)
                                        );
                                      });
                                      addNotification(`Produced ${totalOutput} ${product.unit} of ${product.name}! Revenue: ₦${Math.round(revenue).toLocaleString()} 🎉`, 'success');
                                    }}
                                    style={{
                                      width: '100%',
                                      marginTop: '12px',
                                      background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                                      color: 'white',
                                      border: 'none',
                                      padding: '10px',
                                      borderRadius: '6px',
                                      fontSize: '13px',
                                      fontWeight: '600',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    Produce All Batches
                                  </button>
                                )}
                                
                                {maxBatches === 0 && (
                                  <div style={{
                                    marginTop: '12px',
                                    padding: '10px',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: '#dc2626',
                                    borderRadius: '6px',
                                    fontSize: '12px',
                                    textAlign: 'center'
                                  }}>
                                    ⚠️ Insufficient materials
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {activeTab !== 'dashboard' && activeTab !== 'production' && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{
                fontSize: '64px',
                marginBottom: '20px'
              }}>
                {menuItems.find(item => item.id === activeTab)?.icon}
              </div>
              <h3 style={{ 
                color: theme.textPrimary,
                fontSize: '24px',
                marginBottom: '12px'
              }}>
                {menuItems.find(item => item.id === activeTab)?.label} Module
              </h3>
              <p style={{ color: theme.textSecondary, fontSize: '16px' }}>
                This section is ready for your business features.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
