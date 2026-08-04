import { useEffect, useState } from "react";

const BookingForm = ({
  vehicleType,
  selectedService,
  totalAmount,
  selectedTimeSlot,
}) => {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    vehicleBrand: "",
    vehicleNumber: "",
    date: "",
    notes: "",
  });

  useEffect(() => {
    // Future API submit ke liye ready rahega
    console.log(selectedService);
  }, [selectedService]);

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

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">
            Booking <span className="text-sky-400">Details</span>
          </h2>

          <p className="text-slate-400 mt-4">
            Fill your details to reserve your slot.
          </p>
        </div>

        <form className="grid md:grid-cols-2 gap-6">

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white"
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white"
          />

          <input
            name="vehicleNumber"
            placeholder="Vehicle Number"
            value={formData.vehicleNumber}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white"
          />

          {/* Vehicle Type */}

          <input
            readOnly
            value={vehicleType}
            placeholder="Vehicle Type"
            className="bg-slate-800 border border-sky-500 rounded-xl p-4 text-sky-400"
          />

          {/* Vehicle Brand */}

          <input
            name="vehicleBrand"
            placeholder="Vehicle Brand"
            value={formData.vehicleBrand}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white"
          />

          {/* Service */}

          <input
            readOnly
            value={selectedService?.name || ""}
            placeholder="Service"
            className="bg-slate-800 border border-sky-500 rounded-xl p-4 text-sky-400"
          />

          {/* Price */}

          <input
            readOnly
            value={
              totalAmount === 0
                ? ""
                : `₹${totalAmount}`
            }
            placeholder="Price"
            className="bg-slate-800 border border-green-500 rounded-xl p-4 text-green-400 font-bold"
          />

          {/* Date */}

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white"
          />

          {/* Notes */}

          <textarea
            rows="5"
            name="notes"
            value={formData.notes}
            placeholder="Additional Notes..."
            onChange={handleChange}
            className="md:col-span-2 bg-slate-900 border border-slate-700 rounded-xl p-4 text-white resize-none"
          />

          <button
            className="md:col-span-2 bg-sky-500 hover:bg-sky-600 rounded-xl py-4 text-lg font-semibold transition"
          >
            Book Service
          </button>

        </form>

      </div>
    </section>
  );
};

export default BookingForm;