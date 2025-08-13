const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, './config/.env') });

// Initialize express app
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Home Route
app.get('/', (req, res) => {
    res.send("Hello World");
    console.log("Backend Route is running...")
})

app.listen(process.env.PORT || 8000, async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Database connected successfully");
        console.log(`Server started on port ${process.env.PORT}`);
    } catch (error) {
        console.error(error);

    }
})