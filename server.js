const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 1. Added cors import
require('dotenv').config(); 

const itemRoutes = require('./routes/itemRoutes.js'); 

const app = express(); 

app.use(cors()); 
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('DB Connection Error:', err)); 

app.use('/api/items', itemRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
