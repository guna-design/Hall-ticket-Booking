
const express = require("express")
const router = express.Router()
const BookRoomController = require('../controller/BookRoom')
// routing to  get and post request

router.get('/listAllRooms',BookRoomController.RoomsData)
router.get('/listAllCustomers',BookRoomController.CustBookingData)
router.get('/CustomerData/:customerName',BookRoomController.CustBookingData)
router.post('/bookingARoom',BookRoomController.bookRoom)

module.exports =  router 