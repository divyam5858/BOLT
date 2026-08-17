const sql = require("../config/db");

const findUserByEmail = async (email) => {
  const result = await sql`
    SELECT
      id,
      first_name,
      last_name,
      email,
      otp_code,
      created_at
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

  return result[0] || null;
};

const createUser = async (firstName, lastName, email, otpCode) => {
  const result = await sql`
    INSERT INTO users (
      first_name,
      last_name,
      email,
      otp_code
    )
    VALUES (
      ${firstName},
      ${lastName},
      ${email},
      ${otpCode}
    )
    RETURNING
      id,
      first_name,
      last_name,
      email,
      created_at
  `;

  return result[0];
};

module.exports = {
  findUserByEmail,
  createUser,
};