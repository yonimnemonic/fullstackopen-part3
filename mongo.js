const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phone = process.argv[4] 


const url =
  `mongodb+srv://yonimnemonic:${password}@agusclustertest.bknct.mongodb.net/PersonsDB?retryWrites=true&w=majority`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  phone: String,
})

const Person = mongoose.model('Person', noteSchema)

const person = new Person({
  name: name,
  phone: phone,
})

person.save().then(result => {
  console.log('Person saved!', result)
  mongoose.connection.close()
})
.catch( err => {
    console.log("error ", err)
})

//retrieve data from database
Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
//retrieve data with filter on database
// Person.find({name: "Agustín Martínez"}).then(result => {
//     result.forEach(person => {
//       console.log(person)
//     })
//     mongoose.connection.close()
//   })