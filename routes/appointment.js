const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/', appointmentController.createAppointment);
router.get('/:patientEmail', appointmentController.getAppointmentsByPatient);
router.get('/doctor/:doctorName', appointmentController.getAppointmentsByDoctor);
router.put('/cancel', appointmentController.cancelAppointment);
router.put('/modify', appointmentController.modifyAppointment);

module.exports = router;
