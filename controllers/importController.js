const Job = require('../models/MatchedJob'); // Your job model
const jobs = require('../data/jobs.json');   // Your JSON data file

const importJobs = async () => {
  try {
    console.log("Inserting jobs...");
    await Job.insertMany(jobs);  // Insert all jobs into MongoDB database
    console.log('✅ Jobs imported successfully into MongoDB');
  } catch (error) {
    console.error('❌ Import error:', error);  // Log any errors
  }
};

module.exports = { importJobs };
