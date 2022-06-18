const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');
require('dotenv').config()


const url = process.env.MONGODB_URI

const connection = mongoose.connect(url)
  .then( ()=>{
  console.log('Database connecteed')
}).catch( err => {
  console.log(err)
})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    minlength: 8,
    required: true
  }
})
personSchema.plugin(uniqueValidator, { message: 'The {VALUE} must to be unique!'})

//transform id to string format
personSchema.set( 'toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)