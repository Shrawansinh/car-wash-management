import { FaSoap } from "react-icons/fa";

const ServiceCard = ({
  services,
  vehicleType,
  setVehicleType,
  selectedService,
  setSelectedService,
  setTotalAmount,
}) => {
  const activeServices =
    services?.filter((service) => service.isActive) || [];

  const getPrice = (service) => {
    if (!vehicleType) return null;

    switch (vehicleType) {
      case "Bike":
        return service.prices?.bike;

      case "Car":
        return service.prices?.car;

      case "Truck":
        return service.prices?.truck;

      case "8-Tyre Truck":
        return service.prices?.eightTyreTruck;

      case "Heavy Vehicle":
        return service.prices?.heavyVehicle;

      default:
        return null;
    }
  };

  const handleSelect = (service) => {
    if (!vehicleType) {
      alert("Please select vehicle type first");
      return;
    }

    const price = getPrice(service);

    setSelectedService({
      name: service.name,
      price: price,
      serviceId: service._id,
    });

    setTotalAmount(price ?? 0);

    document
      .getElementById("booking-form")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section className="py-20 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white">
            Book Your{" "}
            <span className="text-sky-400">
              Service
            </span>
          </h2>

          <p className="text-slate-400 mt-3">
            Select your vehicle type and service.
          </p>
        </div>

        {/* Vehicle Type */}
        <div className="max-w-md mx-auto mb-12">
          <select
            value={vehicleType}
            onChange={(e) => {
              setVehicleType(e.target.value);

              setSelectedService({
                name: "",
                price: 0,
                serviceId: "",
              });

              setTotalAmount(0);
            }}
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

        {/* Services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.map((service) => {
            const price = getPrice(service);

            const isSelected =
              selectedService?.serviceId === service._id;

            return (
              <div
                key={service._id}
                onClick={() => handleSelect(service)}
                className={`rounded-3xl border cursor-pointer transition-all duration-300 p-8
                  ${
                    isSelected
                      ? "border-sky-500 bg-sky-500/10 shadow-[0_0_30px_rgba(14,165,233,.35)]"
                      : "border-slate-800 bg-slate-900 hover:border-sky-500 hover:-translate-y-2"
                  }
                `}
              >
                <FaSoap
                  className="text-sky-400 mb-6"
                  size={50}
                />

                {/* Service Name */}
                <h2 className="text-2xl font-bold text-white">
                  {service.name}
                </h2>

                {/* Description */}
                <p className="text-slate-400 mt-3">
                  {service.description}
                </p>

                {/* Features */}
                {service.features?.length > 0 && (
                  <ul className="mt-6 space-y-2 text-slate-300">
                    {service.features.map(
                      (feature, index) => (
                        <li key={index}>
                          ✔ {feature}
                        </li>
                      )
                    )}
                  </ul>
                )}

                {/* Price */}
                <div className="mt-6">
                  <p className="text-slate-400">
                    Price
                  </p>

                  <h3 className="text-3xl font-bold text-sky-400 mt-2">
                    {!vehicleType
                      ? "--"
                      : price === null ||
                        price === undefined
                      ? "Contact for Quote"
                      : `₹${price}`}
                  </h3>
                </div>

                {/* Duration */}
                {service.duration && (
                  <p className="text-slate-400 mt-3">
                    Duration: {service.duration} minutes
                  </p>
                )}

                <button
                  disabled={!vehicleType}
                  className="mt-8 w-full rounded-xl bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 py-3 font-semibold transition"
                >
                  {isSelected
                    ? "Selected ✓"
                    : "Select Service"}
                </button>
              </div>
            );
          })}
        </div>

        {/* No Services */}
        {activeServices.length === 0 && (
          <p className="text-center text-slate-400">
            No services available right now.
          </p>
        )}
      </div>
    </section>
  );
};

export default ServiceCard;