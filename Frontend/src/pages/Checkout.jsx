import { useEffect, useState } from "react";
import { recognizeUser, submitCheckout } from "../services/api";
import OTPModal from "../components/OTPModal";

function Checkout() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    shippingAddress: "",
  });

  const [emailValid, setEmailValid] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Handle form changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "email") {
      const email = value.trim().toLowerCase();

      const validEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      setEmailValid(validEmail);

      setRegisteredUser(null);
      setShowOtpModal(false);

      if (!validEmail) {
        setCheckingEmail(false);
      }
    }
  };

  // Debounced recognition check
  useEffect(() => {
    if (!emailValid) {
      return;
    }

    const email = formData.email.trim().toLowerCase();

    const timer = setTimeout(async () => {
      try {
        setCheckingEmail(true);

        const result = await recognizeUser(email);

        if (result.registered) {
          setRegisteredUser(result.user);
          setShowOtpModal(true);
        } else {
          setRegisteredUser(null);
        }
      } catch (error) {
        console.error("Recognition error:", error);
        setRegisteredUser(null);
      } finally {
        setCheckingEmail(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [formData.email, emailValid]);

  // Submit checkout
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      const checkoutData = {
        ...formData,
        userId: loggedInUser?.id || null,
      };

      const result = await submitCheckout(checkoutData);

      setSuccess(result.message);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Successful login
  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
    setRegisteredUser(null);
    setShowOtpModal(false);
  };

  // Skip login
  const handleSkipLogin = () => {
    setShowOtpModal(false);
    setRegisteredUser(null);
  };

  return (
    <div className="page">
      <div className="checkout-card">

        <div className="brand">
          BOLT
        </div>

        <div className="card-header">
          <h1>Checkout</h1>

          <p>
            Complete your details to continue.
          </p>
        </div>

        {loggedInUser && (
          <div className="logged-in-banner">
            <div>
              <strong>
                Welcome, {loggedInUser.firstName}! 👋
              </strong>

              <span>
                You're logged in.
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <div className="form-group">
            <label htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />

            {formData.email && (
              <div
                className={
                  emailValid
                    ? "field-message success-text"
                    : "field-message error-text"
                }
              >
                {emailValid
                  ? "✓ Valid email address"
                  : "Please enter a valid email address"}
              </div>
            )}

            {checkingEmail && (
              <div className="field-message checking-text">
                Checking your account...
              </div>
            )}
          </div>

          {/* Phone */}

          <div className="form-group">
            <label htmlFor="phone">
              Phone number
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              autoComplete="tel"
              required
            />
          </div>

          {/* Shipping address */}

          <div className="form-group">
            <label htmlFor="shippingAddress">
              Shipping address
            </label>

            <textarea
              id="shippingAddress"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              placeholder="Enter your shipping address"
              rows={4}
              autoComplete="street-address"
              required
            />
          </div>

          {error && (
            <div className="alert error-alert">
              {error}
            </div>
          )}

          {success && (
            <div className="alert success-alert">
              ✓ {success}
            </div>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Continue Checkout"}
          </button>

        </form>
      </div>

      {showOtpModal && registeredUser && (
        <OTPModal
          email={formData.email}
          onLoginSuccess={handleLoginSuccess}
          onSkip={handleSkipLogin}
        />
      )}
    </div>
  );
}

export default Checkout;