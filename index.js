const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
// app.use(cors);
const port = 3000;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send((newItemPrice + cartTotal).toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  res.send(
    (isMember
      ? (cartTotal * (100 - discountPercentage)) / 100
      : cartTotal
    ).toString()
  );
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(((cartTotal * taxRate) / 100).toString());
});

app.get('/estimate-delivery', (req, res) => {
  const distance = parseFloat(req.query.distance);
  res.send(
    req.query.shippingMethod.toLowerCase() === 'tandard'
      ? (distance / 50).toString()
      : req.query.shippingMethod.toLowerCase() === 'express'
        ? (distance / 100).toString()
        : 'NA'
  );
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  res.send((weight * distance * 0.1).toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  res.send((purchaseAmount * loyaltyRate).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
