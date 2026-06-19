// Load in all of our routers
const galaxy = require('./galaxy.js')
const planet = require('./planet.js')
const spaceObject = require('./space-object.js')
const star   = require('./star.js'  )

// Export all routers
module.exports = { galaxy, planet, spaceObject, star }
