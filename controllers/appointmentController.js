const appointmentService = require('../services/appointmentService');

const createAppointment = (req, res) => {
    const { patientEmail, doctorName, startTime, endTime } = req.body;

    try {
        const result = appointmentService.createAppointment(patientEmail, doctorName, startTime, endTime);

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        return res.status(201).json({
            message: 'Appointment booked successfully',
            appointment: result
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

const getAppointmentsByPatient = (req, res) => {
    const { patientEmail } = req.params;

    try {
        const result = appointmentService.getAppointmentsByPatient(patientEmail);

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        return res.status(200).json({ message: 'Appointments fetched successfully', appointments: result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

const getAppointmentsByDoctor = (req, res) => {
    const { doctorName } = req.params;

    try {
        const result = appointmentService.getAppointmentsByDoctor(doctorName);

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        return res.status(200).json({ message: 'Appointments fetched successfully', appointments: result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

const cancelAppointment = (req, res) => {
    const { patientEmail, startTime, endTime } = req.body;

    try {
        const result = appointmentService.cancelAppointment(patientEmail, startTime, endTime);

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        return res.status(200).json({ message: 'Appointment cancelled successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

const modifyAppointment = (req, res) => {
    const { patientEmail, originalStartTime, originalEndTime, newStartTime, newEndTime } = req.body;

    try {
        const result = appointmentService.modifyAppointment(
            patientEmail,
            originalStartTime,
            originalEndTime,
            newStartTime,
            newEndTime
        );

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        return res.status(200).json({ message: 'Appointment modified successfully', appointment: result });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

module.exports = {
    createAppointment,
    getAppointmentsByPatient,
    getAppointmentsByDoctor,
    cancelAppointment,
    modifyAppointment
};
