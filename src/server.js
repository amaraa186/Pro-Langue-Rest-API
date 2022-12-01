const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { ServerApiVersion } = require('mongodb');
const cors = require('cors');

const userRouter = require("./models/User/UserController");
const customerRouter = require("./models/Customer/CustomerController");
const courseRouter = require("./models/Course/CourseController");
const lessonRouter = require("./models/Lesson/LessonController");
const newWordRouter = require("./models/NewWord/NewWordController");
const examRouter = require("./models/Exam/ExamController");

require('dotenv').config()

mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin/user', userRouter);
app.use('/api/customer', customerRouter);
app.use('/api/course', courseRouter);
app.use('/api/lesson', lessonRouter);
app.use('/api/exam', examRouter);
app.use('/api/newWord', newWordRouter);

app.get('/', (req, res) => {
  res.send("Hello server")
})
  
const server = app.listen(process.env.PORT, () => {
  console.log(`Server started in ${process.env.PORT}`);
})

process.on('unhandledRejection', (err, promise) => {
    console.log(`Алдаа гарлаа: ${err.message}`)
    server.close(() => {
        process.exit(1)
    })
  })