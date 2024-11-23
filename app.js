const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const appointmentRoutes = require('./routes/appointment');

const app = express();

app.use(bodyParser.json());

// connectDB();
// DB can be connected to build connection with data, for here i am using in memory objects.

app.use('/api/appointments', appointmentRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Doctor Appointment Booking System API');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
