import { Link } from "react-router-dom";
import heroCar from '../assets/images/hero-car2.png.jpeg';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${heroCar})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex items-center">

        <div className="max-w-3xl">

          <span className="inline-block bg-sky-500/20 border border-sky-400 text-sky-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md">
            🚗 Premium Car Washing & Detailing
          </span>

          <h1 className="mt-6 text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Give Your Car
            <span className="block text-sky-400">
              A Premium Shine
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-xl leading-8">
            Professional car washing, foam wash, interior cleaning,
            ceramic coating and detailing with doorstep & workshop
            service.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              to="/book-service"
              className="px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold transition duration-300 shadow-xl"
            >
              Book Now
            </Link>

            <a
              href="#services"
              className="px-8 py-4 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition duration-300"
            >
              Explore Services
            </a>

          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-xl">

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 text-center border border-white/10">
              <h2 className="text-3xl font-bold text-sky-400">
                5000+
              </h2>
              <p className="text-gray-300 text-sm mt-1">
                Cars Washed
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 text-center border border-white/10">
              <h2 className="text-3xl font-bold text-sky-400">
                10+
              </h2>
              <p className="text-gray-300 text-sm mt-1">
                Years Experience
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 text-center border border-white/10">
              <h2 className="text-3xl font-bold text-sky-400">
                4.9★
              </h2>
              <p className="text-gray-300 text-sm mt-1">
                Customer Rating
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">

        <div className="w-7 h-12 rounded-full border-2 border-white flex justify-center">

          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>

        </div>

      </div>

    </section>
  );
};

export default Hero;