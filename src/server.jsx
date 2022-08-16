const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const bodyParser = require("body-parser");
const serverPort = process.env.PORT || 5000;
let amount;
let paymentIntentId;
//Get the amount of items
app.use(
  cors({
    origin:
      process.env.NODE_ENV == "development"
        ? "http://localhost:5000"
        : process.env.REACT_APP_URI,
  })
);
app.use(bodyParser.json()); //parse application/json

app.post("/secret", async (req, res) => {
  try {
    paymentIntentId = req.body.pid;
    let paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    res.send({ client_secret: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
app.post("/cart-checkout", async (req, res) => {
  amount = req.body.amount;
  paymentIntentId = req.body.paymentIntentId;
  amount = amount * 100;

  if (typeof amount === "number") {
    await updatePaymentAmount(paymentIntentId);
    res.sendStatus(200);
  } else res.sendStatus(400);
});

async function updatePaymentAmount(paymentIntentId) {
  return await stripe.paymentIntents.update(paymentIntentId, {
    amount: amount,
    currency: "inr",
  });
}

app.get("/create-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 50,
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });
    res.send({
      client_secret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/*", (req, res) =>
  res.sendFile(path.join(__dirname, "../dist", "index.html"))
);

app.listen(serverPort, () => {
  console.log("Server running on port", serverPort);
});
