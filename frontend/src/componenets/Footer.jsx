import {
    FaCarSide,
    FaEnvelope,
    FaFacebookF,
    FaInstagram,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Logo */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-linear-to-r from-sky-500 to-cyan-500 flex items-center justify-center">
              <FaCarSide className="text-white text-xl" />
            </div>

            <div>
              <h2 className="text-white text-xl font-bold">
                Maa Nagneshwari
              </h2>

              <p className="text-sky-400 text-sm">
                Premium CarWash
              </p>
            </div>
          </div>

          <p className="text-gray-400 leading-7">
            We provide premium car washing, detailing and ceramic
            coating services with professional care and customer
            satisfaction.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">
            {[
              "Home",
              "Services",
              "Gallery",
              "Testimonials",
              "Contact",
            ].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-sky-400 transition duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-5">
            Our Services
          </h3>

          <ul className="space-y-3">
            <li>Foam Wash</li>
            <li>Interior Cleaning</li>
            <li>Exterior Polishing</li>
            <li>Ceramic Coating</li>
            <li>Bike Wash</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-5">
            Contact Us
          </h3>

          <div className="space-y-4">

            <div className="flex gap-3">
              <FaPhoneAlt className="text-sky-400 mt-1" />
              <span>+91 9925328097</span>
            </div>

            <div className="flex gap-3">
              <FaEnvelope className="text-sky-400 mt-1" />
              <span>maanagneshwarisupport@gmail.com</span>
            </div>

            <div className="flex gap-3">
              <FaMapMarkerAlt className="text-sky-400 mt-1" />
              <span>Rajpardi,Hotel ni same</span>
              <span>Bharuch, 393115</span>
            </div>

          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-8">

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-sky-500 transition-all duration-300 flex items-center justify-center"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-sky-500 transition-all duration-300 flex items-center justify-center"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-sky-500 transition-all duration-300 flex items-center justify-center"
            >
              <FaWhatsapp />
            </a>

          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">

          <p>
            © 2026 <span className="text-sky-400">Maa Nagneshwari CarWash</span>. All Rights Reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Designed with ❤️ using React & Tailwind CSS
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;