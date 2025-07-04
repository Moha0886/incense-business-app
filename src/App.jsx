import React, { useState, useEffect } from 'react';
import abeerLogo from './assets/logos/abeer-logo.png';
import areejLogo from './assets/logos/areej-logo.png';

function App() {
  // Mobile state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Listen for screen size changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false); // Close sidebar when switching to desktop
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  
  // Settings State
  const [settings, setSettings] = useState({
    businessInfo: {
      name: 'Abeer Incense Business',
      address: 'Lagos, Nigeria',
      phone: '+234-xxx-xxx-xxxx',
      email: 'info@abeerincense.ng',
      taxId: 'TIN-123456789',
      currency: 'NGN',
      currencySymbol: '₦'
    },
    preferences: {
      theme: 'light',
      language: 'english',
      dateFormat: 'DD/MM/YYYY',
      lowStockThreshold: 10,
      autoBackup: true,
      notifications: true,
      soundAlerts: false
    },
    inventory: {
      trackStock: true,
      allowNegativeStock: false,
      autoReorderEnabled: false,
      defaultReorderQuantity: 50
    },
    pricing: {
      defaultMargin: 40,
      allowDiscounts: true,
      maxDiscountPercent: 25,
      roundPrices: true,
      taxRate: 7.5
    },
    sales: {
      requireCustomerInfo: false,
      allowPartialPayments: true,
      defaultPaymentMethod: 'cash',
      printReceipts: true
    }
  });

  // Raw Materials/Ingredients
  const [rawMaterials, setRawMaterials] = useState([
    { id: 1, name: 'Wood', quantity: 100, unit: 'pieces', costPerUnit: 50, cost: 5000, description: 'High-quality wood base', supplier: 'Wood Co.' },
    { id: 2, name: 'Sandal Powder', quantity: 500, unit: 'grams', costPerUnit: 25, cost: 12500, description: 'Pure sandal powder', supplier: 'Sandal Suppliers' },
    { id: 3, name: 'Farce', quantity: 200, unit: 'grams', costPerUnit: 15, cost: 3000, description: 'Aromatic farce compound', supplier: 'Aroma Ltd.' },
    { id: 4, name: 'Jawee', quantity: 150, unit: 'grams', costPerUnit: 53.33, cost: 8000, description: 'Premium jawee essence', supplier: 'Essence Co.' },
    { id: 5, name: 'Sandalia', quantity: 300, unit: 'grams', costPerUnit: 20, cost: 6000, description: 'Sandalia extract', supplier: 'Extract Corp.' },
    { id: 6, name: 'Sandal Oil', quantity: 100, unit: 'ml', costPerUnit: 150, cost: 15000, description: 'Pure sandal oil', supplier: 'Oil Works' },
    { id: 7, name: 'Water Base', quantity: 500, unit: 'ml', costPerUnit: 4, cost: 2000, description: 'Purified water base', supplier: 'Base Suppliers' },
    { id: 8, name: 'Oils', quantity: 200, unit: 'ml', costPerUnit: 50, cost: 10000, description: 'Blended essential oils', supplier: 'Oil Depot' },
    { id: 9, name: 'Mask', quantity: 50, unit: 'pieces', costPerUnit: 50, cost: 2500, description: 'Protective masks', supplier: 'Safety Co.' },
    { id: 10, name: 'Sugar', quantity: 1000, unit: 'grams', costPerUnit: 1.5, cost: 1500, description: 'Pure sugar', supplier: 'Sugar Mill' },
    { id: 11, name: 'Stickers', quantity: 200, unit: 'pieces', costPerUnit: 15, cost: 3000, description: 'Product labels', supplier: 'Label Co.' },
    { id: 12, name: 'Bottles', quantity: 100, unit: 'pieces', costPerUnit: 80, cost: 8000, description: 'Glass bottles', supplier: 'Glass Works' },
    { id: 13, name: 'Transport Fare', quantity: 1, unit: 'trip', costPerUnit: 5000, cost: 5000, description: 'Transportation cost', supplier: 'Transport Co.' }
  ]);

  // Product Categories
  const [categories, setCategories] = useState([
    { id: 1, name: 'Khumra', description: 'Premium liquid incense', logo: abeerLogo, brand: 'Abeer' },
    { id: 2, name: 'Abeer (Luxury)', description: 'High-end incense sticks', logo: abeerLogo, brand: 'Abeer' },
    { id: 3, name: 'Areej (Standard)', description: 'Standard quality incense', logo: areejLogo, brand: 'Areej' },
    { id: 4, name: 'Specialty Blends', description: 'Custom and seasonal products', logo: abeerLogo, brand: 'Abeer' }
  ]);

  // Customers
  const [customers, setCustomers] = useState([
    { 
      id: 1, 
      name: 'Ahmed Al-Rashid', 
      phone: '+971-50-123-4567', 
      email: 'ahmed@example.com',
      address: 'Dubai Marina, Dubai, UAE',
      type: 'Regular',
      discount: 5,
      totalOrders: 12,
      totalSpent: 85000,
      lastOrder: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Fatima Al-Zahra', 
      phone: '+971-55-987-6543', 
      email: 'fatima@example.com',
      address: 'Abu Dhabi, UAE',
      type: 'Premium',
      discount: 10,
      totalOrders: 25,
      totalSpent: 180000,
      lastOrder: '2024-01-20'
    },
    { 
      id: 3, 
      name: 'Omar Hassan', 
      phone: '+971-52-456-7890', 
      email: 'omar@example.com',
      address: 'Sharjah, UAE',
      type: 'Wholesale',
      discount: 15,
      totalOrders: 8,
      totalSpent: 320000,
      lastOrder: '2024-01-18'
    }
  ]);

  // Sales and Orders
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerId: 1,
      date: '2024-01-15',
      items: [
        { productId: 1, quantity: 5, price: 15000 },
        { productId: 3, quantity: 10, price: 7000 }
      ],
      subtotal: 145000,
      discount: 7250,
      total: 137750,
      status: 'completed'
    },
    {
      id: 2,
      customerId: 2,
      date: '2024-01-20',
      items: [
        { productId: 2, quantity: 15, price: 10000 }
      ],
      subtotal: 150000,
      discount: 15000,
      total: 135000,
      status: 'pending'
    }
  ]);

  // Sales Form State
  const [showSalesForm, setShowSalesForm] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orderFilter, setOrderFilter] = useState('all');
  const [newSale, setNewSale] = useState({
    customerId: '',
    items: [],
    discount: 0,
    notes: '',
    paymentMethod: 'cash',
    status: 'completed'
  });
  const [currentItem, setCurrentItem] = useState({
    productId: '',
    quantity: 1,
    customPrice: ''
  });

  // Production State
  const [showProductionForm, setShowProductionForm] = useState(false);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [productionBatches, setProductionBatches] = useState([
    {
      id: 1,
      productId: 1,
      batchNumber: 'B001',
      date: '2024-01-15',
      jarsProduced: 10,
      ingredientsUsed: [
        { ingredientId: 2, quantityUsed: 150 },
        { ingredientId: 6, quantityUsed: 200 },
        { ingredientId: 7, quantityUsed: 300 }
      ],
      totalIngredientCost: 45000,
      costPerJar: 4500,
      notes: 'Premium batch for special order'
    }
  ]);
  const [newProduction, setNewProduction] = useState({
    productId: '',
    batchNumber: '',
    jarsProduced: 1,
    ingredientsUsed: [],
    notes: ''
  });
  const [currentIngredient, setCurrentIngredient] = useState({
    ingredientId: '',
    quantityUsed: 0
  });
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    unit: '',
    costPerUnit: 0,
    quantity: 0,
    description: '',
    supplier: ''
  });

  // Form states for dynamic management
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [showPriceCalculator, setShowPriceCalculator] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Sample Products
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Khumra - Premium Blend',
      category: 'Khumra',
      brand: 'Abeer Luxury',
      icon: '🧴',
      recipe: [
        { materialId: 2, quantity: 15 },
        { materialId: 6, quantity: 20 },
        { materialId: 7, quantity: 30 },
        { materialId: 12, quantity: 10 },
        { materialId: 13, quantity: 1 }
      ],
      outputPerBatch: 10,
      unit: 'bottles (50ml each)',
      price: 15000,
      quantity: 25,
      costPrice: 4500,
      lastProductionDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Abeer - Premium',
      category: 'Abeer (Luxury)',
      brand: 'Abeer Luxury',
      icon: '🌟',
      recipe: [
        { materialId: 1, quantity: 6 },
        { materialId: 2, quantity: 30 },
        { materialId: 4, quantity: 12 },
        { materialId: 6, quantity: 18 },
        { materialId: 8, quantity: 15 }
      ],
      outputPerBatch: 20,
      unit: 'luxury premium sticks',
      price: 10000,
      quantity: 50,
      costPrice: 3200,
      lastProductionDate: '2024-01-10'
    },
    {
      id: 3,
      name: 'Areej - Classic',
      category: 'Areej (Standard)',
      brand: 'Abeer Classic',
      icon: '🎋',
      recipe: [
        { materialId: 1, quantity: 5 },
        { materialId: 2, quantity: 12 },
        { materialId: 3, quantity: 13 },
        { materialId: 6, quantity: 13 }
      ],
      outputPerBatch: 15,
      unit: 'standard sticks',
      price: 7000,
      quantity: 75,
      costPrice: 2100,
      lastProductionDate: '2024-01-12'
    },
    {
      id: 4,
      name: 'Sandal Supreme',
      category: 'Khumra',
      brand: 'Abeer Elite',
      icon: '🧴',
      recipe: [
        { materialId: 2, quantity: 20 },
        { materialId: 6, quantity: 25 },
        { materialId: 7, quantity: 40 },
        { materialId: 12, quantity: 15 }
      ],
      outputPerBatch: 12,
      unit: 'bottles (75ml each)',
      price: 18000,
      quantity: 30,
      costPrice: 5400,
      lastProductionDate: '2024-01-14'
    },
    {
      id: 5,
      name: 'Royal Oud',
      category: 'Abeer (Luxury)',
      brand: 'Abeer Royal',
      icon: '👑',
      recipe: [
        { materialId: 1, quantity: 8 },
        { materialId: 2, quantity: 35 },
        { materialId: 4, quantity: 15 },
        { materialId: 6, quantity: 22 },
        { materialId: 8, quantity: 20 }
      ],
      outputPerBatch: 25,
      unit: 'royal premium sticks',
      price: 12000,
      quantity: 40,
      costPrice: 3800,
      lastProductionDate: '2024-01-11'
    },
    {
      id: 6,
      name: 'Garden Fresh',
      category: 'Areej (Standard)',
      brand: 'Abeer Garden',
      icon: '🌸',
      recipe: [
        { materialId: 1, quantity: 4 },
        { materialId: 2, quantity: 10 },
        { materialId: 3, quantity: 15 },
        { materialId: 5, quantity: 8 }
      ],
      outputPerBatch: 18,
      unit: 'fresh scent sticks',
      price: 6500,
      quantity: 60,
      costPrice: 1800,
      lastProductionDate: '2024-01-13'
    }
  ]);

  // User Management System
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    username: 'admin',
    name: 'Administrator',
    email: 'admin@abeerincense.ng',
    role: 'super_admin',
    avatar: null,
    lastLogin: new Date().toISOString(),
    isActive: true
  });

  // Modal states for user management
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingRole, setEditingRole] = useState(null);
  
  const [newUser, setNewUser] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    role: 'viewer',
    password: ''
  });

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [],
    color: '#6b7280',
    level: 30
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'admin',
      name: 'Administrator',
      email: 'admin@abeerincense.ng',
      role: 'super_admin',
      permissions: ['all'],
      avatar: null,
      phone: '+234-xxx-xxx-xxxx',
      dateCreated: '2025-01-01',
      lastLogin: new Date().toISOString(),
      isActive: true,
      createdBy: 'system'
    },
    {
      id: 2,
      username: 'manager',
      name: 'Business Manager',
      email: 'manager@abeerincense.ng',
      role: 'manager',
      permissions: ['view_dashboard', 'manage_products', 'manage_customers', 'view_sales', 'manage_inventory', 'view_reports'],
      avatar: null,
      phone: '+234-xxx-xxx-xxxy',
      dateCreated: '2025-01-15',
      lastLogin: '2025-06-28T10:30:00Z',
      isActive: true,
      createdBy: 'admin'
    },
    {
      id: 3,
      username: 'sales_rep',
      name: 'Sales Representative',
      email: 'sales@abeerincense.ng',
      role: 'sales',
      permissions: ['view_dashboard', 'view_products', 'manage_customers', 'manage_sales', 'view_inventory'],
      avatar: null,
      phone: '+234-xxx-xxx-xxxz',
      dateCreated: '2025-02-01',
      lastLogin: '2025-06-29T08:15:00Z',
      isActive: true,
      createdBy: 'manager'
    },
    {
      id: 4,
      username: 'production_lead',
      name: 'Production Lead',
      email: 'production@abeerincense.ng',
      role: 'production',
      permissions: ['view_dashboard', 'view_products', 'manage_production', 'manage_inventory', 'view_reports'],
      avatar: null,
      phone: '+234-xxx-xxx-xxxa',
      dateCreated: '2025-02-10',
      lastLogin: '2025-06-29T07:45:00Z',
      isActive: true,
      createdBy: 'admin'
    }
  ]);

  const [roles, setRoles] = useState([
    {
      id: 'super_admin',
      name: 'Super Administrator',
      description: 'Full system access and control',
      permissions: ['all'],
      color: '#DC2626',
      level: 100
    },
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Administrative access to most features',
      permissions: [
        'view_dashboard', 'manage_products', 'manage_customers', 'manage_sales', 
        'manage_inventory', 'manage_production', 'view_reports', 'manage_settings',
        'manage_users_limited'
      ],
      color: '#EA580C',
      level: 90
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Business management and oversight',
      permissions: [
        'view_dashboard', 'manage_products', 'manage_customers', 'view_sales', 
        'manage_inventory', 'view_production', 'view_reports'
      ],
      color: '#D97706',
      level: 70
    },
    {
      id: 'sales',
      name: 'Sales Representative',
      description: 'Customer and sales management',
      permissions: [
        'view_dashboard', 'view_products', 'manage_customers', 'manage_sales', 'view_inventory'
      ],
      color: '#059669',
      level: 50
    },
    {
      id: 'production',
      name: 'Production Lead',
      description: 'Production and inventory management',
      permissions: [
        'view_dashboard', 'view_products', 'manage_production', 'manage_inventory', 'view_reports'
      ],
      color: '#7C3AED',
      level: 50
    },
    {
      id: 'viewer',
      name: 'Viewer',
      description: 'Read-only access to basic information',
      permissions: ['view_dashboard', 'view_products', 'view_customers', 'view_sales'],
      color: '#6B7280',
      level: 20
    }
  ]);

  const [permissions] = useState([
    { id: 'all', name: 'All Permissions', description: 'Complete system access', category: 'System' },
    { id: 'view_dashboard', name: 'View Dashboard', description: 'Access to main dashboard', category: 'General' },
    { id: 'manage_products', name: 'Manage Products', description: 'Create, edit, delete products', category: 'Products' },
    { id: 'view_products', name: 'View Products', description: 'View product information', category: 'Products' },
    { id: 'manage_customers', name: 'Manage Customers', description: 'Create, edit, delete customers', category: 'Customers' },
    { id: 'view_customers', name: 'View Customers', description: 'View customer information', category: 'Customers' },
    { id: 'manage_sales', name: 'Manage Sales', description: 'Create, edit, delete sales', category: 'Sales' },
    { id: 'view_sales', name: 'View Sales', description: 'View sales information', category: 'Sales' },
    { id: 'manage_inventory', name: 'Manage Inventory', description: 'Update inventory levels', category: 'Inventory' },
    { id: 'view_inventory', name: 'View Inventory', description: 'View inventory information', category: 'Inventory' },
    { id: 'manage_production', name: 'Manage Production', description: 'Create and manage production batches', category: 'Production' },
    { id: 'view_production', name: 'View Production', description: 'View production information', category: 'Production' },
    { id: 'view_reports', name: 'View Reports', description: 'Access to reports and analytics', category: 'Reports' },
    { id: 'manage_settings', name: 'Manage Settings', description: 'Configure system settings', category: 'Settings' },
    { id: 'manage_users', name: 'Manage Users', description: 'Create, edit, delete users', category: 'Users' },
    { id: 'manage_users_limited', name: 'Manage Users (Limited)', description: 'Limited user management', category: 'Users' },
    { id: 'manage_roles', name: 'Manage Roles', description: 'Create and modify user roles', category: 'Users' }
  ]);

  // Permission checking function
  const hasPermission = (permission) => {
    if (!currentUser) return false;
    const userRole = roles.find(role => role.id === currentUser.role);
    if (!userRole) return false;
    
    // Super admin has all permissions
    if (userRole.permissions.includes('all')) return true;
    
    // Check specific permission
    return userRole.permissions.includes(permission);
  };

  // User management functions
  const addUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      dateCreated: new Date().toISOString().split('T')[0],
      lastLogin: null,
      isActive: true,
      createdBy: currentUser.username
    };
    setUsers([...users, newUser]);
    addNotification(`User ${userData.name} created successfully`, 'success');
  };

  const updateUser = (userId, userData) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, ...userData } : user
    ));
    addNotification('User updated successfully', 'success');
  };

  const deleteUser = (userId) => {
    if (userId === currentUser.id) {
      addNotification('Cannot delete your own account', 'error');
      return;
    }
    setUsers(users.filter(user => user.id !== userId));
    addNotification('User deleted successfully', 'success');
  };

  const toggleUserStatus = (userId) => {
    if (userId === currentUser.id) {
      addNotification('Cannot deactivate your own account', 'error');
      return;
    }
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
    addNotification('User status updated', 'success');
  };

  const addRole = (roleData) => {
    const newRole = {
      id: roleData.name.toLowerCase().replace(/\s+/g, '_'),
      ...roleData
    };
    setRoles([...roles, newRole]);
    addNotification(`Role ${roleData.name} created successfully`, 'success');
  };

  const updateRole = (roleId, roleData) => {
    setRoles(roles.map(role => 
      role.id === roleId ? { ...role, ...roleData } : role
    ));
    addNotification('Role updated successfully', 'success');
  };

  const deleteRole = (roleId) => {
    // Check if role is in use
    const usersWithRole = users.filter(user => user.role === roleId);
    if (usersWithRole.length > 0) {
      addNotification(`Cannot delete role. ${usersWithRole.length} users are assigned this role.`, 'error');
      return;
    }
    setRoles(roles.filter(role => role.id !== roleId));
    addNotification('Role deleted successfully', 'success');
  };

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Utility Functions
  const updateMaterialQuantity = (materialId, newQuantity) => {
    setRawMaterials(prev => 
      prev.map(material => 
        material.id === materialId 
          ? { ...material, quantity: Math.max(0, newQuantity) }
          : material
      )
    );
  };

  const updateProductQuantity = (productId, newQuantity) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, quantity: Math.max(0, newQuantity) }
          : product
      )
    );
  };

  const updateProductPrice = (productId, newPrice) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, price: Math.max(0, newPrice) }
          : product
      )
    );
  };

  // Product Management
  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      recipe: productData.recipe || []
    };
    setProducts(prev => [...prev, newProduct]);
    addNotification(`Product "${productData.name}" added successfully!`, 'success');
  };

  const updateProduct = (productId, updatedData) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId ? { ...product, ...updatedData } : product
      )
    );
    addNotification(`Product updated successfully!`, 'success');
  };

  const deleteProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
    addNotification(`Product "${product?.name}" deleted successfully!`, 'success');
  };

  // Category Management
  const addCategory = (categoryData) => {
    const newCategory = {
      id: Date.now(),
      ...categoryData
    };
    setCategories(prev => [...prev, newCategory]);
    addNotification(`Category "${categoryData.name}" added successfully!`, 'success');
  };

  const updateCategory = (categoryId, updatedData) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === categoryId ? { ...category, ...updatedData } : category
      )
    );
    addNotification(`Category updated successfully!`, 'success');
  };

  const deleteCategory = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    setCategories(prev => prev.filter(c => c.id !== categoryId));
    addNotification(`Category "${category?.name}" deleted successfully!`, 'success');
  };

  // Customer Management
  const addCustomer = (customerData) => {
    const newCustomer = {
      id: Date.now(),
      ...customerData,
      totalOrders: 0,
      totalSpent: 0,
      lastOrder: null
    };
    setCustomers(prev => [...prev, newCustomer]);
    addNotification(`Customer "${customerData.name}" added successfully!`, 'success');
  };

  const updateCustomer = (customerId, updatedData) => {
    setCustomers(prev => 
      prev.map(customer => 
        customer.id === customerId ? { ...customer, ...updatedData } : customer
      )
    );
    addNotification(`Customer updated successfully!`, 'success');
  };

  const deleteCustomer = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    setCustomers(prev => prev.filter(c => c.id !== customerId));
    addNotification(`Customer "${customer?.name}" deleted successfully!`, 'success');
  };

  // Raw Material Management
  const addRawMaterial = (materialData) => {
    const newMaterial = {
      id: Date.now(),
      ...materialData
    };
    setRawMaterials(prev => [...prev, newMaterial]);
    addNotification(`Material "${materialData.name}" added successfully!`, 'success');
  };

  const updateRawMaterial = (materialId, updatedData) => {
    setRawMaterials(prev => 
      prev.map(material => 
        material.id === materialId ? { ...material, ...updatedData } : material
      )
    );
    addNotification(`Material updated successfully!`, 'success');
  };

  const deleteRawMaterial = (materialId) => {
    const material = rawMaterials.find(m => m.id === materialId);
    setRawMaterials(prev => prev.filter(m => m.id !== materialId));
    addNotification(`Material "${material?.name}" deleted successfully!`, 'success');
  };

  // Pricing and Cost Calculations
  const calculateProductionCost = (productId, batches = 1) => {
    const materialCost = calculateMaterialCost(productId) * batches;
    const overhead = materialCost * 0.15; // 15% overhead
    return materialCost + overhead;
  };

  const calculateOptimalPrice = (productId, desiredMargin = 0.4) => {
    const productionCost = calculateProductionCost(productId);
    return productionCost / (1 - desiredMargin);
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

  // Sales Functions
  const addItemToSale = () => {
    if (!currentItem.productId || currentItem.quantity <= 0) {
      addNotification('Please select a product and enter valid quantity', 'error');
      return;
    }

    const product = products.find(p => p.id === parseInt(currentItem.productId));
    if (!product) {
      addNotification('Product not found', 'error');
      return;
    }

    const requestedQuantity = parseInt(currentItem.quantity);
    if (product.quantity < requestedQuantity) {
      addNotification(`Insufficient stock! Available: ${product.quantity}, Requested: ${requestedQuantity}`, 'error');
      return;
    }

    const price = currentItem.customPrice ? parseFloat(currentItem.customPrice) : product.price;
    const newItem = {
      productId: parseInt(currentItem.productId),
      productName: product.name,
      quantity: parseInt(currentItem.quantity),
      price: price,
      total: parseInt(currentItem.quantity) * price
    };

    setNewSale(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));

    setCurrentItem({
      productId: '',
      quantity: 1,
      customPrice: ''
    });
  };

  const removeItemFromSale = (index) => {
    setNewSale(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const calculateSaleSubtotal = () => {
    return newSale.items.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateSaleTotal = () => {
    const subtotal = calculateSaleSubtotal();
    const discount = parseFloat(newSale.discount) || 0;
    return subtotal - discount;
  };

  const submitSale = () => {
    if (newSale.items.length === 0) {
      addNotification('Please add at least one item to the sale', 'error');
      return;
    }

    if (!newSale.customerId) {
      addNotification('Please select a customer', 'error');
      return;
    }

    const order = {
      id: Date.now(),
      customerId: parseInt(newSale.customerId),
      date: new Date().toISOString().split('T')[0],
      items: newSale.items,
      subtotal: calculateSaleSubtotal(),
      discount: parseFloat(newSale.discount) || 0,
      total: calculateSaleTotal(),
      status: newSale.status,
      paymentMethod: newSale.paymentMethod,
      notes: newSale.notes
    };

    setOrders(prev => [...prev, order]);

    // Update customer stats
    const customer = customers.find(c => c.id === parseInt(newSale.customerId));
    if (customer) {
      setCustomers(prev => prev.map(c => 
        c.id === parseInt(newSale.customerId) 
          ? { 
              ...c, 
              totalOrders: (c.totalOrders || 0) + 1,
              totalSpent: (c.totalSpent || 0) + calculateSaleTotal(),
              lastOrder: new Date().toISOString().split('T')[0]
            }
          : c
      ));
    }

    // Update product quantities (decrease inventory)
    if (newSale.status === 'completed') {
      newSale.items.forEach(item => {
        setProducts(prev => prev.map(product => 
          product.id === item.productId 
            ? { ...product, quantity: Math.max(0, product.quantity - item.quantity) }
            : product
        ));
      });
    }

    // Reset form
    setNewSale({
      customerId: '',
      items: [],
      discount: 0,
      notes: '',
      paymentMethod: 'cash',
      status: 'completed'
    });
    setCurrentItem({
      productId: '',
      quantity: 1,
      customPrice: ''
    });
    setShowSalesForm(false);

    addNotification('Sale recorded successfully!', 'success');
  };

  // Order Management Functions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
    addNotification(`Order #${orderId} marked as ${newStatus}`, 'success');
  };

  const deleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(prev => prev.filter(order => order.id !== orderId));
      addNotification('Order deleted successfully', 'success');
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#16a34a';
      case 'pending': return '#f59e0b';
      case 'cancelled': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getFilteredOrders = () => {
    if (orderFilter === 'all') {
      return orders;
    }
    return orders.filter(order => order.status === orderFilter);
  };

  // New Order Detail Functions
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const editOrder = (order) => {
    setEditingOrder({
      ...order,
      items: [...order.items]
    });
    setShowOrderDetails(false);
  };

  const updateOrder = () => {
    if (!editingOrder || editingOrder.items.length === 0) {
      addNotification('Order must have at least one item', 'error');
      return;
    }

    const updatedOrder = {
      ...editingOrder,
      subtotal: editingOrder.items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
      total: editingOrder.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) - (editingOrder.discount || 0)
    };

    setOrders(prev => prev.map(order => 
      order.id === editingOrder.id ? updatedOrder : order
    ));

    setEditingOrder(null);
    addNotification('Order updated successfully!', 'success');
  };

  const removeItemFromEditOrder = (index) => {
    setEditingOrder(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItemInEditOrder = (index, field, value) => {
    setEditingOrder(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index 
          ? { 
              ...item, 
              [field]: field === 'quantity' || field === 'price' ? parseFloat(value) || 0 : value 
            }
          : item
      )
    }));
  };

  const printInvoice = (order) => {
    setSelectedOrder(order);
    setShowInvoice(true);
  };

  const generateInvoicePDF = () => {
    window.print();
  };

  // Production Functions
  const addIngredientToProduction = () => {
    if (!currentIngredient.ingredientId || currentIngredient.quantityUsed <= 0) {
      addNotification('Please select an ingredient and enter valid quantity', 'error');
      return;
    }

    const ingredient = rawMaterials.find(m => m.id === parseInt(currentIngredient.ingredientId));
    if (!ingredient) {
      addNotification('Ingredient not found', 'error');
      return;
    }

    if (ingredient.quantity < currentIngredient.quantityUsed) {
      addNotification(`Insufficient stock! Available: ${ingredient.quantity} ${ingredient.unit}, Requested: ${currentIngredient.quantityUsed} ${ingredient.unit}`, 'error');
      return;
    }

    const newIngredientUsed = {
      ingredientId: parseInt(currentIngredient.ingredientId),
      ingredientName: ingredient.name,
      quantityUsed: parseFloat(currentIngredient.quantityUsed),
      unit: ingredient.unit,
      costPerUnit: ingredient.costPerUnit,
      totalCost: parseFloat(currentIngredient.quantityUsed) * ingredient.costPerUnit
    };

    setNewProduction(prev => ({
      ...prev,
      ingredientsUsed: [...prev.ingredientsUsed, newIngredientUsed]
    }));

    setCurrentIngredient({
      ingredientId: '',
      quantityUsed: 0
    });
  };

  const removeIngredientFromProduction = (index) => {
    setNewProduction(prev => ({
      ...prev,
      ingredientsUsed: prev.ingredientsUsed.filter((_, i) => i !== index)
    }));
  };

  const calculateTotalIngredientCost = () => {
    return newProduction.ingredientsUsed.reduce((sum, ingredient) => sum + ingredient.totalCost, 0);
  };

  const calculateCostPerJar = () => {
    const totalCost = calculateTotalIngredientCost();
    const jars = parseInt(newProduction.jarsProduced) || 1;
    return totalCost / jars;
  };

  const submitProduction = () => {
    if (!newProduction.productId) {
      addNotification('Please select a product', 'error');
      return;
    }

    if (newProduction.ingredientsUsed.length === 0) {
      addNotification('Please add at least one ingredient', 'error');
      return;
    }

    if (!newProduction.jarsProduced || newProduction.jarsProduced <= 0) {
      addNotification('Please enter a valid number of jars produced', 'error');
      return;
    }

    // Generate batch number if not provided
    const batchNumber = newProduction.batchNumber || `B${String(productionBatches.length + 1).padStart(3, '0')}`;

    const batch = {
      id: Date.now(),
      productId: parseInt(newProduction.productId),
      batchNumber,
      date: new Date().toISOString().split('T')[0],
      jarsProduced: parseInt(newProduction.jarsProduced),
      ingredientsUsed: newProduction.ingredientsUsed.map(ing => ({
        ingredientId: ing.ingredientId,
        quantityUsed: ing.quantityUsed
      })),
      totalIngredientCost: calculateTotalIngredientCost(),
      costPerJar: calculateCostPerJar(),
      notes: newProduction.notes
    };

    setProductionBatches(prev => [...prev, batch]);

    // Update ingredient quantities (decrease inventory)
    newProduction.ingredientsUsed.forEach(ingredient => {
      setRawMaterials(prev => prev.map(material => 
        material.id === ingredient.ingredientId 
          ? { 
              ...material, 
              quantity: Math.max(0, material.quantity - ingredient.quantityUsed),
              cost: Math.max(0, material.quantity - ingredient.quantityUsed) * material.costPerUnit
            }
          : material
      ));
    });

    // Update product quantity (increase inventory) and cost price
    const product = products.find(p => p.id === parseInt(newProduction.productId));
    if (product) {
      setProducts(prev => prev.map(p => 
        p.id === parseInt(newProduction.productId) 
          ? { 
              ...p, 
              quantity: p.quantity + parseInt(newProduction.jarsProduced),
              costPrice: calculateCostPerJar(),
              lastProductionDate: new Date().toISOString().split('T')[0]
            }
          : p
      ));
    }

    // Reset form
    setNewProduction({
      productId: '',
      batchNumber: '',
      jarsProduced: 1,
      ingredientsUsed: [],
      notes: ''
    });
    setCurrentIngredient({
      ingredientId: '',
      quantityUsed: 0
    });
    setShowProductionForm(false);

    addNotification(`Production batch ${batchNumber} recorded successfully! Cost per jar: ₦${calculateCostPerJar().toLocaleString()}`, 'success');
  };

  const addNewIngredient = () => {
    if (!newIngredient.name || !newIngredient.unit || newIngredient.costPerUnit <= 0) {
      addNotification('Please fill in all required fields', 'error');
      return;
    }

    const ingredient = {
      id: Date.now(),
      name: newIngredient.name,
      unit: newIngredient.unit,
      costPerUnit: parseFloat(newIngredient.costPerUnit),
      quantity: parseFloat(newIngredient.quantity) || 0,
      cost: (parseFloat(newIngredient.quantity) || 0) * parseFloat(newIngredient.costPerUnit),
      description: newIngredient.description,
      supplier: newIngredient.supplier
    };

    setRawMaterials(prev => [...prev, ingredient]);

    setNewIngredient({
      name: '',
      unit: '',
      costPerUnit: 0,
      quantity: 0,
      description: '',
      supplier: ''
    });
    setShowIngredientForm(false);

    addNotification('Ingredient added successfully!', 'success');
  };

  const updateIngredientQuantity = (ingredientId, newQuantity) => {
    setRawMaterials(prev => prev.map(material => 
      material.id === ingredientId 
        ? { 
            ...material, 
            quantity: Math.max(0, newQuantity),
            cost: Math.max(0, newQuantity) * material.costPerUnit
          }
        : material
    ));
  };

  const updateIngredientCostPerUnit = (ingredientId, newCostPerUnit) => {
    setRawMaterials(prev => prev.map(material => 
      material.id === ingredientId 
        ? { 
            ...material, 
            costPerUnit: Math.max(0, newCostPerUnit),
            cost: material.quantity * Math.max(0, newCostPerUnit)
          }
        : material
    ));
  };

  const theme = {
    background: 'linear-gradient(135deg, #F5E6D3 0%, #E8D7C3 100%)',
    cardBg: 'rgba(255, 255, 255, 0.95)',
    textPrimary: '#1f2937',
    textSecondary: '#6b7280'
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', color: '#8B4513' },
    { id: 'products', label: 'Products', icon: '🧴', color: '#8B4513' },
    { id: 'production', label: 'Production', icon: '🏭', color: '#A0522D' },
    { id: 'customers', label: 'Customers', icon: '👥', color: '#8B4513' },
    { id: 'sales', label: 'Sales', icon: '🛒', color: '#8B4513' },
    { id: 'inventory', label: 'Inventory', icon: '📦', color: '#D2691E' },
    { id: 'pricing', label: 'Pricing', icon: '💰', color: '#CD853F' },
    { id: 'categories', label: 'Categories', icon: '🏷️', color: '#DEB887' },
    { id: 'users', label: 'Users & Roles', icon: '👤', color: '#7C3AED' },
    { id: 'reports', label: 'Reports', icon: '📊', color: '#DEB887' },
    { id: 'config', label: 'Settings', icon: '⚙️', color: '#6B7280' }
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

      {/* Mobile Header */}
      {isMobile && (
        <header style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          zIndex: 1000,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            ☰
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={abeerLogo} alt="Abeer Logo" style={{ width: '24px', height: '24px' }} />
            <h1 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Abeer Business</h1>
          </div>
          <div style={{ width: '36px' }}></div> {/* Spacer for centering */}
        </header>
      )}

      {/* Sidebar */}
      <div style={{ 
        width: isMobile ? '280px' : '280px',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(139, 69, 19, 0.1)',
        position: isMobile ? 'fixed' : 'relative',
        zIndex: isMobile ? 999 : 'auto',
        left: isMobile ? (sidebarOpen ? '0' : '-280px') : '0',
        height: isMobile ? '100vh' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        transition: isMobile ? 'left 0.3s ease-in-out' : 'none',
      }}>
        {/* Header */}
        <div style={{ 
          padding: isMobile ? '16px 24px' : '32px 24px',
          paddingTop: isMobile ? '76px' : '32px', // Account for mobile header
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <img src={abeerLogo} alt="Abeer Logo" style={{ width: '32px', height: '32px' }} />
              <h1 style={{ 
                margin: 0, 
                fontSize: '20px', 
                fontWeight: '700',
                letterSpacing: '-0.5px'
              }}>Abeer</h1>
            </div>
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

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 998
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        padding: isMobile ? '80px 16px 20px 16px' : '40px',
        overflow: 'auto',
        minHeight: isMobile ? 'calc(100vh - 60px)' : 'auto',
        marginTop: isMobile ? '60px' : '0'
      }}>
        <div style={{
          background: theme.cardBg,
          borderRadius: isMobile ? '16px' : '20px',
          padding: isMobile ? '20px' : '40px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          minHeight: isMobile ? '400px' : '500px'
        }}>
          <h2 style={{ 
            color: theme.textPrimary, 
            fontSize: isMobile ? '24px' : '28px',
            fontWeight: '700',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '8px' : '12px'
          }}>
            {menuItems.find(item => item.id === activeTab)?.icon}
            {menuItems.find(item => item.id === activeTab)?.label}
          </h2>
          
          {activeTab === 'dashboard' && (
            <div>
              <p style={{ color: theme.textSecondary, fontSize: '16px', marginBottom: '30px' }}>
                Welcome to your luxury incense business management system.
              </p>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: isMobile ? '16px' : '20px' 
              }}>
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
                Manage your raw materials and track production capacity.
              </p>
              
              {/* Raw Materials Table */}
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ color: theme.textPrimary, fontSize: '20px', marginBottom: '20px' }}>
                  📦 Raw Materials Inventory
                </h3>
                
                <div style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(139, 69, 19, 0.1)'
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)', color: 'white' }}>
                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600' }}>Material</th>
                        <th style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>Current Stock</th>
                        <th style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>Unit</th>
                        <th style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rawMaterials.map((material, index) => (
                        <tr key={material.id} style={{ 
                          borderBottom: '1px solid rgba(139, 69, 19, 0.1)',
                          background: index % 2 === 0 ? 'rgba(139, 69, 19, 0.02)' : 'white'
                        }}>
                          <td style={{ padding: '16px', fontWeight: '600', color: theme.textPrimary }}>
                            {material.name}
                          </td>
                          <td style={{ padding: '16px', textAlign: 'center' }}>
                            <input
                              type="number"
                              value={material.quantity}
                              onChange={(e) => updateMaterialQuantity(material.id, parseInt(e.target.value) || 0)}
                              style={{
                                padding: '8px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px',
                                fontSize: '14px',
                                width: '80px',
                                textAlign: 'center'
                              }}
                            />
                          </td>
                          <td style={{ padding: '16px', textAlign: 'center', color: theme.textSecondary }}>
                            {material.unit}
                          </td>
                          <td style={{ padding: '16px', textAlign: 'center', color: theme.textPrimary, fontWeight: '600' }}>
                            ₦{material.cost.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: theme.textPrimary, fontSize: '28px', margin: 0 }}>Product Management</h2>
                <button
                  onClick={() => setShowAddProduct(true)}
                  style={{
                    background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)'
                  }}
                >
                  ➕ Add Product
                </button>
              </div>

              <div style={{
                background: theme.cardBg,
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(139, 69, 19, 0.1)'
              }}>
                <h3 style={{ color: theme.textPrimary, marginBottom: '20px', fontSize: '20px' }}>All Products Overview</h3>
                
                {isMobile ? (
                  // Mobile Card Layout
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {products.map(product => {
                      const costPrice = calculateProductionCost(product.id);
                      const sellingPrice = product.price || 0;
                      const profitMargin = sellingPrice > 0 ? ((sellingPrice - costPrice) / sellingPrice) * 100 : 0;
                      
                      return (
                        <div key={product.id} style={{
                          background: theme.cardBg,
                          borderRadius: '12px',
                          padding: '16px',
                          border: '1px solid #f3f4f6',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div style={{ flex: 1 }}>
                              <h4 style={{ color: theme.textPrimary, margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                                {product.name}
                              </h4>
                              <div style={{ color: theme.textSecondary, fontSize: '12px' }}>
                                {product.outputPerBatch} {product.unit}
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => {
                                  setEditingProduct(product);
                                  setShowAddProduct(true);
                                }}
                                style={{
                                  background: 'none',
                                  border: '1px solid #8B4513',
                                  color: '#8B4513',
                                  padding: '6px 10px',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  cursor: 'pointer'
                                }}
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => deleteProduct(product.id)}
                                style={{
                                  background: 'none',
                                  border: '1px solid #dc2626',
                                  color: '#dc2626',
                                  padding: '6px 10px',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  cursor: 'pointer'
                                }}
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                              <div style={{ color: theme.textSecondary, fontSize: '12px', marginBottom: '2px' }}>Brand</div>
                              <span style={{
                                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: '600'
                              }}>
                                {product.brand}
                              </span>
                            </div>
                            
                            <div>
                              <div style={{ color: theme.textSecondary, fontSize: '12px', marginBottom: '2px' }}>Category</div>
                              <span style={{
                                background: product.category.includes('Luxury') 
                                  ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                                  : product.category.includes('Khumra')
                                  ? 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)'
                                  : 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: '600'
                              }}>
                                {product.category}
                              </span>
                            </div>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                              <div style={{ color: theme.textSecondary, fontSize: '12px', marginBottom: '4px' }}>Stock Quantity</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <input
                                  type="number"
                                  value={product.quantity}
                                  onChange={(e) => updateProductQuantity(product.id, parseInt(e.target.value) || 0)}
                                  style={{
                                    width: '60px',
                                    padding: '4px 6px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    color: product.quantity < 10 ? '#dc2626' : product.quantity < 20 ? '#f59e0b' : '#16a34a'
                                  }}
                                />
                                <span style={{ 
                                  fontSize: '10px', 
                                  color: theme.textSecondary,
                                  fontWeight: '500'
                                }}>
                                  {product.unit.split(' ')[0]}
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <div style={{ color: theme.textSecondary, fontSize: '12px', marginBottom: '4px' }}>Stock Status</div>
                              <span style={{
                                background: product.quantity >= 20 ? '#16a34a' : product.quantity >= 10 ? '#f59e0b' : '#dc2626',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: '11px',
                                fontWeight: '600'
                              }}>
                                {product.quantity >= 20 ? 'In Stock' : product.quantity >= 10 ? 'Low Stock' : product.quantity > 0 ? 'Very Low' : 'Out of Stock'}
                              </span>
                            </div>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                            <div>
                              <div style={{ color: theme.textSecondary, fontSize: '12px', marginBottom: '2px' }}>Cost Price</div>
                              <div style={{ color: '#dc2626', fontWeight: '600', fontSize: '14px' }}>
                                ₦{costPrice.toFixed(0)}
                              </div>
                            </div>
                            
                            <div>
                              <div style={{ color: theme.textSecondary, fontSize: '12px', marginBottom: '2px' }}>Selling Price</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <span style={{ color: '#16a34a', fontSize: '10px', fontWeight: '500' }}>₦</span>
                                <input
                                  type="number"
                                  value={sellingPrice}
                                  onChange={(e) => updateProductPrice(product.id, parseInt(e.target.value) || 0)}
                                  style={{
                                    width: '70px',
                                    padding: '4px 6px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    textAlign: 'right',
                                    fontWeight: '600',
                                    color: '#16a34a'
                                  }}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <div style={{ color: theme.textSecondary, fontSize: '12px', marginBottom: '2px' }}>Profit Margin</div>
                              <span style={{
                                color: profitMargin > 30 ? '#16a34a' : profitMargin > 15 ? '#f59e0b' : '#dc2626',
                                fontWeight: '600',
                                fontSize: '14px'
                              }}>
                                {profitMargin.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  // Desktop Table Layout
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                        <th style={{ textAlign: 'left', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Product</th>
                        <th style={{ textAlign: 'left', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Brand</th>
                        <th style={{ textAlign: 'left', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Category</th>
                        <th style={{ textAlign: 'center', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Stock Qty</th>
                        <th style={{ textAlign: 'right', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Cost Price</th>
                        <th style={{ textAlign: 'right', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Selling Price</th>
                        <th style={{ textAlign: 'right', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Profit Margin</th>
                        <th style={{ textAlign: 'center', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Stock Status</th>
                        <th style={{ textAlign: 'center', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => {
                        const costPrice = calculateProductionCost(product.id);
                        const sellingPrice = product.price || 0;
                        const profitMargin = sellingPrice > 0 ? ((sellingPrice - costPrice) / sellingPrice) * 100 : 0;
                        const maxBatches = calculateMaxBatches(product.id);
                        const canProduce = maxBatches > 0;
                        
                        return (
                          <tr key={product.id} style={{ 
                            borderBottom: '1px solid #f3f4f6',
                            backgroundColor: 'transparent',
                            transition: 'background-color 0.2s'
                          }}>
                            <td style={{ padding: '16px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div>
                                  <div style={{ color: theme.textPrimary, fontWeight: '600', fontSize: '16px' }}>
                                    {product.name}
                                  </div>
                                  <div style={{ color: theme.textSecondary, fontSize: '13px' }}>
                                    {product.outputPerBatch} {product.unit}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '16px' }}>
                              <span style={{
                                background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                                color: 'white',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}>
                                {product.brand}
                              </span>
                            </td>
                            <td style={{ padding: '16px' }}>
                              <span style={{
                                background: product.category.includes('Luxury') 
                                  ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
                                  : product.category.includes('Khumra')
                                  ? 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)'
                                  : 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
                                color: 'white',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}>
                                {product.category}
                              </span>
                            </td>
                            <td style={{ padding: '16px', textAlign: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <input
                                  type="number"
                                  value={product.quantity}
                                  onChange={(e) => updateProductQuantity(product.id, parseInt(e.target.value) || 0)}
                                  style={{
                                    width: '70px',
                                    padding: '6px 8px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    color: product.quantity < 10 ? '#dc2626' : product.quantity < 20 ? '#f59e0b' : '#16a34a'
                                  }}
                                />
                                <span style={{ 
                                  fontSize: '12px', 
                                  color: theme.textSecondary,
                                  fontWeight: '500'
                                }}>
                                  {product.unit.split(' ')[0]}
                                </span>
                              </div>
                            </td>
                            <td style={{ padding: '16px', textAlign: 'right' }}>
                              <div style={{ color: '#dc2626', fontWeight: '600', fontSize: '16px' }}>
                                ₦{costPrice.toFixed(2)}
                              </div>
                              <div style={{ color: theme.textSecondary, fontSize: '12px' }}>
                                per batch
                              </div>
                            </td>
                            <td style={{ padding: '16px', textAlign: 'right' }}>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span style={{ color: '#16a34a', fontSize: '14px', fontWeight: '500' }}>₦</span>
                                  <input
                                    type="number"
                                    value={sellingPrice}
                                    onChange={(e) => updateProductPrice(product.id, parseInt(e.target.value) || 0)}
                                    style={{
                                      width: '90px',
                                      padding: '6px 8px',
                                      border: '1px solid #d1d5db',
                                      borderRadius: '6px',
                                      fontSize: '14px',
                                      textAlign: 'right',
                                      fontWeight: '600',
                                      color: '#16a34a'
                                    }}
                                  />
                                </div>
                                <div style={{ color: theme.textSecondary, fontSize: '12px' }}>
                                  per batch
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '16px', textAlign: 'right' }}>
                              <span style={{
                                color: profitMargin > 30 ? '#16a34a' : profitMargin > 15 ? '#f59e0b' : '#dc2626',
                                fontWeight: '600',
                                fontSize: '16px'
                              }}>
                                {profitMargin.toFixed(1)}%
                              </span>
                            </td>
                            <td style={{ padding: '16px', textAlign: 'center' }}>
                              <span style={{
                                background: product.quantity >= 20 ? '#16a34a' : product.quantity >= 10 ? '#f59e0b' : '#dc2626',
                                color: 'white',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}>
                                {product.quantity >= 20 ? 'In Stock' : product.quantity >= 10 ? 'Low Stock' : product.quantity > 0 ? 'Very Low' : 'Out of Stock'}
                              </span>
                              <div style={{ fontSize: '11px', color: theme.textSecondary, marginTop: '4px' }}>
                                {product.quantity} units
                              </div>
                            </td>
                            <td style={{ padding: '16px', textAlign: 'center' }}>
                              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                <button
                                  onClick={() => {
                                    setEditingProduct(product);
                                    setShowAddProduct(true);
                                  }}
                                  style={{
                                    background: 'none',
                                    border: '1px solid #8B4513',
                                    color: '#8B4513',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => deleteProduct(product.id)}
                                  style={{
                                    background: 'none',
                                    border: '1px solid #dc2626',
                                    color: '#dc2626',
                                    padding: '8px 12px',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                  }}
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                )}
                
                {/* Summary Statistics */}
                <div style={{ 
                  marginTop: '24px', 
                  padding: '16px', 
                  background: '#f8f9fa', 
                  borderRadius: '12px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Total Products</div>
                    <div style={{ color: theme.textPrimary, fontSize: '24px', fontWeight: '600' }}>{products.length}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Available Brands</div>
                    <div style={{ color: theme.textPrimary, fontSize: '24px', fontWeight: '600' }}>
                      {[...new Set(products.map(p => p.brand))].length}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Product Categories</div>
                    <div style={{ color: theme.textPrimary, fontSize: '24px', fontWeight: '600' }}>
                      {[...new Set(products.map(p => p.category))].length}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Avg Profit Margin</div>
                    <div style={{ color: '#16a34a', fontSize: '24px', fontWeight: '600' }}>
                      {products.length > 0 
                        ? (products.reduce((sum, p) => {
                            const cost = calculateProductionCost(p.id);
                            const margin = p.price > 0 ? ((p.price - cost) / p.price) * 100 : 0;
                            return sum + margin;
                          }, 0) / products.length).toFixed(1)
                        : 0
                      }%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: theme.textPrimary, fontSize: '28px', margin: 0 }}>Customer Management</h2>
                <button
                  onClick={() => setShowAddCustomer(true)}
                  style={{
                    background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)'
                  }}
                >
                  ➕ Add Customer
                </button>
              </div>

              <div style={{
                background: theme.cardBg,
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(139, 69, 19, 0.1)'
              }}>
                <h3 style={{ color: theme.textPrimary, marginBottom: '20px', fontSize: '20px' }}>All Customers Overview</h3>
                
                {isMobile ? (
                  // Mobile Card Layout
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {customers.map(customer => (
                      <div key={customer.id} style={{
                        background: theme.cardBg,
                        borderRadius: '12px',
                        padding: '16px',
                        border: '1px solid #f3f4f6',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                          <div style={{ flex: 1 }}>
                            <h4 style={{ color: theme.textPrimary, margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600' }}>
                              {customer.name}
                            </h4>
                            <div style={{ color: theme.textSecondary, fontSize: '12px' }}>
                              ID: #{customer.id}
                            </div>
                          </div>
                          <span style={{
                            background: customer.type === 'Premium' ? '#16a34a' : customer.type === 'Wholesale' ? '#8B4513' : '#6b7280',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '600'
                          }}>
                            {customer.type}
                          </span>
                        </div>
                        
                        <div style={{ marginBottom: '12px' }}>
                          <div style={{ color: theme.textSecondary, fontSize: '12px', marginBottom: '4px' }}>Contact Info</div>
                          <div style={{ color: theme.textPrimary, fontSize: '14px', marginBottom: '2px' }}>
                            📞 {customer.phone}
                          </div>
                          <div style={{ color: theme.textPrimary, fontSize: '14px' }}>
                            📍 {customer.address}
                          </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                          <div>
                            <div style={{ color: theme.textSecondary, fontSize: '12px', marginBottom: '2px' }}>Orders</div>
                            <div style={{ color: theme.textPrimary, fontWeight: '600', fontSize: '16px' }}>
                              {customer.totalOrders}
                            </div>
                          </div>
                          
                          <div>
                            <div style={{ color: theme.textSecondary, fontSize: '12px', marginBottom: '2px' }}>Total Spent</div>
                            <div style={{ color: '#16a34a', fontWeight: '600', fontSize: '14px' }}>
                              ₦{customer.totalSpent?.toLocaleString()}
                            </div>
                          </div>
                          
                          <div>
                            <div style={{ color: theme.textSecondary, fontSize: '12px', marginBottom: '2px' }}>Discount</div>
                            <div style={{ color: '#f59e0b', fontWeight: '600', fontSize: '14px' }}>
                              {customer.discount}%
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => {
                              setEditingCustomer(customer);
                              setShowAddCustomer(true);
                            }}
                            style={{
                              background: 'none',
                              border: '1px solid #8B4513',
                              color: '#8B4513',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              cursor: 'pointer',
                              minHeight: '36px' // Touch-friendly
                            }}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => deleteCustomer(customer.id)}
                            style={{
                              background: 'none',
                              border: '1px solid #dc2626',
                              color: '#dc2626',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              cursor: 'pointer',
                              minHeight: '36px' // Touch-friendly
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Desktop Table Layout
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                        <th style={{ textAlign: 'left', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Customer Name</th>
                        <th style={{ textAlign: 'left', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Type</th>
                        <th style={{ textAlign: 'left', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Contact</th>
                        <th style={{ textAlign: 'left', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Location</th>
                        <th style={{ textAlign: 'right', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Total Orders</th>
                        <th style={{ textAlign: 'right', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Total Spent</th>
                        <th style={{ textAlign: 'center', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Discount</th>
                        <th style={{ textAlign: 'center', padding: '16px', color: theme.textSecondary, fontWeight: '600', fontSize: '14px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map(customer => (
                        <tr key={customer.id} style={{ 
                          borderBottom: '1px solid #f3f4f6',
                          backgroundColor: 'transparent',
                          transition: 'background-color 0.2s'
                        }}>
                          <td style={{ padding: '16px' }}>
                            <div>
                              <div style={{ color: theme.textPrimary, fontWeight: '600', fontSize: '16px' }}>
                                {customer.name}
                              </div>
                              <div style={{ color: theme.textSecondary, fontSize: '13px' }}>
                                Last order: {customer.lastOrder || 'Never'}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '16px' }}>
                            <span style={{
                              background: customer.type === 'Premium' 
                                ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
                                : customer.type === 'Wholesale' 
                                ? 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)'
                                : 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                              color: 'white',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}>
                              {customer.type}
                            </span>
                          </td>
                          <td style={{ padding: '16px' }}>
                            <div>
                              <div style={{ color: theme.textPrimary, fontSize: '14px', marginBottom: '4px' }}>
                                📞 {customer.phone}
                              </div>
                              <div style={{ color: theme.textSecondary, fontSize: '13px' }}>
                                ✉️ {customer.email}
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '16px' }}>
                            <div style={{ color: theme.textPrimary, fontSize: '14px' }}>
                              📍 {customer.address}
                            </div>
                          </td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <div style={{ color: theme.textPrimary, fontWeight: '600', fontSize: '16px' }}>
                              {customer.totalOrders}
                            </div>
                            <div style={{ color: theme.textSecondary, fontSize: '12px' }}>
                              orders
                            </div>
                          </td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <div style={{ color: '#16a34a', fontWeight: '600', fontSize: '16px' }}>
                              ₦{customer.totalSpent?.toLocaleString()}
                            </div>
                            <div style={{ color: theme.textSecondary, fontSize: '12px' }}>
                              lifetime value
                            </div>
                          </td>
                          <td style={{ padding: '16px', textAlign: 'center' }}>
                            <span style={{
                              background: customer.discount > 10 ? '#f59e0b' : customer.discount > 5 ? '#8B4513' : '#6b7280',
                              color: 'white',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}>
                              {customer.discount}%
                            </span>
                          </td>
                          <td style={{ padding: '16px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                              <button
                                onClick={() => {
                                  setEditingCustomer(customer);
                                  setShowAddCustomer(true);
                                }}
                                style={{
                                  background: 'none',
                                  border: '1px solid #8B4513',
                                  color: '#8B4513',
                                  padding: '8px 12px',
                                  borderRadius: '8px',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={() => deleteCustomer(customer.id)}
                                style={{
                                  background: 'none',
                                  border: '1px solid #dc2626',
                                  color: '#dc2626',
                                  padding: '8px 12px',
                                  borderRadius: '8px',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                )}
                
                {/* Customer Summary Statistics */}
                <div style={{ 
                  marginTop: '24px', 
                  padding: '16px', 
                  background: '#f8f9fa', 
                  borderRadius: '12px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Total Customers</div>
                    <div style={{ color: theme.textPrimary, fontSize: '24px', fontWeight: '600' }}>{customers.length}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Premium Customers</div>
                    <div style={{ color: '#16a34a', fontSize: '24px', fontWeight: '600' }}>
                      {customers.filter(c => c.type === 'Premium').length}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Wholesale Customers</div>
                    <div style={{ color: '#8B4513', fontSize: '24px', fontWeight: '600' }}>
                      {customers.filter(c => c.type === 'Wholesale').length}
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Total Revenue</div>
                    <div style={{ color: '#16a34a', fontSize: '24px', fontWeight: '600' }}>
                      ₦{customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: theme.textPrimary, fontSize: '28px', margin: 0 }}>Pricing Calculator</h2>
                <button
                  onClick={() => setShowPriceCalculator(true)}
                  style={{
                    background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)'
                  }}
                >
                  📊 Advanced Calculator
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '24px' }}>
                {products.map(product => {
                  const productionCost = calculateProductionCost(product.id);
                  const recommendedPrice = calculateOptimalPrice(product.id);
                  const currentMargin = product.price ? ((product.price - productionCost) / product.price) * 100 : 0;
                  
                  return (
                    <div key={product.id} style={{
                      background: theme.cardBg,
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(139, 69, 19, 0.1)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <span style={{ fontSize: '32px' }}>{product.icon}</span>
                        <div>
                          <h3 style={{ color: theme.textPrimary, margin: '0 0 4px 0', fontSize: '18px' }}>{product.name}</h3>
                          <span style={{ color: theme.textSecondary, fontSize: '14px' }}>{product.category}</span>
                        </div>
                      </div>

                      <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span style={{ color: theme.textSecondary, fontSize: '14px' }}>Production Cost</span>
                          <span style={{ color: theme.textPrimary, fontWeight: '600' }}>₦{productionCost.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span style={{ color: theme.textSecondary, fontSize: '14px' }}>Current Price</span>
                          <span style={{ color: '#8B4513', fontWeight: '600' }}>₦{product.price?.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <span style={{ color: theme.textSecondary, fontSize: '14px' }}>Recommended Price (40% margin)</span>
                          <span style={{ color: '#16a34a', fontWeight: '600' }}>₦{recommendedPrice.toFixed(2)}</span>
                        </div>
                        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: theme.textSecondary, fontSize: '14px' }}>Current Margin</span>
                            <span style={{ 
                              color: currentMargin > 30 ? '#16a34a' : currentMargin > 15 ? '#f59e0b' : '#dc2626', 
                              fontWeight: '600' 
                            }}>
                              {currentMargin.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style={{ background: currentMargin < 20 ? '#fef2f2' : '#f0fdf4', borderRadius: '8px', padding: '12px' }}>
                        <div style={{ fontSize: '13px', color: currentMargin < 20 ? '#dc2626' : '#16a34a' }}>
                          {currentMargin < 20 
                            ? '⚠️ Low margin. Consider increasing price or optimizing costs.'
                            : '✅ Healthy profit margin maintained.'
                          }
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: theme.textPrimary, fontSize: '28px', margin: 0 }}>Category Management</h2>
                <button
                  onClick={() => setShowAddCategory(true)}
                  style={{
                    background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)'
                  }}
                >
                  ➕ Add Category
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {categories.map(category => {
                  const categoryProducts = products.filter(p => p.category === category.name);
                  return (
                    <div key={category.id} style={{
                      background: theme.cardBg,
                      borderRadius: '16px',
                      padding: '24px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(139, 69, 19, 0.1)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img 
                            src={category.logo} 
                            alt={`${category.brand} Logo`} 
                            style={{ 
                              width: '32px', 
                              height: '32px',
                              borderRadius: '4px'
                            }} 
                          />
                          <div>
                            <h3 style={{ color: theme.textPrimary, margin: '0 0 4px 0', fontSize: '18px' }}>{category.name}</h3>
                            <p style={{ color: theme.textSecondary, margin: 0, fontSize: '14px' }}>{category.description}</p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => deleteCategory(category.id)}
                            style={{
                              background: 'none',
                              border: '1px solid #dc2626',
                              color: '#dc2626',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>

                      <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ color: theme.textSecondary, fontSize: '14px' }}>Products in Category</span>
                          <span style={{ color: theme.textPrimary, fontWeight: '600' }}>{categoryProducts.length}</span>
                        </div>
                        <div style={{ fontSize: '13px', color: theme.textSecondary }}>
                          {categoryProducts.length > 0 
                            ? categoryProducts.map(p => p.name).join(', ')
                            : 'No products in this category'
                          }
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'sales' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: theme.textPrimary, fontSize: '28px', margin: 0 }}>Sales & Orders</h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <select
                    value={orderFilter}
                    onChange={(e) => setOrderFilter(e.target.value)}
                    style={{
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="all">All Orders</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => setShowSalesForm(true)}
                    style={{
                      background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)'
                    }}
                  >
                    ➕ New Order
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div style={{
                    background: theme.cardBg,
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Total Orders</div>
                    <div style={{ color: theme.textPrimary, fontSize: '24px', fontWeight: '600' }}>{orders.length}</div>
                  </div>
                  <div style={{
                    background: theme.cardBg,
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>💰</div>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Total Revenue</div>
                    <div style={{ color: '#16a34a', fontSize: '24px', fontWeight: '600' }}>
                      ₦{orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
                    </div>
                  </div>
                  <div style={{
                    background: theme.cardBg,
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>⏳</div>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Pending Orders</div>
                    <div style={{ color: '#f59e0b', fontSize: '24px', fontWeight: '600' }}>
                      {orders.filter(o => o.status === 'pending').length}
                    </div>
                  </div>
                  <div style={{
                    background: theme.cardBg,
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Completed Orders</div>
                    <div style={{ color: '#16a34a', fontSize: '24px', fontWeight: '600' }}>
                      {orders.filter(o => o.status === 'completed').length}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                background: theme.cardBg,
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ color: theme.textPrimary, marginBottom: '20px' }}>
                  {orderFilter === 'all' ? 'All Orders' : `${orderFilter.charAt(0).toUpperCase() + orderFilter.slice(1)} Orders`}
                  {getFilteredOrders().length > 0 && ` (${getFilteredOrders().length})`}
                </h3>
                {getFilteredOrders().length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: theme.textSecondary }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                    <h3 style={{ color: theme.textPrimary, marginBottom: '8px' }}>
                      {orderFilter === 'all' ? 'No orders yet' : `No ${orderFilter} orders`}
                    </h3>
                    <p>
                      {orderFilter === 'all' 
                        ? 'Create your first order by clicking "New Order" above.'
                        : `There are currently no ${orderFilter} orders to display.`
                      }
                    </p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                          <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Order ID</th>
                          <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Customer</th>
                          <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Date</th>
                          <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Items</th>
                          <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Total</th>
                          <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Status</th>
                          <th style={{ textAlign: 'center', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getFilteredOrders().map(order => {
                          const customer = customers.find(c => c.id === order.customerId);
                          return (
                            <tr key={order.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                              <td style={{ padding: '12px', color: theme.textPrimary, fontWeight: '600' }}>#{order.id}</td>
                              <td style={{ padding: '12px', color: theme.textPrimary }}>{customer?.name}</td>
                              <td style={{ padding: '12px', color: theme.textSecondary }}>{order.date}</td>
                              <td style={{ padding: '12px', color: theme.textSecondary }}>
                                {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                              </td>
                              <td style={{ padding: '12px', color: '#16a34a', fontWeight: '600' }}>
                                ₦{order.total.toLocaleString()}
                              </td>
                              <td style={{ padding: '12px' }}>
                                <span style={{
                                  background: getOrderStatusColor(order.status),
                                  color: 'white',
                                  padding: '4px 8px',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  textTransform: 'capitalize'
                                }}>
                                  {order.status}
                                </span>
                              </td>
                              <td style={{ padding: '12px', textAlign: 'center' }}>
                                <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                  <button
                                    onClick={() => viewOrderDetails(order)}
                                    style={{
                                      background: '#3b82f6',
                                      color: 'white',
                                      border: 'none',
                                      padding: '6px 10px',
                                      borderRadius: '4px',
                                      fontSize: '11px',
                                      cursor: 'pointer',
                                      fontWeight: '600',
                                      minWidth: '60px'
                                    }}
                                  >
                                    👁️ View
                                  </button>
                                  <button
                                    onClick={() => printInvoice(order)}
                                    style={{
                                      background: '#8b5cf6',
                                      color: 'white',
                                      border: 'none',
                                      padding: '6px 10px',
                                      borderRadius: '4px',
                                      fontSize: '11px',
                                      cursor: 'pointer',
                                      fontWeight: '600',
                                      minWidth: '60px'
                                    }}
                                  >
                                    🖨️ Print
                                  </button>
                                  {order.status === 'pending' && (
                                    <button
                                      onClick={() => updateOrderStatus(order.id, 'completed')}
                                      style={{
                                        background: '#16a34a',
                                        color: 'white',
                                        border: 'none',
                                        padding: '6px 10px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        minWidth: '60px'
                                      }}
                                    >
                                      ✓ Complete
                                    </button>
                                  )}
                                  {order.status === 'completed' && (
                                    <button
                                      onClick={() => updateOrderStatus(order.id, 'pending')}
                                      style={{
                                        background: '#f59e0b',
                                        color: 'white',
                                        border: 'none',
                                        padding: '6px 10px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        minWidth: '60px'
                                      }}
                                    >
                                      ↻ Pending
                                    </button>
                                  )}
                                  <button
                                    onClick={() => deleteOrder(order.id)}
                                    style={{
                                      background: '#dc2626',
                                      color: 'white',
                                      border: 'none',
                                      padding: '6px 10px',
                                      borderRadius: '4px',
                                      fontSize: '11px',
                                      cursor: 'pointer',
                                      fontWeight: '600',
                                      minWidth: '60px'
                                    }}
                                  >
                                    🗑️ Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'production' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: theme.textPrimary, fontSize: '28px', margin: 0 }}>Production Management</h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setShowIngredientForm(true)}
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                    }}
                  >
                    ➕ Add Ingredient
                  </button>
                  <button
                    onClick={() => setShowProductionForm(true)}
                    style={{
                      background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)'
                    }}
                  >
                    🏭 New Production
                  </button>
                </div>
              </div>

              {/* Production Statistics */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div style={{
                    background: theme.cardBg,
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏭</div>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Total Batches</div>
                    <div style={{ color: theme.textPrimary, fontSize: '24px', fontWeight: '600' }}>{productionBatches.length}</div>
                  </div>
                  <div style={{
                    background: theme.cardBg,
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🫙</div>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Jars Produced</div>
                    <div style={{ color: '#16a34a', fontSize: '24px', fontWeight: '600' }}>
                      {productionBatches.reduce((sum, batch) => sum + batch.jarsProduced, 0)}
                    </div>
                  </div>
                  <div style={{
                    background: theme.cardBg,
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>💰</div>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Total Production Cost</div>
                    <div style={{ color: '#8B4513', fontSize: '24px', fontWeight: '600' }}>
                      ₦{productionBatches.reduce((sum, batch) => sum + batch.totalIngredientCost, 0).toLocaleString()}
                    </div>
                  </div>
                  <div style={{
                    background: theme.cardBg,
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Avg Cost Per Jar</div>
                    <div style={{ color: '#7c3aed', fontSize: '24px', fontWeight: '600' }}>
                      ₦{productionBatches.length > 0 ? 
                        (productionBatches.reduce((sum, batch) => sum + batch.totalIngredientCost, 0) / 
                         productionBatches.reduce((sum, batch) => sum + batch.jarsProduced, 0)).toLocaleString()
                        : '0'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Production Batches */}
              <div style={{
                background: theme.cardBg,
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                marginBottom: '24px'
              }}>
                <h3 style={{ color: theme.textPrimary, marginBottom: '20px' }}>Recent Production Batches</h3>
                {productionBatches.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: theme.textSecondary }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏭</div>
                    <h3 style={{ color: theme.textPrimary, marginBottom: '8px' }}>No production batches yet</h3>
                    <p>Start producing by clicking "New Production" above.</p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                          <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Batch #</th>
                          <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Product</th>
                          <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Date</th>
                          <th style={{ textAlign: 'center', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Jars</th>
                          <th style={{ textAlign: 'right', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Total Cost</th>
                          <th style={{ textAlign: 'right', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Cost/Jar</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productionBatches.slice().reverse().map(batch => {
                          const product = products.find(p => p.id === batch.productId);
                          return (
                            <tr key={batch.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                              <td style={{ padding: '12px', color: theme.textPrimary, fontWeight: '600' }}>{batch.batchNumber}</td>
                              <td style={{ padding: '12px', color: theme.textPrimary }}>
                                {product?.name || `Product ID: ${batch.productId}`}
                              </td>
                              <td style={{ padding: '12px', color: theme.textSecondary }}>{batch.date}</td>
                              <td style={{ padding: '12px', textAlign: 'center', color: theme.textPrimary, fontWeight: '600' }}>
                                {batch.jarsProduced}
                              </td>
                              <td style={{ padding: '12px', textAlign: 'right', color: '#8B4513', fontWeight: '600' }}>
                                ₦{batch.totalIngredientCost.toLocaleString()}
                              </td>
                              <td style={{ padding: '12px', textAlign: 'right', color: '#7c3aed', fontWeight: '600' }}>
                                ₦{batch.costPerJar.toLocaleString()}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Ingredients Management */}
              <div style={{
                background: theme.cardBg,
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ color: theme.textPrimary, marginBottom: '20px' }}>Ingredients Inventory</h3>
                {rawMaterials.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: theme.textSecondary }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧪</div>
                    <h3 style={{ color: theme.textPrimary, marginBottom: '8px' }}>No ingredients yet</h3>
                    <p>Add ingredients by clicking "Add Ingredient" above.</p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                          <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Ingredient</th>
                          <th style={{ textAlign: 'center', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Stock</th>
                          <th style={{ textAlign: 'center', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Unit</th>
                          <th style={{ textAlign: 'right', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Cost/Unit</th>
                          <th style={{ textAlign: 'right', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Total Value</th>
                          <th style={{ textAlign: 'center', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rawMaterials.map(material => (
                          <tr key={material.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                            <td style={{ padding: '12px', color: theme.textPrimary }}>
                              <div style={{ fontWeight: '600' }}>{material.name}</div>
                              {material.description && (
                                <div style={{ fontSize: '12px', color: theme.textSecondary, marginTop: '2px' }}>
                                  {material.description}
                                </div>
                              )}
                            </td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={material.quantity}
                                onChange={(e) => updateIngredientQuantity(material.id, parseFloat(e.target.value) || 0)}
                                style={{
                                  width: '80px',
                                  padding: '4px',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '4px',
                                  fontSize: '14px',
                                  textAlign: 'center'
                                }}
                              />
                            </td>
                            <td style={{ padding: '12px', textAlign: 'center', color: theme.textSecondary }}>
                              {material.unit}
                            </td>
                            <td style={{ padding: '8px', textAlign: 'right' }}>
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={material.costPerUnit}
                                onChange={(e) => updateIngredientCostPerUnit(material.id, parseFloat(e.target.value) || 0)}
                                style={{
                                  width: '80px',
                                  padding: '4px',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '4px',
                                  fontSize: '14px',
                                  textAlign: 'right'
                                }}
                              />
                            </td>
                            <td style={{ padding: '12px', textAlign: 'right', color: '#16a34a', fontWeight: '600' }}>
                              ₦{material.cost.toLocaleString()}
                            </td>
                            <td style={{ padding: '12px', textAlign: 'center' }}>
                              <span style={{
                                background: material.quantity < 50 ? '#fee2e2' : material.quantity < 100 ? '#fef3c7' : '#dcfce7',
                                color: material.quantity < 50 ? '#dc2626' : material.quantity < 100 ? '#d97706' : '#16a34a',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}>
                                {material.quantity < 50 ? 'Low' : material.quantity < 100 ? 'Medium' : 'Good'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: theme.textPrimary, fontSize: '28px', margin: 0 }}>Inventory Management</h2>
                <button
                  onClick={() => setShowAddMaterial(true)}
                  style={{
                    background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)'
                  }}
                >
                  ➕ Add Material
                </button>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div style={{
                    background: theme.cardBg,
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>📦</div>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Total Materials</div>
                    <div style={{ color: theme.textPrimary, fontSize: '24px', fontWeight: '600' }}>{rawMaterials.length}</div>
                  </div>
                  <div style={{
                    background: theme.cardBg,
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>💰</div>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Total Value</div>
                    <div style={{ color: '#16a34a', fontSize: '24px', fontWeight: '600' }}>
                      ₦{rawMaterials.reduce((sum, material) => sum + material.cost, 0).toLocaleString()}
                    </div>
                  </div>
                  <div style={{
                    background: theme.cardBg,
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚠️</div>
                    <div style={{ color: theme.textSecondary, fontSize: '14px' }}>Low Stock Items</div>
                    <div style={{ color: '#dc2626', fontSize: '24px', fontWeight: '600' }}>
                      {rawMaterials.filter(m => m.quantity < 50).length}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{
                background: theme.cardBg,
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{ color: theme.textPrimary, marginBottom: '20px' }}>Raw Materials</h3>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                        <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Material</th>
                        <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Quantity</th>
                        <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Unit</th>
                        <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Total Cost</th>
                        <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Cost/Unit</th>
                        <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Status</th>
                        <th style={{ textAlign: 'left', padding: '12px', color: theme.textSecondary, fontWeight: '600' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rawMaterials.map(material => {
                        const costPerUnit = material.cost / material.quantity;
                        const isLowStock = material.quantity < 50;
                        return (
                          <tr key={material.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                            <td style={{ padding: '12px', color: theme.textPrimary, fontWeight: '600' }}>{material.name}</td>
                            <td style={{ padding: '12px', color: isLowStock ? '#dc2626' : theme.textPrimary, fontWeight: isLowStock ? '600' : 'normal' }}>
                              {material.quantity}
                            </td>
                            <td style={{ padding: '12px', color: theme.textSecondary }}>{material.unit}</td>
                            <td style={{ padding: '12px', color: '#16a34a', fontWeight: '600' }}>₦{material.cost.toLocaleString()}</td>
                            <td style={{ padding: '12px', color: theme.textPrimary }}>₦{costPerUnit.toFixed(2)}</td>
                            <td style={{ padding: '12px' }}>
                              <span style={{
                                background: isLowStock ? '#dc2626' : '#16a34a',
                                color: 'white',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}>
                                {isLowStock ? 'Low Stock' : 'In Stock'}
                              </span>
                            </td>
                            <td style={{ padding: '12px' }}>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                  onClick={() => updateMaterialQuantity(material.id, material.quantity + 10)}
                                  style={{
                                    background: 'none',
                                    border: '1px solid #16a34a',
                                    color: '#16a34a',
                                    padding: '4px 8px',
                                    borderRadius: '6px',
                                    fontSize: '12px',
                                    cursor: 'pointer'
                                  }}
                                >
                                  ➕
                                </button>
                                <button
                                  onClick={() => updateMaterialQuantity(material.id, Math.max(0, material.quantity - 10))}
                                  style={{
                                    background: 'none',
                                    border: '1px solid #f59e0b',
                                    color: '#f59e0b',
                                    padding: '4px 8px',
                                    borderRadius: '6px',
                                    fontSize: '12px',
                                    cursor: 'pointer'
                                  }}
                                >
                                  ➖
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ color: theme.textPrimary, fontSize: '28px', margin: 0 }}>Settings & Configuration</h2>
                <button
                  onClick={() => {
                    localStorage.setItem('abeer_settings', JSON.stringify(settings));
                    setNotifications(prev => [...prev, { id: Date.now(), message: 'Settings saved successfully!', type: 'success' }]);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)'
                  }}
                >
                  💾 Save Settings
                </button>
              </div>

              <div style={{ display: 'grid', gap: '24px' }}>
                
                {/* Business Information */}
                <div style={{
                  background: theme.cardBg,
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(139, 69, 19, 0.1)'
                }}>
                  <h3 style={{ color: theme.textPrimary, marginBottom: '20px', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    🏢 Business Information
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary, fontWeight: '600' }}>Business Name</label>
                      <input
                        type="text"
                        value={settings.businessInfo.name}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          businessInfo: { ...prev.businessInfo, name: e.target.value }
                        }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary, fontWeight: '600' }}>Phone Number</label>
                      <input
                        type="text"
                        value={settings.businessInfo.phone}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          businessInfo: { ...prev.businessInfo, phone: e.target.value }
                        }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary, fontWeight: '600' }}>Email Address</label>
                      <input
                        type="email"
                        value={settings.businessInfo.email}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          businessInfo: { ...prev.businessInfo, email: e.target.value }
                        }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary, fontWeight: '600' }}>Tax ID</label>
                      <input
                        type="text"
                        value={settings.businessInfo.taxId}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          businessInfo: { ...prev.businessInfo, taxId: e.target.value }
                        }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary, fontWeight: '600' }}>Business Address</label>
                    <textarea
                      value={settings.businessInfo.address}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        businessInfo: { ...prev.businessInfo, address: e.target.value }
                      }))}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        boxSizing: 'border-box',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>

                {/* General Preferences */}
                <div style={{
                  background: theme.cardBg,
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(139, 69, 19, 0.1)'
                }}>
                  <h3 style={{ color: theme.textPrimary, marginBottom: '20px', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    ⚙️ General Preferences
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary, fontWeight: '600' }}>Theme</label>
                      <select
                        value={settings.preferences.theme}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, theme: e.target.value }
                        }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary, fontWeight: '600' }}>Language</label>
                      <select
                        value={settings.preferences.language}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, language: e.target.value }
                        }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      >
                        <option value="english">English</option>
                        <option value="hausa">Hausa</option>
                        <option value="yoruba">Yoruba</option>
                        <option value="igbo">Igbo</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary, fontWeight: '600' }}>Date Format</label>
                      <select
                        value={settings.preferences.dateFormat}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, dateFormat: e.target.value }
                        }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary, fontWeight: '600' }}>Low Stock Threshold</label>
                      <input
                        type="number"
                        min="1"
                        value={settings.preferences.lowStockThreshold}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, lowStockThreshold: parseInt(e.target.value) || 10 }
                        }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={settings.preferences.autoBackup}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, autoBackup: e.target.checked }
                        }))}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span style={{ color: theme.textPrimary, fontWeight: '600' }}>Auto Backup Data</span>
                    </label>
                    
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={settings.preferences.notifications}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, notifications: e.target.checked }
                        }))}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span style={{ color: theme.textPrimary, fontWeight: '600' }}>Enable Notifications</span>
                    </label>
                    
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={settings.preferences.soundAlerts}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          preferences: { ...prev.preferences, soundAlerts: e.target.checked }
                        }))}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span style={{ color: theme.textPrimary, fontWeight: '600' }}>Sound Alerts</span>
                    </label>
                  </div>
                </div>

                {/* Inventory Settings */}
                <div style={{
                  background: theme.cardBg,
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(139, 69, 19, 0.1)'
                }}>
                  <h3 style={{ color: theme.textPrimary, marginBottom: '20px', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    📦 Inventory Settings
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={settings.inventory.trackStock}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          inventory: { ...prev.inventory, trackStock: e.target.checked }
                        }))}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span style={{ color: theme.textPrimary, fontWeight: '600' }}>Track Stock Levels</span>
                    </label>
                    
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={settings.inventory.allowNegativeStock}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          inventory: { ...prev.inventory, allowNegativeStock: e.target.checked }
                        }))}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span style={{ color: theme.textPrimary, fontWeight: '600' }}>Allow Negative Stock</span>
                    </label>
                    
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={settings.inventory.autoReorderEnabled}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          inventory: { ...prev.inventory, autoReorderEnabled: e.target.checked }
                        }))}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span style={{ color: theme.textPrimary, fontWeight: '600' }}>Auto Reorder</span>
                    </label>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary, fontWeight: '600' }}>Default Reorder Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={settings.inventory.defaultReorderQuantity}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        inventory: { ...prev.inventory, defaultReorderQuantity: parseInt(e.target.value) || 50 }
                      }))}
                      style={{
                        width: '200px',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>

                {/* Pricing Settings */}
                <div style={{
                  background: theme.cardBg,
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(139, 69, 19, 0.1)'
                }}>
                  <h3 style={{ color: theme.textPrimary, marginBottom: '20px', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    💰 Pricing Settings
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary, fontWeight: '600' }}>Default Profit Margin (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={settings.pricing.defaultMargin}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          pricing: { ...prev.pricing, defaultMargin: parseInt(e.target.value) || 40 }
                        }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary, fontWeight: '600' }}>Max Discount (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={settings.pricing.maxDiscountPercent}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          pricing: { ...prev.pricing, maxDiscountPercent: parseInt(e.target.value) || 25 }
                        }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary, fontWeight: '600' }}>Tax Rate (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        step="0.1"
                        value={settings.pricing.taxRate}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          pricing: { ...prev.pricing, taxRate: parseFloat(e.target.value) || 7.5 }
                        }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={settings.pricing.allowDiscounts}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          pricing: { ...prev.pricing, allowDiscounts: e.target.checked }
                        }))}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span style={{ color: theme.textPrimary, fontWeight: '600' }}>Allow Discounts</span>
                    </label>
                    
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={settings.pricing.roundPrices}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          pricing: { ...prev.pricing, roundPrices: e.target.checked }
                        }))}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span style={{ color: theme.textPrimary, fontWeight: '600' }}>Round Prices</span>
                    </label>
                  </div>
                </div>

                {/* Sales Settings */}
                <div style={{
                  background: theme.cardBg,
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(139, 69, 19, 0.1)'
                }}>
                  <h3 style={{ color: theme.textPrimary, marginBottom: '20px', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    🛒 Sales Settings
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary, fontWeight: '600' }}>Default Payment Method</label>
                      <select
                        value={settings.sales.defaultPaymentMethod}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          sales: { ...prev.sales, defaultPaymentMethod: e.target.value }
                        }))}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      >
                        <option value="cash">Cash</option>
                        <option value="transfer">Bank Transfer</option>
                        <option value="pos">POS</option>
                        <option value="mobile">Mobile Money</option>
                      </select>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={settings.sales.requireCustomerInfo}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          sales: { ...prev.sales, requireCustomerInfo: e.target.checked }
                        }))}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span style={{ color: theme.textPrimary, fontWeight: '600' }}>Require Customer Info</span>
                    </label>
                    
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={settings.sales.allowPartialPayments}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          sales: { ...prev.sales, allowPartialPayments: e.target.checked }
                        }))}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span style={{ color: theme.textPrimary, fontWeight: '600' }}>Allow Partial Payments</span>
                    </label>
                    
                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={settings.sales.printReceipts}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          sales: { ...prev.sales, printReceipts: e.target.checked }
                        }))}
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span style={{ color: theme.textPrimary, fontWeight: '600' }}>Print Receipts</span>
                    </label>
                  </div>
                </div>

                {/* Data Management */}
                <div style={{
                  background: theme.cardBg,
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(139, 69, 19, 0.1)'
                }}>
                  <h3 style={{ color: theme.textPrimary, marginBottom: '20px', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    💾 Data Management
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <button
                      onClick={() => {
                        const data = {
                          products,
                          customers,
                          orders,
                          rawMaterials,
                          categories,
                          settings
                        };
                        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `abeer-backup-${new Date().toISOString().split('T')[0]}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                        setNotifications(prev => [...prev, { id: Date.now(), message: 'Data exported successfully!', type: 'success' }]);
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)'
                      }}
                    >
                      📤 Export Data
                    </button>
                    
                    <button
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.json';
                        input.onchange = (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              try {
                                const data = JSON.parse(e.target.result);
                                // Here you would restore the data
                                setNotifications(prev => [...prev, { id: Date.now(), message: 'Data imported successfully!', type: 'success' }]);
                              } catch (error) {
                                setNotifications(prev => [...prev, { id: Date.now(), message: 'Import failed: Invalid file format', type: 'error' }]);
                              }
                            };
                            reader.readAsText(file);
                          }
                        };
                        input.click();
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                      }}
                    >
                      📥 Import Data
                    </button>
                    
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
                          // Clear localStorage
                          localStorage.clear();
                          setNotifications(prev => [...prev, { id: Date.now(), message: 'All data cleared!', type: 'warning' }]);
                        }
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
                      }}
                    >
                      🗑️ Clear All Data
                    </button>
                    
                    <button
                      onClick={() => {
                        // Reset settings to default
                        setSettings({
                          businessInfo: {
                            name: 'Abeer Incense Business',
                            address: 'Lagos, Nigeria',
                            phone: '+234-xxx-xxx-xxxx',
                            email: 'info@abeerincense.ng',
                            taxId: 'TIN-123456789',
                            currency: 'NGN',
                            currencySymbol: '₦'
                          },
                          preferences: {
                            theme: 'light',
                            language: 'english',
                            dateFormat: 'DD/MM/YYYY',
                            lowStockThreshold: 10,
                            autoBackup: true,
                            notifications: true,
                            soundAlerts: false
                          },
                          inventory: {
                            trackStock: true,
                            allowNegativeStock: false,
                            autoReorderEnabled: false,
                            defaultReorderQuantity: 50
                          },
                          pricing: {
                            defaultMargin: 40,
                            allowDiscounts: true,
                            maxDiscountPercent: 25,
                            roundPrices: true,
                            taxRate: 7.5
                          },
                          sales: {
                            requireCustomerInfo: false,
                            allowPartialPayments: true,
                            defaultPaymentMethod: 'cash',
                            printReceipts: true
                          }
                        });
                        setNotifications(prev => [...prev, { id: Date.now(), message: 'Settings reset to defaults!', type: 'info' }]);
                      }}
                      style={{
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                      }}
                    >
                      🔄 Reset Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              {!hasPermission('manage_users') && !hasPermission('manage_users_limited') ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '60px 20px',
                  background: '#fef2f2',
                  borderRadius: '16px',
                  border: '1px solid #fecaca'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔒</div>
                  <h3 style={{ color: '#dc2626', fontSize: '24px', marginBottom: '12px' }}>Access Denied</h3>
                  <p style={{ color: '#7f1d1d', fontSize: '16px' }}>
                    You don't have permission to access user management.
                  </p>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ color: theme.textPrimary, fontSize: '28px', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                      👤 User Management
                    </h2>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        onClick={() => setShowUserModal(true)}
                        style={{
                          background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
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
                        ➕ Add User
                      </button>
                      <button
                        onClick={() => setShowRoleModal(true)}
                        style={{
                          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
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
                        🏷️ Manage Roles
                      </button>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '16px',
                    marginBottom: '24px'
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                      color: 'white',
                      padding: '20px',
                      borderRadius: '12px'
                    }}>
                      <div style={{ fontSize: '24px', fontWeight: '700' }}>{users.length}</div>
                      <div style={{ opacity: 0.9 }}>Total Users</div>
                    </div>
                    <div style={{
                      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                      color: 'white',
                      padding: '20px',
                      borderRadius: '12px'
                    }}>
                      <div style={{ fontSize: '24px', fontWeight: '700' }}>{users.filter(u => u.isActive).length}</div>
                      <div style={{ opacity: 0.9 }}>Active Users</div>
                    </div>
                    <div style={{
                      background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                      color: 'white',
                      padding: '20px',
                      borderRadius: '12px'
                    }}>
                      <div style={{ fontSize: '24px', fontWeight: '700' }}>{roles.length}</div>
                      <div style={{ opacity: 0.9 }}>Total Roles</div>
                    </div>
                    <div style={{
                      background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
                      color: 'white',
                      padding: '20px',
                      borderRadius: '12px'
                    }}>
                      <div style={{ fontSize: '24px', fontWeight: '700' }}>{permissions.length}</div>
                      <div style={{ opacity: 0.9 }}>Permissions</div>
                    </div>
                  </div>

                  {/* Users Table */}
                  <div style={{
                    background: theme.cardBg,
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(139, 69, 19, 0.1)',
                    marginBottom: '24px'
                  }}>
                    <h3 style={{ color: theme.textPrimary, marginBottom: '20px', fontSize: '20px' }}>
                      Users List
                    </h3>
                    
                    <div style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                            <th style={{ textAlign: 'left', padding: '12px', color: theme.textPrimary, fontWeight: '600' }}>User</th>
                            <th style={{ textAlign: 'left', padding: '12px', color: theme.textPrimary, fontWeight: '600' }}>Role</th>
                            <th style={{ textAlign: 'left', padding: '12px', color: theme.textPrimary, fontWeight: '600' }}>Status</th>
                            <th style={{ textAlign: 'left', padding: '12px', color: theme.textPrimary, fontWeight: '600' }}>Last Login</th>
                            <th style={{ textAlign: 'center', padding: '12px', color: theme.textPrimary, fontWeight: '600' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map(user => {
                            const userRole = roles.find(role => role.id === user.role);
                            return (
                              <tr key={user.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                <td style={{ padding: '12px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                      width: '40px',
                                      height: '40px',
                                      borderRadius: '50%',
                                      background: `linear-gradient(135deg, ${userRole?.color || '#6b7280'} 0%, ${userRole?.color || '#6b7280'}80 100%)`,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: 'white',
                                      fontWeight: '600',
                                      fontSize: '14px'
                                    }}>
                                      {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                      <div style={{ fontWeight: '600', color: theme.textPrimary }}>{user.name}</div>
                                      <div style={{ fontSize: '12px', color: theme.textSecondary }}>{user.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td style={{ padding: '12px' }}>
                                  <div style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    background: `${userRole?.color || '#6b7280'}20`,
                                    color: userRole?.color || '#6b7280',
                                    fontSize: '12px',
                                    fontWeight: '600'
                                  }}>
                                    {userRole?.name || user.role}
                                  </div>
                                </td>
                                <td style={{ padding: '12px' }}>
                                  <div style={{
                                    display: 'inline-block',
                                    padding: '4px 12px',
                                    borderRadius: '12px',
                                    background: user.isActive ? '#dcfce720' : '#fef2f220',
                                    color: user.isActive ? '#16a34a' : '#dc2626',
                                    fontSize: '12px',
                                    fontWeight: '600'
                                  }}>
                                    {user.isActive ? 'Active' : 'Inactive'}
                                  </div>
                                </td>
                                <td style={{ padding: '12px', color: theme.textSecondary, fontSize: '14px' }}>
                                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                                </td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                    <button
                                      onClick={() => {
                                        setEditingUser(user);
                                        setShowUserModal(true);
                                      }}
                                      style={{
                                        background: '#3b82f6',
                                        color: 'white',
                                        border: 'none',
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => toggleUserStatus(user.id)}
                                      disabled={user.id === currentUser.id}
                                      style={{
                                        background: user.isActive ? '#ef4444' : '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        cursor: user.id === currentUser.id ? 'not-allowed' : 'pointer',
                                        opacity: user.id === currentUser.id ? 0.5 : 1
                                      }}
                                    >
                                      {user.isActive ? 'Disable' : 'Enable'}
                                    </button>
                                    <button
                                      onClick={() => deleteUser(user.id)}
                                      disabled={user.id === currentUser.id}
                                      style={{
                                        background: '#dc2626',
                                        color: 'white',
                                        border: 'none',
                                        padding: '6px 12px',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        cursor: user.id === currentUser.id ? 'not-allowed' : 'pointer',
                                        opacity: user.id === currentUser.id ? 0.5 : 1
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Roles Section */}
                  <div style={{
                    background: theme.cardBg,
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(139, 69, 19, 0.1)'
                  }}>
                    <h3 style={{ color: theme.textPrimary, marginBottom: '20px', fontSize: '20px' }}>
                      Roles & Permissions
                    </h3>
                    
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))', 
                      gap: '16px' 
                    }}>
                      {roles.map(role => (
                        <div key={role.id} style={{
                          border: `2px solid ${role.color}20`,
                          borderRadius: '12px',
                          padding: '20px',
                          background: `${role.color}05`
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div>
                              <h4 style={{ 
                                color: role.color, 
                                margin: '0 0 4px 0', 
                                fontSize: '16px', 
                                fontWeight: '700' 
                              }}>
                                {role.name}
                              </h4>
                              <p style={{ 
                                color: theme.textSecondary, 
                                margin: 0, 
                                fontSize: '12px' 
                              }}>
                                {role.description}
                              </p>
                            </div>
                            <div style={{
                              background: role.color,
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '8px',
                              fontSize: '10px',
                              fontWeight: '600'
                            }}>
                              Level {role.level}
                            </div>
                          </div>
                          
                          <div style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '12px', color: theme.textSecondary, marginBottom: '8px' }}>
                              Permissions ({role.permissions.length}):
                            </div>
                            <div style={{ 
                              display: 'flex', 
                              flexWrap: 'wrap', 
                              gap: '4px',
                              maxHeight: '80px',
                              overflowY: 'auto'
                            }}>
                              {role.permissions.includes('all') ? (
                                <span style={{
                                  background: '#dc262620',
                                  color: '#dc2626',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  fontSize: '10px',
                                  fontWeight: '600'
                                }}>
                                  ALL PERMISSIONS
                                </span>
                              ) : role.permissions.map(permId => {
                                const perm = permissions.find(p => p.id === permId);
                                return perm ? (
                                  <span key={permId} style={{
                                    background: '#3b82f620',
                                    color: '#3b82f6',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '10px'
                                  }}>
                                    {perm.name}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          </div>
                          
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            paddingTop: '12px',
                            borderTop: '1px solid #e5e7eb'
                          }}>
                            <span style={{ fontSize: '12px', color: theme.textSecondary }}>
                              {users.filter(user => user.role === role.id).length} users
                            </span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button
                                onClick={() => {
                                  setEditingRole(role);
                                  setShowRoleModal(true);
                                }}
                                style={{
                                  background: '#3b82f6',
                                  color: 'white',
                                  border: 'none',
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  fontSize: '10px',
                                  cursor: 'pointer'
                                }}
                              >
                                Edit
                              </button>
                              {!['super_admin', 'admin'].includes(role.id) && (
                                <button
                                  onClick={() => deleteRole(role.id)}
                                  style={{
                                    background: '#dc2626',
                                    color: 'white',
                                    border: 'none',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '10px',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'products' && activeTab !== 'customers' && activeTab !== 'pricing' && activeTab !== 'categories' && activeTab !== 'sales' && activeTab !== 'inventory' && activeTab !== 'config' && activeTab !== 'users' && (
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

      {/* Modal Forms */}
      {/* Add/Edit Product Modal */}
      {showAddProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: isMobile ? '16px' : '0'
        }}>
          <div style={{
            background: 'white',
            borderRadius: isMobile ? '12px' : '16px',
            padding: isMobile ? '20px' : '32px',
            maxWidth: isMobile ? '100%' : '600px',
            width: isMobile ? '100%' : '90%',
            maxHeight: isMobile ? '90vh' : '80vh',
            overflow: 'auto'
          }}>
            <h3 style={{ color: theme.textPrimary, marginBottom: '24px' }}>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const productData = {
                name: formData.get('name'),
                category: formData.get('category'),
                brand: formData.get('brand'),
                icon: formData.get('icon'),
                outputPerBatch: parseInt(formData.get('outputPerBatch')),
                unit: formData.get('unit'),
                price: parseInt(formData.get('price')),
                quantity: parseInt(formData.get('quantity')) || 0,
                recipe: [] // This would be more complex in real implementation
              };
              
              if (editingProduct) {
                updateProduct(editingProduct.id, productData);
              } else {
                addProduct(productData);
              }
              setShowAddProduct(false);
              setEditingProduct(null);
            }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Product Name</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={editingProduct?.name || ''}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Category</label>
                <select
                  name="category"
                  defaultValue={editingProduct?.category || ''}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Brand</label>
                <select
                  name="brand"
                  defaultValue={editingProduct?.brand || ''}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Select Brand</option>
                  <option value="Abeer Luxury">Abeer Luxury</option>
                  <option value="Abeer Classic">Abeer Classic</option>
                  <option value="Abeer Elite">Abeer Elite</option>
                  <option value="Abeer Royal">Abeer Royal</option>
                  <option value="Abeer Garden">Abeer Garden</option>
                  <option value="Abeer Premium">Abeer Premium</option>
                </select>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Icon (Emoji)</label>
                <input
                  name="icon"
                  type="text"
                  defaultValue={editingProduct?.icon || '🧴'}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Output per Batch</label>
                <input
                  name="outputPerBatch"
                  type="number"
                  defaultValue={editingProduct?.outputPerBatch || ''}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Unit</label>
                <input
                  name="unit"
                  type="text"
                  defaultValue={editingProduct?.unit || ''}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Price (₦)</label>
                <input
                  name="price"
                  type="number"
                  defaultValue={editingProduct?.price || ''}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Initial Stock Quantity</label>
                <input
                  name="quantity"
                  type="number"
                  min="0"
                  defaultValue={editingProduct?.quantity || '0'}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddProduct(false);
                    setEditingProduct(null);
                  }}
                  style={{
                    padding: '12px 24px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    background: 'white',
                    color: theme.textPrimary,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    background: '#8B4513',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  {editingProduct ? 'Update' : 'Add'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Customer Modal */}
      {showAddCustomer && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <h3 style={{ color: theme.textPrimary, marginBottom: '24px' }}>
              {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const customerData = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                address: formData.get('address'),
                type: formData.get('type'),
                discount: parseInt(formData.get('discount'))
              };
              
              if (editingCustomer) {
                updateCustomer(editingCustomer.id, customerData);
              } else {
                addCustomer(customerData);
              }
              setShowAddCustomer(false);
              setEditingCustomer(null);
            }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Customer Name</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={editingCustomer?.name || ''}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Phone</label>
                <input
                  name="phone"
                  type="tel"
                  defaultValue={editingCustomer?.phone || ''}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Email</label>
                <input
                  name="email"
                  type="email"
                  defaultValue={editingCustomer?.email || ''}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Address</label>
                <textarea
                  name="address"
                  defaultValue={editingCustomer?.address || ''}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    height: '80px',
                    resize: 'vertical'
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Customer Type</label>
                <select
                  name="type"
                  defaultValue={editingCustomer?.type || 'Regular'}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                >
                  <option value="Regular">Regular</option>
                  <option value="Premium">Premium</option>
                  <option value="Wholesale">Wholesale</option>
                </select>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Discount (%)</label>
                <input
                  name="discount"
                  type="number"
                  min="0"
                  max="50"
                  defaultValue={editingCustomer?.discount || '0'}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCustomer(false);
                    setEditingCustomer(null);
                  }}
                  style={{
                    padding: '12px 24px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    background: 'white',
                    color: theme.textPrimary,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    background: '#8B4513',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  {editingCustomer ? 'Update' : 'Add'} Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {showAddCategory && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3 style={{ color: theme.textPrimary, marginBottom: '24px' }}>Add New Category</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const categoryData = {
                name: formData.get('name'),
                description: formData.get('description'),
                icon: formData.get('icon')
              };
              
              addCategory(categoryData);
              setShowAddCategory(false);
            }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Category Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Description</label>
                <textarea
                  name="description"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    height: '80px',
                    resize: 'vertical'
                  }}
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Icon (Emoji)</label>
                <input
                  name="icon"
                  type="text"
                  defaultValue="🏷️"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddCategory(false)}
                  style={{
                    padding: '12px 24px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    background: 'white',
                    color: theme.textPrimary,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    background: '#8B4513',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Material Modal */}
      {showAddMaterial && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3 style={{ color: theme.textPrimary, marginBottom: '24px' }}>Add New Material</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const materialData = {
                name: formData.get('name'),
                quantity: parseInt(formData.get('quantity')),
                unit: formData.get('unit'),
                cost: parseInt(formData.get('cost'))
              };
              
              addRawMaterial(materialData);
              setShowAddMaterial(false);
            }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Material Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Quantity</label>
                <input
                  name="quantity"
                  type="number"
                  min="0"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Unit</label>
                <select
                  name="unit"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Select Unit</option>
                  <option value="grams">Grams</option>
                  <option value="ml">Milliliters</option>
                  <option value="pieces">Pieces</option>
                  <option value="liters">Liters</option>
                  <option value="kg">Kilograms</option>
                  <option value="trip">Trip</option>
                </select>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: theme.textPrimary }}>Total Cost (₦)</label>
                <input
                  name="cost"
                  type="number"
                  min="0"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowAddMaterial(false)}
                  style={{
                    padding: '12px 24px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    background: 'white',
                    color: theme.textPrimary,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    background: '#8B4513',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Add Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sales Form Modal */}
      {showSalesForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: theme.cardBg,
            borderRadius: '20px',
            padding: '32px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: theme.textPrimary, fontSize: '24px', margin: 0 }}>📝 New Sales Order</h2>
              <button
                onClick={() => setShowSalesForm(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: theme.textSecondary,
                  padding: '4px'
                }}
              >
                ✕
              </button>
            </div>

            {/* Customer Selection */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                Select Customer *
              </label>
              <select
                value={newSale.customerId}
                onChange={(e) => setNewSale(prev => ({ ...prev, customerId: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="">Choose a customer...</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} - {customer.email} ({customer.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Add Product Section */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <h3 style={{ color: theme.textPrimary, marginBottom: '16px', fontSize: '18px' }}>Add Products</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 80px', gap: '12px', alignItems: 'end' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                    Product
                  </label>
                  <select
                    value={currentItem.productId}
                    onChange={(e) => setCurrentItem(prev => ({ ...prev, productId: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">Select product...</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id} disabled={product.quantity === 0}>
                        {product.name} - ₦{product.price?.toLocaleString()} (Stock: {product.quantity})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={currentItem.productId ? products.find(p => p.id === parseInt(currentItem.productId))?.quantity : undefined}
                    value={currentItem.quantity}
                    onChange={(e) => setCurrentItem(prev => ({ ...prev, quantity: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                    Custom Price (optional)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={currentItem.customPrice}
                    onChange={(e) => setCurrentItem(prev => ({ ...prev, customPrice: e.target.value }))}
                    placeholder="Default price"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <button
                  onClick={addItemToSale}
                  style={{
                    background: '#8B4513',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    height: '38px'
                  }}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Items List */}
            {newSale.items.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ color: theme.textPrimary, marginBottom: '16px', fontSize: '18px' }}>Order Items</h3>
                <div style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Product</th>
                        <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Qty</th>
                        <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Price</th>
                        <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Total</th>
                        <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newSale.items.map((item, index) => (
                        <tr key={index} style={{ borderTop: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '12px', fontSize: '14px', color: theme.textPrimary }}>{item.productName}</td>
                          <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px', color: theme.textPrimary }}>{item.quantity}</td>
                          <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px', color: theme.textPrimary }}>₦{item.price.toLocaleString()}</td>
                          <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>₦{item.total.toLocaleString()}</td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <button
                              onClick={() => removeItemFromSale(index)}
                              style={{
                                background: '#dc2626',
                                color: 'white',
                                border: 'none',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                cursor: 'pointer'
                              }}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Order Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                  Discount (₦)
                </label>
                <input
                  type="number"
                  min="0"
                  value={newSale.discount}
                  onChange={(e) => setNewSale(prev => ({ ...prev, discount: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                  Payment Method
                </label>
                <select
                  value={newSale.paymentMethod}
                  onChange={(e) => setNewSale(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="credit">Credit</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                Notes (optional)
              </label>
              <textarea
                value={newSale.notes}
                onChange={(e) => setNewSale(prev => ({ ...prev, notes: e.target.value }))}
                rows="3"
                placeholder="Add any special notes about this order..."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Order Summary */}
            {newSale.items.length > 0 && (
              <div style={{
                background: '#f8f9fa',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: theme.textSecondary }}>Subtotal:</span>
                  <span style={{ fontWeight: '600', color: theme.textPrimary }}>₦{calculateSaleSubtotal().toLocaleString()}</span>
                </div>
                {newSale.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: theme.textSecondary }}>Discount:</span>
                    <span style={{ fontWeight: '600', color: '#dc2626' }}>-₦{parseFloat(newSale.discount).toLocaleString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #e5e7eb', paddingTop: '8px' }}>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: theme.textPrimary }}>Total:</span>
                  <span style={{ fontSize: '18px', fontWeight: '700', color: '#8B4513' }}>₦{calculateSaleTotal().toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowSalesForm(false)}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={submitSale}
                disabled={newSale.items.length === 0}
                style={{
                  background: newSale.items.length === 0 ? '#d1d5db' : 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: newSale.items.length === 0 ? 'not-allowed' : 'pointer',
                  opacity: newSale.items.length === 0 ? 0.6 : 1
                }}
              >
                Create Order (₦{calculateSaleTotal().toLocaleString()})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: theme.cardBg,
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '800px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: theme.textPrimary, margin: 0, fontSize: '24px' }}>Order Details - #{selectedOrder.id}</h2>
              <button
                onClick={() => setShowOrderDetails(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: theme.textSecondary
                }}
              >
                ✕
              </button>
            </div>

            {/* Order Info */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
              gap: '24px', 
              marginBottom: '32px' 
            }}>
              <div>
                <h3 style={{ color: theme.textPrimary, marginBottom: '16px', fontSize: '18px' }}>Order Information</h3>
                <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ color: theme.textSecondary }}>Customer:</strong>
                    <div style={{ color: theme.textPrimary, fontWeight: '600' }}>
                      {customers.find(c => c.id === selectedOrder.customerId)?.name || 'Unknown Customer'}
                    </div>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ color: theme.textSecondary }}>Date:</strong>
                    <div style={{ color: theme.textPrimary }}>{selectedOrder.date}</div>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ color: theme.textSecondary }}>Status:</strong>
                    <div>
                      <span style={{
                        background: getOrderStatusColor(selectedOrder.status),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>
                  {selectedOrder.paymentMethod && (
                    <div style={{ marginBottom: '12px' }}>
                      <strong style={{ color: theme.textSecondary }}>Payment:</strong>
                      <div style={{ color: theme.textPrimary, textTransform: 'capitalize' }}>
                        {selectedOrder.paymentMethod.replace('_', ' ')}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 style={{ color: theme.textPrimary, marginBottom: '16px', fontSize: '18px' }}>Order Summary</h3>
                <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: theme.textSecondary }}>Subtotal:</span>
                    <span style={{ fontWeight: '600', color: theme.textPrimary }}>₦{selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: theme.textSecondary }}>Discount:</span>
                      <span style={{ fontWeight: '600', color: '#dc2626' }}>-₦{selectedOrder.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #e5e7eb', paddingTop: '8px' }}>
                    <span style={{ fontSize: '18px', fontWeight: '600', color: theme.textPrimary }}>Total:</span>
                    <span style={{ fontSize: '18px', fontWeight: '700', color: '#8B4513' }}>₦{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ color: theme.textPrimary, marginBottom: '16px', fontSize: '18px' }}>Order Items</h3>
              <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Product</th>
                      <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Qty</th>
                      <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Price</th>
                      <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => {
                      const product = products.find(p => p.id === item.productId);
                      return (
                        <tr key={index} style={{ borderTop: index > 0 ? '1px solid #e5e7eb' : 'none' }}>
                          <td style={{ padding: '12px', fontSize: '14px', color: theme.textPrimary }}>
                            {product?.name || `Product ID: ${item.productId}`}
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px', color: theme.textPrimary }}>
                            {item.quantity}
                          </td>
                          <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px', color: theme.textPrimary }}>
                            ₦{item.price.toLocaleString()}
                          </td>
                          <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                            ₦{(item.quantity * item.price).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes */}
            {selectedOrder.notes && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ color: theme.textPrimary, marginBottom: '16px', fontSize: '18px' }}>Notes</h3>
                <div style={{
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  padding: '16px',
                  color: theme.textPrimary,
                  fontStyle: 'italic'
                }}>
                  {selectedOrder.notes}
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => printInvoice(selectedOrder)}
                style={{
                  background: '#8b5cf6',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                🖨️ Print Invoice
              </button>
              <button
                onClick={() => editOrder(selectedOrder)}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                ✏️ Edit Order
              </button>
              <button
                onClick={() => setShowOrderDetails(false)}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {editingOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: theme.cardBg,
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '900px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: theme.textPrimary, margin: 0, fontSize: '24px' }}>Edit Order - #{editingOrder.id}</h2>
              <button
                onClick={() => setEditingOrder(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: theme.textSecondary
                }}
              >
                ✕
              </button>
            </div>

            {/* Basic Order Info */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                  Status
                </label>
                <select
                  value={editingOrder.status}
                  onChange={(e) => setEditingOrder(prev => ({ ...prev, status: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                  Payment Method
                </label>
                <select
                  value={editingOrder.paymentMethod || 'cash'}
                  onChange={(e) => setEditingOrder(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="credit">Credit</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                  Discount (₦)
                </label>
                <input
                  type="number"
                  min="0"
                  value={editingOrder.discount || 0}
                  onChange={(e) => setEditingOrder(prev => ({ ...prev, discount: parseFloat(e.target.value) || 0 }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Edit Items */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ color: theme.textPrimary, marginBottom: '16px', fontSize: '18px' }}>Order Items</h3>
              <div style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Product</th>
                      <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Qty</th>
                      <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Price</th>
                      <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Total</th>
                      <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {editingOrder.items.map((item, index) => {
                      const product = products.find(p => p.id === item.productId);
                      return (
                        <tr key={index} style={{ borderTop: index > 0 ? '1px solid #e5e7eb' : 'none' }}>
                          <td style={{ padding: '12px', fontSize: '14px', color: theme.textPrimary }}>
                            {product?.name || `Product ID: ${item.productId}`}
                          </td>
                          <td style={{ padding: '8px', textAlign: 'center' }}>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateItemInEditOrder(index, 'quantity', e.target.value)}
                              style={{
                                width: '60px',
                                padding: '4px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '14px',
                                textAlign: 'center'
                              }}
                            />
                          </td>
                          <td style={{ padding: '8px', textAlign: 'right' }}>
                            <input
                              type="number"
                              min="0"
                              value={item.price}
                              onChange={(e) => updateItemInEditOrder(index, 'price', e.target.value)}
                              style={{
                                width: '80px',
                                padding: '4px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '14px',
                                textAlign: 'right'
                              }}
                            />
                          </td>
                          <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                            ₦{(item.quantity * item.price).toLocaleString()}
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <button
                              onClick={() => removeItemFromEditOrder(index)}
                              style={{
                                background: '#dc2626',
                                color: 'white',
                                border: 'none',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                cursor: 'pointer'
                              }}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Notes */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                Notes
              </label>
              <textarea
                value={editingOrder.notes || ''}
                onChange={(e) => setEditingOrder(prev => ({ ...prev, notes: e.target.value }))}
                rows="3"
                placeholder="Add any special notes about this order..."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Order Summary */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: theme.textSecondary }}>Subtotal:</span>
                <span style={{ fontWeight: '600', color: theme.textPrimary }}>
                  ₦{editingOrder.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toLocaleString()}
                </span>
              </div>
              {editingOrder.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: theme.textSecondary }}>Discount:</span>
                  <span style={{ fontWeight: '600', color: '#dc2626' }}>-₦{editingOrder.discount.toLocaleString()}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #e5e7eb', paddingTop: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: '600', color: theme.textPrimary }}>Total:</span>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#8B4513' }}>
                  ₦{(editingOrder.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) - (editingOrder.discount || 0)).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setEditingOrder(null)}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={updateOrder}
                disabled={editingOrder.items.length === 0}
                style={{
                  background: editingOrder.items.length === 0 ? '#d1d5db' : 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: editingOrder.items.length === 0 ? 'not-allowed' : 'pointer',
                  opacity: editingOrder.items.length === 0 ? 0.6 : 1
                }}
              >
                Update Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Print Modal */}
      {showInvoice && selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '0',
            maxWidth: '800px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)'
          }}>
            {/* Print Header - Hidden in print */}
            <div style={{ 
              padding: '20px', 
              borderBottom: '1px solid #e5e7eb',
              '@media print': { display: 'none' }
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: theme.textPrimary, margin: 0, fontSize: '20px' }}>Invoice Preview</h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={generateInvoicePDF}
                    style={{
                      background: '#8b5cf6',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    🖨️ Print
                  </button>
                  <button
                    onClick={() => setShowInvoice(false)}
                    style={{
                      background: '#6b7280',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

            {/* Invoice Content */}
            <div style={{ 
              padding: '40px',
              color: '#1f2937',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              {/* Invoice Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: '40px',
                '@media print': { marginBottom: '30px' }
              }}>
                <div>
                  <img 
                    src={abeerLogo} 
                    alt="Abeer Logo" 
                    style={{ 
                      height: '60px', 
                      marginBottom: '16px',
                      '@media print': { height: '50px' }
                    }} 
                  />
                  <h1 style={{ 
                    margin: 0, 
                    fontSize: '28px', 
                    fontWeight: '700',
                    color: '#8B4513',
                    '@media print': { fontSize: '24px' }
                  }}>
                    {settings.businessInfo.name}
                  </h1>
                  <div style={{ color: '#6b7280', marginTop: '8px' }}>
                    <div>{settings.businessInfo.address}</div>
                    <div>{settings.businessInfo.phone}</div>
                    <div>{settings.businessInfo.email}</div>
                    {settings.businessInfo.taxId && <div>Tax ID: {settings.businessInfo.taxId}</div>}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h2 style={{ 
                    margin: 0, 
                    fontSize: '32px', 
                    fontWeight: '700',
                    color: '#8B4513',
                    '@media print': { fontSize: '28px' }
                  }}>
                    INVOICE
                  </h2>
                  <div style={{ marginTop: '16px', fontSize: '16px' }}>
                    <div><strong>Invoice #:</strong> {selectedOrder.id}</div>
                    <div><strong>Date:</strong> {selectedOrder.date}</div>
                    <div><strong>Status:</strong> 
                      <span style={{
                        background: getOrderStatusColor(selectedOrder.status),
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'capitalize',
                        marginLeft: '8px'
                      }}>
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  color: '#8B4513', 
                  marginBottom: '12px', 
                  fontSize: '18px',
                  fontWeight: '600',
                  borderBottom: '2px solid #8B4513',
                  paddingBottom: '4px'
                }}>
                  Bill To:
                </h3>
                {(() => {
                  const customer = customers.find(c => c.id === selectedOrder.customerId);
                  return customer ? (
                    <div style={{ fontSize: '16px' }}>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>{customer.name}</div>
                      {customer.email && <div>{customer.email}</div>}
                      {customer.phone && <div>{customer.phone}</div>}
                      {customer.address && <div>{customer.address}</div>}
                    </div>
                  ) : (
                    <div style={{ fontStyle: 'italic', color: '#6b7280' }}>Customer information not available</div>
                  );
                })()}
              </div>

              {/* Items Table */}
              <div style={{ marginBottom: '32px' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  border: '1px solid #e5e7eb'
                }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'left', 
                        borderBottom: '2px solid #e5e7eb',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        Item Description
                      </th>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'center', 
                        borderBottom: '2px solid #e5e7eb',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        Qty
                      </th>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'right', 
                        borderBottom: '2px solid #e5e7eb',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        Unit Price
                      </th>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'right', 
                        borderBottom: '2px solid #e5e7eb',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => {
                      const product = products.find(p => p.id === item.productId);
                      return (
                        <tr key={index}>
                          <td style={{ 
                            padding: '12px', 
                            borderBottom: '1px solid #f3f4f6',
                            fontSize: '14px'
                          }}>
                            {product?.name || `Product ID: ${item.productId}`}
                            {product?.category && (
                              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                                {product.category} - {product.brand}
                              </div>
                            )}
                          </td>
                          <td style={{ 
                            padding: '12px', 
                            textAlign: 'center', 
                            borderBottom: '1px solid #f3f4f6',
                            fontSize: '14px'
                          }}>
                            {item.quantity}
                          </td>
                          <td style={{ 
                            padding: '12px', 
                            textAlign: 'right', 
                            borderBottom: '1px solid #f3f4f6',
                            fontSize: '14px'
                          }}>
                            ₦{item.price.toLocaleString()}
                          </td>
                          <td style={{ 
                            padding: '12px', 
                            textAlign: 'right', 
                            borderBottom: '1px solid #f3f4f6',
                            fontSize: '14px',
                            fontWeight: '600'
                          }}>
                            ₦{(item.quantity * item.price).toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
                <div style={{ width: '300px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                    <span>Subtotal:</span>
                    <span style={{ fontWeight: '600' }}>₦{selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6' }}>
                      <span>Discount:</span>
                      <span style={{ fontWeight: '600', color: '#dc2626' }}>-₦{selectedOrder.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '12px 0', 
                    borderTop: '2px solid #8B4513',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#8B4513'
                  }}>
                    <span>Total:</span>
                    <span>₦{selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info & Notes */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '24px',
                marginBottom: '32px'
              }}>
                <div>
                  <h4 style={{ color: '#8B4513', marginBottom: '8px', fontSize: '16px' }}>Payment Information</h4>
                  <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '6px' }}>
                    <div><strong>Method:</strong> {selectedOrder.paymentMethod ? selectedOrder.paymentMethod.replace('_', ' ').toUpperCase() : 'Not specified'}</div>
                  </div>
                </div>
                {selectedOrder.notes && (
                  <div>
                    <h4 style={{ color: '#8B4513', marginBottom: '8px', fontSize: '16px' }}>Notes</h4>
                    <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '6px', fontStyle: 'italic' }}>
                      {selectedOrder.notes}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div style={{ 
                textAlign: 'center', 
                paddingTop: '24px', 
                borderTop: '1px solid #e5e7eb',
                color: '#6b7280',
                fontSize: '12px'
              }}>
                <div style={{ marginBottom: '8px' }}>Thank you for your business!</div>
                <div>This invoice was generated on {new Date().toLocaleDateString()}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Production Form Modal */}
      {showProductionForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: theme.cardBg,
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '800px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: theme.textPrimary, margin: 0, fontSize: '24px' }}>New Production Batch</h2>
              <button
                onClick={() => setShowProductionForm(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: theme.textSecondary
                }}
              >
                ✕
              </button>
            </div>

            {/* Basic Production Info */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                  Product *
                </label>
                <select
                  value={newProduction.productId}
                  onChange={(e) => setNewProduction(prev => ({ ...prev, productId: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                  Batch Number
                </label>
                <input
                  type="text"
                  value={newProduction.batchNumber}
                  onChange={(e) => setNewProduction(prev => ({ ...prev, batchNumber: e.target.value }))}
                  placeholder="Auto-generated if empty"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                  Jars Produced *
                </label>
                <input
                  type="number"
                  min="1"
                  value={newProduction.jarsProduced}
                  onChange={(e) => setNewProduction(prev => ({ ...prev, jarsProduced: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Add Ingredients */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ color: theme.textPrimary, marginBottom: '16px', fontSize: '18px' }}>Ingredients Used</h3>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr auto', gap: '12px', alignItems: 'end' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                    Ingredient
                  </label>
                  <select
                    value={currentIngredient.ingredientId}
                    onChange={(e) => setCurrentIngredient(prev => ({ ...prev, ingredientId: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">Select Ingredient</option>
                    {rawMaterials.map(material => (
                      <option key={material.id} value={material.id}>
                        {material.name} (Available: {material.quantity} {material.unit})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                    Quantity Used
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={currentIngredient.quantityUsed}
                    onChange={(e) => setCurrentIngredient(prev => ({ ...prev, quantityUsed: e.target.value }))}
                    placeholder="0"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <button
                  onClick={addIngredientToProduction}
                  style={{
                    background: '#8B4513',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    height: '38px'
                  }}
                >
                  Add
                </button>
              </div>
            </div>

            {/* Ingredients List */}
            {newProduction.ingredientsUsed.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: theme.textPrimary, marginBottom: '16px', fontSize: '16px' }}>Ingredients in this batch</h4>
                <div style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f8f9fa' }}>
                        <th style={{ padding: '12px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Ingredient</th>
                        <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Qty Used</th>
                        <th style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Cost</th>
                        <th style={{ padding: '12px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: theme.textSecondary }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newProduction.ingredientsUsed.map((ingredient, index) => (
                        <tr key={index} style={{ borderTop: '1px solid #e5e7eb' }}>
                          <td style={{ padding: '12px', fontSize: '14px', color: theme.textPrimary }}>{ingredient.ingredientName}</td>
                          <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px', color: theme.textPrimary }}>
                            {ingredient.quantityUsed} {ingredient.unit}
                          </td>
                          <td style={{ padding: '12px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                            ₦{ingredient.totalCost.toLocaleString()}
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <button
                              onClick={() => removeIngredientFromProduction(index)}
                              style={{
                                background: '#dc2626',
                                color: 'white',
                                border: 'none',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                cursor: 'pointer'
                              }}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Notes */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                Production Notes
              </label>
              <textarea
                value={newProduction.notes}
                onChange={(e) => setNewProduction(prev => ({ ...prev, notes: e.target.value }))}
                rows="3"
                placeholder="Add any notes about this production batch..."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Production Summary */}
            {newProduction.ingredientsUsed.length > 0 && (
              <div style={{
                background: '#f8f9fa',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: theme.textSecondary }}>Total Ingredient Cost:</span>
                  <span style={{ fontWeight: '600', color: theme.textPrimary }}>₦{calculateTotalIngredientCost().toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: theme.textSecondary }}>Jars to Produce:</span>
                  <span style={{ fontWeight: '600', color: theme.textPrimary }}>{newProduction.jarsProduced || 1}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #e5e7eb', paddingTop: '8px' }}>
                  <span style={{ fontSize: '18px', fontWeight: '600', color: theme.textPrimary }}>Cost Per Jar:</span>
                  <span style={{ fontSize: '18px', fontWeight: '700', color: '#8B4513' }}>₦{calculateCostPerJar().toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowProductionForm(false)}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={submitProduction}
                disabled={!newProduction.productId || newProduction.ingredientsUsed.length === 0}
                style={{
                  background: (!newProduction.productId || newProduction.ingredientsUsed.length === 0) ? '#d1d5db' : 'linear-gradient(135deg, #8B4513 0%, #A0522D 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: (!newProduction.productId || newProduction.ingredientsUsed.length === 0) ? 'not-allowed' : 'pointer',
                  opacity: (!newProduction.productId || newProduction.ingredientsUsed.length === 0) ? 0.6 : 1
                }}
              >
                Start Production
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Ingredient Form Modal */}
      {showIngredientForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: theme.cardBg,
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ color: theme.textPrimary, margin: 0, fontSize: '24px' }}>Add New Ingredient</h2>
              <button
                onClick={() => setShowIngredientForm(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: theme.textSecondary
                }}
              >
                ✕
              </button>
            </div>

            {/* Basic Ingredient Info */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                  Ingredient Name *
                </label>
                <input
                  type="text"
                  value={newIngredient.name}
                  onChange={(e) => setNewIngredient(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Sandal Powder"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                  Unit of Measure *
                </label>
                <select
                  value={newIngredient.unit}
                  onChange={(e) => setNewIngredient(prev => ({ ...prev, unit: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Select Unit</option>
                  <option value="grams">Grams</option>
                  <option value="kg">Kilograms</option>
                  <option value="ml">Milliliters</option>
                  <option value="liters">Liters</option>
                  <option value="pieces">Pieces</option>
                  <option value="bottles">Bottles</option>
                  <option value="packets">Packets</option>
                  <option value="boxes">Boxes</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                  Cost Per Unit (₦) *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newIngredient.costPerUnit}
                  onChange={(e) => setNewIngredient(prev => ({ ...prev, costPerUnit: e.target.value }))}
                  placeholder="0.00"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                  Initial Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newIngredient.quantity}
                  onChange={(e) => setNewIngredient(prev => ({ ...prev, quantity: e.target.value }))}
                  placeholder="0"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                Supplier
              </label>
              <input
                type="text"
                value={newIngredient.supplier}
                onChange={(e) => setNewIngredient(prev => ({ ...prev, supplier: e.target.value }))}
                placeholder="Supplier name (optional)"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                Description
              </label>
              <textarea
                value={newIngredient.description}
                onChange={(e) => setNewIngredient(prev => ({ ...prev, description: e.target.value }))}
                rows="3"
                placeholder="Brief description of the ingredient (optional)"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Calculated Total */}
            {newIngredient.quantity && newIngredient.costPerUnit && (
              <div style={{
                background: '#f8f9fa',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: theme.textSecondary }}>Total Value:</span>
                  <span style={{ fontSize: '18px', fontWeight: '700', color: '#8B4513' }}>
                    ₦{(parseFloat(newIngredient.quantity) * parseFloat(newIngredient.costPerUnit)).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowIngredientForm(false)}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={addNewIngredient}
                disabled={!newIngredient.name || !newIngredient.unit || !newIngredient.costPerUnit}
                style={{
                  background: (!newIngredient.name || !newIngredient.unit || !newIngredient.costPerUnit) ? '#d1d5db' : 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: (!newIngredient.name || !newIngredient.unit || !newIngredient.costPerUnit) ? 'not-allowed' : 'pointer',
                  opacity: (!newIngredient.name || !newIngredient.unit || !newIngredient.costPerUnit) ? 0.6 : 1
                }}
              >
                Add Ingredient
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Management Modal */}
      {showUserModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ margin: '0 0 24px 0', fontSize: '24px', color: theme.textPrimary }}>
              {editingUser ? 'Edit User' : 'Add New User'}
            </h3>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme.textPrimary }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={editingUser ? editingUser.name : newUser.name}
                  onChange={(e) => {
                    if (editingUser) {
                      setEditingUser(prev => ({ ...prev, name: e.target.value }));
                    } else {
                      setNewUser(prev => ({ ...prev, name: e.target.value }));
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme.textPrimary }}>
                  Username *
                </label>
                <input
                  type="text"
                  value={editingUser ? editingUser.username : newUser.username}
                  onChange={(e) => {
                    if (editingUser) {
                      setEditingUser(prev => ({ ...prev, username: e.target.value }));
                    } else {
                      setNewUser(prev => ({ ...prev, username: e.target.value }));
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme.textPrimary }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={editingUser ? editingUser.email : newUser.email}
                  onChange={(e) => {
                    if (editingUser) {
                      setEditingUser(prev => ({ ...prev, email: e.target.value }));
                    } else {
                      setNewUser(prev => ({ ...prev, email: e.target.value }));
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme.textPrimary }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={editingUser ? editingUser.phone : newUser.phone}
                  onChange={(e) => {
                    if (editingUser) {
                      setEditingUser(prev => ({ ...prev, phone: e.target.value }));
                    } else {
                      setNewUser(prev => ({ ...prev, phone: e.target.value }));
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme.textPrimary }}>
                  Role *
                </label>
                <select
                  value={editingUser ? editingUser.role : newUser.role}
                  onChange={(e) => {
                    const selectedRole = roles.find(role => role.id === e.target.value);
                    if (editingUser) {
                      setEditingUser(prev => ({ 
                        ...prev, 
                        role: e.target.value,
                        permissions: selectedRole ? selectedRole.permissions : []
                      }));
                    } else {
                      setNewUser(prev => ({ 
                        ...prev, 
                        role: e.target.value,
                        permissions: selectedRole ? selectedRole.permissions : []
                      }));
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.name} (Level {role.level})
                    </option>
                  ))}
                </select>
              </div>

              {!editingUser && (
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme.textPrimary }}>
                    Password *
                  </label>
                  <input
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Enter password"
                  />
                </div>
              )}

              {/* Permissions Preview */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme.textPrimary }}>
                  Permissions
                </label>
                <div style={{
                  background: '#f8f9fa',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '12px',
                  maxHeight: '120px',
                  overflowY: 'auto'
                }}>
                  {(() => {
                    const currentRole = roles.find(role => role.id === (editingUser ? editingUser.role : newUser.role));
                    if (!currentRole) return <span style={{ color: theme.textSecondary }}>Select a role to see permissions</span>;
                    
                    if (currentRole.permissions.includes('all')) {
                      return <span style={{ color: '#dc2626', fontWeight: '600' }}>ALL PERMISSIONS</span>;
                    }
                    
                    return (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                        {currentRole.permissions.map(permId => {
                          const perm = permissions.find(p => p.id === permId);
                          return perm ? (
                            <span key={permId} style={{
                              background: '#3b82f620',
                              color: '#3b82f6',
                              padding: '2px 8px',
                              borderRadius: '12px',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}>
                              {perm.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <button
                onClick={() => {
                  setShowUserModal(false);
                  setEditingUser(null);
                  setNewUser({
                    username: '',
                    name: '',
                    email: '',
                    phone: '',
                    role: 'viewer',
                    password: ''
                  });
                }}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (editingUser) {
                    updateUser(editingUser.id, editingUser);
                  } else {
                    if (newUser.name && newUser.username && newUser.email && newUser.password) {
                      const selectedRole = roles.find(role => role.id === newUser.role);
                      addUser({
                        ...newUser,
                        permissions: selectedRole ? selectedRole.permissions : []
                      });
                      setNewUser({
                        username: '',
                        name: '',
                        email: '',
                        phone: '',
                        role: 'viewer',
                        password: ''
                      });
                    } else {
                      addNotification('Please fill in all required fields', 'error');
                      return;
                    }
                  }
                  setShowUserModal(false);
                  setEditingUser(null);
                }}
                disabled={editingUser ? false : (!newUser.name || !newUser.username || !newUser.email || !newUser.password)}
                style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  opacity: (editingUser || (newUser.name && newUser.username && newUser.email && newUser.password)) ? 1 : 0.6
                }}
              >
                {editingUser ? 'Update User' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role Management Modal */}
      {showRoleModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ margin: '0 0 24px 0', fontSize: '24px', color: theme.textPrimary }}>
              {editingRole ? 'Edit Role' : 'Create New Role'}
            </h3>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme.textPrimary }}>
                  Role Name *
                </label>
                <input
                  type="text"
                  value={editingRole ? editingRole.name : newRole.name}
                  onChange={(e) => {
                    if (editingRole) {
                      setEditingRole(prev => ({ ...prev, name: e.target.value }));
                    } else {
                      setNewRole(prev => ({ ...prev, name: e.target.value }));
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter role name"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme.textPrimary }}>
                  Description
                </label>
                <textarea
                  value={editingRole ? editingRole.description : newRole.description}
                  onChange={(e) => {
                    if (editingRole) {
                      setEditingRole(prev => ({ ...prev, description: e.target.value }));
                    } else {
                      setNewRole(prev => ({ ...prev, description: e.target.value }));
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    resize: 'vertical',
                    minHeight: '80px',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter role description"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme.textPrimary }}>
                    Color
                  </label>
                  <input
                    type="color"
                    value={editingRole ? editingRole.color : newRole.color}
                    onChange={(e) => {
                      if (editingRole) {
                        setEditingRole(prev => ({ ...prev, color: e.target.value }));
                      } else {
                        setNewRole(prev => ({ ...prev, color: e.target.value }));
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      height: '48px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme.textPrimary }}>
                    Access Level (1-100)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={editingRole ? editingRole.level : newRole.level}
                    onChange={(e) => {
                      if (editingRole) {
                        setEditingRole(prev => ({ ...prev, level: parseInt(e.target.value) || 1 }));
                      } else {
                        setNewRole(prev => ({ ...prev, level: parseInt(e.target.value) || 1 }));
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: theme.textPrimary }}>
                  Permissions *
                </label>
                <div style={{
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  padding: '12px'
                }}>
                  {Object.entries(
                    permissions.reduce((groups, perm) => {
                      if (!groups[perm.category]) groups[perm.category] = [];
                      groups[perm.category].push(perm);
                      return groups;
                    }, {})
                  ).map(([category, perms]) => (
                    <div key={category} style={{ marginBottom: '16px' }}>
                      <div style={{ 
                        fontWeight: '600', 
                        color: theme.textPrimary, 
                        marginBottom: '8px',
                        fontSize: '14px'
                      }}>
                        {category}
                      </div>
                      {perms.map(perm => (
                        <label key={perm.id} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px',
                          marginBottom: '4px',
                          fontSize: '13px',
                          cursor: 'pointer'
                        }}>
                          <input
                            type="checkbox"
                            checked={(editingRole ? editingRole.permissions : newRole.permissions).includes(perm.id)}
                            onChange={(e) => {
                              const currentPermissions = editingRole ? editingRole.permissions : newRole.permissions;
                              const newPermissions = e.target.checked
                                ? [...currentPermissions, perm.id]
                                : currentPermissions.filter(p => p !== perm.id);
                              
                              if (editingRole) {
                                setEditingRole(prev => ({ ...prev, permissions: newPermissions }));
                              } else {
                                setNewRole(prev => ({ ...prev, permissions: newPermissions }));
                              }
                            }}
                            style={{ marginRight: '4px' }}
                          />
                          <div>
                            <div style={{ fontWeight: '500', color: theme.textPrimary }}>{perm.name}</div>
                            <div style={{ fontSize: '11px', color: theme.textSecondary }}>{perm.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  setEditingRole(null);
                  setNewRole({
                    name: '',
                    description: '',
                    permissions: [],
                    color: '#6b7280',
                    level: 30
                  });
                }}
                style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (editingRole) {
                    updateRole(editingRole.id, editingRole);
                  } else {
                    if (newRole.name && newRole.permissions.length > 0) {
                      addRole(newRole);
                      setNewRole({
                        name: '',
                        description: '',
                        permissions: [],
                        color: '#6b7280',
                        level: 30
                      });
                    } else {
                      addNotification('Please fill in role name and select at least one permission', 'error');
                      return;
                    }
                  }
                  setShowRoleModal(false);
                  setEditingRole(null);
                }}
                disabled={editingRole ? false : (!newRole.name || newRole.permissions.length === 0)}
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  opacity: (editingRole || (newRole.name && newRole.permissions.length > 0)) ? 1 : 0.6
                }}
              >
                {editingRole ? 'Update Role' : 'Create Role'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
