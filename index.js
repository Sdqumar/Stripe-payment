import dotenv from 'dotenv'
import cors from "cors";
import express from "express";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

dotenv.config()
console.log();
const stripe = new Stripe(
  process.env.KEY
);

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.json("It working");
});

app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);

  const idempontencyKey = uuidv4();

  return stripe.customers.create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: product.name,
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(300))
    .catch((err) => console.log(err));
});

//listen
app.listen(8000, () => console.log("Listening at port 8000"));
