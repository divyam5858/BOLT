const { createCheckoutOrder } = require("../models/checkoutModel");

const submitCheckout = async (req, res) => {
  try {
    const {
      userId,
      email,
      phone,
      shippingAddress,
    } = req.body;

    if (!email || !phone || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Email, phone and shipping address are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();
    const normalizedAddress = shippingAddress.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (normalizedPhone.length < 7) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number",
      });
    }

    if (normalizedAddress.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid shipping address",
      });
    }

    const order = await createCheckoutOrder(
      userId,
      normalizedEmail,
      normalizedPhone,
      normalizedAddress
    );

    return res.status(201).json({
      success: true,
      message: "Checkout details saved successfully",
      order: {
        id: order.id,
        userId: order.user_id,
        email: order.email,
        phone: order.phone,
        shippingAddress: order.shipping_address,
        createdAt: order.created_at,
      },
    });
  } catch (error) {
    console.error("Checkout error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while saving checkout details",
    });
  }
};

module.exports = {
  submitCheckout,
};