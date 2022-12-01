var express = require("express");
var router = express.Router();
var _ = require("lodash");
const Course = require("../Course/Course");

var Lesson = require("./Lesson");

router.get("/:lesson_id", (req, res) => {
    Lesson.findById(req.params.lesson_id, (err, lesson) => {
        if(err) throw err;
        return res.json({
            code: 0,
            lesson
        })
    }).populate("course")
});

router.post("/", (req, res) => {
    Lesson.create(req.body, (err, lesson) => {
        if(err) throw err;

        Course.findOne({_id: lesson.course}, (err, course) => {
            if(err) throw err;

            Course.updateOne({_id: lesson.course}, {
                lesson_number: course.lesson_number + 1,
            }, (err) => {
                if(err) throw err;
    
                return res.json({
                    code: 0,
                })
            })
        })
    })
});

module.exports = router;