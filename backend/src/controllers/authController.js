const { createUser, findUserByEmail } = require('../models/userModels');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/jwt');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  await createUser(name, email, password, role || 'freelancer');
  res.status(201).json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};
