import { useEffect, useState } from "react";
import { FaEye, FaPhone, FaTimes } from "react-icons/fa";
import api from "../../api/api";
import { useToast } from "../../componenets/Toast/ToastCongtext";
const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await api.get("/bookings");

      setBookings(response.data.data || []);
    } catch (error) {
      console.error("Fetch bookings error:", error);
      showToast("Failed to fetch bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

const updateStatus = async (id, status) => {
  try {
    setUpdating(true);

    await api.put(`/bookings/${id}`, {
      status,
    });

    await fetchBookings();

    if (selectedBooking?._id === id) {
      setSelectedBooking((prev) => ({
        ...prev,
        status,
      }));
    }

    showToast(
      `Booking ${status.toLowerCase()} successfully!`,
      "success"
    );
  } catch (error) {
    console.error("Update booking status error:", error);

    showToast(
      error.response?.data?.message ||
        "Failed to update booking status",
      "error"
    );
  } finally {
    setUpdating(false);
  }
};

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

      case "Confirmed":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";

      case "Completed":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      case "Cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Bookings Management
        </h1>

        <p className="mt-1 text-slate-400">
          Manage all customer bookings and their status.
        </p>
      </div>


      {/* BOOKINGS TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

        {loading ? (
          <div className="p-10 text-center text-slate-400">
            Loading bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-10 text-center text-slate-400">
            No bookings found.
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-250">

              <thead className="border-b border-slate-800 bg-slate-950">

                <tr className="text-left text-sm text-slate-400">

                  <th className="px-6 py-4">
                    Customer
                  </th>

                  <th className="px-6 py-4">
                    Vehicle
                  </th>

                  <th className="px-6 py-4">
                    Service
                  </th>

                  <th className="px-6 py-4">
                    Date
                  </th>

                  <th className="px-6 py-4">
                    Time
                  </th>

                  <th className="px-6 py-4">
                    Amount
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {bookings.map((booking) => (

                  <tr
                    key={booking._id}
                    className="border-b border-slate-800 transition hover:bg-slate-800/40"
                  >

                    {/* CUSTOMER */}
                    <td className="px-6 py-4">

                      <div className="font-medium text-white">
                        {booking.customer?.fullName || "N/A"}
                      </div>

                      <a
                        href={`tel:${booking.customer?.phone || ""}`}
                        className="mt-1 flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300"
                      >
                        <FaPhone size={11} />

                        {booking.customer?.phone || "N/A"}
                      </a>

                    </td>


                    {/* VEHICLE */}
                    <td className="px-6 py-4">

                      <div className="text-white">
                        {booking.vehicleType || "N/A"}
                      </div>

                      <div className="text-sm text-slate-500">
                        {booking.customer?.vehicleNumber || "N/A"}
                      </div>

                    </td>


                    {/* SERVICE */}
                    <td className="px-6 py-4 text-slate-300">
                      {booking.service?.name || "N/A"}
                    </td>


                    {/* DATE */}
                    <td className="px-6 py-4 text-slate-300">
                      {formatDate(booking.bookingDate)}
                    </td>


                    {/* TIME */}
                    <td className="px-6 py-4 text-slate-300">
                      {booking.timeSlot?.slot || "N/A"}
                    </td>


                    {/* AMOUNT */}
                    <td className="px-6 py-4 font-semibold text-white">
                      ₹{booking.totalAmount || 0}
                    </td>


                    {/* STATUS */}
                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>

                    </td>


                    {/* ACTION */}
                    <td className="px-6 py-4">

                      <button
                        onClick={() =>
                          setSelectedBooking(booking)
                        }
                        className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white transition hover:border-sky-500 hover:bg-sky-500/10"
                      >
                        <FaEye />

                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>


      {/* ========================= */}
      {/* BOOKING DETAILS MODAL */}
      {/* ========================= */}

      {selectedBooking && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-800 p-6">

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Booking Details
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  ID: {selectedBooking._id}
                </p>
              </div>


              <button
                onClick={() => setSelectedBooking(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <FaTimes size={20} />
              </button>

            </div>


            {/* MODAL BODY */}
            <div className="space-y-6 p-6">

              {/* CUSTOMER */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">

                <h3 className="mb-4 text-lg font-semibold text-white">
                  Customer Information
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">

                  <div>
                    <p className="text-sm text-slate-500">
                      Full Name
                    </p>

                    <p className="mt-1 text-white">
                      {selectedBooking.customer?.fullName || "N/A"}
                    </p>
                  </div>


                  <div>
                    <p className="text-sm text-slate-500">
                      Phone
                    </p>

                    <a
                      href={`tel:${selectedBooking.customer?.phone || ""}`}
                      className="mt-1 flex items-center gap-2 text-sky-400 hover:text-sky-300"
                    >
                      <FaPhone size={12} />

                      {selectedBooking.customer?.phone || "N/A"}
                    </a>
                  </div>


                  <div>
                    <p className="text-sm text-slate-500">
                      Email
                    </p>

                    <p className="mt-1 text-white">
                      {selectedBooking.customer?.email || "N/A"}
                    </p>
                  </div>

                </div>

              </div>


              {/* VEHICLE */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">

                <h3 className="mb-4 text-lg font-semibold text-white">
                  Vehicle Information
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">

                  <div>
                    <p className="text-sm text-slate-500">
                      Vehicle Type
                    </p>

                    <p className="mt-1 text-white">
                      {selectedBooking.vehicleType || "N/A"}
                    </p>
                  </div>


                  <div>
                    <p className="text-sm text-slate-500">
                      Vehicle Number
                    </p>

                    <p className="mt-1 font-medium text-white">
                      {selectedBooking.customer?.vehicleNumber || "N/A"}
                    </p>
                  </div>

                </div>

              </div>


              {/* BOOKING */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">

                <h3 className="mb-4 text-lg font-semibold text-white">
                  Booking Information
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">

                  <div>
                    <p className="text-sm text-slate-500">
                      Service
                    </p>

                    <p className="mt-1 text-white">
                      {selectedBooking.service?.name || "N/A"}
                    </p>
                  </div>


                  <div>
                    <p className="text-sm text-slate-500">
                      Date
                    </p>

                    <p className="mt-1 text-white">
                      {formatDate(selectedBooking.bookingDate)}
                    </p>
                  </div>


                  <div>
                    <p className="text-sm text-slate-500">
                      Time Slot
                    </p>

                    <p className="mt-1 text-white">
                      {selectedBooking.timeSlot?.slot || "N/A"}
                    </p>
                  </div>


                  <div>
                    <p className="text-sm text-slate-500">
                      Total Amount
                    </p>

                    <p className="mt-1 text-xl font-bold text-white">
                      ₹{selectedBooking.totalAmount || 0}
                    </p>
                  </div>

                </div>

              </div>


              {/* PAYMENT */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">

                <h3 className="mb-4 text-lg font-semibold text-white">
                  Payment
                </h3>

                <div className="flex items-center justify-between">

                  <span className="text-slate-400">
                    Payment Status
                  </span>

                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${
                      selectedBooking.paymentStatus === "Paid"
                        ? "border-green-500/20 bg-green-500/10 text-green-400"
                        : "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {selectedBooking.paymentStatus || "Pending"}
                  </span>

                </div>

              </div>


              {/* CURRENT STATUS */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5">

                <div className="flex items-center justify-between">

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Booking Status
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Current booking status
                    </p>
                  </div>


                  <span
                    className={`rounded-full border px-4 py-2 text-sm font-medium ${getStatusClass(
                      selectedBooking.status
                    )}`}
                  >
                    {selectedBooking.status}
                  </span>

                </div>

              </div>


              {/* ACTIONS */}
              <div className="flex flex-wrap gap-3 border-t border-slate-800 pt-5">

                {selectedBooking.status === "Pending" && (
                  <>
                    <button
                      disabled={updating}
                      onClick={() =>
                        updateStatus(
                          selectedBooking._id,
                          "Confirmed"
                        )
                      }
                      className="rounded-lg bg-sky-500 px-5 py-2.5 font-medium text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {updating ? "Updating..." : "Confirm Booking"}
                    </button>


                    <button
                      disabled={updating}
                      onClick={() =>
                        updateStatus(
                          selectedBooking._id,
                          "Cancelled"
                        )
                      }
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-2.5 font-medium text-red-400 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Cancel Booking
                    </button>
                  </>
                )}


                {selectedBooking.status === "Confirmed" && (
                  <button
                    disabled={updating}
                    onClick={() =>
                      updateStatus(
                        selectedBooking._id,
                        "Completed"
                      )
                    }
                    className="rounded-lg bg-green-500 px-5 py-2.5 font-medium text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {updating ? "Updating..." : "Mark Completed"}
                  </button>
                )}


                {selectedBooking.status === "Completed" && (
                  <p className="rounded-lg border border-green-500/20 bg-green-500/10 px-5 py-2.5 text-sm text-green-400">
                    ✓ This booking is completed.
                  </p>
                )}


                {selectedBooking.status === "Cancelled" && (
                  <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-5 py-2.5 text-sm text-red-400">
                    This booking has been cancelled.
                  </p>
                )}

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default AdminBookings;