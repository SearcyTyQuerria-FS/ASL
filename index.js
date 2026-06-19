// Load in our Express framework
const express       = require(`express`)

// Create a new Express instance called "app"
const app           = express()
const port          = process.env.PORT || 3000

// Load in our RESTful routers
const routers = require('./routers/index.js')

// Parse incoming JSON request bodies
app.use(express.json())

// Home page welcome middleware
app.get('/', (req, res) => {
  res
    .status(200)
    .send('Welcome to Space Tracker Library')
})

// Register our RESTful routers with our "app"
app.use(`/planets`,       routers.planet)
app.use(`/stars`,         routers.star)
app.use(`/galaxies`,      routers.galaxy)
app.use(`/space-objects`, routers.spaceObject)
app.use(`/space_objects`, routers.spaceObject)
app.use(`/spaceobjects`,  routers.spaceObject)

// Set our app to listen on port 3000
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}

module.exports = app
