var express = require("express");
var router = express.Router();
var _ = require("lodash");
const Course = require("./Course");

var Lesson = require("../Lesson/Lesson");

router.get("/all", (req, res) => {
    Course.find({}, (err, courses) => {
        if(err) throw err;

        return res.json({
            code: 0,
            courses
        })
    })
})

router.get("/:course_id", (req, res) => {
    Course.findById(req.params.course_id, (err, course) => {
        if(err) throw err;

        return res.json({
            code: 0,
            course
        })
    }).populate(["lesson"])
})

router.post("/", (req, res) => {
    Course.create(req.body, (err) => {
        if(err) throw err;

        return res.json({
            code: 0
        })
    })
})

module.exports = router;