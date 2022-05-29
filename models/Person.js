const mongoose = require('mongoose')
require('dotenv').config()


const url = process.env.MONGODB_URI

const connection = mongoose.connect(url)
  .then( ()=>{
  console.log('Database connecteed')
}).catch( err => {
  console.log(err)
})

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

//transform id to string format
personSchema.set( 'toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)