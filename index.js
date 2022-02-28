const express = require('express')
const app = express()
app.use(express.json())

let persons = [
  {
      id:1,
      name:"Arto Hellas",
      number: "040-123456"
  },
  {
      id:2,
      name:"Ada Lovelace",
      number: "39-44-5152256"
  },
  {
      id:3,
      name:"Dan Abramov",
      number: "12-43-234345"
  },
  {
      id:4,
      name:"Mary Poppendieck",
      number: "040-123456"
  },
]

app.get('/info', (request, response) => {
    let date = new Date()
    let ids = persons.length
    response.send(`
    Phonebook has info for ${ids} people <br>
     ${date}
    `)
})

//one person request
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const people = persons.find( person => person.id === id )
    if(people){
        response.json(people)
    }else{
        response.status(404).end()
    }
})

  //delete a person request
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    people = persons.filter( person => person.id !== id )

    response.status(204).end()
})

//create person request
app.post('/api/persons/', (request, response) => {

    const newPerson = request.body

    let personName = persons.filter( name => name.name == newPerson.name)
    let integer = Math.random(1)*100

    let addPerson = {
        id: Math.trunc(integer),
        name: newPerson.name,
        number: newPerson.number
    }

    
    if( !newPerson.name || !newPerson.number){
        response.status(400).json({
            error: "Missing name or number"
        })
        
    }else if( !(personName.length === 0) ){
        response.status(400).json({
            error: "Name allready exist in the phone book"
        })
    }else{
        // console.log("addPerson array", addPerson)
        // console.log(persons);
        persons.push(addPerson)
        response.json(newPerson)
    }

})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})