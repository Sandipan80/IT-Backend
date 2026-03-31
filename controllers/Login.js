const Employee = require("../models/Employee.model");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { Email, EmployeeCode } = req.body;

    // 1. Check if the employee exists in the database
    const user = await Employee.findOne({ Email });

    if (!user) {
      return res.status(404).json({ message: "Employee not found with this email" });
    }

    // 2. Verify the Employee Code
    // Note: If you hashed the code during registration, use bcrypt.compare here
    if (user.EmployeeCode !== EmployeeCode) {
      return res.status(401).json({ message: "Invalid Employee Code" });
    }

    // 3. Create a JWT Token
    // The 'secret_key' should ideally be in your .env file
    const token = jwt.sign(
      { id: user._id, Email: user.Email },
      process.env.JWT_SECRET || "bhullar123456789",
      { expiresIn: "2h" }
    );

    // 4. Send success response with the token
    res.status(200).json({
      message: "Login Successful",
      token: token,
      user: {
        Name:user.Name,
        EmployeeCode:user.EmployeeCode,
        id:user._id,
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error during login" });
  }
};

module.exports = Login;