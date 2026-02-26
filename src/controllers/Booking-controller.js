const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');
const {createChannel , publishMessage} = require('../utils/messageQueue')
const {REMINDER_BINDING_KEY}= require('../config/serverConfig')

const bookingService = new BookingService();

class BookingController {

  constructor(){
  }

  async sendMessageToQueue(req,res){
    const channel = await createChannel();
    const data = {message : 'Success'}
    publishMessage(channel ,REMINDER_BINDING_KEY , JSON.stringify(data) );
    return res.status(200).json({
      message: 'Successfully publish the event'
    });
  }

  async create (req,res)  {
  try {
    const response = await bookingService.createBooking(req.body);
    console.log("FROM BOOKING CONTROLLER", response)
    return res.status(StatusCodes.OK).json({
      message : 'Successsfully completed booking ',
      success : true ,
      data : response,
      err : {}
    })
  } catch (error) {
    console.log("FROM BOOKING CONTROLELR",error)
    return res.status(error.statusCode).json({
      message : error.message,
      success : false ,
      data : {},
      err : error.explanation
    })
  }
}
  async update (req , res){
  try {
    const response = await bookingService.updateBooking(req.body);
    return res.status(StatusCodes.OK).json({
      message : 'Successsfully Updated booking ',
      success : true ,
      data : response,
      err : {}
    })
  } catch (error) {
    console.log("FROM UPDATE BOOKING CONTROLELR",error)
    return res.status(error.statusCode).json({
      message : error.message,
      success : false ,
      data : {},
      err : error.explanation
    })
  }
}

}

module.exports = BookingController;