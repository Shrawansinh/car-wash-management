import { Link } from "react-router-dom";

const Hero = () => {
  const heroImage =
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=80";
  const highlights = ["Doorstep service", "Eco-friendly products", "Express detailing"];

  return (
    <section id="home" className="relative isolate overflow-hidden bg-[#05070b]">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury car being professionally washed"
          className="h-full w-full object-cover object-center scale-105 saturate-[0.9] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(5,7,11,0.97)_0%,rgba(10,14,22,0.84)_38%,rgba(12,18,29,0.36)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(214,182,120,0.18),transparent_26%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_86%,rgba(255,255,255,0.06),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,transparent_30%,rgba(0,0,0,0.18)_100%)]" />
      </div>

      <div className="absolute -left-16 top-24 h-72 w-72 rounded-full bg-[#c9a46b]/10 blur-[130px]" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#8b6b3f]/10 blur-[140px]" />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl items-center px-6 py-24 lg:px-8">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-[#c9a46b]/30 bg-[#c9a46b]/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.28em] text-[#f1e2c8] backdrop-blur-md">
              Signature detailing studio
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-[0.95] text-white sm:text-5xl lg:text-7xl">
              Refined care for
              <span className="mt-2 block bg-linear-to-r from-[#f5ebda] via-[#d8b37a] to-[#f5ebda] bg-clip-text text-transparent">
                exceptional vehicles.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200/90">
              Precision hand finishing, premium protection, and a service experience shaped with the calm confidence of a luxury atelier.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/bookService"
                className="rounded-full bg-[#f1e2c8] px-7 py-3.5 font-semibold text-[#0f1115] transition duration-300 hover:bg-[#e7d5b3]"
              >
                Book now
              </Link>

              <a
                href="#services"
                className="rounded-full border border-white/20 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-md transition duration-300 hover:bg-white/15"
              >
                View packages
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-sm text-slate-100/90 backdrop-blur-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-105">
            <div className="rounded-[30px] border border-white/15 bg-slate-950/45 p-px shadow-[0_30px_80px_rgba(2,6,23,0.5)] backdrop-blur-xl">
              <div className="rounded-[29px] bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(15,23,42,0.72))] p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.35em] text-slate-400">
                      Signature package
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      The Executive Finish
                    </h2>
                  </div>
                  <div className="rounded-full border border-[#c9a46b]/25 bg-[#c9a46b]/10 px-3 py-1 text-sm font-medium text-[#f1e2c8]">
                    4.9 / 5
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">Hand wash & dry</span>
                    <span className="font-medium text-white">Included</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-slate-300">Interior reset</span>
                    <span className="font-medium text-white">Deep clean</span>
                  </div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                    <p className="text-sm font-semibold text-white">Gloss protection</p>
                    <p className="mt-1 text-sm text-slate-400">Longer shine with a refined finish</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                    <p className="text-sm font-semibold text-white">Doorstep care</p>
                    <p className="mt-1 text-sm text-slate-400">Flexible service at your convenience</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-slate-400">
                  <span>Open daily • 8am to 8pm</span>
                  <span>Fast booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-12 w-7 justify-center rounded-full border-2 border-white/80">
          <div className="mt-2 h-3 w-1 rounded-full bg-white" />
        </div>
      </div>
    </section>
  );
};

export default Hero;