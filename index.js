require('./models/Person')

//exports model from Person
const persons = require('./models/Person')

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const { response } = require('express')

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


app.get(('/hello/', (request, response,next) =>{
  response('Helo World')

}))

//One person request
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
  const {id} = request.params
    persons.findByIdAndDelete(id)
    .then( result => {
      console.log('result:',result);
        response.status(204).end()
        connection.close()
    })
    .catch( error => next(error))
    console.log('Error from delete middleware',error)
    response.status(400).send({ error: 'malformed id' })
})

//modify a person request
app.put('/api/persons/:id', (request, response, next) => {
  const {id} = request.params
  
  const newUpdate = request.body

  const contactUpdate = {
    name: newUpdate.name,
    phone: newUpdate.phone
  }

    persons.findByIdAndUpdate( id, contactUpdate, { new: true })
    .then( result => {
      console.log('Person:',result);
        response.status(204).end()
    })
    .catch( err => next(err))

})


app.post('/api/persons/', (request, response, next) => {

    const body = request.body

    const newPerson = body.name
    const newPhone = body.phone

    const person = new persons({
        name: newPerson,
        phone: newPhone,
    })
    if (!newPerson || !newPhone) {
        response.status(400).json({
            error: "Missing name or number"
        })

    } else {
        person.save()
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
  persons.find({})
  .then(result => {
    response.json(result)
  }) 
})

//error handle
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})