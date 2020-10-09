// npm i g- express
// npm i joi ----> to show latest ver of joi object schema validation
// npm i joi@17.2.1 ---> latest version as of now

// use nodemon to monitor the changes

// successs!!!!!!! ^____^
const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json()) //JSON handler

courses = [
  { id: 1, course: 'course 1' },
  { id: 2, course: 'course 2' },
  { id: 3, course: 'course 3' }
]

app.get('/api/', (req, res) => {
  res.send('hello world')
})

app.get('/api/courses/', (req, res) => {
  res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id))
  course ? res.send(course) : res.status(404).send('not found')
})

app.post('/api/courses/', (req, res) => {
  // make validation schema
  const { error } = schemaCourse(req.body)
  if (error) return res.status(400).send(error.details[0].message) // extract error JSON. get the message element
  const course = {
    id: courses.length + 1,
    course: req.body.name
  }
  courses.push(course)
  res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
  course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) return res.status(404).send('id not found')
  const { error } = schemaCourse(req.body)
  if (error) return res.status(400).send(error.details[0].message) // extract error JSON. get the message element
  course.course = req.body.course
  res.send(courses)
})

app.delete('/api/courses/:id', (req, res) => {
  course = courses.find(c => c.id === parseInt(req.params.id))
  if (!course) return res.status(404).send('id not found')
  index = courses.indexOf(course)
  courses.splice(index, 1) // remove a 1 object from index of the given course a.k.a delete the course object
  res.send(course)
})

// validation function to be used by endpoints
function schemaCourse (requestBody) {
  const mySchema = Joi.object({
    course: Joi.string()
      .min(3)
      .required()
  })
  return mySchema.validate(requestBody)
}

// set PORT=5000    ---> 5000 is arbitrary number in cmd
port = process.env.port || 3000

app.listen(port, () => {
  console.log(`listening to port ${port}`)
})
