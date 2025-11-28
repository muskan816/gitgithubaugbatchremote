import React, { useEffect, useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { signinApi } from "../../api/authApi";
import { createPortal } from "react-dom";

export default function LoginModal({ onClose, onSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const GOLD = "#d4af37";

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev || "";
    };
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const res = await signinApi({ email, password: pwd });
    setLoading(false);

    if (!res.ok) {
      setErr(res.message || "Login failed");
      return;
    }

    const token = res.data?.token;
    if (token) localStorage.setItem("auth_token", token);

    onSuccess?.(res.data); //  this triggers the redirect via AuthSection
    onClose?.();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute cursor-pointer top-3 right-3 hover:opacity-80"
          style={{ color: GOLD }}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        {/* 🔹 Tab switcher */}
        <div
          className="flex border-b mb-6"
          style={{ borderColor: `${GOLD}66` }}
        >
          <button
            type="button"
            className="w-1/2 py-2 cursor-pointer text-center font-semibold border-b-2"
            style={{ color: GOLD, borderColor: GOLD }}
          >
            Login
          </button>
          <button
            type="button"
            className="w-1/2 py-2 cursor-pointer text-center font-semibold text-gray-400 hover:opacity-80"
            style={{ hoverColor: GOLD }}
            onClick={onSwitchToRegister}
          >
            Register
          </button>
        </div>

        {err && (
          <div className="mb-3 text-sm bg-red-50 text-red-700 border border-red-200 rounded px-3 py-2">
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          {/* Google Login */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 w-full py-2 border rounded-lg transition"
            style={{
              borderColor: GOLD,
              color: GOLD,
            }}
          >
            <FaGoogle /> Login with Google
          </button>

          <div className="text-center text-gray-400 text-sm">OR</div>

          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1"
            style={{
              borderColor: "#ccc",
              focusRingColor: GOLD,
            }}
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Password"
              className="w-full border rounded-lg p-2 pr-10 focus:outline-none focus:ring-1"
              style={{
                borderColor: "#ccc",
                focusRingColor: GOLD,
              }}
              required
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer"
              style={{ color: GOLD }}
              onClick={() => setShowPwd((v) => !v)}
            >
              {showPwd ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Forgot Password */}
          <div className="flex items-center justify-end text-sm">
            <button
              type="button"
              className="hover:underline"
              style={{ color: GOLD }}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer text-white py-2 rounded-lg hover:opacity-95 disabled:opacity-70 transition"
            style={{ backgroundColor: GOLD }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
