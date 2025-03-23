// const express = require('express');
// const dotenv = require('dotenv');
// const db = require('./src/config/database');
// dotenv.config();
// const app = express();
// const authRoutes = require('./src/routes/authRoutes');
// const cors = require('cors');
// const frontendIP = 'http://192.168.210.92'; // Replace with your frontend IP and port
// app.use(cors({
//   origin: frontendIP,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));
// app.use(express.json());

// app.use('/api/auth', authRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on: ${PORT}`));
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const milestoneRoutes = require('./src/routes/milestoneRoutes');
const workRoutes = require('./src/routes/workRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes');
const disputeRoutes = require('./src/routes/disputeRoutes');

dotenv.config();

const app = express();
app.use(express.json());
const corsOptions = {
    origin: ['http://localhost:5173'], // Adjust to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/work', workRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/dispute', disputeRoutes);

app.get('/', (req, res) => res.send('BitByBit API is Running!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
