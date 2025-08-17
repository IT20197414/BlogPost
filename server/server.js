const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully.'))
.catch(err => console.error('MongoDB connection error:', err));


// A simple route to test the server
app.get('/', (req, res) => {
    res.send('Welcome to the MERN Blog API');
});

// Routes
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});