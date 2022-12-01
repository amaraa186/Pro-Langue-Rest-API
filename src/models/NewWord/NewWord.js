var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var Schema = mongoose.Schema;

var NewWordSchema = new Schema({
  lesson: {
    type: Schema.Types.ObjectId,
    ref: "Lesson",
  },
  foreign: String,
  mongolia: [String],
  img: String,
  audio: String,
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

NewWordSchema.plugin(mongoosePaginate);

//Export model
module.exports = mongoose.model("NewWord", NewWordSchema);
