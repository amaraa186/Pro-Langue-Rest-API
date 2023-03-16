var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lesson_number: {
    type: Number,
    required: true,
    default: 0,
  },
  image: String,
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

CourseSchema.plugin(mongoosePaginate);

//Export model
module.exports = mongoose.model("Course", CourseSchema);
