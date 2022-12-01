var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema;

var PlanSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        created_at: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
);

PlanSchema.plugin(mongoosePaginate)

//Export model
module.exports = mongoose.model('Plan', PlanSchema);