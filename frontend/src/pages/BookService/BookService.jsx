import { useState } from "react";
import Footer from '../../componenets/Footer';
import BookingForm from './BookingForm';
import BookServiceNavbar from './BookingNavbar';
import ServiceCard from './ServiceCard';
import Timeslot from './TimeSlot';

const BookService = () => {
  const [vehicleType, setVehicleType] = useState("");
  const [selectedService, setSelectedService] = useState({
    name: "",
    price: 0,
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingDate, setBookingDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  return (
    <div className="bg-slate-950 text-white min-h-screen">

<BookServiceNavbar />
      {/* Hero */}
      <section className="pt-32 pb-16 px-6">

        <div className="max-w-7xl mx-auto text-center">

          <span className="inline-block px-4 py-2 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
            Premium Car Wash Booking
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6">
            Book Your
            <span className="text-sky-400"> Service</span>
          </h1>

          <p className="text-slate-400 mt-6 max-w-2xl mx-auto leading-8">
            Choose your preferred service, select an available
            time slot and let our professionals take care of your
            vehicle.
          </p>

        </div>

      </section>

    <ServiceCard
      vehicleType={vehicleType}
      setVehicleType={setVehicleType}
    selectedService={selectedService}
  setSelectedService={setSelectedService}
  setTotalAmount={setTotalAmount}
    />
    <Timeslot
selectedTimeSlot={selectedTimeSlot}
setSelectedTimeSlot={setSelectedTimeSlot}
/>
    
    <BookingForm 
vehicleType={vehicleType}
selectedService={selectedService}
totalAmount={totalAmount}
bookingDate={bookingDate}
setBookingDate={setBookingDate}
selectedTimeSlot={selectedTimeSlot}
setSelectedTimeSlot={setSelectedTimeSlot}
loading={loading}
setLoading={setLoading}
/>

      <Footer />

    </div>
  );
};

export default BookService;