import { useState } from "react";
import { verifyOtp } from "../services/api";

function OTPModal({ email, onLoginSuccess, onSkip }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    // Client-side OTP validation
    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    try {
      setLoading(true);

      const result = await verifyOtp(email, otp);

      onLoginSuccess(result.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (event) => {
    // Allow numbers only
    const value = event.target.value.replace(/\D/g, "");

    setOtp(value);

    // Clear previous error when user starts correcting OTP
    if (error) {
      setError("");
    }
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="otp-modal-title"
    >
      <div className="otp-modal">
        <h2 id="otp-modal-title">Welcome back!</h2>

        <p>We found an account associated with:</p>

        <strong>{email}</strong>

        <p>
          Enter your 6-digit login code to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="otp">
            Login Code
          </label>

          <input
            id="otp"
            name="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter 6-digit code"
            disabled={loading}
            aria-describedby={error ? "otp-error" : undefined}
          />

          {error && (
            <p id="otp-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>

        <button
          type="button"
          onClick={onSkip}
          disabled={loading}
        >
          Skip Login
        </button>
      </div>
    </div>
  );
}

export default OTPModal;