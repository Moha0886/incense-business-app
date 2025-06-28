import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Save, Trash2, Edit, Package, TrendingUp } from 'lucide-react';
import AnimatedStatCard from './AnimatedStatCard';
import LoadingSpinner from './LoadingSpinner';

function Distribution() {
  const [distributions, setDistributions] = useState([]);
  const [locations, setLocations] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [showDistributionForm, setShowDistributionForm] = useState(false);
  const [editingLocationIndex, setEditingLocationIndex] = useState(-1);
  const [editingDistributionIndex, setEditingDistributionIndex] = useState(-1);
  
  const [locationFormData, setLocationFormData] = useState({
    name: '',
    address: '',
    contactPerson: '',
    phone: '',
    type: 'retail'
  });

  const [distributionFormData, setDistributionFormData] = useState({
    productName: '',
    locationName: '',
    quantity: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const locationTypes = ['retail', 'wholesale', 'online', 'market_stall'];

  useEffect(() => {
    const savedDistributions = localStorage.getItem('distributions');
    const savedLocations = localStorage.getItem('locations');
    const savedInventory = localStorage.getItem('inventory');
    
    if (savedDistributions) {
      setDistributions(JSON.parse(savedDistributions));
    }
    if (savedLocations) {
      setLocations(JSON.parse(savedLocations));
    } else {
      // Initialize with default locations
      const defaultLocations = [
        { name: 'Main Store', address: 'Main Business Location', contactPerson: 'You', phone: '', type: 'retail' },
        { name: 'Kano Market', address: 'Kano Central Market', contactPerson: '', phone: '', type: 'market_stall' },
        { name: 'Kaduna Branch', address: 'Kaduna Location', contactPerson: '', phone: '', type: 'retail' }
      ];
      setLocations(defaultLocations);
      localStorage.setItem('locations', JSON.stringify(defaultLocations));
    }
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    localStorage.setItem('distributions', JSON.stringify(distributions));
  }, [distributions]);

  useEffect(() => {
    localStorage.setItem('locations', JSON.stringify(locations));
  }, [locations]);

  const handleLocationInputChange = (e) => {
    const { name, value } = e.target;
    setLocationFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDistributionInputChange = (e) => {
    const { name, value } = e.target;
    setDistributionFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    
    const locationData = {
      ...locationFormData,
      id: Date.now()
    };

    if (editingLocationIndex >= 0) {
      const newLocations = [...locations];
      newLocations[editingLocationIndex] = locationData;
      setLocations(newLocations);
      setEditingLocationIndex(-1);
    } else {
      setLocations([...locations, locationData]);
    }

    resetLocationForm();
  };

  const handleDistributionSubmit = (e) => {
    e.preventDefault();
    
    // Check if enough inventory
    const product = inventory.find(item => item.name === distributionFormData.productName);
    const requestedQuantity = parseInt(distributionFormData.quantity);
    
    if (!product) {
      alert('Product not found in inventory!');
      return;
    }
    
    if (product.quantity < requestedQuantity) {
      alert(`Not enough inventory! Available: ${product.quantity}, Requested: ${requestedQuantity}`);
      return;
    }

    const distributionData = {
      ...distributionFormData,
      quantity: parseInt(distributionFormData.quantity),
      id: Date.now()
    };

    if (editingDistributionIndex >= 0) {
      const newDistributions = [...distributions];
      const oldDistribution = distributions[editingDistributionIndex];
      
      // Restore old inventory
      updateInventory(oldDistribution.productName, oldDistribution.quantity, 'add');
      
      newDistributions[editingDistributionIndex] = distributionData;
      setDistributions(newDistributions);
      setEditingDistributionIndex(-1);
    } else {
      setDistributions([...distributions, distributionData]);
    }

    // Update inventory
    updateInventory(distributionFormData.productName, parseInt(distributionFormData.quantity), 'subtract');

    resetDistributionForm();
  };

  const updateInventory = (productName, quantity, operation) => {
    const currentInventory = JSON.parse(localStorage.getItem('inventory') || '[]');
    const productIndex = currentInventory.findIndex(item => item.name === productName);
    
    if (productIndex >= 0) {
      if (operation === 'subtract') {
        currentInventory[productIndex].quantity -= quantity;
      } else {
        currentInventory[productIndex].quantity += quantity;
      }
      currentInventory[productIndex].lastUpdated = new Date().toISOString();
      localStorage.setItem('inventory', JSON.stringify(currentInventory));
      setInventory(currentInventory);
    }
  };

  const resetLocationForm = () => {
    setLocationFormData({
      name: '',
      address: '',
      contactPerson: '',
      phone: '',
      type: 'retail'
    });
    setShowLocationForm(false);
  };

  const resetDistributionForm = () => {
    setDistributionFormData({
      productName: '',
      locationName: '',
      quantity: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setShowDistributionForm(false);
  };

  const editLocation = (index) => {
    setLocationFormData(locations[index]);
    setEditingLocationIndex(index);
    setShowLocationForm(true);
  };

  const deleteLocation = (index) => {
    if (confirm('Are you sure you want to delete this location?')) {
      setLocations(locations.filter((_, i) => i !== index));
    }
  };

  const editDistribution = (index) => {
    setDistributionFormData(distributions[index]);
    setEditingDistributionIndex(index);
    setShowDistributionForm(true);
  };

  const deleteDistribution = (index) => {
    if (confirm('Are you sure you want to delete this distribution record?')) {
      const distribution = distributions[index];
      
      // Restore inventory
      updateInventory(distribution.productName, distribution.quantity, 'add');
      
      setDistributions(distributions.filter((_, i) => i !== index));
    }
  };

  const getLocationDistributions = (locationName) => {
    return distributions.filter(dist => dist.locationName === locationName);
  };

  const getLocationStats = (locationName) => {
    const locationDistributions = getLocationDistributions(locationName);
    const totalQuantity = locationDistributions.reduce((sum, dist) => sum + dist.quantity, 0);
    const uniqueProducts = new Set(locationDistributions.map(dist => dist.productName)).size;
    
    return { totalQuantity, uniqueProducts, totalDistributions: locationDistributions.length };
  };

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
          📍 Abeer Distribution Management
        </h1>
        <p style={{ 
          color: '#6b7280', 
          fontSize: '16px', 
          margin: 0,
          fontWeight: '500'
        }}>
          Manage Abeer & Areej distribution across Nigeria | @abeer.ng
        </p>
      </div>

      {/* Summary Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <AnimatedStatCard
          title="Total Locations"
          value={locations.length}
          icon="📍"
          color="#8B4513"
          subtitle="active distribution points"
          loading={loading}
        />
        <AnimatedStatCard
          title="Total Distributions"
          value={distributions.length}
          icon="📦"
          color="#10b981"
          subtitle="completed shipments"
          loading={loading}
        />
        <AnimatedStatCard
          title="Units Distributed"
          value={distributions.reduce((sum, dist) => sum + dist.quantity, 0)}
          icon="📈"
          color="#3b82f6"
          subtitle="total products shipped"
          loading={loading}
        />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
        gap: '24px'
      }}>
        {/* Locations Management */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1f2937',
              margin: 0
            }}>📍 Distribution Locations</h2>
            <button 
              onClick={() => setShowLocationForm(!showLocationForm)}
            >
              <Plus size={16} />
              Add Location
            </button>
          </div>

          {showLocationForm && (
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
              <h3>{editingLocationIndex >= 0 ? 'Edit Location' : 'Add New Location'}</h3>
              <form onSubmit={handleLocationSubmit}>
                <div className="form-group">
                  <label>Location Name</label>
                  <input
                    type="text"
                    name="name"
                    value={locationFormData.name}
                    onChange={handleLocationInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={locationFormData.address}
                    onChange={handleLocationInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Person</label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={locationFormData.contactPerson}
                      onChange={handleLocationInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={locationFormData.phone}
                      onChange={handleLocationInputChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select
                    name="type"
                    value={locationFormData.type}
                    onChange={handleLocationInputChange}
                    className="form-control"
                  >
                    {locationTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type.replace('_', ' ').toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn btn-success btn-sm">
                    <Save size={14} />
                    {editingLocationIndex >= 0 ? 'Update' : 'Add'} Location
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={resetLocationForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {locations.length === 0 ? (
            <p>No locations added yet.</p>
          ) : (
            <div>
              {locations.map((location, index) => {
                const stats = getLocationStats(location.name);
                return (
                  <div key={location.id || index} style={{ 
                    border: '1px solid #e9ecef', 
                    padding: '15px', 
                    borderRadius: '4px', 
                    marginBottom: '10px' 
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div>
                        <h4>{location.name}</h4>
                        <p style={{ color: '#666', margin: '5px 0' }}>{location.address}</p>
                        <small style={{ color: '#888' }}>
                          Type: {location.type.replace('_', ' ').toUpperCase()}
                        </small>
                        {location.contactPerson && (
                          <div style={{ marginTop: '5px' }}>
                            <small>Contact: {location.contactPerson}</small>
                            {location.phone && <small> - {location.phone}</small>}
                          </div>
                        )}
                        <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#667eea' }}>
                          {stats.totalDistributions} distributions • {stats.totalQuantity} units • {stats.uniqueProducts} products
                        </div>
                      </div>
                      <div>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => editLocation(index)}
                          style={{ marginRight: '5px' }}
                        >
                          <Edit size={12} />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteLocation(index)}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Distribution Records */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Distribution Records</h2>
            <button 
              className="btn btn-success btn-sm"
              onClick={() => setShowDistributionForm(!showDistributionForm)}
            >
              <Plus size={16} />
              Record Distribution
            </button>
          </div>

          {showDistributionForm && (
            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
              <h3>{editingDistributionIndex >= 0 ? 'Edit Distribution' : 'Record New Distribution'}</h3>
              <form onSubmit={handleDistributionSubmit}>
                <div className="form-group">
                  <label>Product</label>
                  <select
                    name="productName"
                    value={distributionFormData.productName}
                    onChange={handleDistributionInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Product</option>
                    {inventory.map((product, index) => (
                      <option key={index} value={product.name}>
                        {product.name} (Available: {product.quantity})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Destination Location</label>
                  <select
                    name="locationName"
                    value={distributionFormData.locationName}
                    onChange={handleDistributionInputChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Location</option>
                    {locations.map((location, index) => (
                      <option key={index} value={location.name}>{location.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={distributionFormData.quantity}
                      onChange={handleDistributionInputChange}
                      className="form-control"
                      required
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      name="date"
                      value={distributionFormData.date}
                      onChange={handleDistributionInputChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea
                    name="notes"
                    value={distributionFormData.notes}
                    onChange={handleDistributionInputChange}
                    className="form-control"
                    rows="2"
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn btn-success btn-sm">
                    <Save size={14} />
                    {editingDistributionIndex >= 0 ? 'Update' : 'Record'} Distribution
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" onClick={resetDistributionForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {distributions.length === 0 ? (
            <p>No distributions recorded yet.</p>
          ) : (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {distributions.slice().reverse().map((distribution, index) => (
                <div key={distribution.id} style={{ 
                  border: '1px solid #e9ecef', 
                  padding: '12px', 
                  borderRadius: '4px', 
                  marginBottom: '8px' 
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <strong>{distribution.productName}</strong>
                      <div style={{ fontSize: '0.9em', color: '#666', marginTop: '2px' }}>
                        To: {distribution.locationName} • Qty: {distribution.quantity}
                      </div>
                      <small style={{ color: '#888' }}>
                        {new Date(distribution.date).toLocaleDateString()}
                      </small>
                      {distribution.notes && (
                        <div style={{ fontSize: '0.8em', color: '#666', marginTop: '5px' }}>
                          {distribution.notes}
                        </div>
                      )}
                    </div>
                    <div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => editDistribution(distributions.length - 1 - index)}
                        style={{ marginRight: '5px' }}
                      >
                        <Edit size={12} />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteDistribution(distributions.length - 1 - index)}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Distribution;
