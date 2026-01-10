const {BookingRepository} = require('../repository/index')
const axios = require('axios') 
const {FLIGHT_SERVICE_PATH} = require('../config/serverConfig');
const { ServiceError } = require('../utils/errors');

class BookingService{
  constructor(){
    this.bookingRepository = new BookingRepository();
  }
  async createBooking(data){
    try {
      const flightId = data.flightId;
      let getFlightReqURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
      const response = await axios.get(getFlightReqURL);
      const flightData = response.data.data;
      let priceOfTheFlight = flightData.price;
      if(data.noOfSeats > flightData.totalSeats){
        throw new ServiceError('Something went wrong in booking process ' , 'Insufficient seats')
      }
      const totalCost = priceOfTheFlight * data.noOfSeats;
      const bookingPayLoad = {...data ,totalCost};
      const booking = await this.bookingRepository.create(bookingPayLoad);
      console.log("BOOKING",booking.flightId)
      const updateFlightReqURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`;
      console.log("updateFlightReqURL",updateFlightReqURL)
      await axios.patch(updateFlightReqURL,{totalSeats: flightData.totalSeats - booking.noOfSeats});
      const finalBooking = await this.bookingRepository.updateBooking(booking.id ,{status : "Booked"});
      return finalBooking;
    } catch (error) {
      console.log(error)
      if(error.name == 'repositoryError' || error.name =='ValidationError'){
        throw error;
      }
      throw new ServiceError();
    }
  }

  async updateBooking(data){
    try {
      const bookingId = data.id;
      const booking = await this.bookingRepository.get(bookingId);
      if(booking.status == 'Cancelled'){
        throw new ServiceError('Something went wrong in cancellation','BOOKING is already CANCELLED')
      }
      if (booking.status !== 'Booked') {
        throw new ServiceError(
          'Cancellation error',
          'Only booked tickets can be cancelled');
      }
      const finalBooking = await this.bookingRepository.updateBooking(booking.id , {status :"Cancelled"});
      const flightReqURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${finalBooking.flightId}`;
      const response = await axios.get(flightReqURL);
      const flightData = response.data.data;
      await axios.patch(flightReqURL,{totalSeats : flightData.totalSeats + finalBooking.noOfSeats});
      return finalBooking;
    } catch (error) {
      {
      console.log(error)
      if(error.name == 'repositoryError' || error.name =='ValidationError'){
        throw error;
      }
      throw new ServiceError();
    }
    }
  }
}

module.exports = BookingService;