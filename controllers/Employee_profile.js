const Employee = require("../models/Employee.model");
const express = require('express');
const router = express.Router();

// Logic for fetching the profile
router.get('/employee_profile/:id', async (req, res) => { // Keep this lowercase
    try {
        const userId = req.params.id;
        const employeeData = await Employee.findById(userId);

        if (!employeeData) {
            return res.status(404).json({ message: "Employee not found in database" });
        }
        res.status(200).json(employeeData);
    } catch (error) {
        res.status(500).json({ message: "Database Error", error: error.message });
    }
});

// IMPORTANT: Export the 'router' itself, not just the function
module.exports = router;