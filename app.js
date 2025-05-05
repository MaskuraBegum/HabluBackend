// app.js

const express = require('express');
const cors = require('cors');
const matchRoutes = require('./routes/jobRoute');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route - basic server check
app.get('/', (req, res) => {
  res.send('🎯 Welcome to Skill2Job API!');
});

// Job matching route
app.use('/api', matchRoutes);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
