const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    availableSlots: [
        {
            startTime: {
                type: String, // e.g., "10:00 AM"
                required: true
            },
            endTime: {
                type: String, // e.g., "11:00 AM"
                required: true
            },
            booked: {
                type: Boolean,
                default: false
            }
        }
    ]
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
