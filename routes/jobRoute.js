// routes/jobRoute.js

const express = require('express');
const router = express.Router();
const { matchJobs } = require('../controllers/jobContollers');

router.get('/match', matchJobs);

module.exports = router;
