import { FaSoap } from "react-icons/fa";

const ServiceCard = ({
  vehicleType,
  setVehicleType,
  selectedService,
  setSelectedService,
  setTotalAmount,
}) => {

  const prices = {
    Bike: 50,
    Car: 400,
    Truck: 800,
    "8-Tyre Truck": 1400,
    "Heavy Vehicle": null,
  };

  const handleSelect = () => {
    const price = prices[vehicleType];

    setSelectedService({
      name: "Simple Wash",
      price: price,
    });

    setTotalAmount(price ?? 0);

    // Smooth Scroll
    document
      .getElementById("booking-form")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section className="py-20 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">

          <h2 className="text-4xl font-bold text-white">
            Book Your
            <span className="text-sky-400">
              {" "}
              Service
            </span>
          </h2>

          <p className="text-slate-400 mt-3">
            Select your vehicle type first.
          </p>

        </div>

        {/* Vehicle Type */}

        <div className="max-w-md mx-auto mb-12">

          <select
            value={vehicleType}
            onChange={(e) =>
              setVehicleType(e.target.value)
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:border-sky-500 outline-none"
          >
            <option value="">
              Select Vehicle Type
            </option>

            <option>Bike</option>

            <option>Car</option>

            <option>Truck</option>

            <option>8-Tyre Truck</option>

            <option>Heavy Vehicle</option>

          </select>

        </div>

        {/* Service Card */}

        <div
          onClick={handleSelect}
          className={`max-w-lg mx-auto rounded-3xl border cursor-pointer transition-all duration-300 p-10

          ${
            selectedService.name === "Simple Wash"
              ? "border-sky-500 bg-sky-500/10 shadow-[0_0_30px_rgba(14,165,233,.35)]"
              : "border-slate-800 bg-slate-900 hover:border-sky-500 hover:-translate-y-2"
          }`}
        >

          <FaSoap
            className="text-sky-400 mb-6"
            size={55}
          />

          <h2 className="text-3xl font-bold text-white">
            Simple Wash
          </h2>

          <p className="text-slate-400 mt-3">
            Complete basic wash package.
          </p>

          <ul className="mt-8 space-y-3 text-slate-300">

            <li>✔ Foam Wash</li>

            <li>✔ High Pressure Wash</li>

            <li>✔ Tyre Cleaning</li>

            <li>✔ Glass Cleaning</li>

            <li>✔ Dashboard Cleaning</li>

            <li>✔ Interior Vacuum</li>

          </ul>

          <div className="mt-8">

            <p className="text-slate-400">
              Price
            </p>

            <h3 className="text-4xl font-bold text-sky-400 mt-2">

              {vehicleType === ""
                ? "--"

                : prices[vehicleType] === null

                ? "Contact for Quote"

                : `₹${prices[vehicleType]}`}

            </h3>

          </div>

          <button
            disabled={!vehicleType}
            className="mt-10 w-full rounded-xl bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 py-4 font-semibold transition"
          >
            Select Service
          </button>

        </div>

      </div>
    </section>
  );
};

export default ServiceCard;