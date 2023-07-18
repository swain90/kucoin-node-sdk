import { body, header, param, matchedData } from 'express-validator';
const express = require('express');
const configTpl = require('../../../config.tpl');
const { auth } = require('../../lib/utils');
const router = express.Router();

router.get("/", (req, res) => {

})

const validatePostOrder = () => {
  return [
    body().notEmpty(),
    body('clientOid').isString().escape(),
    body('side').isString().escape(),
    body('symbol').isString().escape(),
    body('price').isNumeric().escape(),
    body('size').isNumeric().escape(),
    body('timeInForce').isString().escape(),
    header('authorization').isString(),
  ]
}
router.post("/",null, validatePostOrder(),null, async (req, res, next) => {
try {
  const data = matchedData(req, { locations: 'body'});
  const orderData = data;
  const { auth } = req.headers;
  const response = await createOrder({...OrderData}, auth);
  return res.status(201).json(response);
}catch(err){
  return next(err);
}
});

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)