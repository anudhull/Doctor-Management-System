const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    timeSlot: {
        startTime: {
            type: String, // e.g., "10:00 AM"
            required: true
        },
        endTime: {
            type: String, // e.g., "11:00 AM"
            required: true
        }
    },
    status: {
        type: String,
        enum: ['Active', 'Cancelled'],
        default: 'Active'
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
