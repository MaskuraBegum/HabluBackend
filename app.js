require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
const { importJobs } = require('./controllers/importController'); // Import the import function
const matchRoutes = require('./routes/jobRoute');
const planer_route = require("./routes/planner");


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: '*', // Allow requests from your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('🎯 Welcome to Skill2Job API!');
});

app.use('/api', matchRoutes);
try {
  const planner_route = require("./routes/planner");
  app.use('/planer', planner_route);
  console.log("✅ planner route registered");
  const chatMoodRouter = require("./routes/mod");
  app.use('/mod', chatMoodRouter)
  console.log("done")
} catch (err) {
  console.error("❌ Failed to load planner route:", err);
}

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});


// MongoDB connection and server start
connectDB(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    
    // Call importJobs function to insert jobs into MongoDB automatically
    importJobs();  // This will execute the function when the server starts

    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
