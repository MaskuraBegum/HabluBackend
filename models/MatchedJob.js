const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  id: Number,
  title: String,
  company: String,
  skillsRequired: [String],
  location: String,
  salary: String, // You can use Number if all values are numeric
  link: String,
});

const Job = mongoose.model('jobs', jobSchema);

module.exports = Job;
