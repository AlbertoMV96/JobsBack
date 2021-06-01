const { string } = require("joi")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AppSchema = new Schema({
    applicant: { type: Schema.Types.ObjectId, ref: 'user' },
    job: { type: Schema.Types.ObjectId, ref: 'job' },
    date: { type: Date, default: Date.now },
    cv: String,
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false })

const Model = mongoose.model("application", AppSchema)

module.exports = Model