import {
    FaCar,
    FaMotorcycle,
    FaSprayCanSparkles,
} from "react-icons/fa6";
import { MdOutlineCleaningServices } from "react-icons/md";

const services = [
  {
    id: 1,
    title: "Car Wash",
    description: "Complete exterior and interior car cleaning with premium products.",
    icon: <FaCar size={40} />,
  },
  {
    id: 2,
    title: "Bike Wash",
    description: "Professional bike washing with foam and pressure cleaning.",
    icon: <FaMotorcycle size={40} />,
  },
  {
    id: 3,
    title: "Premium Wash",
    description: "Deep cleaning, polishing and shine protection for your vehicle.",
    icon: <FaSprayCanSparkles size={40} />,
  },
  {
    id: 4,
    title: "Interior Cleaning",
    description: "Dashboard, seats, carpets and complete interior detailing.",
    icon: <MdOutlineCleaningServices size={40} />,
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-800">
            Our Services
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We provide professional washing and detailing services
            for cars and bikes using premium quality products.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center text-sky-600 mb-5">
                {service.icon}
              </div>

              <h3 className="text-xl font-semibold text-slate-800">
                {service.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {service.description}
              </p>

              <button className="mt-6 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-lg transition">
                Learn More
              </button>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Services;