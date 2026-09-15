import { useEffect, useState } from "react";
import api from "../../api/api";
import { useToast } from "../../componenets/Toast/ToastCongtext";
const AdminCustomers = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const fetchBookings = async () => {

    try {
      setLoading(true);

      const response = await api.get("/bookings");

      setBookings(response.data.data || []);
    } catch (error) {
      console.error("Fetch customer history error:", error);

      showToast(
        error.response?.data?.message ||
          "Failed to load customer history",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Unique customer count
  const uniqueCustomers = new Set(
    bookings
      .map((booking) => booking.customer?._id)
      .filter(Boolean)
  );

  // Format date
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Status style
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400";

      case "Confirmed":
        return "bg-blue-500/20 text-blue-400";

      case "Completed":
        return "bg-green-500/20 text-green-400";

      case "Cancelled":
        return "bg-red-500/20 text-red-400";

      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  // Cancelled bookings are NOT included in revenue
  const totalRevenue = bookings
    .filter((booking) => booking.status !== "Cancelled")
    .reduce(
      (total, booking) =>
        total + (booking.totalAmount || 0),
      0
    );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          Customers
        </h1>

        <p className="text-slate-400 mt-2">
          View customer wash history and booking details.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">

        {/* Unique Customers */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-slate-400">
            Total Customers
          </p>

          <h2 className="text-3xl font-bold text-sky-400 mt-2">
            {uniqueCustomers.size}
          </h2>
        </div>

        {/* Total Washes */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-slate-400">
            Total Washes
          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {bookings.length}
          </h2>
        </div>

        {/* Total Revenue */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <p className="text-slate-400">
            Total Revenue
          </p>

          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            ₹{totalRevenue}
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        {loading ? (
          <div className="p-10 text-center text-slate-400">
            Loading customer history...
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-10 text-center text-slate-400">
            No customer bookings found.
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-275">

              <thead className="bg-slate-800">
                <tr>
                  <th className="text-left p-4 text-slate-300">
                    #
                  </th>

                  <th className="text-left p-4 text-slate-300">
                    Customer
                  </th>

                  <th className="text-left p-4 text-slate-300">
                    Phone
                  </th>

                  <th className="text-left p-4 text-slate-300">
                    Vehicle
                  </th>

                  <th className="text-left p-4 text-slate-300">
                    Vehicle No.
                  </th>

                  <th className="text-left p-4 text-slate-300">
                    Service
                  </th>

                  <th className="text-left p-4 text-slate-300">
                    Price
                  </th>

                  <th className="text-left p-4 text-slate-300">
                    Date
                  </th>

                  <th className="text-left p-4 text-slate-300">
                    Time
                  </th>

                  <th className="text-left p-4 text-slate-300">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className="border-t border-slate-800 hover:bg-slate-800/50"
                  >
                    {/* Number */}
                    <td className="p-4 text-slate-400">
                      {index + 1}
                    </td>

                    {/* Customer */}
                    <td className="p-4">
                      <div className="text-white font-medium">
                        {booking.customer?.fullName || "-"}
                      </div>

                      <div className="text-xs text-slate-500 mt-1">
                        {booking.customer?.email || ""}
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="p-4">
                      {booking.customer?.phone ? (
                        <a
                          href={`tel:${booking.customer.phone}`}
                          className="text-sky-400 hover:underline"
                        >
                          {booking.customer.phone}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    {/* Vehicle */}
                    <td className="p-4 text-slate-300">
                      {booking.vehicleType || "-"}
                    </td>

                    {/* Vehicle Number */}
                    <td className="p-4 text-white font-medium">
                      {booking.customer?.vehicleNumber || "-"}
                    </td>

                    {/* Service */}
                    <td className="p-4 text-slate-300">
                      {booking.service?.name || "-"}
                    </td>

                    {/* Price */}
                    <td className="p-4 text-green-400 font-bold">
                      {booking.totalAmount !== null &&
                      booking.totalAmount !== undefined
                        ? `₹${booking.totalAmount}`
                        : "Quote"}
                    </td>

                    {/* Date */}
                    <td className="p-4 text-slate-300">
                      {formatDate(booking.bookingDate)}
                    </td>

                    {/* Time */}
                    <td className="p-4 text-sky-400">
                      {booking.timeSlot?.slot || "-"}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCustomers;