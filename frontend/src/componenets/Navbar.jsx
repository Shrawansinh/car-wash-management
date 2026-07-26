import { useState } from "react";
import { FaCarSide } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-lg">
      <nav className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
            <FaCarSide className="text-white text-xl" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white leading-none">
              Maa Nagneshwari CarWash
            </h1>
            <p className="text-xs text-slate-400">
              Premium Car Care
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 text-slate-300 font-medium">
          <li>
            <a
              href="#home"
              className="relative hover:text-sky-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </a>
          </li>

          <li>
            <a
              href="#services"
              className="relative hover:text-sky-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Services
            </a>
          </li>

          <li>
            <a
              href="#gallery"
              className="relative hover:text-sky-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Gallery
            </a>
          </li>

          <li>
            <a
              href="#testimonials"
              className="relative hover:text-sky-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Testimonials
            </a>
          </li>

          <li>
            <a
              href="#contact"
              className="relative hover:text-sky-400 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-sky-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="hidden lg:block text-slate-300 hover:text-sky-400 transition duration-300"
          >
            Login
          </Link>

          <Link
            to="/book-service"
            className="hidden lg:block bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-cyan-500 hover:to-sky-500 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-sky-500/40"
          >
            Book Now
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white text-3xl transition-transform duration-300 hover:scale-110"
          >
            {open ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="bg-slate-950 border-t border-slate-800 shadow-xl">
          <ul className="flex flex-col items-center gap-6 py-8 text-slate-300 font-medium">

            <li>
              <a
                href="#home"
                onClick={() => setOpen(false)}
                className="hover:text-sky-400 transition"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="#services"
                onClick={() => setOpen(false)}
                className="hover:text-sky-400 transition"
              >
                Services
              </a>
            </li>

            <li>
              <a
                href="#gallery"
                onClick={() => setOpen(false)}
                className="hover:text-sky-400 transition"
              >
                Gallery
              </a>
            </li>

            <li>
              <a
                href="#testimonials"
                onClick={() => setOpen(false)}
                className="hover:text-sky-400 transition"
              >
                Testimonials
              </a>
            </li>

            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="hover:text-sky-400 transition"
              >
                Contact
              </a>
            </li>

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="text-white hover:text-sky-400 transition"
            >
              Login
            </Link>

            <Link
              to="/book-service"
              onClick={() => setOpen(false)}
              className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-sky-500/40"
            >
              Book Now
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;