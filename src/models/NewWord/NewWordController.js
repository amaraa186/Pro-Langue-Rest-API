var express = require("express");
var router = express.Router();
var _ = require("lodash");

const NewWord = require("./NewWord");

router.get("/lesson_words/:lesson_id", (req, res) => {
  NewWord.find({ lesson: req.params.lesson_id }, (err, words) => {
    if (err) throw err;

    return res.json({
      code: 0,
      words,
    });
  });
});

router.get("/:word_id", (req, res) => {
  NewWord.findById(req.params.word_id, (err, word) => {
    if (err) throw err;

    return res.json({
      code: 0,
      word,
    });
  });
});

router.post("/", (req, res) => {
  NewWord.create(req.body, (err) => {
    if (err) throw err;

    return res.json({
      code: 0,
    });
  });
});

module.exports = router;
