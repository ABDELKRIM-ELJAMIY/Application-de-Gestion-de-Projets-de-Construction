const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const projectRoutes = require('./routes/projects');
const  tasksRoutes = require('./routes/tasks.js');

const { connectDB } = require('./db.js');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use('/api/projects', projectRoutes);
app.use('/api/tasks', tasksRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in port ${process.env.PORT}`);
});
