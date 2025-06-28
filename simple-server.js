#!/usr/bin/env node

// Simple development server script
const express = require('express');
const path = require('path');

const app = express();
const PORT = 5173;

// Serve static files from the src directory
app.use(express.static('.'));
app.use(express.static('src'));

// Serve the main HTML file for all routes (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✨ Development server running at http://localhost:${PORT}`);
  console.log('📦 Your Incense & Bakhoor Business Management App is ready!');
});
