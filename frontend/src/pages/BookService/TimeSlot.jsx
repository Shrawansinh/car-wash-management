const slots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const TimeSlot = ({
  selectedTimeSlot,
  setSelectedTimeSlot,
}) => {
  return (
    <section className="py-20 px-6 bg-slate-950">

      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">

          <h2 className="text-4xl font-bold text-white">

            Select

            <span className="text-sky-400">
              {" "}Time Slot
            </span>

          </h2>

          <p className="text-slate-400 mt-3">
            Choose your preferred booking time.
          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

          {slots.map((slot) => (

            <button
              key={slot}
              onClick={() => setSelectedTimeSlot(slot)}
              className={`rounded-xl py-4 font-semibold transition

              ${
                selectedTimeSlot === slot

                  ? "bg-sky-500 text-white shadow-lg"

                  : "bg-slate-900 border border-slate-700 text-slate-300 hover:border-sky-500 hover:text-white"
              }`}
            >

              {slot}

            </button>

          ))}

        </div>

      </div>

    </section>
  );
};

export default TimeSlot;