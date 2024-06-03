const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.end("Success");
});
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(401).json({
      message: "Total must be greater than 0",
    });
  }
});

app.listen(5000, () => {
  console.log("Connected");
});
