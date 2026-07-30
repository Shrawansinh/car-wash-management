import { useState } from "react";
import {
    FaCar,
    FaMagic,
    FaShieldAlt,
    FaSoap
} from "react-icons/fa";

const services = [
  {
    id: 1,
    icon: <FaSoap size={40} />,
    title: "Foam Wash",
    price: "₹399",
    features: [
      "Premium Foam",
      "Exterior Cleaning",
      "Tyre Cleaning",
    ],
  },
  {
    id: 2,
    icon: <FaCar size={40} />,
    title: "Interior Cleaning",
    price: "₹699",
    features: [
      "Vacuum Cleaning",
      "Dashboard Polish",
      "Seat Cleaning",
    ],
  },
  {
    id: 3,
    icon: <FaMagic size={40} />,
    title: "Car Detailing",
    price: "₹1499",
    features: [
      "Deep Cleaning",
      "Paint Polish",
      "Wax Protection",
    ],
  },
  {
    id: 4,
    icon: <FaShieldAlt size={40} />,
    title: "Ceramic Coating",
    price: "₹4999",
    features: [
      "9H Protection",
      "High Gloss Finish",
      "Water Repellent",
    ],
  },
];

const ServiceCard = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-20 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white">
            Choose Your
            <span className="text-sky-400"> Service</span>
          </h2>

          <p className="text-slate-400 mt-4">
            Select the service that best suits your vehicle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelected(service.id)}
              className={`cursor-pointer rounded-2xl p-8 transition-all duration-300 border

              ${
                selected === service.id
                  ? "border-sky-500 bg-sky-500/10 scale-105 shadow-[0_0_25px_rgba(14,165,233,0.35)]"
                  : "border-slate-800 bg-slate-900 hover:border-sky-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(14,165,233,0.25)]"
              }`}
            >

              <div className="text-sky-400 mb-6">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-white">
                {service.title}
              </h3>

              <p className="text-3xl font-bold text-sky-400 mt-4">
                {service.price}
              </p>

              <ul className="mt-6 space-y-3 text-slate-300">
                {service.features.map((item) => (
                  <li key={item}>✔ {item}</li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full py-3 rounded-xl font-semibold transition

                ${
                  selected === service.id
                    ? "bg-sky-500 text-white"
                    : "bg-slate-800 text-white hover:bg-sky-500"
                }`}
              >
                {selected === service.id
                  ? "Selected"
                  : "Select Service"}
              </button>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ServiceCard;