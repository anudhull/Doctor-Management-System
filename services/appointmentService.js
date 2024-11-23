const { doctors, patients, appointments } = require('../data');

const createAppointment = (patientEmail, doctorName, startTime, endTime) => {
    const doctor = doctors.find(d => d.name === doctorName);
    const patient = patients.find(p => p.email === patientEmail);

    if (!doctor) {
        return { error: 'Doctor not found' };
    }

    if (!patient) {
        return { error: 'Patient not found' };
    }

    if (!startTime || !endTime) {
        return { error: 'Both start time and end time are required.' };
    }

    const slotIndex = doctor.availableSlots.findIndex(
        s => s.startTime === startTime && s.endTime === endTime && !s.booked
    );

    if (slotIndex === -1) {
        return { error: 'Time slot is unavailable or invalid.' };
    }

    const appointment = {
        id: `appointment_${appointments.length + 1}`,
        patientId: patient.id,
        doctorId: doctor.id,
        timeSlot: { startTime, endTime },
        status: 'Active'
    };

    appointments.push(appointment);
    patient.appointments.push(appointment.id);
    doctor.availableSlots[slotIndex].booked = true;

    return appointment;
};

const getAppointmentsByPatient = (patientEmail) => {
    const patient = patients.find(p => p.email === patientEmail);

    if (!patient) {
        return { error: 'Patient not found' };
    }

    const patientAppointments = patient.appointments.map(appointmentId => {
        const appointment = appointments.find(a => a.id === appointmentId);

        if (!appointment) {
            return null;
        }

        const doctor = doctors.find(d => d.id === appointment.doctorId);

        return {
            patientName: `${patient.firstName} ${patient.lastName}`,
            patientEmail: patient.email,
            doctorName: doctor ? doctor.name : 'NA',
            timeSlot: appointment.timeSlot
        };
    })

    return patientAppointments;
};

const getAppointmentsByDoctor = (doctorName) => {
    const doctor = doctors.find(d => d.name === doctorName);

    if (!doctor) {
        return { error: 'Doctor not found' };
    }

    const doctorAppointments = appointments.filter(a => a.doctorId === doctor.id).map(appointment => {
        const patient = patients.find(p => p.id === appointment.patientId);
        return {
            patientName: `${patient.firstName} ${patient.lastName}`,
            timeSlot: appointment.timeSlot
        };
    });

    return doctorAppointments;
};

const cancelAppointment = (patientEmail, startTime, endTime) => {
    const patient = patients.find(p => p.email === patientEmail);

    if (!patient) {
        return { error: 'Patient not found' };
    }

    const appointment = patient.appointments
    .map(appointmentId => appointments.find(a => a.id === appointmentId))
    .find(a => a.timeSlot.startTime === startTime && a.timeSlot.endTime === endTime);

    if (!appointment) {
        return { error: 'Appointment not found' };
    }

    // Made doctor slot available again
    const doctor = doctors.find(d => d.id === appointment.doctorId);
    const slot = doctor.availableSlots.find(s => s.startTime === startTime && s.endTime === endTime);
    slot.booked = false;

    // Remove the appointment from the patient's record
    patient.appointments = patient.appointments.filter(id => id !== appointment.id);

    // Soft delete appointment to keep history of appointments
    appointment.status = 'Cancelled';

    return true;
};

const modifyAppointment = (patientEmail,  originalStartTime, originalEndTime, newStartTime, newEndTime) => {
    const patient = patients.find(p => p.email === patientEmail);

    if (!patient) {
        return { error: 'Patient not found' };
    }

    const appointment = patient.appointments
        .map(appointmentId => appointments.find(a => a.id === appointmentId))
        .find(a => a && a.timeSlot.startTime === originalStartTime && a.timeSlot.endTime === originalEndTime);

    if (!appointment) {
        return { error: 'Original appointment not found' };
    }

    // Check if the new time slot is available
    const doctor = doctors.find(d => d.id === appointment.doctorId);
    const newSlot = doctor.availableSlots.find(s => s.startTime === newStartTime && s.endTime === newEndTime && !s.booked);
    if (!newSlot) {
        return { error: 'New time slot is unavailable or invalid' };
    }

    // Cancel the original appointment
    const cancelResult = cancelAppointment(patientEmail, originalStartTime, originalEndTime);
    if (cancelResult.error) {
        return cancelResult; 
    }

    // Book the new time slot by creating a new appointment
    return createAppointment(patientEmail, doctor.name, newStartTime, newEndTime);
};


module.exports = {
    createAppointment,
    getAppointmentsByPatient,
    getAppointmentsByDoctor,
    cancelAppointment,
    modifyAppointment
};
