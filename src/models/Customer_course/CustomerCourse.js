var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema;

var CustomerCourseSchema = new Schema(
    {
        course_id: {
            type: Schema.Types.ObjectId,
            ref: "Course",
        },
        customer_id: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
        },
        created_at: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
  );

CustomerCourseSchema.plugin(mongoosePaginate)

//Export model
module.exports = mongoose.model('CustomerCourse', CustomerCourseSchema);