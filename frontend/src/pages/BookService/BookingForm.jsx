const BookingForm = ({
  vehicleType,
  selectedService,
  totalAmount,
  bookingDate,
  setBookingDate,
  selectedTimeSlot,
  formData,
  setFormData
}) => {

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="booking-form"
      className="py-20 px-6 bg-slate-950"
    >
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">
            Booking{" "}
            <span className="text-sky-400">
              Details
            </span>
          </h2>

          <p className="text-slate-400 mt-4">
            Fill your details to reserve your slot.
          </p>
        </div>

        <form
          className="grid md:grid-cols-2 gap-6"
          onSubmit={(e) => e.preventDefault()}
        >

          {/* Full Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-sky-500"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-sky-500"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-sky-500"
          />

          {/* Vehicle Number */}
          <input
            type="text"
            name="vehicleNumber"
            placeholder="Vehicle Number"
            value={formData.vehicleNumber}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white uppercase outline-none focus:border-sky-500"
          />

          {/* Vehicle Type */}
          <input
            type="text"
            readOnly
            value={vehicleType || ""}
            placeholder="Vehicle Type"
            className="bg-slate-800 border border-sky-500 rounded-xl p-4 text-sky-400 outline-none"
          />

          {/* Vehicle Brand */}
          <input
            type="text"
            name="vehicleBrand"
            placeholder="Vehicle Brand"
            value={formData.vehicleBrand}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-sky-500"
          />

          {/* Service */}
          <input
            type="text"
            readOnly
            value={selectedService?.name || ""}
            placeholder="Service"
            className="bg-slate-800 border border-sky-500 rounded-xl p-4 text-sky-400 outline-none"
          />

          {/* Price */}
          <input
            type="text"
            readOnly
            value={
              totalAmount === 0
                ? ""
                : `₹${totalAmount}`
            }
            placeholder="Price"
            className="bg-slate-800 border border-green-500 rounded-xl p-4 text-green-400 font-bold outline-none"
          />

          {/* Date */}
          <input
            type="date"
            value={bookingDate || ""}
            onChange={(e) => setBookingDate(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white outline-none focus:border-sky-500"
          />

          {/* Selected Time Slot */}
          <input
            type="text"
            readOnly
            value={selectedTimeSlot?.slot || ""}
            placeholder="Selected Time Slot"
            className="bg-slate-800 border border-sky-500 rounded-xl p-4 text-sky-400 outline-none"
          />

          {/* Notes */}
          <textarea
            rows="5"
            name="notes"
            value={formData.notes}
            placeholder="Additional Notes..."
            onChange={handleChange}
            className="md:col-span-2 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white resize-none outline-none focus:border-sky-500"
          />

        </form>
      </div>
    </section>
  );
};

export default BookingForm;