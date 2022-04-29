require('dotenv').config()
const mongoose = require('mongoose')
const {Schema, model} = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url)

const Person = new Schema({
  name: String,
  phone: String,
})


module.exports = model('Person', Person)