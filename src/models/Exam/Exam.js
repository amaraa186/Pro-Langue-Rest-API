var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema;

var ExamSchema = new Schema(
    {
        lesson: {
            type: Schema.Types.ObjectId,
            ref: "Lesson",
        },
        questions: [{
            question: String,
            answers: [{
                text: String,
                is_correct: {
                    type: Boolean,
                    required: true,
                    default: false,
                }
            }]
        }],
        is_final_exam: {
            type: Boolean,
            default: false,
            required: true
        },
        created_at: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
  );

ExamSchema.plugin(mongoosePaginate)

//Export model
module.exports = mongoose.model('Exam', ExamSchema);