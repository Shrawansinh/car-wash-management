import { useState } from "react";
import {
  FaCar,
  FaEnvelope,
  FaHome,
  FaLock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { useToast } from "../../componenets/Toast/ToastCongtext";
const AdminLogin = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showToast("Please enter email and password", "error");
      return;
    }

    try {
      setLoading(true);

      // Backend login
      // JWT ab HttpOnly cookie me save hoga
      const response = await api.post("/admin/login", formData);

      console.log("Login response:", response.data);

      showToast("Login successful", "success");

      navigate("/admin");
    } catch (error) {
      console.error("Login Error:", error);

      showToast(
        error?.response?.data?.message ||
          "Invalid email or password",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4">
            <FaCar className="text-3xl" />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Maa <span className="text-sky-400">CarWash</span>
          </h1>

          <p className="text-slate-500 mt-2">
            Admin Panel
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">

          <h2 className="text-2xl font-bold text-white mb-2">
            Admin Login
          </h2>

          <p className="text-slate-400 text-sm mb-7">
            Login to manage your car wash center.
          </p>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Email */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Email
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter admin email"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3.5 pl-11 pr-4 text-white outline-none focus:border-sky-500 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3.5 pl-11 pr-4 text-white outline-none focus:border-sky-500 transition"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl py-3.5 font-semibold transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Back Home */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 mx-auto mb-6 text-slate-400 hover:text-sky-400 transition"
            >
              <FaHome />
              Back to Home
            </button>

          </form>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Maa Nagneshwari CarWash • Admin Access
        </p>

      </div>
    </div>
  );
};

export default AdminLogin;