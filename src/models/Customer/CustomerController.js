const express = require("express");
const router = express.Router();
const Customer = require("./Customer");
const _ = require('lodash')

router.get("/:customer_id", (req, res) => {
  Customer.findById(req.params.customer_id, (err, customer) => {
    if (err) throw err;
    return res.json({
      code: 0,
      customer,
    });
  });
});

router.post("/", (req, res) => {
  const email = req.body.email;
  Customer.findOne({email: email}, (err, finded) => {
    if(err) throw err

    if(!_.isEmpty(finded))
      return res.json({
        code: 1
      })
  })

  Customer.create(req.body, (err, customer) => {
    if (err) throw err;

    const token = customer.getJWT()

    return res.json({
      code: 0,
      token,
      customer,
    });
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.json({
      code: 1,
      data: "Талбаруудыг бүрэн бөглөнө үү"
    })
  }

  const customer = await Customer.findOne({email}).select('+password');

  if(!customer) {
    return res.json({
      code: 1,
      data: "Нууц үг эсвэл имэйл хаяг буруу байна"
    })
  }

  const checked = await customer.checkPassword(password)

  if(!checked)
    return res.json({
      code: 1,
      data: "Нууц үг эсвэл имэйл хаяг буруу байна"
    })

  return res.json({
    code: 0,
    customer,
    token: customer.getJWT()
  })
});

router.delete("/:customer_id", (req, res) => {
  Customer.findByIdAndDelete(req.params.customer_id, (err) => {
    if (err) throw err;
    return res.json({
      code: 0,
    });
  });
});

module.exports = router;