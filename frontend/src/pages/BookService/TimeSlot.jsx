import { useEffect, useState } from "react";
import api from "../../api/api";

const TimeSlot = ({
  bookingDate,
  selectedTimeSlot,
  setSelectedTimeSlot,
  handleBooking,
  loading,
}) => {
  const [slots, setSlots] = useState([]);
  const [slotsloading, setSlotLoading] = useState(false);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!bookingDate) {
        setSlots([]);
        return;
      }

      try {
        setSlotLoading(true);

        console.log("Selected Date:", bookingDate);

        const response = await api.get("/timeslots", {
          params: {
            date: bookingDate,
          },
        });

        console.log("Slots from API:", response.data.data);

        setSlots(response.data.data);
      } catch (error) {
        console.error(
          "Error fetching time slots:",
          error
        );

        setSlots([]);
      } finally {
        setSlotLoading(false);
      }
    };

    fetchSlots();
  }, [bookingDate]);

  return (
    <section className="py-20 px-6 bg-slate-950">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white">
            Select{" "}
            <span className="text-sky-400">
              Time Slot
            </span>
          </h2>

          <p className="text-slate-400 mt-3">
            Choose your preferred booking time.
          </p>
        </div>

        {!bookingDate && (
          <p className="text-center text-slate-400">
            Please select a date first.
          </p>
        )}

        {slotsloading && (
          <p className="text-center text-sky-400">
            Loading available slots...
          </p>
        )}

        {!slotsloading &&
          bookingDate &&
          slots.length === 0 && (
            <p className="text-center text-slate-400">
              No time slots available for this date.
            </p>
          )}

        {!slotsloading && slots.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

            {slots.map((slot) => (
              <button
                key={slot._id}
                disabled={slot.isBooked}
                onClick={() => setSelectedTimeSlot(slot)}
                className={`
                  rounded-xl py-4 font-semibold transition

                  ${
                    slot.isBooked
                      ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                      : selectedTimeSlot?._id === slot._id
                      ? "bg-sky-500 text-white shadow-lg"
                      : "bg-slate-900 border border-slate-700 text-slate-300 hover:border-sky-500 hover:text-white"
                  }
                `}
              >
                {slot.slot}

                {slot.isBooked && (
                  <span className="block text-xs mt-1">
                    Booked
                  </span>
                )}
              </button>
            ))}

          </div>
        )}

        {/* Book Service Button */}
        <div className="mt-10">
          <button
            disabled={
              !selectedTimeSlot ||
              selectedTimeSlot.isBooked
            }
            onClick={handleBooking}
            className="
              w-full
              bg-sky-500
              hover:bg-sky-600
              disabled:bg-slate-700
              disabled:text-slate-500
              rounded-xl
              py-4
              text-lg
              font-semibold
              transition
            "
          >
            {loading ? "Booking..." : "Book Service"}
          </button>
        </div>

      </div>
    </section>
  );
};

export default TimeSlot;