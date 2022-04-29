const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

//Mongoose
const person = require('./models/Person')

console.log('contenido de person:',person);


app.use(cors())
app.use(express.json())
app.use(express.static('build'))

//Morgan logs
app.use(morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body) //shows post request ...
    ].join(' ')
  }))




//one person request
app.get('/api/persons/:id', (request, response, next) => {
    const id = Number(request.params.id)
    const people = person.find( person => person.id === id )
    if(people){
        response.json(people)
    }else{
        response.status(404).end()
    }
})

  //delete a person request
app.delete('/api/persons/:id', (request, response, next) => {
    const id = Number(request.params.id)
    people = persons.filter( person => person.id !== id )

    response.status(204).end()
})


app.post('/api/persons/', (request, response, next) => {

    const body = request.body

    const newPerson = body.name
    const newNumber = body.number

    const persons = new person({
        name: newPerson,
        phone: newNumber,
    })
 

    if (!newPerson || !newNumber) {
        response.status(400).json({
            error: "Missing name or number"
        })

    // } else if (!(persons.name.length === 0)) {
    //     response.status(400).json({
    //         error: "Name allready exist in the phone book"
    //     })
    } else {
        persons.save()
        .then(savedPerson =>  savedPerson.toJSON())
        .then(personSaved => {
            console.log(`added ${persons.name} number ${persons.phone} to phonebook`)
            response.json(personSaved)
            mongoose.connection.close()
            })
        .catch(error => next(error))
    }

})

app.get('/api/persons', (request, response, next) => {
person.find({}).then(result => {
    response.json(result)
    mongoose.connection.close()
  }) 
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})