const express = require('express');
const router = express.Router();

// Import your controllers (Brought in createGeneralWork along with getEmployeeWork)
const { createGeneralWork } = require('../../controllers/create/Work'); 
const { getEmployeeWork } = require('../../controllers/create/Work'); // Your working fetch controller
const { completeWorkItem } = require('../../controllers/update/CompleteWork');

// 1. New Route: Create General Work Assignment
router.post('/createGeneralWork', createGeneralWork);

// 2. Fetching Work Queue (The one you already wrote)
router.get('/getEmployeeWork/:employeeId', getEmployeeWork);

// 3. Completing Work
router.put('/complete/:workId', completeWorkItem);

module.exports = router;