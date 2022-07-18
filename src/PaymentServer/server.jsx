const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const bodyParser = require("body-parser");

let amount;
let paymentIntentId = "";
//Get the amount of items
app.use(
  cors({
    origin: "http://localhost:1234",
  })
);
app.use(bodyParser.json()); //parse application/json

app.post(`/cart`, (req, res) => {
  amount = req.body.amount;
  amount = amount * 100;
  if (typeof amount === "number") {
    stripe.paymentIntents
      .update(paymentIntentId, {
        amount: amount,
      })
      .then(() => res.sendStatus(200));
  } else res.sendStatus(400);
});

//Calculate total amount and send it to stripe
app.get("/secret", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 50,
    currency: "inr",
    automatic_payment_methods: { enabled: true },
  });
  paymentIntentId = paymentIntent.id;

  res.json({ client_secret: paymentIntent.client_secret });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
