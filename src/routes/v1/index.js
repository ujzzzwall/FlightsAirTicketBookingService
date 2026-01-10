const express = require('express');
// const {create} =  require('../../controllers/Booking-controller')
const { BookingController } = require('../../controllers/index')
const router = express.Router();

router.post('/bookings', BookingController.create);
router.patch('/bookings/update',BookingController.update);

module.exports = router;