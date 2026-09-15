import { useEffect, useState } from "react";
import api from "../../api/api";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await api.get("/gallery");

        setGallery(response.data.data || []);
      } catch (error) {
        console.error("Gallery fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const activeGallery = gallery.filter(
    (item) => item.isActive
  );

  return (
    <section id="gallery" className="mt-24">
      {/* Heading */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-[#d8b37a]">
            Gallery
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Stunning transformations, delivered with care.
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Explore some of our latest car wash and detailing work.
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-80 animate-pulse rounded-[28px] border border-white/10 bg-white/5"
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && activeGallery.length === 0 && (
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-slate-400">
            No gallery images available at the moment.
          </p>
        </div>
      )}

      {/* Gallery */}
      {!loading && activeGallery.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {activeGallery.map((item, index) => (
            <div
              key={item._id}
              className="group overflow-hidden rounded-[28px] border border-white/10 bg-[rgba(10,14,22,0.82)] shadow-[0_15px_45px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-2 hover:border-[#c9a46b]/30 hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
              style={{
                animation: `fadeUp 0.6s ease ${index * 0.1}s both`,
              }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                {/* View label */}
                <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-white backdrop-blur-md">
                  Maa Nagneshwari CarWash
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {item.description ||
                    "A polished result shaped by detail, time, and precision."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;