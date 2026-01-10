const { BookingService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');

const bookingService = new BookingService();

const create =  async (req,res)=>{
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

const update = async(req , res)=>{
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

module.exports = {
  create , update
}