const {Booking} = require('../models/index')
const {StatusCodes} = require('http-status-codes')
const {ValidationError , AppError} = require('../utils/errors/index');
const booking = require('../models/booking');
class BookingRepository{
  async create (data){
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      if(error.name == 'SequelizeValidationError'){
        throw new ValidationError(error);
      }
      throw new AppError(
        'repositoryError',
        'cannot create booking',
        'there was some issue creating the booking , please try again later',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async get (id){
    try {
      const result = await Booking.findByPk(id)
      return result;
    } catch (error) {
      if(error.name == 'SequelizeValidationError'){
        throw new ValidationError(error);
      }
      throw new AppError(
        'repositoryError',
        'cannot get booking',
        'there was some issue getting the booking , please try again later',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async updateBooking (bookingId,data){
    try {
      const booking = await Booking.findByPk(bookingId)
      if(data.status){
        booking.status = data.status;
      }
      await booking.save()
      return booking;
    } catch (error) {
      if(error.name == 'SequelizeValidationError'){
        throw new ValidationError(error);
      }
      throw error;
    }
  }

}

module.exports = BookingRepository;