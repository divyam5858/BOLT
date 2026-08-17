const sql = require("../config/db");

const createCheckoutOrder = async (
  userId,
  email,
  phone,
  shippingAddress
) => {
  const result = await sql`
    INSERT INTO checkout_orders (
      user_id,
      email,
      phone,
      shipping_address
    )
    VALUES (
      ${userId || null},
      ${email},
      ${phone},
      ${shippingAddress}
    )
    RETURNING
      id,
      user_id,
      email,
      phone,
      shipping_address,
      created_at
  `;

  return result[0];
};

module.exports = {
  createCheckoutOrder,
};