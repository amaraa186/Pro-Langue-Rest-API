const express = require("express");
const router = express.Router();
const User = require("./User");
const _ = require('lodash')

router.get("/:user_id", (req, res) => {
  User.findById(req.params.user_id, (err, user) => {
    if (err) throw err;
    return res.json({
      code: 0,
      user,
    });
  });
});

router.post("/", (req, res) => {
  const email = req.body.email;
  User.findOne({email: email}, (err, finded) => {
    if(err) throw err

    if(!_.isEmpty(finded))
      return res.json({
        code: 1
      })
  })

  User.create(req.body, (err, user) => {
    if (err) throw err;

    const token = user.getJWT()

    return res.json({
      code: 0,
      token,
      user,
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

  const user = await User.findOne({email}).select('+password');

  if(!user) {
    return res.json({
      code: 1,
      data: "Нууц үг эсвэл имэйл хаяг буруу байна"
    })
  }

  const checked = await user.checkPassword(password)

  if(!checked)
    return res.json({
      code: 1,
      data: "Нууц үг эсвэл имэйл хаяг буруу байна"
    })

  return res.json({
    code: 0,
    user,
    token: user.getJWT()
  })
});

router.delete("/:user_id", (req, res) => {
  User.findByIdAndDelete(req.params.user_id, (err) => {
    if (err) throw err;
    return res.json({
      code: 0,
    });
  });
});

// router.put("/:user_id", (req, res, next) => {
//   User.findByIdAndUpdate(req.params.user_id, req.body);
// });
module.exports = router;
