import React, { useState, useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeConfigTab, setActiveConfigTab] = useState('pricing');
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
      id: 19,
      name: 'Khumra - Mona',
      category: 'Khumra',
      icon: '🧴',
      recipe: [
        { materialId: 2, quantity: 18 }, // 18g sandal powder per batch
        { materialId: 5, quantity: 12 }, // 12g sandalia per batch
        { materialId: 6, quantity: 25 }, // 25ml sandal oil per batch
        { materialId: 7, quantity: 35 }, // 35ml water base per batch
        { materialId: 8, quantity: 8 },  // 8ml oils per batch
        { materialId: 12, quantity: 12 }, // 12 bottles per batch
        { materialId: 13, quantity: 1 }  // 1 transport fare per batch
      ],
      outputPerBatch: 12, // 12 bottles per batch
      unit: 'bottles (50ml each)',
      price: 16500 // Price in Naira
    },
    {
      id: 20,
      name: 'Khumra - Kareeha',
      category: 'Khumra',
      icon: '🧴',
      recipe: [
        { materialId: 2, quantity: 20 }, // 20g sandal powder per batch
        { materialId: 4, quantity: 8 },  // 8g jawee per batch
        { materialId: 6, quantity: 22 }, // 22ml sandal oil per batch
        { materialId: 7, quantity: 28 }, // 28ml water base per batch
        { materialId: 8, quantity: 10 }, // 10ml oils per batch
        { materialId: 9, quantity: 2 },  // 2 pieces mask per batch
        { materialId: 12, quantity: 11 }, // 11 bottles per batch
        { materialId: 13, quantity: 1 }  // 1 transport fare per batch
      ],
      outputPerBatch: 11, // 11 bottles per batch
      unit: 'bottles (50ml each)',
      price: 17200 // Price in Naira
    },
    {
      id: 21,
      name: 'Khumra - Asma',
      category: 'Khumra',
      icon: '🧴',
      recipe: [
        { materialId: 2, quantity: 16 }, // 16g sandal powder per batch
        { materialId: 3, quantity: 10 }, // 10g farce per batch
        { materialId: 6, quantity: 18 }, // 18ml sandal oil per batch
        { materialId: 7, quantity: 32 }, // 32ml water base per batch
        { materialId: 8, quantity: 12 }, // 12ml oils per batch
        { materialId: 10, quantity: 15 }, // 15g sugar per batch
        { materialId: 12, quantity: 9 }, // 9 bottles per batch
        { materialId: 13, quantity: 1 }  // 1 transport fare per batch
      ],
      outputPerBatch: 9, // 9 bottles per batch
      unit: 'bottles (50ml each)',
      price: 14800 // Price in Naira
    },
    // Your Actual Abeer (Luxury) Brand Products
    {
      id: 2,
      name: 'Abeer - Abeer',
      category: 'Abeer (Luxury)',
      icon: '🌟',
      recipe: [
        { materialId: 1, quantity: 6 },   // 6 pieces wood per batch
        { materialId: 2, quantity: 30 },  // 30g sandal powder per batch
        { materialId: 4, quantity: 12 },  // 12g jawee per batch
        { materialId: 6, quantity: 18 },  // 18ml sandal oil per batch
        { materialId: 8, quantity: 15 },  // 15ml oils per batch
        { materialId: 10, quantity: 22 }, // 22g sugar per batch
        { materialId: 11, quantity: 20 }, // 20 stickers per batch
        { materialId: 13, quantity: 1 }   // 1 transport fare per batch
      ],
      outputPerBatch: 20, // 20 premium sticks per batch
      unit: 'luxury premium sticks',
      price: 10000 // Price in Naira
    },
    {
      id: 8,
      name: 'Abeer - Gumelain',
      category: 'Abeer (Luxury)',
      icon: '🌟',
      recipe: [
        { materialId: 1, quantity: 5 },   // 5 pieces wood per batch
        { materialId: 2, quantity: 28 },  // 28g sandal powder per batch
        { materialId: 5, quantity: 15 },  // 15g sandalia per batch
        { materialId: 6, quantity: 16 },  // 16ml sandal oil per batch
        { materialId: 8, quantity: 12 },  // 12ml oils per batch
        { materialId: 10, quantity: 20 }, // 20g sugar per batch
        { materialId: 11, quantity: 18 }, // 18 stickers per batch
        { materialId: 13, quantity: 1 }   // 1 transport fare per batch
      ],
      outputPerBatch: 18, // 18 premium sticks per batch
      unit: 'luxury premium sticks',
      price: 9500 // Price in Naira
    },
    {
      id: 9,
      name: 'Abeer - Hijaaz',
      category: 'Abeer (Luxury)',
      icon: '🌟',
      recipe: [
        { materialId: 1, quantity: 7 },   // 7 pieces wood per batch
        { materialId: 2, quantity: 32 },  // 32g sandal powder per batch
        { materialId: 4, quantity: 14 },  // 14g jawee per batch
        { materialId: 6, quantity: 20 },  // 20ml sandal oil per batch
        { materialId: 8, quantity: 18 },  // 18ml oils per batch
        { materialId: 9, quantity: 3 },   // 3 pieces mask per batch
        { materialId: 10, quantity: 25 }, // 25g sugar per batch
        { materialId: 11, quantity: 22 }, // 22 stickers per batch
        { materialId: 13, quantity: 1 }   // 1 transport fare per batch
      ],
      outputPerBatch: 22, // 22 premium sticks per batch
      unit: 'luxury premium sticks',
      price: 11000 // Price in Naira
    },
    {
      id: 10,
      name: 'Abeer - Mihfaar',
      category: 'Abeer (Luxury)',
      icon: '🌟',
      recipe: [
        { materialId: 1, quantity: 5 },   // 5 pieces wood per batch
        { materialId: 2, quantity: 26 },  // 26g sandal powder per batch
        { materialId: 3, quantity: 12 },  // 12g farce per batch
        { materialId: 6, quantity: 15 },  // 15ml sandal oil per batch
        { materialId: 8, quantity: 14 },  // 14ml oils per batch
        { materialId: 10, quantity: 18 }, // 18g sugar per batch
        { materialId: 11, quantity: 19 }, // 19 stickers per batch
        { materialId: 13, quantity: 1 }   // 1 transport fare per batch
      ],
      outputPerBatch: 19, // 19 premium sticks per batch
      unit: 'luxury premium sticks',
      price: 9200 // Price in Naira
    },
    {
      id: 11,
      name: 'Abeer - Aaliyah',
      category: 'Abeer (Luxury)',
      icon: '🌟',
      recipe: [
        { materialId: 1, quantity: 6 },   // 6 pieces wood per batch
        { materialId: 2, quantity: 29 },  // 29g sandal powder per batch
        { materialId: 5, quantity: 16 },  // 16g sandalia per batch
        { materialId: 6, quantity: 17 },  // 17ml sandal oil per batch
        { materialId: 7, quantity: 10 },  // 10ml water base per batch
        { materialId: 8, quantity: 13 },  // 13ml oils per batch
        { materialId: 10, quantity: 21 }, // 21g sugar per batch
        { materialId: 11, quantity: 21 }, // 21 stickers per batch
        { materialId: 13, quantity: 1 }   // 1 transport fare per batch
      ],
      outputPerBatch: 21, // 21 premium sticks per batch
      unit: 'luxury premium sticks',
      price: 10500 // Price in Naira
    },
    {
      id: 12,
      name: 'Abeer - Sultana',
      category: 'Abeer (Luxury)',
      icon: '🌟',
      recipe: [
        { materialId: 1, quantity: 8 },   // 8 pieces wood per batch
        { materialId: 2, quantity: 35 },  // 35g sandal powder per batch
        { materialId: 4, quantity: 16 },  // 16g jawee per batch
        { materialId: 5, quantity: 18 },  // 18g sandalia per batch
        { materialId: 6, quantity: 22 },  // 22ml sandal oil per batch
        { materialId: 8, quantity: 20 },  // 20ml oils per batch
        { materialId: 9, quantity: 4 },   // 4 pieces mask per batch
        { materialId: 10, quantity: 28 }, // 28g sugar per batch
        { materialId: 11, quantity: 25 }, // 25 stickers per batch
        { materialId: 13, quantity: 1 }   // 1 transport fare per batch
      ],
      outputPerBatch: 25, // 25 premium sticks per batch
      unit: 'luxury premium sticks',
      price: 12500 // Price in Naira
    },
    {
      id: 13,
      name: 'Abeer - Ayush',
      category: 'Abeer (Luxury)',
      icon: '🌟',
      recipe: [
        { materialId: 1, quantity: 4 },   // 4 pieces wood per batch
        { materialId: 2, quantity: 24 },  // 24g sandal powder per batch
        { materialId: 3, quantity: 10 },  // 10g farce per batch
        { materialId: 7, quantity: 12 },  // 12ml water base per batch
        { materialId: 8, quantity: 11 },  // 11ml oils per batch
        { materialId: 10, quantity: 16 }, // 16g sugar per batch
        { materialId: 11, quantity: 17 }, // 17 stickers per batch
        { materialId: 13, quantity: 1 }   // 1 transport fare per batch
      ],
      outputPerBatch: 17, // 17 premium sticks per batch
      unit: 'luxury premium sticks',
      price: 8500 // Price in Naira
    },
    // Your Actual Areej Brand Products (From Excel Data)
    {
      id: 14,
      name: 'Areej - AREEJ',
      category: 'Areej (Standard)',
      icon: '🎋',
      recipe: [
        { materialId: 1, quantity: 5.5 },  // Wood cost ₦5,500
        { materialId: 2, quantity: 12 },   // Sandal Powder cost ₦3,000  
        { materialId: 3, quantity: 13.3 }, // Farce cost ₦2,000
        { materialId: 4, quantity: 2 },    // Jawee cost ₦1,000
        { materialId: 6, quantity: 13.3 }, // Sandal Oil cost ₦2,000
        { materialId: 7, quantity: 100 },  // Water Base cost ₦2,000
        { materialId: 8, quantity: 112 },  // Oils cost ₦11,200
        { materialId: 9, quantity: 3 },    // Mask cost ₦1,500
        { materialId: 10, quantity: 200 }, // Sugar cost ₦3,000
        { materialId: 11, quantity: 16.7 },// Stickers cost ₦5,000
        { materialId: 12, quantity: 8.75 },// Bottles cost ₦7,000
        { materialId: 13, quantity: 2 }    // Transport fare cost ₦10,000
      ],
      outputPerBatch: 9, // 9 pieces produced (from your Excel data)
      unit: 'pieces',
      price: 7000, // Your actual selling price ₦7,000
      totalCost: 53200, // Your actual total cost from Excel
      costPerUnit: 5911.11 // Your actual cost per unit
    },
    {
      id: 15,
      name: 'Areej - KAJIJI',
      category: 'Areej (Standard)',
      icon: '🎋',
      recipe: [
        { materialId: 1, quantity: 10 },   // Wood(3 Mudus) cost ₦10,000
        { materialId: 2, quantity: 12 },   // Sandal Powder cost ₦3,000
        { materialId: 3, quantity: 10 },   // Farce cost ₦1,500
        { materialId: 4, quantity: 2 },    // Jawee cost ₦1,000
        { materialId: 6, quantity: 20 },   // Sandal Oil cost ₦3,000
        { materialId: 7, quantity: 100 },  // Water Base cost ₦2,000
        { materialId: 8, quantity: 270 },  // Oils cost ₦27,000
        { materialId: 9, quantity: 4 },    // Mask cost ₦2,000
        { materialId: 10, quantity: 200 }, // Sugar cost ₦3,000
        { materialId: 11, quantity: 10 },  // Stickers cost ₦3,000
        { materialId: 12, quantity: 8.75 },// Bottles cost ₦7,000
        { materialId: 13, quantity: 2 },   // Transport fare cost ₦10,000
        // Arabian Oud Oil ₦3,000 (represented as additional oils)
      ],
      outputPerBatch: 25, // 25 pieces produced (from your Excel data)
      unit: 'pieces',
      price: 4000, // Your actual selling price ₦4,000
      totalCost: 75500, // Your actual total cost from Excel
      costPerUnit: 3020 // Your actual cost per unit
    },
    {
      id: 16,
      name: 'Areej - GAHR',
      category: 'Areej (Standard)',
      icon: '🎋',
      recipe: [
        { materialId: 1, quantity: 5.5 },  // Wood cost ₦5,500
        { materialId: 2, quantity: 12 },   // Sandal Powder cost ₦3,000
        { materialId: 3, quantity: 13.3 }, // Farce cost ₦2,000
        { materialId: 4, quantity: 3 },    // Jawee cost ₦1,500
        { materialId: 6, quantity: 13.3 }, // Sandal Oil cost ₦2,000
        { materialId: 7, quantity: 100 },  // Water Base cost ₦2,000
        { materialId: 8, quantity: 216 },  // Oils cost ₦21,600
        { materialId: 9, quantity: 4 },    // Mask cost ₦2,000
        { materialId: 10, quantity: 200 }, // Sugar cost ₦3,000
        { materialId: 11, quantity: 10 },  // Stickers cost ₦3,000
        { materialId: 12, quantity: 8.75 },// Bottles cost ₦7,000
        { materialId: 13, quantity: 2 }    // Transport fare cost ₦10,000
      ],
      outputPerBatch: 10, // 10 pieces produced (from your Excel data)
      unit: 'pieces',
      price: 8000, // Your actual selling price ₦8,000
      totalCost: 62600, // Your actual total cost from Excel
      costPerUnit: 6260 // Your actual cost per unit
    },
    {
      id: 17,
      name: 'Areej - OUD',
      category: 'Areej (Standard)',
      icon: '🎋',
      recipe: [
        { materialId: 1, quantity: 5.5 },  // Wood cost ₦5,500
        { materialId: 2, quantity: 12 },   // Sandal Powder cost ₦3,000
        { materialId: 3, quantity: 13.3 }, // Farce cost ₦2,000
        { materialId: 4, quantity: 2 },    // Jawee cost ₦1,000
        { materialId: 6, quantity: 13.3 }, // Sandal Oil cost ₦2,000
        { materialId: 7, quantity: 100 },  // Water Base cost ₦2,000
        { materialId: 8, quantity: 216 },  // Oils cost ₦21,600
        { materialId: 9, quantity: 4 },    // Mask cost ₦2,000
        { materialId: 10, quantity: 200 }, // Sugar cost ₦3,000
        { materialId: 11, quantity: 16.7 },// Stickers cost ₦5,000
        { materialId: 12, quantity: 8.75 },// Bottles cost ₦7,000
        { materialId: 13, quantity: 2 }    // Transport fare cost ₦10,000
      ],
      outputPerBatch: 17, // 17 pieces produced (from your Excel data)
      unit: 'pieces',
      price: 5500, // Your actual selling price ₦5,500
      totalCost: 64100, // Your actual total cost from Excel
      costPerUnit: 3770.59 // Your actual cost per unit
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
    recipe: [],
    selectedProductId: '',
    actualOutput: '',
    productionDate: new Date().toISOString().split('T')[0],
    materialsUsed: []
  });

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeNotification(id), 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Logo Helper Function
  const getProductIcon = (product) => {
    // Use emoji icons for all products
    return product.icon || '🧴';
  };

  // Production Calculator Functions
    if (!currentProduct.productId || !currentProduct.quantitySold || !currentProduct.sellingPricePerUnit) {
      addNotification('Please fill in all product fields', 'error');
      return;
    }

    const product = products.find(p => p.id === parseInt(currentProduct.productId));
    if (!product) {
      addNotification('Selected product not found', 'error');
      return;
    }

    // Check if product already exists in the sale
    const existingIndex = newSale.products.findIndex(p => p.productId === parseInt(currentProduct.productId));
    
    if (existingIndex >= 0) {
      // Update existing product
      const updatedProducts = [...newSale.products];
      updatedProducts[existingIndex] = {
        productId: parseInt(currentProduct.productId),
        productName: product.name,
        productIcon: product.icon,
        quantitySold: parseInt(currentProduct.quantitySold),
        sellingPricePerUnit: parseFloat(currentProduct.sellingPricePerUnit)
      };
      setNewSale(prev => ({ ...prev, products: updatedProducts }));
    } else {
      // Add new product
      const newProductItem = {
        productId: parseInt(currentProduct.productId),
        productName: product.name,
        productIcon: product.icon,
        quantitySold: parseInt(currentProduct.quantitySold),
        sellingPricePerUnit: parseFloat(currentProduct.sellingPricePerUnit)
      };
      setNewSale(prev => ({ ...prev, products: [...prev.products, newProductItem] }));
    }

    // Reset current product form
    setCurrentProduct({
      productId: '',
      quantitySold: '',
      sellingPricePerUnit: ''
    });
  };

  const removeProductFromSale = (productId) => {
    setNewSale(prev => ({
      ...prev,
      products: prev.products.filter(p => p.productId !== productId)
    }));
  };

  const addSaleRecord = () => {
    if (!newSale.customerInfo || newSale.products.length === 0) {
      addNotification('Please add customer info and at least one product', 'error');
      return;
    }

    // Create individual sale records for each product (for easier tracking and reporting)
    const saleRecords = newSale.products.map(productItem => {
      const product = products.find(p => p.id === productItem.productId);
      const productCost = calculateMaterialCost(product.id);
      const costPerUnit = product.outputPerBatch > 0 ? productCost / product.outputPerBatch : 0;
      
      const totalCost = costPerUnit * productItem.quantitySold;
      const totalRevenue = productItem.sellingPricePerUnit * productItem.quantitySold;
      const totalProfit = totalRevenue - totalCost;
      const marginPercent = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100) : 0;

      return {
        id: Math.max(...salesRecords.map(s => s.id), 0) + Math.random(), // Temporary unique ID
        date: newSale.date,
        productId: product.id,
        productName: product.name,
        productIcon: product.icon,
        quantitySold: productItem.quantitySold,
        costPerUnit,
        sellingPricePerUnit: productItem.sellingPricePerUnit,
        totalCost,
        totalRevenue,
        totalProfit,
        marginPercent,
        customerInfo: newSale.customerInfo,
        paymentMethod: newSale.paymentMethod,
        notes: newSale.notes,
        isMultiProductSale: newSale.products.length > 1,
        saleGroup: Date.now(), // Group ID for multi-product sales
        createdAt: new Date().toISOString()
      };
    });

    // Assign proper IDs
    const maxId = Math.max(...salesRecords.map(s => s.id), 0);
    saleRecords.forEach((record, index) => {
      record.id = maxId + index + 1;
    });

    setSalesRecords(prev => [...saleRecords, ...prev]);
    
    // Reset form
    setNewSale({
      date: new Date().toISOString().split('T')[0],
      customerInfo: '',
      paymentMethod: 'cash',
      notes: '',
      products: []
    });
    setCurrentProduct({
      productId: '',
      quantitySold: '',
      sellingPricePerUnit: ''
    });
    setShowSalesForm(false);
    
    const productCount = saleRecords.length;
    const totalRevenue = saleRecords.reduce((sum, record) => sum + record.totalRevenue, 0);
    addNotification(`Sale recorded: ${productCount} product${productCount > 1 ? 's' : ''}, ₦${totalRevenue.toLocaleString()} total revenue`, 'success');
  };

  const deleteSaleRecord = (saleId) => {
    const sale = salesRecords.find(s => s.id === saleId);
    if (sale && window.confirm(`Are you sure you want to delete this sale record?`)) {
      setSalesRecords(prev => prev.filter(s => s.id !== saleId));
      addNotification('Sale record deleted successfully!', 'success');
    }
  };

  const filteredSales = salesRecords.filter(sale => {
    const matchesDate = salesDateFilter === '' || sale.date === salesDateFilter;
    const matchesProduct = salesProductFilter === '' || sale.productId === parseInt(salesProductFilter);
    return matchesDate && matchesProduct;
  });

  // Group sales by date for daily summaries
  const salesByDate = filteredSales.reduce((acc, sale) => {
    if (!acc[sale.date]) {
      acc[sale.date] = [];
    }
    acc[sale.date].push(sale);
    return acc;
  }, {});

  const getDailySummary = (sales) => {
    return sales.reduce((summary, sale) => ({
      totalRevenue: summary.totalRevenue + sale.totalRevenue,
      totalCost: summary.totalCost + sale.totalCost,
      totalProfit: summary.totalProfit + sale.totalProfit,
      totalItems: summary.totalItems + sale.quantitySold
    }), { totalRevenue: 0, totalCost: 0, totalProfit: 0, totalItems: 0 });
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
    
    // For Areej products from Excel data, use the actual total cost
    if (product.totalCost && [14, 15, 16, 17].includes(product.id)) {
      return product.totalCost;
    }
    
    // For other products, calculate from recipe
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
        recipe: [],
        selectedProductId: '',
        actualOutput: '',
        productionDate: new Date().toISOString().split('T')[0],
        materialsUsed: []
      });
      
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

  // CSV Template Functions
  const downloadTemplate = () => {
    const headers = [
      'Product Name',
      'Category',
      'INGREDIENTS',
      'COST',
      'Quantity Produced',
      'Unit',
      'Cost per Unit (₦)',
      'Selling Price (₦)'
    ];
    
    const sampleData = [
      [
        'AREEJ',
        'Areej (Standard)',
        'Wood + Sandal Powder + Farce + Jawee + Sandal Oil + Water Base + Oils + Mask + Sugar + Stickers + Bottles + Transport Fare',
        '53200',
        '9',
        'pieces',
        '5911.11',
        '7000'
      ],
      [
        'KAJIJI',
        'Areej (Standard)', 
        'Wood(3 Mudus) + Sandal Powder + Farce + Jawee + Sandal Oil + Water Base + Oils + Mask + Sugar + Stickers + Bottles + Transport Fare + Arabian Oud Oil',
        '75500',
        '25',
        'pieces',
        '3020',
        '4000'
      ],
      [
        'GAHR',
        'Areej (Standard)',
        'Wood + Sandal Powder + Farce + Jawee + Sandal Oil + Water Base + Oils + Mask + Sugar + Stickers + Bottles + Transport Fare',
        '62600',
        '10',
        'pieces',
        '6260',
        '8000'
      ],
      [
        'OUD',
        'Areej (Standard)',
        'Wood + Sandal Powder + Farce + Jawee + Sandal Oil + Water Base + Oils + Mask + Sugar + Stickers + Bottles + Transport Fare',
        '64100',
        '17',
        'pieces',
        '3770.59',
        '5500'
      ],
      [
        'Sample New Product',
        'Khumra',
        'Sandal Powder + Premium Oil + Water Base + Special Essence + Bottles + Transport',
        '45000',
        '12',
        'bottles',
        '3750',
        '5000'
      ]
    ];
    
    const instructions = [
      '# MANUFACTURING TEMPLATE - Manual Calculation Process',
      '# Matches Your Process: Sum Ingredients → Weigh into Bottles → Divide for Cost per Unit',
      '',
      '# Your Manual Process:',
      '# 1. Sum all ingredient costs (Wood + Sandal Powder + Oils + Transport + etc.)',
      '# 2. Weigh ingredients into bottles manually',
      '# 3. Count actual quantity produced (pieces/bottles weighed)',
      '# 4. Calculate: Total Cost ÷ Actual Quantity = Cost per Unit',
      '',
      '# CSV Format Instructions:',
      '# - Product Name: Your product name (Areej, Kajiji, Gahr, etc.)',
      '# - Category: Khumra, Abeer (Luxury), or Areej (Standard)',
      '# - INGREDIENTS: List what you used (Wood + Sandal Powder + Oils + Transport)',
      '# - COST: Total cost you calculated manually (₦53,200)',
      '# - Quantity Produced: Actual pieces/bottles you weighed (9 pieces)',
      '# - Unit: pieces, bottles, sets, etc.',
      '# - Cost per Unit: System calculates (₦53,200 ÷ 9 = ₦5,911.11)',
      '# - Selling Price: Your selling price per unit (₦7,000)',
      '',
      '# Examples from Your Actual Excel Data:',
      '# AREEJ: Sum to ₦53,200 → Weigh 9 pieces → ₦5,911.11 each → Sell ₦7,000',
      '# KAJIJI: Sum to ₦75,500 → Weigh 25 pieces → ₦3,020 each → Sell ₦4,000',
      '# GAHR: Sum to ₦62,600 → Weigh 10 pieces → ₦6,260 each → Sell ₦8,000',
      '# OUD: Sum to ₦64,100 → Weigh 17 pieces → ₦3,770.59 each → Sell ₦5,500',
      ''
    ];
    
    const csvContent = [
      ...instructions,
      headers.join(','),
      ...sampleData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'abeer_manufacturing_template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    addNotification('Manual Calculation Template downloaded! Matches your sum→weigh→divide process.', 'success');
  };
  
  const parseCSV = (text) => {
    const lines = text.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    const headers = lines[0].split(',').map(h => h.trim());
    const data = lines.slice(1);
    
    return data.map(line => {
      const values = line.split(',').map(v => v.trim());
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      return row;
    });
  };
  
  const uploadTemplate = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvData = parseCSV(e.target.result);
        let successCount = 0;
        let errorCount = 0;
        
        csvData.forEach((row, index) => {
          try {
            if (!row['Product Name'] || !row['Category'] || !row['COST'] || !row['Quantity Produced']) {
              throw new Error('Missing required fields: Product Name, Category, COST, or Quantity Produced');
            }
            
            const totalCost = parseFloat(row['COST']) || 0;
            const quantityProduced = parseInt(row['Quantity Produced']) || 1;
            const costPerUnit = quantityProduced > 0 ? totalCost / quantityProduced : 0;
            const sellingPrice = parseFloat(row['Selling Price (₦)']) || (costPerUnit * 1.5); // Default to 50% markup
            const unit = row['Unit'] || 'pieces';
            
            // Parse ingredients from the INGREDIENTS column
            const ingredientsText = row['INGREDIENTS'] || '';
            const ingredientsList = ingredientsText.split('+').map(ing => ing.trim()).filter(ing => ing.length > 0);
            
            const newProduct = {
              id: Date.now() + index,
              name: row['Product Name'],
              category: row['Category'],
              icon: row['Category'].includes('Khumra') ? '🧴' : 
                    row['Category'].includes('Abeer') ? '🌟' : '🎋',
              price: sellingPrice,
              outputPerBatch: quantityProduced,
              unit: unit,
              recipe: [], // Will be empty for imported products unless we have detailed breakdown
              manufacturingData: {
                totalCost: totalCost,
                quantityProduced: quantityProduced,
                costPerUnit: costPerUnit,
                ingredients: ingredientsList,
                rawIngredientsText: ingredientsText
              }
            };
            
            setProducts(prev => [...prev, newProduct]);
            successCount++;
          } catch (error) {
            console.error(`Error processing row ${index + 1}:`, error);
            errorCount++;
          }
        });
        
        if (successCount > 0) {
          addNotification(`Successfully imported ${successCount} manufacturing records! ${errorCount > 0 ? `${errorCount} rows had errors.` : ''}`, 'success');
        } else {
          addNotification('No products were imported. Please check your file format matches the template.', 'error');
        }
      } catch (error) {
        addNotification('Error reading file. Please ensure format matches the downloaded template.', 'error');
        console.error('CSV upload error:', error);
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    event.target.value = '';
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
    { id: 'sales', label: 'Sales', icon: '🛒', color: '#8B4513' },
    { id: 'inventory', label: 'Inventory', icon: '📦', color: '#D2691E' },
    { id: 'distribution', label: 'Distribution', icon: '📍', color: '#CD853F' },
    { id: 'reports', label: 'Reports', icon: '📊', color: '#DEB887' },
    { id: 'config', label: 'Configuration', icon: '⚙️', color: '#6B7280' }
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
                Manage your raw materials and record production with actual materials used.
              </p>
              
              {/* Raw Materials Table */}
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ color: theme.textPrimary, fontSize: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                        <th style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>Actions</th>
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
                          <td style={{ padding: '16px', textAlign: 'center' }}>
                            <button
                              onClick={() => addNotification(`${material.name} updated successfully!`, 'success')}
                              style={{
                                background: 'rgba(139, 69, 19, 0.1)',
                                color: '#8B4513',
                                border: '1px solid rgba(139, 69, 19, 0.3)',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                cursor: 'pointer',
                                fontWeight: '600'
                              }}
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Add Production Section */}
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ color: theme.textPrimary, fontSize: '20px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🏭 Record Production
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
                    ➕ Add Production
                  </button>
                </div>
                
                {/* Production Form */}
                {showProductForm && (
                  <div style={{
                    background: 'white',
                    border: '2px solid rgba(139, 69, 19, 0.2)',
                    padding: '24px',
                    borderRadius: '12px',
                    marginBottom: '30px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}>
                    <h4 style={{ color: theme.textPrimary, fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      📝 Record New Production
                    </h4>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                      {/* Product Selection */}
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                          Select Product *
                        </label>
                        <select
                          value={newProduct.selectedProductId || ''}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, selectedProductId: e.target.value }))}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        >
                          <option value="">Choose a product...</option>
                          {products.map(product => (
                            <option key={product.id} value={product.id}>
                              {getProductIcon(product)} {product.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Actual Output Produced */}
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                          Actual Quantity Produced *
                        </label>
                        <input
                          type="number"
                          value={newProduct.actualOutput || ''}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, actualOutput: parseInt(e.target.value) || '' }))}
                          placeholder="e.g., 45 pieces"
                          min="1"
                          style={{
                            width: '100%',
                            padding: '10px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                          }}
                        />
                        {newProduct.selectedProductId && (
                          <small style={{ color: theme.textSecondary, fontSize: '12px', marginTop: '4px', display: 'block' }}>
                            Unit: {products.find(p => p.id === parseInt(newProduct.selectedProductId))?.unit || 'units'}
                          </small>
                        )}
                      </div>
                      
                      {/* Production Date */}
                      <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                          Production Date *
                        </label>
                        <input
                          type="date"
                          value={newProduct.productionDate || new Date().toISOString().split('T')[0]}
                          onChange={(e) => setNewProduct(prev => ({ ...prev, productionDate: e.target.value }))}
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
                    
                    {/* Raw Materials Used Table */}
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '12px', fontSize: '14px', fontWeight: '600', color: theme.textPrimary }}>
                        Raw Materials Used in This Production *
                      </label>
                      
                      <div style={{
                        background: 'rgba(139, 69, 19, 0.02)',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid rgba(139, 69, 19, 0.1)'
                      }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{ background: 'rgba(139, 69, 19, 0.1)' }}>
                              <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: theme.textPrimary }}>Material</th>
                              <th style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: theme.textPrimary }}>Quantity Used</th>
                              <th style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: theme.textPrimary }}>Unit</th>
                              <th style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: theme.textPrimary }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(newProduct.materialsUsed || []).map((material, index) => {
                              const rawMaterial = rawMaterials.find(rm => rm.id === material.materialId);
                              const costPerUnit = rawMaterial ? (rawMaterial.cost / rawMaterial.quantity) : 0;
                              const totalCost = material.quantityUsed * costPerUnit;
                              
                              return (
                                <tr key={index} style={{ borderBottom: '1px solid rgba(139, 69, 19, 0.1)' }}>
                                  <td style={{ padding: '12px' }}>
                                    <select
                                      value={material.materialId || ''}
                                      onChange={(e) => {
                                        const updatedMaterials = [...(newProduct.materialsUsed || [])];
                                        updatedMaterials[index] = { ...updatedMaterials[index], materialId: parseInt(e.target.value) };
                                        setNewProduct(prev => ({ ...prev, materialsUsed: updatedMaterials }));
                                      }}
                                      style={{
                                        width: '100%',
                                        padding: '6px 8px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '4px',
                                        fontSize: '13px'
                                      }}
                                    >
                                      <option value="">Select material...</option>
                                      {rawMaterials.map(rm => (
                                        <option key={rm.id} value={rm.id}>{rm.name}</option>
                                      ))}
                                    </select>
                                  </td>
                                  <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <input
                                      type="number"
                                      value={material.quantityUsed || ''}
                                      onChange={(e) => {
                                        const updatedMaterials = [...(newProduct.materialsUsed || [])];
                                        updatedMaterials[index] = { ...updatedMaterials[index], quantityUsed: parseFloat(e.target.value) || 0 };
                                        setNewProduct(prev => ({ ...prev, materialsUsed: updatedMaterials }));
                                      }}
                                      placeholder="0"
                                      min="0"
                                      step="0.1"
                                      style={{
                                        width: '80px',
                                        padding: '6px 8px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '4px',
                                        textAlign: 'center'
                                      }}
                                    />
                                  </td>
                                  <td style={{ padding: '12px', textAlign: 'center', color: theme.textSecondary, fontSize: '13px' }}>
                                    {rawMaterial?.unit || '-'}
                                  </td>
                                  <td style={{ padding: '12px', textAlign: 'center' }}>
                                    <button
                                      onClick={() => {
                                        const updatedMaterials = (newProduct.materialsUsed || []).filter((_, i) => i !== index);
                                        setNewProduct(prev => ({ ...prev, materialsUsed: updatedMaterials }));
                                      }}
                                      style={{
                                        background: '#dc2626',
                                        color: 'white',
                                        border: 'none',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
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
                        
                        <div style={{ padding: '12px', textAlign: 'center', borderTop: '1px solid rgba(139, 69, 19, 0.1)' }}>
                          <button
                           
                            onClick={() => {
                              const currentMaterials = newProduct.materialsUsed || [];
                              setNewProduct(prev => ({ 
                                ...prev, 
                                materialsUsed: [...currentMaterials, { materialId: '', quantityUsed: 0 }] 
                              }));
                            }}
                            style={{
                              background: 'rgba(139, 69, 19, 0.1)',
                              color: '#8B4513',
                              border: '1px solid rgba(139, 69, 19, 0.3)',
                              padding: '8px 16px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              cursor: 'pointer',
                              fontWeight: '600'
                            }}
                          >
                            + Add Material
                          </button>
                        </div>
                      </div>
                      
                      {/* Production Summary */}
                      {newProduct.selectedProductId && newProduct.actualOutput && (
                        <div style={{
                          background: 'rgba(139, 69, 19, 0.05)',
                          padding: '16px',
                          borderRadius: '8px',
                          marginBottom: '20px',
                          border: '1px solid rgba(139, 69, 19, 0.1)'
                        }}>
                          <h5 style={{ margin: '0 0 12px 0', color: theme.textPrimary, fontSize: '14px', fontWeight: '600' }}>
                            Production Summary
                          </h5>
                          {(() => {
                            const selectedProduct = products.find(p => p.id === parseInt(newProduct.selectedProductId));
                            const actualOutput = newProduct.actualOutput || 0;
                            const pricePerUnit = selectedProduct ? selectedProduct.price : 0;
                            // Calculate total revenue based on actual output
                            const totalRevenue = actualOutput * pricePerUnit;
                            
                            return (
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', fontSize: '13px' }}>
                                <div>
                                  <span style={{ color: theme.textSecondary }}>Actual Output: </span>
                                  <span style={{ fontWeight: '600', color: theme.textPrimary }}>{actualOutput} {selectedProduct?.unit}</span>
                                </div>
                                <div>
                                  <span style={{ color: theme.textSecondary }}>Selling Price: </span>
                                  <span style={{ fontWeight: '600', color: '#10b981' }}>₦{pricePerUnit.toLocaleString()} each</span>
                                </div>
                                <div>
                                  <span style={{ color: theme.textSecondary }}>Total Revenue: </span>
                                  <span style={{ fontWeight: '600', color: '#27AE60' }}>₦{totalRevenue.toLocaleString()}</span>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      )}
                      
                      {/* Form Actions */}
                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => {
                            setShowProductForm(false);
                            setNewProduct({
                              name: '',
                              category: 'Khumra',
                              icon: '🧴',
                              price: '',
                              outputPerBatch: '',
                              unit: '',
                              recipe: [],
                              selectedProductId: '',
                              actualOutput: '',
                              productionDate: new Date().toISOString().split('T')[0],
                              materialsUsed: []
                            });
                          }}
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
                          onClick={() => {
                            // Validate and record production
                            if (newProduct.selectedProductId && newProduct.actualOutput && newProduct.materialsUsed && newProduct.materialsUsed.length > 0) {
                              const productId = parseInt(newProduct.selectedProductId);
                              const actualOutput = newProduct.actualOutput;
                              const materialsUsed = newProduct.materialsUsed;
                              
                              // Update raw material quantities
                              materialsUsed.forEach(material => {
                                const rawMaterial = rawMaterials.find(rm => rm.id === material.materialId);
                                if (rawMaterial) {
                                  updateMaterialQuantity(material.materialId, rawMaterial.quantity - material.quantityUsed);
                                }
                              });
                              
                              // Add production notification
                              const producedProduct = products.find(p => p.id === productId);
                              addNotification(`Production recorded! Made ${actualOutput} ${producedProduct.unit} of ${producedProduct.name} 🎉`, 'success');
                              
                              // Reset form
                              setShowProductForm(false);
                              setNewProduct({
                                name: '',
                                category: 'Khumra',
                                icon: '🧴',
                                price: '',
                                outputPerBatch: '',
                                unit: '',
                                recipe: [],
                                selectedProductId: '',
                                actualOutput: '',
                                productionDate: new Date().toISOString().split('T')[0],
                                materialsUsed: []
                              });
                            } else {
                              addNotification('Please fill all required fields and add at least one material', 'error');
                            }
                          }}
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
                          Record Production
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'products' && (
                <div>
                  <p style={{ color: theme.textSecondary, fontSize: '16px', marginBottom: '30px' }}>
                    View your complete product catalog with costs and selling prices organized by category.
                  </p>
                  
                  {/* Products by Category */}
                  {['Khumra', 'Abeer (Luxury)', 'Areej (Standard)'].map(category => {
                    const categoryProducts = products.filter(p => p.category === category);
                    if (categoryProducts.length === 0) return null;
                    
                    return (
                      <div key={category} style={{ marginBottom: '40px' }}>
                        <h3 style={{ 
                          color: theme.textPrimary, 
                          fontSize: '20px', 
                          marginBottom: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          {(() => {
                            // Use appropriate emoji based on category
                            if (category.includes('Abeer')) return '🌟';
                            if (category.includes('Areej')) return '🎋';
                            return categoryProducts[0]?.icon || '🧴'; // Fallback for Khumra
                          })()} {category} Products
                        </h3>
                        
                        <div style={{
                          background: 'white',
                          borderRadius: '12px',
                          padding: '24px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          border: '1px solid #e5e7eb'
                        }}>
                          <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                              <thead>
                                <tr style={{ borderBottom: '2px solid #f3f4f6' }}>
                                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: theme.textPrimary }}>Product Name</th>
                                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: theme.textPrimary }}>Cost Price</th>
                                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: theme.textPrimary }}>Selling Price</th>
                                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: theme.textPrimary }}>Profit per Unit</th>
                                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: theme.textPrimary }}>Margin %</th>
                                </tr>
                              </thead>
                              <tbody>
                                {categoryProducts.map(product => {
                                  const productCost = calculateMaterialCost(product.id);
                                  const defaultCostPerUnit = product.outputPerBatch > 0 ? productCost / product.outputPerBatch : 0;
                                  const costPerUnit = product.costPrice !== undefined ? product.costPrice : defaultCostPerUnit;
                                  const profit = product.price - costPerUnit;
                                  const profitMargin = product.price > 0 ? ((profit / product.price) * 100) : 0;
                                  
                                  return (
                                    <tr key={product.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                      <td style={{ 
                                        padding: '12px', 
                                        fontWeight: '500', 
                                        color: theme.textPrimary,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                      }}>
                                        <span style={{ fontSize: '16px' }}>{getProductIcon(product)}</span>
                                        {product.name}
                                      </td>
                                      <td style={{ padding: '12px', color: theme.textPrimary, fontWeight: '500' }}>
                                        ₦{costPerUnit.toFixed(2)}
                                      </td>
                                      <td style={{ padding: '12px', color: theme.textPrimary, fontWeight: '600' }}>
                                        ₦{product.price.toLocaleString()}
                                      </td>
                                      <td style={{ 
                                        padding: '12px', 
                                        color: profit > 0 ? '#10b981' : '#ef4444',
                                        fontWeight: '600'
                                      }}>
                                        ₦{profit.toFixed(2)}
                                      </td>
                                      <td style={{ padding: '12px' }}>
                                        <span style={{
                                          background: profitMargin > 30 ? '#10b981' : profitMargin > 15 ? '#f59e0b' : '#ef4444',
                                          color: 'white',
                                          padding: '4px 8px',
                                          borderRadius: '12px',
                                          fontSize: '12px',
                                          fontWeight: '600'
                                        }}>
                                          {profitMargin.toFixed(1)}%
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                          
                          {/* Category Summary */}
                          <div style={{
                            marginTop: '20px',
                            padding: '16px',
                            background: '#f9fafb',
                            borderRadius: '8px',
                            border: '1px solid #e5e7eb'
                          }}>
                            {(() => {
                              const totalProducts = categoryProducts.length;
                              const avgMargin = categoryProducts.reduce((acc, product) => {
                                const productCost = calculateMaterialCost(product.id);
                                const defaultCostPerUnit = product.outputPerBatch > 0 ? productCost / product.outputPerBatch : 0;
                                const costPerUnit = product.costPrice !== undefined ? product.costPrice : defaultCostPerUnit;
                                const profit = product.price - costPerUnit;
                                const margin = product.price > 0 ? ((profit / product.price) * 100) : 0;
                                return acc + margin;
                              }, 0) / totalProducts;
                              
                              const totalRevenue = categoryProducts.reduce((acc, product) => {
                                return acc + (product.price * product.outputPerBatch);
                              }, 0);
                              
                              const totalCost = categoryProducts.reduce((acc, product) => {
                                const productCost = calculateMaterialCost(product.id);
                                const defaultCostPerUnit = product.outputPerBatch > 0 ? productCost / product.outputPerBatch : 0;
                                const costPerUnit = product.costPrice !== undefined ? product.costPrice : defaultCostPerUnit;
                                return acc + (costPerUnit * product.outputPerBatch);
                              }, 0);
                              
                              const totalProfit = totalRevenue - totalCost;
                              
                              return (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                                  <div>
                                    <span style={{ fontSize: '12px', color: theme.textSecondary, display: 'block' }}>Products in Category:</span>
                                    <span style={{ fontSize: '18px', fontWeight: '600', color: theme.textPrimary }}>{totalProducts}</span>
                                  </div>
                                  <div>
                                    <span style={{ fontSize: '12px', color: theme.textSecondary, display: 'block' }}>Average Margin:</span>
                                    <span style={{ 
                                      fontSize: '18px', 
                                      fontWeight: '600',
                                      color: avgMargin > 30 ? '#10b981' : avgMargin > 15 ? '#f59e0b' : '#ef4444'
                                    }}>
                                      {avgMargin.toFixed(1)}%
                                    </span>
                                  </div>
                                  <div>
                                    <span style={{ fontSize: '12px', color: theme.textSecondary, display: 'block' }}>Total Revenue per Batch:</span>
                                    <span style={{ fontSize: '18px', fontWeight: '600', color: theme.textPrimary }}>
                                      ₦{totalRevenue.toLocaleString()}
                                    </span>
                                  </div>
                                  <div>
                                    <span style={{ fontSize: '12px', color: theme.textSecondary, display: 'block' }}>Total Cost per Batch:</span>
                                    <span style={{ fontSize: '18px', fontWeight: '600', color: theme.textPrimary }}>
                                      ₦{totalCost.toLocaleString()}
                                    </span>
                                  </div>
                                  <div>
                                    <span style={{ fontSize: '12px', color: theme.textSecondary, display: 'block' }}>Total Profit per Batch:</span>
                                    <span style={{ 
                                      fontSize: '18px', 
                                      fontWeight: '600',
                                      color: totalProfit > 0 ? '#10b981' : '#ef4444'
                                    }}>
                                      ₦{totalProfit.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              )}
              
              {activeTab === 'sales' && (
                <div>
                  <p style={{ color: theme.textSecondary, fontSize: '16px', marginBottom: '30px' }}>
                    Track your daily sales, record transactions, and monitor profit margins by product and customer.
                  </p>
                  
                  <div style={{
                    background: 'white',
                    borderRadius: '8px',
                    padding: '20px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    border: '1px solid #e5e7eb'
                  }}>
                    <h3 style={{ marginBottom: '20px', color: theme.textPrimary }}>Sales Dashboard</h3>
                    <p>Sales functionality will be implemented here.</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'config' && (
            <div>
              <p style={{ color: theme.textSecondary, fontSize: '16px', marginBottom: '30px' }}>
                Configure pricing, manage products, customers, and system settings through organized tabs.
              </p>
              
              {/* Config Tab Navigation */}
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '30px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  marginBottom: '30px',
                  borderBottom: '1px solid #e5e7eb',
                  paddingBottom: '16px'
                }}>
                  {[
                    { id: 'pricing', label: 'Pricing', icon: '💰' },
                    { id: 'products', label: 'Product Creation', icon: '🧴' },
                    { id: 'customers', label: 'Customer Management', icon: '👥' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveConfigTab(tab.id)}
                      style={{
                        background: activeConfigTab === tab.id ? theme.primary : 'transparent',
                        color: activeConfigTab === tab.id ? 'white' : theme.textPrimary,
                        border: `1px solid ${activeConfigTab === tab.id ? theme.primary : '#e5e7eb'}`,
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>
                
                {/* Configuration content would go here based on activeConfigTab */}
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <h4 style={{ color: theme.textPrimary, fontSize: '18px', marginBottom: '12px' }}>
                    {activeConfigTab === 'pricing' && '💰 Pricing Management'}
                    {activeConfigTab === 'products' && '🧴 Product Creation'}
                    {activeConfigTab === 'customers' && '👥 Customer Management'}
                  </h4>
                  <p style={{ color: theme.textSecondary, fontSize: '16px' }}>
                    {activeConfigTab === 'pricing' && 'Manage raw material costs and product pricing strategies.'}
                    {activeConfigTab === 'products' && 'Create and configure new products with recipes and pricing.'}
                    {activeConfigTab === 'customers' && 'Add and manage customer information and relationships.'}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab !== 'dashboard' && activeTab !== 'products' && activeTab !== 'production' && activeTab !== 'config' && activeTab !== 'sales' && (
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
