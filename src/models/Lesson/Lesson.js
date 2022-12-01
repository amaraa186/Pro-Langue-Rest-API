var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema;

var LessonSchema = new Schema(
    {
        title: String,
        course: {
            type: Schema.Types.ObjectId,
            ref: "Course",
        },
        video_url: String,
        context: {
            foreign: String,
            mongolia: String,
        },
        created_at: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
  );

LessonSchema.plugin(mongoosePaginate)

//Export model
module.exports = mongoose.model('Lesson', LessonSchema);