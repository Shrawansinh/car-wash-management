import { useState } from "react";
import { FaCarSide } from "react-icons/fa";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-[rgba(5,7,11,0.72)] px-3 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:px-5">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a46b]/30 bg-[#f1e2c8]/10 transition duration-300 hover:scale-105">
              <FaCarSide className="text-lg text-[#f1e2c8]" />
            </div>

            <div className="leading-none">
              <p className="text-[11px] uppercase tracking-[0.32em] text-slate-400">
                Luxury car care
              </p>
              <h1 className="mt-1 text-sm font-semibold tracking-[0.16em] text-white sm:text-base">
                Maa Nagneshwari
              </h1>
            </div>
          </Link>

          <ul className="hidden items-center gap-7 text-sm font-medium text-slate-300 lg:flex">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="relative transition duration-300 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#f1e2c8] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/login"
              className="rounded-full px-4 py-2 text-sm text-slate-300 transition duration-300 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/bookService"
              className="rounded-full bg-[#f1e2c8] px-5 py-2.5 text-sm font-semibold text-[#0f1115] shadow-[0_10px_30px_rgba(241,226,200,0.18)] transition duration-300 hover:bg-[#e7d5b3]"
            >
              Book now
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-white transition duration-300 hover:bg-white/10 lg:hidden"
          >
            {open ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>
        </nav>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          open ? "mt-3 max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-[rgba(5,7,11,0.95)] p-4 shadow-2xl backdrop-blur-xl">
          <ul className="flex flex-col gap-4 text-sm font-medium text-slate-300">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-2 transition duration-300 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="text-sm text-slate-300 transition duration-300 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/book-service"
              onClick={() => setOpen(false)}
              className="rounded-full bg-[#f1e2c8] px-4 py-2 text-sm font-semibold text-[#0f1115]"
            >
              Reserve
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;