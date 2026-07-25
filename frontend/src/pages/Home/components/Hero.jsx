import heroCar from "../../../assets/images/hero-car.png";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-sky-50 to-white min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <span className="inline-block bg-sky-100 text-sky-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              🚗 Professional Car & Bike Wash
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Shree Nagneshwari Maa
              <span className="block text-sky-600">
                Car Wash Center
              </span>
            </h1>

            <p className="mt-6 text-gray-600 text-lg leading-8">
              Give your vehicle the shine it deserves with our premium
              washing services. Fast, affordable and trusted by our customers.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                Book Now
              </button>

              <button className="border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white px-6 py-3 rounded-lg font-semibold transition">
                Our Services
              </button>
            </div>

            <div className="flex gap-8 mt-10">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">500+</h2>
                <p className="text-gray-600">Happy Customers</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900">5★</h2>
                <p className="text-gray-600">Customer Rating</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-900">100%</h2>
                <p className="text-gray-600">Quality Service</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src={heroCar}
              alt="Car Wash"
              className="w-full max-w-xl object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;