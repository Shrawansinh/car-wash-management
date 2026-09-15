import { useEffect } from "react";
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

const Toast = ({
  message,
  type = "success",
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const isSuccess = type === "success";

  return (
    <div className="fixed right-5 top-5 z-9999 animate-toast-in">
      <div
        className={`flex min-w-[320px] max-w-105 items-center gap-3 rounded-xl border px-4 py-3 shadow-2xl backdrop-blur-md ${
          isSuccess
            ? "border-green-500/30 bg-slate-900/95"
            : "border-red-500/30 bg-slate-900/95"
        }`}
      >
        {/* ICON */}
        {isSuccess ? (
          <FaCheckCircle className="shrink-0 text-xl text-green-400" />
        ) : (
          <FaExclamationCircle className="shrink-0 text-xl text-red-400" />
        )}

        {/* MESSAGE */}
        <p className="flex-1 text-sm font-medium text-white">
          {message}
        </p>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="shrink-0 text-slate-500 transition hover:text-white"
        >
          <FaTimes />
        </button>
      </div>

      {/* PROGRESS BAR */}
      <div
        className={`mt-1 h-1 origin-left animate-toast-progress rounded-full ${
          isSuccess ? "bg-green-400" : "bg-red-400"
        }`}
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );
};

export default Toast;