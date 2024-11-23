// In-memory data for doctors, patients, and appointments
const doctors = [
    {
        id: 'doctor1',
        name: 'Dr. Yashima',
        specialization: 'Cardiologist',
        availableSlots: [
            { startTime: '10:00 AM', endTime: '11:00 AM', booked: false },
            { startTime: '11:00 AM', endTime: '12:00 PM', booked: false },
            { startTime: '02:00 PM', endTime: '03:00 PM', booked: false },
        ]
    },
    {
        id: 'doctor2',
        name: 'Dr. Jay',
        specialization: 'Dermatologist',
        availableSlots: [
            { startTime: '09:00 AM', endTime: '10:00 AM', booked: false },
            { startTime: '12:00 PM', endTime: '01:00 PM', booked: false },
        ]
    }
];

const patients = [
    {
        id: 'patient1',
        firstName: 'Aditi',
        lastName: 'Gupta',
        email: 'aditi.gupta@gmail.com',
        appointments: []
    },
    {
        id: 'patient2',
        firstName: 'Avinash',
        lastName: 'Mishra',
        email: 'avinash123@gmail.com',
        appointments: []
    }
];

const appointments = [];

module.exports = { doctors, patients, appointments };
