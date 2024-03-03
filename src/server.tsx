import 'dotenv/config'
import { Application } from "express";
import Stripe from "stripe";
import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
const app:Application = express();
import cors from 'cors';
import {fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!,{
  apiVersion:'2020-08-27'
});
const serverPort = Number(process.env.PORT) || 5000;
let amount:number;
let paymentIntentId:string;
//Get the amount of items
app.use(
  cors({
    origin: process.env.REACT_APP_URI,
  })
);
app.use(bodyParser.json()); //parse application/json

app.post("/secret", async (req, res) => {
  try {
    paymentIntentId = req.body.pid;
    let paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    res.send({ client_secret: paymentIntent.client_secret });
  } catch (e:any) {
    res.status(400).json({ error: e.message });
  }
});
app.post("/cart-checkout", async (req, res) => {
  amount = req.body.amount;
  paymentIntentId = req.body.paymentIntentId;
  amount = amount * 100;

  if (typeof amount === "number") {
    await updatePaymentAmount(paymentIntentId);
    res.status(200).send("amount received");
  } else res.status(400).send("Error");
});

async function updatePaymentAmount(paymentIntentId:string) {
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
  } catch (e:any) {
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
