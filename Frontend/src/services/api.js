const API_URL = import.meta.env.VITE_API_URL;

const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const registerUser = (userData) => {
  return apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const recognizeUser = (email) => {
  return apiRequest(
    `/api/auth/recognize?email=${encodeURIComponent(email)}`
  );
};

export const verifyOtp = (email, otp) => {
  return apiRequest("/api/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({
      email,
      otp,
    }),
  });
};

export const submitCheckout = (checkoutData) => {
  return apiRequest("/api/checkout", {
    method: "POST",
    body: JSON.stringify(checkoutData),
  });
};