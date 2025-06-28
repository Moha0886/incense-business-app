# Abeer Incense Business Management System

## Project Overview
A modern, professional React application for managing Abeer's luxury incense and bakhoor business operations in Nigeria. Built with Vite + React and featuring a beautiful glass morphism UI design.

## Company Branding
- **Luxury Brand**: Abeer
- **Normal Brand**: Areej
- **Instagram**: @abeer.ng
- **Currency**: Nigerian Naira (NGN)

## ✅ Completed Features

### 🎨 Modern UI/UX Design
- **Glass Morphism Design**: Transparent cards with backdrop blur effects
- **Gradient Backgrounds**: Beautiful color gradients throughout the app
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between dark and light themes
- **Animated Components**: Smooth transitions and hover effects
- **Professional Typography**: Clean, modern font choices

### 📊 Business Management Features

#### 🏭 Production Management
- ✅ Pre-loaded Areej recipe with 13 ingredients and costs
- ✅ Custom product creation and batch tracking
- ✅ Cost calculation and profit analysis
- ✅ Automatic inventory updates after production
- ✅ Production history with edit/delete functionality

#### 🛒 Sales Management
- ✅ Customer transaction recording
- ✅ Location-based sales tracking (Kano, Kaduna, Online, etc.)
- ✅ Payment method tracking (Cash, Bank Transfer, POS, Credit)
- ✅ Profit calculation per sale
- ✅ Advanced search and filtering
- ✅ Sort by date, amount, profit, product, customer
- ✅ Inventory validation and automatic stock updates

#### 📦 Inventory Management
- ✅ Real-time stock tracking
- ✅ Cost per unit and selling price management
- ✅ Low stock alerts and indicators
- ✅ Last updated timestamps
- ✅ Inventory value calculations
- ✅ Product performance metrics

#### 🚚 Distribution Management
- ✅ Multi-location distribution tracking
- ✅ Default locations (Main Store, Kano Market, Kaduna Branch)
- ✅ Custom location management
- ✅ Distribution history and analytics
- ✅ Units distributed tracking

#### 📈 Reports & Analytics
- ✅ Comprehensive Profit & Loss reports
- ✅ Product performance analysis
- ✅ Location-based performance metrics
- ✅ Date range filtering
- ✅ Inventory summary reports
- ✅ Visual charts and graphs
- ✅ Export functionality

### 🔧 Technical Features

#### 📱 User Experience
- ✅ **AnimatedStatCard**: Beautiful animated statistics cards
- ✅ **Loading States**: Smooth loading animations
- ✅ **Search & Filter**: Advanced search across all modules
- ✅ **Notifications System**: Success/error notifications
- ✅ **Keyboard Shortcuts**: Quick navigation and actions
- ✅ **Data Visualization**: Simple charts and graphs

#### 💾 Data Management
- ✅ **LocalStorage Persistence**: All data saved locally
- ✅ **Data Validation**: Form validation and error handling
- ✅ **Real-time Updates**: Live inventory and stats updates
- ✅ **Data Export**: Report export functionality

#### 🎯 Business Logic
- ✅ **Automatic Calculations**: Profit, totals, margins
- ✅ **Inventory Validation**: Stock checks before sales
- ✅ **Cost Tracking**: Detailed cost analysis
- ✅ **Performance Metrics**: KPIs and business insights

## 🗂️ Project Structure
```
src/
├── components/
│   ├── Dashboard.jsx          # Main dashboard with overview
│   ├── Production.jsx         # Production management
│   ├── Sales.jsx             # Sales tracking
│   ├── Inventory.jsx         # Stock management
│   ├── Distribution.jsx      # Distribution tracking
│   ├── Reports.jsx           # Analytics & reports
│   ├── AnimatedStatCard.jsx  # Animated statistics component
│   ├── QuickStatsWidget.jsx  # Quick stats display
│   ├── LoadingSpinner.jsx    # Loading animations
│   └── SimpleChart.jsx       # Data visualization
├── App.jsx                   # Main app with navigation
└── main.jsx                  # App entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Key Metrics Tracked
- **Production**: Total batches, costs, units produced
- **Sales**: Revenue, profit, transaction count, customer data
- **Inventory**: Stock levels, values, low stock alerts
- **Distribution**: Locations served, units distributed
- **Financial**: Profit/loss, margins, cost analysis

## 🎨 Design System
- **Primary Colors**: Green gradients for Abeer branding
- **Typography**: Modern, clean fonts with proper hierarchy
- **Spacing**: Consistent padding and margins
- **Components**: Reusable, modular design components
- **Interactions**: Smooth hover effects and transitions

## 🔮 Future Enhancements
- Advanced data visualization with more chart types
- Data import/export in multiple formats (CSV, Excel)
- User authentication and multi-user support
- Cloud data synchronization
- Mobile app version
- Barcode scanning integration
- Automated low stock notifications
- Advanced reporting with custom date ranges

## 📱 Responsive Design
The application is fully responsive and works seamlessly across:
- **Desktop**: Full feature set with sidebar navigation
- **Tablet**: Optimized layout with collapsible sidebar
- **Mobile**: Touch-friendly interface with mobile navigation

## ⚡ Performance Features
- Lazy loading of components
- Optimized re-renders with React best practices
- Efficient state management
- Smooth animations and transitions
- Fast startup and navigation

## 🔒 Data Security
- Local data storage for privacy
- Form validation and sanitization
- Error handling and recovery
- Data backup recommendations

---

**Built with ❤️ for Abeer Luxury Incense Business**
*Helping transform traditional business operations with modern technology*+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
