import { useState } from "react";
import { FaCarSide } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";

const BookServiceNavbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Book Service", path: "/book-service" },
    { name: "Login", path: "/login" },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-[rgba(5,7,11,0.72)] backdrop-blur-xl px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a46b]/30 bg-[#f1e2c8]/10">
              <FaCarSide className="text-[#f1e2c8] text-lg" />
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
                Luxury Car Care
              </p>
              <h1 className="text-white font-semibold tracking-wider">
                Maa Nagneshwari
              </h1>
            </div>
          </Link>

          {/* Desktop */}
          <ul className="hidden lg:flex items-center gap-8 text-sm">
            {navLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `transition duration-300 ${
                      isActive
                        ? "text-[#f1e2c8]"
                        : "text-slate-300 hover:text-white"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Contact Button */}
          <Link
            to="/#contact"
            className="hidden lg:block rounded-full bg-[#f1e2c8] px-5 py-2.5 text-sm font-semibold text-[#0f1115] hover:bg-[#e7d5b3] transition"
          >
            Contact
          </Link>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white text-2xl"
          >
            {open ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {open && (
          <div className="mt-3 rounded-3xl border border-white/10 bg-[rgba(5,7,11,0.95)] backdrop-blur-xl p-5 lg:hidden">
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2 ${
                      isActive
                        ? "bg-[#f1e2c8] text-black"
                        : "text-slate-300 hover:bg-white/5"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <Link
                to="/#contact"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-[#f1e2c8] py-2 text-center font-semibold text-black"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default BookServiceNavbar;