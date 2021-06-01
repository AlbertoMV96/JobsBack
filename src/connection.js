const mongoose = require("mongoose")
const password = "12345"
const dbname = "jobs"
const user = "userPrueba"
const host = "cluster0.xzz62.mongodb.net"
const uri = `mongodb+srv://${user}:${password}@${host}/${dbname}?retryWrites=true&w=majority`
module.exports = mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
