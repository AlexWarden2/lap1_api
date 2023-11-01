const express = require('express')
const cors = require('cors')

const fruits = require('./fruits')
const logger = require('./logger')

const app = express()

// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(logger)


app.get('/', (req, res) => {
  res.status(200).json({ message: `Are you reddy!` })
})

// http://localhost:3000/fruits

app.get('/fruits', (req, res) => {
  res.status(200).send(fruits)
})

///http://localhost:3000/fruits/1

app.get('/fruits/:id', (req, res) => {
  const idx = req.params.id - 1
  const fruit = fruits[idx]

  if (!fruit) {
    res.status(404).send({ error: `Fruit with id ${idx +1} not found` })
  } else {
    res.status(200).send(fruit)
  }
})



// http://localhost:3000/fruits

app.post('/fruits', (req, res) => {
  const fruit = req.body
  const lastFruit = fruits[fruits.length - 1]
  //do no tuse lastId = fruits.length + 1 - will cause issues with re naming is things are removed 
  const lastId = lastFruit ? lastFruit.id + 1 : 1
  fruit.id = lastId

  const name = req.params.name

  fruit ? (  fruits.push(fruit), res.status(201).send(fruit) ) : res.status(422).send({ error: 'you need a name to create a fruit' })

  // if (!name){
  //   res.status(422).send({ error: 'you need a name to create a fruit' })
  // } else {
  //   fruits.push(fruit)
  //   res.status(201).send(fruit)
  // }

  
}) 


app.patch('/fruids:id', (req, res) => {
  // const names = req.params.name
  // const namer = fruits[names]

  // if (!namer) {
  //   res.status(422).send({ error: 'cannot update missing fruit' })
  // } 

})


app.delete('/fruids:id', (req, res) => {

// res.status(204)

})

module.exports = app
