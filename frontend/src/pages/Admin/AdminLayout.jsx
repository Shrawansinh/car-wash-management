import {
  FaCalendarCheck,
  FaCar,
  FaClock,
  FaConciergeBell,
  FaImages,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useToast } from "../../componenets/Toast/ToastCongtext";
const AdminLayout = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: <FaCalendarCheck />,
    },
    {
      name: "Time Slots",
      path: "/admin/timeslots",
      icon: <FaClock />,
    },
    {
      name: "Services",
      path: "/admin/services",
      icon: <FaConciergeBell />,
    },
    {
      name: "Customers",
      path: "/admin/customers",
      icon: <FaUsers />,
    },
    {
      name: "Gallery",
      path: "/admin/gallery",
      icon: <FaImages />,
    },
  ];

  const handleLogout = async () => {
    try{
      await api.post("/admin/logout");
      navigate("/login");
    }catch(error){
      console.error("Logout Error:", error);
      showToast("Failed to logout", "error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 fixed left-0 top-0 bottom-0 z-50">

        {/* Logo */}
        <div className="h-20 px-6 flex items-center border-b border-slate-800">
          <FaCar className="text-sky-400 text-2xl mr-3" />

          <div>
            <h1 className="font-bold text-lg">
              Maa <span className="text-sky-400">CarWash</span>
            </h1>

            <p className="text-xs text-slate-500">
              Admin Panel
            </p>
          </div>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-sky-500 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.name}
              </span>
            </NavLink>
          ))}

        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
          >
            <FaSignOutAlt />

            <span className="font-medium">
              Logout
            </span>
          </button>

        </div>

      </aside>

      {/* Main Area */}
      <div className="ml-64 flex-1">

        {/* Top Navbar */}
        <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">

          <div>
            <h2 className="text-xl font-semibold">
              Admin Panel
            </h2>

            <p className="text-sm text-slate-500">
              Manage your car wash center
            </p>
          </div>

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400">
              A
            </div>

            <div>
              <p className="text-sm font-semibold">
                Admin
              </p>

              <p className="text-xs text-slate-500">
                Administrator
              </p>
            </div>

          </div>

        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;