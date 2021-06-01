const mongoose = require("mongoose")
const Schema = mongoose.Schema

const JobSchema = new Schema({
    name: String,
    description: String,
    location: String,
    type:{
        type: String,
        enum: ['full-time', 'freelancer','partial', 'project','internship'],
        default: 'full-time', require: true
    },
    companyId: {type: Schema.Types.ObjectId, ref: 'user'},
    savedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    //deleted: Boolean
}, { versionKey: false })

const Model = mongoose.model("job", JobSchema)

module.exports = Model