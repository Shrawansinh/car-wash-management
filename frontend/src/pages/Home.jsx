import { Link } from "react-router-dom";
import { FaArrowRight, FaCarSide, FaClock, FaMagic, FaShieldAlt, FaStar } from "react-icons/fa";
import Hero from "../componenets/Hero";
import Navbar from "../componenets/Navbar";

const Home = () => {
  const services = [
    {
      title: "Exterior Revival",
      description: "Hand wash, foam prep, and mirror gloss for a flawless finish.",
      icon: FaMagic,
    },
    {
      title: "Interior Reset",
      description: "Deep vacuum, leather care, and cabin refresh with premium attention.",
      icon: FaCarSide,
    },
    {
      title: "Protection Care",
      description: "Ceramic protection and long-lasting shine with durable finishing details.",
      icon: FaShieldAlt,
    },
  ];

  const benefits = [
    "Doorstep convenience and flexible scheduling",
    "Eco-conscious products and gentle detailing methods",
    "Trusted by repeat clients who value consistency",
  ];

  const gallery = [
    {
      title: "Executive Finish",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Gloss Detail",
      image:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Interior Luxury",
      image:
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const testimonials = [
    {
      quote: "The finishing was impeccable, polished, and incredibly calm from start to finish.",
      name: "Aisha Patel",
    },
    {
      quote: "They made my SUV look like it was straight from the showroom.",
      name: "Rohan Verma",
    },
  ];

  return (
    <div className="min-h-screen bg-[#05070b] text-white">
      <Navbar />
      <Hero />

      <main className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <section className="relative z-10 -mt-10 grid gap-4 rounded-[32px] border border-white/10 bg-[rgba(10,14,22,0.9)] p-4 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:grid-cols-3">
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Trusted care</p>
            <p className="mt-3 text-3xl font-semibold text-white">5,000+</p>
            <p className="mt-2 text-sm text-slate-400">vehicles refined with precision and care</p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Client rating</p>
            <p className="mt-3 text-3xl font-semibold text-white">4.9/5</p>
            <p className="mt-2 text-sm text-slate-400">consistently praised for detail and reliability</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Availability</p>
            <p className="mt-3 flex items-center gap-2 text-3xl font-semibold text-white">
              <FaClock className="text-[#f1e2c8]" /> 24/7
            </p>
            <p className="mt-2 text-sm text-slate-400">booking support and flexible visit timing</p>
          </div>
        </section>

        <section id="services" className="mt-24">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.32em] text-[#d8b37a]">Our services</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                A premium experience tailored to your vehicle.
              </h2>
            </div>
            <Link to="/book-service" className="inline-flex items-center gap-2 text-sm font-semibold text-[#f1e2c8] transition hover:text-white">
              Book a visit <FaArrowRight />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="rounded-[28px] border border-white/10 bg-[rgba(10,14,22,0.82)] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a46b]/30 bg-[#f1e2c8]/10 text-[#f1e2c8]">
                    <Icon />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{service.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-24 grid gap-8 lg:grid-cols-[0.96fr_1.04fr]">
          <div className="rounded-4xl border border-white/10 bg-[linear-gradient(135deg,rgba(241,226,200,0.08),rgba(10,14,22,0.9))] p-8 shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
            <p className="text-sm uppercase tracking-[0.32em] text-[#d8b37a]">Why clients return</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              Clean, quiet, and carefully delivered.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Every visit is designed to feel calm and effortless, with meticulous finishing and a polished presentation from first greeting to final handoff.
            </p>

            <ul className="mt-8 space-y-4 text-sm text-slate-300">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-[#f1e2c8]">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-4xl border border-white/10 bg-[rgba(10,14,22,0.86)] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Signature process</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">The luxury finish sequence</h3>
                </div>
                <div className="rounded-full border border-[#c9a46b]/25 bg-[#c9a46b]/10 px-3 py-1 text-sm font-medium text-[#f1e2c8]">
                  3-step flow
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  ["Preparation", "Pre-wash inspection and gentle exterior prep"],
                  ["Detailing", "Precision hand finishing and cabin refresh"],
                  ["Protection", "Sealant and gloss enhancement for durability"],
                ].map(([title, detail]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/4 p-4">
                    <p className="font-semibold text-white">{title}</p>
                    <p className="mt-1 text-sm text-slate-400">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="mt-24">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-[#d8b37a]">Gallery</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                Stunning transformations, delivered with care.
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {gallery.map((item) => (
              <div key={item.title} className="overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(10,14,22,0.82)] shadow-[0_15px_45px_rgba(0,0,0,0.25)]">
                <img src={item.image} alt={item.title} className="h-60 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">A polished result shaped by detail, time, and precision.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="mt-24 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-4xl border border-white/10 bg-[rgba(10,14,22,0.86)] p-8">
            <p className="text-sm uppercase tracking-[0.32em] text-[#d8b37a]">Testimonials</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              A reputation built on quality and consistency.
            </h2>
            <div className="mt-6 flex items-center gap-2 text-[#f1e2c8]">
              {Array.from({ length: 5 }).map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              Clients choose us for the calm experience, the meticulous finish, and the confidence that their vehicle is in expert hands.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.map((review) => (
              <div key={review.name} className="rounded-[28px] border border-white/10 bg-[rgba(10,14,22,0.82)] p-6">
                <p className="text-sm leading-7 text-slate-300">“{review.quote}”</p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.26em] text-[#f1e2c8]">{review.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-24">
          <div className="rounded-[36px] border border-[#c9a46b]/20 bg-[linear-gradient(135deg,rgba(241,226,200,0.16),rgba(10,14,22,0.95))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.32em] text-[#d8b37a]">Ready to book</p>
                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                  Give your vehicle the finish it deserves.
                </h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  Reserve your visit today and experience detailing that feels polished, effortless, and unmistakably premium.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/book-service" className="rounded-full bg-[#f1e2c8] px-6 py-3 font-semibold text-[#0f1115] transition hover:bg-[#e7d5b3]">
                  Book now
                </Link>
                <a href="#home" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                  Back to top
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;