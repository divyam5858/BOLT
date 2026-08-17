import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registrationResult, setRegistrationResult] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setRegistrationResult(null);

    try {
      setLoading(true);

      const result = await registerUser(formData);

      setRegistrationResult(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="register-card">
        <div className="brand">BOLT</div>

        <div className="card-header">
          <h1>Create your account</h1>

          <p>Register once and use your login code during checkout.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First name</label>

            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              autoComplete="given-name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last name</label>

            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              autoComplete="family-name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Email address</label>

            <input
              id="register-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          {error && <div className="alert error-alert">{error}</div>}

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>
        <div className="existing-user">
          <p>Already have an account?</p>

          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/checkout")}
          >
            Continue to Checkout
          </button>
        </div>

        {registrationResult && (
          <div className="otp-result">
            <h3>Registration successful!</h3>

            <p>Your login code is:</p>

            <div className="otp-display">{registrationResult.otp}</div>

            <p>Save this code. You'll need it during checkout.</p>
            <button
              type="button"
              className="primary-button"
              onClick={() => navigate("/checkout")}
            >
              Continue to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
