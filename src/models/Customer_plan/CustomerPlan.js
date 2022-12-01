var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema;

var CustomerPlanSchema = new Schema(
    {
        plan_id: {
            type: Schema.Types.ObjectId,
            ref: "Plan",
        },
        customer_id: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
        },
        end_at: Date,
        created_at: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
  );

CustomerPlanSchema.plugin(mongoosePaginate)

//Export model
module.exports = mongoose.model('CustomerPlan', CustomerPlanSchema);