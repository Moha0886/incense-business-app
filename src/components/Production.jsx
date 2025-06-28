import React, { useState, useEffect } from 'react';
import { Plus, Save, Trash2, Edit } from 'lucide-react';

function Production({ theme, showNotification }) {
  const [productions, setProductions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [formData, setFormData] = useState({
    productName: '',
    date: new Date().toISOString().split('T')[0],
    quantity: '',
    ingredients: [],
    totalCost: 0,
    sellingPrice: '',
    notes: ''
  });

  const defaultIngredients = [
    { name: 'WOOD (SANDAL)', cost: 5500 },
    { name: 'SANDAL POWDER', cost: 3000 },
    { name: 'FARCE', cost: 2000 },
    { name: 'JAWEE', cost: 1000 },
    { name: 'SANDALIA', cost: 0 },
    { name: 'SANDAL OIL', cost: 2000 },
    { name: 'WATER BASE', cost: 2000 },
    { name: 'OILS', cost: 11200 },
    { name: 'MASK', cost: 1500 },
    { name: 'SUGAR', cost: 3000 },
    { name: 'STICKERS', cost: 5000 },
    { name: 'BOTTLES', cost: 7000 },
    { name: 'TP', cost: 10000 }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('productions');
    if (saved) {
      setProductions(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('productions', JSON.stringify(productions));
  }, [productions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const loadDefaultRecipe = () => {
    setFormData(prev => ({
      ...prev,
      productName: 'Areej',
      ingredients: [...defaultIngredients],
      totalCost: defaultIngredients.reduce((sum, ing) => sum + ing.cost, 0)
    }));
    showNotification?.('Areej recipe loaded successfully! (Normal brand)', 'success');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productionData = {
      ...formData,
      quantity: parseInt(formData.quantity),
      sellingPrice: parseFloat(formData.sellingPrice) || 0,
      costPerUnit: formData.totalCost / parseInt(formData.quantity),
      profitPerUnit: (parseFloat(formData.sellingPrice) || 0) - (formData.totalCost / parseInt(formData.quantity)),
      id: Date.now()
    };

    if (editingIndex >= 0) {
      const newProductions = [...productions];
      newProductions[editingIndex] = productionData;
      setProductions(newProductions);
      setEditingIndex(-1);
      showNotification?.('Production updated successfully!', 'success');
    } else {
      setProductions([...productions, productionData]);
      showNotification?.('Production recorded successfully!', 'success');
    }

    updateInventory(productionData);
    resetForm();
  };

  const updateInventory = (productionData) => {
    const inventory = JSON.parse(localStorage.getItem('inventory') || '[]');
    const existingIndex = inventory.findIndex(item => item.name === productionData.productName);
    
    if (existingIndex >= 0) {
      inventory[existingIndex].quantity += productionData.quantity;
      inventory[existingIndex].lastUpdated = new Date().toISOString();
    } else {
      inventory.push({
        name: productionData.productName,
        quantity: productionData.quantity,
        costPerUnit: productionData.costPerUnit,
        sellingPrice: productionData.sellingPrice,
        lastUpdated: new Date().toISOString()
      });
    }
    
    localStorage.setItem('inventory', JSON.stringify(inventory));
  };

  const editProduction = (index) => {
    setFormData({ ...productions[index] });
    setEditingIndex(index);
    setShowForm(true);
  };

  const deleteProduction = (index) => {
    if (window.confirm('Are you sure you want to delete this production record?')) {
      const newProductions = productions.filter((_, i) => i !== index);
      setProductions(newProductions);
      showNotification?.('Production record deleted successfully!', 'success');
    }
  };

  const resetForm = () => {
    setFormData({
      productName: '',
      date: new Date().toISOString().split('T')[0],
      quantity: '',
      ingredients: [],
      totalCost: 0,
      sellingPrice: '',
      notes: ''
    });
    setShowForm(false);
    setEditingIndex(-1);
  };

  const updateIngredientCost = (index, cost) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index].cost = parseFloat(cost) || 0;
    const totalCost = newIngredients.reduce((sum, ing) => sum + ing.cost, 0);
    
    setFormData(prev => ({
      ...prev,
      ingredients: newIngredients,
      totalCost
    }));
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '32px',
      marginBottom: '24px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px'
    },
    title: {
      background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontSize: '2rem',
      fontWeight: '800',
      margin: '0 0 8px 0'
    },
    subtitle: {
      color: '#6b7280',
      margin: 0,
      fontSize: '1rem'
    },
    buttonContainer: {
      display: 'flex',
      gap: '12px'
    },
    button: {
      border: 'none',
      borderRadius: '12px',
      padding: '12px 20px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s ease'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(139, 69, 19, 0.4)'
    },
    secondaryButton: {
      background: 'linear-gradient(135deg, #D2691E 0%, #CD853F 100%)',
      color: 'white'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '32px',
      marginBottom: '24px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontWeight: '600',
      color: '#374151',
      fontSize: '14px'
    },
    input: {
      padding: '12px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      outline: 'none'
    },
    textarea: {
      padding: '12px 16px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      outline: 'none',
      resize: 'vertical',
      minHeight: '80px'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
    },
    th: {
      background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
      color: 'white',
      padding: '16px',
      textAlign: 'left',
      fontWeight: '600',
      fontSize: '14px'
    },
    td: {
      padding: '16px',
      borderBottom: '1px solid #f3f4f6',
      fontSize: '14px'
    },
    actionButton: {
      padding: '8px 12px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '600',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      marginRight: '8px',
      transition: 'all 0.2s ease'
    },
    editButton: {
      background: '#3b82f6',
      color: 'white'
    },
    deleteButton: {
      background: '#ef4444',
      color: 'white'
    },
    submitButton: {
      background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '16px 32px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      alignSelf: 'flex-start'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            🏭 Abeer Production Management
          </h1>
          <p style={styles.subtitle}>
            Track and manage Abeer & Areej incense production batches | @abeer.ng
          </p>
        </div>
        
        <div style={styles.buttonContainer}>
          <button
            onClick={loadDefaultRecipe}
            style={{...styles.button, ...styles.secondaryButton}}
          >
            Load Areej Recipe
          </button>
          
          <button
            onClick={() => setShowForm(true)}
            style={{...styles.button, ...styles.primaryButton}}
          >
            <Plus size={16} />
            New Production
          </button>
        </div>
      </div>

      {/* Production Form */}
      {showForm && (
        <div style={styles.card}>
          <h2 style={{margin: '0 0 24px 0', color: '#1f2937', fontSize: '1.5rem', fontWeight: '700'}}>
            {editingIndex >= 0 ? 'Edit Production' : 'Record New Production'}
          </h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Product Name</label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Production Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Quantity</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                  style={styles.input}
                  min="1"
                  required
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Selling Price per Unit (Optional)</label>
              <input
                type="number"
                value={formData.sellingPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, sellingPrice: e.target.value }))}
                style={styles.input}
                min="0"
                step="0.01"
              />
            </div>

            {formData.ingredients.length > 0 && (
              <div style={styles.formGroup}>
                <label style={styles.label}>Ingredients & Costs</label>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Ingredient</th>
                      <th style={styles.th}>Cost (NGN)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.ingredients.map((ingredient, index) => (
                      <tr key={index}>
                        <td style={styles.td}>{ingredient.name}</td>
                        <td style={styles.td}>
                          <input
                            type="number"
                            value={ingredient.cost}
                            onChange={(e) => updateIngredientCost(index, e.target.value)}
                            style={{...styles.input, margin: 0}}
                            min="0"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ marginTop: '16px', textAlign: 'right', fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  Total Cost: {formatCurrency(formData.totalCost)}
                </div>
              </div>
            )}

            <div style={styles.formGroup}>
              <label style={styles.label}>Notes (Optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                style={styles.textarea}
                placeholder="Add any additional notes about this production batch..."
              />
            </div>

            <div style={{display: 'flex', gap: '12px'}}>
              <button type="submit" style={styles.submitButton}>
                <Save size={16} />
                {editingIndex >= 0 ? 'Update Production' : 'Save Production'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  ...styles.button,
                  background: '#6b7280',
                  color: 'white'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Production Records */}
      <div style={styles.card}>
        <h2 style={{margin: '0 0 24px 0', color: '#1f2937', fontSize: '1.5rem', fontWeight: '700'}}>
          Production Records
        </h2>
        {productions.length === 0 ? (
          <p style={{textAlign: 'center', color: '#6b7280', fontSize: '16px', padding: '40px'}}>
            No production records yet. Click "New Production" to get started.
          </p>
        ) : (
          <div style={{overflowX: 'auto'}}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Product</th>
                  <th style={styles.th}>Quantity</th>
                  <th style={styles.th}>Total Cost</th>
                  <th style={styles.th}>Cost/Unit</th>
                  <th style={styles.th}>Selling Price</th>
                  <th style={styles.th}>Profit/Unit</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productions.map((production, index) => (
                  <tr key={production.id}>
                    <td style={styles.td}>{new Date(production.date).toLocaleDateString()}</td>
                    <td style={styles.td}>{production.productName}</td>
                    <td style={styles.td}>{production.quantity}</td>
                    <td style={styles.td}>{formatCurrency(production.totalCost)}</td>
                    <td style={styles.td}>{formatCurrency(production.costPerUnit)}</td>
                    <td style={styles.td}>{production.sellingPrice ? formatCurrency(production.sellingPrice) : '-'}</td>
                    <td style={{...styles.td, color: production.profitPerUnit >= 0 ? '#10b981' : '#ef4444', fontWeight: '600'}}>
                      {production.sellingPrice ? formatCurrency(production.profitPerUnit) : '-'}
                    </td>
                    <td style={styles.td}>
                      <button
                        onClick={() => editProduction(index)}
                        style={{...styles.actionButton, ...styles.editButton}}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => deleteProduction(index)}
                        style={{...styles.actionButton, ...styles.deleteButton}}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Production;
