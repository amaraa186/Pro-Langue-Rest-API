var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema;

var CustomerLessonSchema = new Schema(
    {
        customer_id: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
        },
        lesson_id: {
            type: Schema.Types.ObjectId,
            ref: "Lesson",
        },
        exam_score: Number,
        context_score: Number,
        new_word_score: [{
            new_word_id: {
                type: Schema.Types.ObjectId,
                ref: "NewWord",
            },
            score: Number
        }],
        created_at: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
  );

CustomerLessonSchema.plugin(mongoosePaginate)

//Export model
module.exports = mongoose.model('CustomerLesson', CustomerLessonSchema);