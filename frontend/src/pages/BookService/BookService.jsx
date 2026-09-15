import { useEffect, useState } from "react";

import api from "../../api/api";
import Footer from "../../componenets/Footer";
import BookingForm from "./BookingForm";
import BookServiceNavbar from "./BookingNavbar";
import ServiceCard from "./ServiceCard";
import Timeslot from "./TimeSlot";

const BookService = () => {
  const [vehicleType, setVehicleType] = useState("");

  // Services coming from backend
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);

  const [selectedService, setSelectedService] = useState({
    name: "",
    price: 0,
  });

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingDate, setBookingDate] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Customer form data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleBrand: "",
    vehicleNumber: "",
    notes: "",
  });

  // ============================
  // GET SERVICES FROM BACKEND
  // ============================
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);

        const response = await api.get("/services");

        setServices(response.data.data || []);
      } catch (error) {
        console.error("Services Fetch Error:", error);

        alert(
          error.response?.data?.message ||
            "Unable to load services"
        );
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  // ============================
  // BOOKING
  // ============================
  const handleBooking = async () => {
    // Basic validation
    if (!vehicleType) {
      alert("Please select vehicle type");
      return;
    }

    if (!selectedService?.name) {
      alert("Please select service");
      return;
    }

    if (
      !formData.name ||
      !formData.phone ||
      !formData.vehicleNumber
    ) {
      alert("Please fill all required customer details");
      return;
    }

    if (!bookingDate) {
      alert("Please select booking date");
      return;
    }

    if (!selectedTimeSlot) {
      alert("Please select a time slot");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/bookings", {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        vehicleBrand: formData.vehicleBrand,
        vehicleNumber: formData.vehicleNumber,
        vehicleType: vehicleType,
        serviceName: selectedService.name,
        timeSlotId: selectedTimeSlot._id,
        bookingDate: bookingDate,
        notes: formData.notes,
      });

      alert(response.data.message);

      // Reset after successful booking
      setSelectedTimeSlot(null);
      setBookingDate("");
      setVehicleType("");

      setSelectedService({
        name: "",
        price: 0,
      });

      setTotalAmount(0);

      setFormData({
        name: "",
        phone: "",
        email: "",
        vehicleBrand: "",
        vehicleNumber: "",
        notes: "",
      });
    } catch (error) {
      console.error("Booking Error:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while booking"
      );
    } finally {
      setLoading(false);
    }
  };

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

      {/* Services */}
      {servicesLoading ? (
        <div className="text-center py-10 text-slate-400">
          Loading services...
        </div>
      ) : (
        <ServiceCard
          services={services}
          vehicleType={vehicleType}
          setVehicleType={setVehicleType}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          setTotalAmount={setTotalAmount}
        />
      )}

      {/* Booking Form */}
      <BookingForm
        vehicleType={vehicleType}
        selectedService={selectedService}
        totalAmount={totalAmount}
        bookingDate={bookingDate}
        setBookingDate={setBookingDate}
        selectedTimeSlot={selectedTimeSlot}
        formData={formData}
        setFormData={setFormData}
      />

      {/* Time Slots */}
      <Timeslot
        bookingDate={bookingDate}
        selectedTimeSlot={selectedTimeSlot}
        setSelectedTimeSlot={setSelectedTimeSlot}
        handleBooking={handleBooking}
        loading={loading}
      />

      <Footer />
    </div>
  );
};

export default BookService;