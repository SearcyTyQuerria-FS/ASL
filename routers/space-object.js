// Load in Express framework
const express = require(`express`)

// Load in our controller/action instances
const spaceObjectCtlr = require(`../controllers/space-object.js`)

// Create a new Router instance and call it "router"
const router = new express.Router()

// RESTful resource mappings
router.get(`/`, spaceObjectCtlr.index)
router.post(`/`, spaceObjectCtlr.create)
router.get(`/:id`, spaceObjectCtlr.show)
router.put(`/:id`, spaceObjectCtlr.update)
router.delete(`/:id`, spaceObjectCtlr.remove)

// export "router"
module.exports = router
