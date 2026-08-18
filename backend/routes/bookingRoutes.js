const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Quando ricevi una POST su /api/prenotazioni/book, esegui il controller
router.post('/book', bookingController.createBooking);

module.exports = router;