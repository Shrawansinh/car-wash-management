import { useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";
import api from "../../api/api";
import { useToast } from "../../componenets/Toast/ToastCongtext";
const AdminDashboard = () => {
  const [statsData, setStatsData] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    todayBookings: 0,
    availableSlots: 0,
    totalCustomers: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const response = await api.get("/bookings/stats");

      const data = response.data.data;

      setStatsData({
        totalBookings: data.totalBookings || 0,
        pendingBookings: data.pendingBookings || 0,
        confirmedBookings: data.confirmedBookings || 0,
        completedBookings: data.completedBookings || 0,
        cancelledBookings: data.cancelledBookings || 0,

        todayBookings: data.todayBookings || 0,
        availableSlots: data.availableSlots || 0,
        totalCustomers: data.totalCustomers || 0,
      });

      setRecentBookings(data.recentBookings || []);
    } catch (error) {
      console.error("Dashboard data error:", error);

      showToast(
        error.response?.data?.message ||
          "Failed to load dashboard data",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = [
    {
      title: "Total Bookings",
      value: statsData.totalBookings,
      icon: <FaCalendarCheck />,
    },
    {
      title: "Pending",
      value: statsData.pendingBookings,
      icon: <FaClock />,
    },
    {
      title: "Confirmed",
      value: statsData.confirmedBookings,
      icon: <FaCheckCircle />,
    },
    {
      title: "Completed",
      value: statsData.completedBookings,
      icon: <FaCheckCircle />,
    },
    {
      title: "Cancelled",
      value: statsData.cancelledBookings,
      icon: <FaTimesCircle />,
    },
  ];

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      {/* Page Heading */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Overview of your car washing center.
          </p>
        </div>

        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 disabled:text-slate-500 px-5 py-3 rounded-xl font-medium transition"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-sky-500/40 transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">
                  {stat.title}
                </p>

                <h2 className="text-3xl font-bold mt-3">
                  {loading ? "..." : stat.value}
                </h2>
              </div>

              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center text-xl">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Overview */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-5">
          Quick Overview
        </h2>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Today's Bookings */}
            <div>
              <p className="text-slate-500 text-sm">
                Today's Bookings
              </p>

              <p className="text-2xl font-bold mt-2">
                {loading ? "..." : statsData.todayBookings}
              </p>
            </div>

            {/* Available Slots */}
            <div>
              <p className="text-slate-500 text-sm">
                Available Slots
              </p>

              <p className="text-2xl font-bold mt-2">
                {loading ? "..." : statsData.availableSlots}
              </p>
            </div>

            {/* Total Customers */}
            <div>
              <p className="text-slate-500 text-sm">
                Total Customers
              </p>

              <p className="text-2xl font-bold mt-2">
                {loading ? "..." : statsData.totalCustomers}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">
            Recent Bookings
          </h2>

          <button className="text-sky-400 hover:text-sky-300 text-sm">
            View All
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Loading recent bookings...
            </div>
          ) : recentBookings.length === 0 ? (
            <div className="p-8 text-center text-slate-500">
              No recent bookings available.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-200">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left px-6 py-4 text-sm text-slate-400">
                      Customer
                    </th>

                    <th className="text-left px-6 py-4 text-sm text-slate-400">
                      Vehicle
                    </th>

                    <th className="text-left px-6 py-4 text-sm text-slate-400">
                      Service
                    </th>

                    <th className="text-left px-6 py-4 text-sm text-slate-400">
                      Date
                    </th>

                    <th className="text-left px-6 py-4 text-sm text-slate-400">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentBookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-b border-slate-800 last:border-0 hover:bg-slate-800/30"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-white">
                          {booking.customer?.fullName || "-"}
                        </p>

                        <p className="text-sm text-slate-500">
                          {booking.customer?.phone || "-"}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-white">
                          {booking.vehicleType || "-"}
                        </p>

                        <p className="text-sm text-slate-500">
                          {booking.customer?.vehicleNumber || "-"}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {booking.service?.name || "-"}
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {formatDate(booking.bookingDate)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-lg text-xs border ${
                            booking.status === "Pending"
                              ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                              : booking.status === "Confirmed"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : booking.status === "Completed"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : "bg-red-500/10 text-red-400 border-red-500/20"
                          }`}
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
    </div>
  );
};

export default AdminDashboard;