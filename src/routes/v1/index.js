const express = require('express');
// const {create} =  require('../../controllers/Booking-controller')
const  {BookingController}  = require('../../controllers/index')
// const {createChannel} = require('../../utils/messageQueue')

// const channel = await createChannel();
// const bookingController = new BookingController(channel);
const bookingController = new BookingController()
const router = express.Router();

router.post('/bookings', bookingController.create);
router.patch('/bookings/update',bookingController.update);
router.post('/publish',bookingController.sendMessageToQueue);

module.exports = router;