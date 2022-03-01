const express = require("express");
const router = express.Router();
// const Cart = require("../models/cart");
const User = require("../models/user");
const Profile = require("../models/profile");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const axios = require("axios");
const saltRounds = 10;
const checkAuth = require("../middleware/validate");
const stripe = require('stripe')('sk_test_deoTatB81pyglcyYapa7ztuC');



//get profile of a particular user
router.post("/subscribe", async function (req, res, next) {
  const customer = await stripe.customers.create({
    description: 'My First Test Customer (created for API docs)',
  });

  const token = await stripe.tokens.create({
    card: {
      number: req.body.cardNumber,
      exp_month: Number(req.body.cardMonth.toString()),
      exp_year: Number(req.body.cardYear.toString()),
      cvc: req.body.cvc,
    },
  });

  const card = await stripe.customers.createSource(
    customer.id,
    {source: token.id}
  );

  const subscription = await stripe.subscriptions.create({
    customer:  customer.id,
    items: [
      {price: 'price_0KXsGC6VMrSSc46slVxcfVJZ'},
    ],
  });

  console.log(subscription.id.toString())
  res.send({
    message: "success",
    cusID: customer.id,
    subID: subscription.id,
    cardID: card.id,
  })
});










router.get("/subscribe/:id",async function async(req, res, next) {
  try{
  const subscription = await stripe.subscriptions.retrieve(
    req.params.id
  );
console.log(subscription.toString())
  res.send(subscription)
  }catch(e){
    res.status(500).json(e.message)
  }
});




router.delete("/subscribe/:id",async function async(req, res, next) {
  const deleted = await stripe.subscriptions.del(
    req.params.id
  );
console.log(deleted.toString())
res.send(deleted)
});




router.post("/subscribe/:cusID", async function (req, res, next) {
  const token = await stripe.tokens.create({
    card: {
      number: req.body.cardNumber,
      exp_month: Number(req.body.cardMonth.toString()),
      exp_year: Number(req.body.cardYear.toString()),
      cvc: req.body.cvc,
    },
  });

  const card = await stripe.customers.createSource(
    req.params.cusID,
    {source: token.id}
  );

  const subscription = await stripe.subscriptions.create({
    customer:  req.params.cusID,
    items: [
      {price: 'price_0KXsGC6VMrSSc46slVxcfVJZ'},
    ],
  });

  console.log(subscription.id.toString())
  res.send({
    cusID: req.params.cusID,
    subID: subscription.id,
    cardID: card.id,
  })
});

module.exports = router;
