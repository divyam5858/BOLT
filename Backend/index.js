const express = require("express");
require("dotenv").config();

const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const sql = require("./config/db");
const authRouter = require("./router/authRouter");
const checkoutRouter = require("./router/checkoutRouter");

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(helmet());

app.use(morgan("dev"));


app.get("/", (req, res) => {
  res.json({
    message: "BOLT API is running",
  });
});

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await sql`SELECT NOW()`;

    res.json({
      success: true,
      message: "Database connected successfully",
      time: result[0].now,
    });
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

app.get("/api/db-tables", async (req, res) => {
  try {
    const result = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    res.json({
      success: true,
      tables: result,
    });
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Could not fetch tables",
      error: error.message,
    });
  }
});


app.use("/api/auth", authRouter);
app.use("/api/checkout", checkoutRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running successfully on ${process.env.PORT ||3000}`);
});