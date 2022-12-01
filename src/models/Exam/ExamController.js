var express = require("express");
var router = express.Router();
var _ = require("lodash");

const Exam = require("./Exam");
const Lesson = require("../Lesson/Lesson")

router.get("/", (req, res) => {
    Exam.find({}, (err, exams) => {
        if(err) throw err;

        return res.json({
            code: 0,
            exams
        })
    })
})

router.get("/lesson_exam/:lesson_id", (req, res) => {
    Exam.findOne({
        lesson: req.params.lesson_id
    }, (err, exam) => {
        if(err) throw err;

        return res.json({
            code: 0,
            exam
        })
    })
})

router.get("/:exam_id", (req, res) => {
    Exam.findById(req.params.exam_id, (err, exam) => {
        if(err) throw err;

        return res.json({
            code: 0,
            exam
        })
    })
})

router.post("/", (req, res) => {
    Exam.create(req.body, (err) => {
        if(err) throw err;

        return res.json({
            code: 0
        })
    })
})

module.exports = router;