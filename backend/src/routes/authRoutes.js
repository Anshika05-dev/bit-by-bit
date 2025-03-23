// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const { createUser, findUserByEmail } = require('../models/userModels');
// const router = express.Router();

// // Register Route
// router.post('/register', async (req, res) => {
//   const { name, email, password, role } = req.body;
//   try {
//     const existingUser = await findUserByEmail(email);
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     await createUser(name, email, password, role);
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Login Route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await findUserByEmail(email);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     console.log(token);
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
