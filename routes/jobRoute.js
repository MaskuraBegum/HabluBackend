const express = require('express');
const router = express.Router();
const { matchJobs } = require('../controllers/jobContollers');
const { importJobs } = require('../controllers/importController');

router.post('/import-jobs', importJobs);   // ✅ New route to insert all jobs
router.get('/match', matchJobs);     // You can keep match logic for response only

module.exports = router;
