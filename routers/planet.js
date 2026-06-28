// Load in Express framework
const express = require(`express`)
const multer = require('multer')
const path = require('path')

// Load in our controller/action instances
const planetCtlr = require(`../controllers/planet.js`)

// Create a new Router instance and call it "router"
const router = new express.Router()

// Set up multer with file extension preservation
const storage = multer.diskStorage({
  destination: 'public/uploads/planets/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage })

// RESTful resource mappings
router.get(`/`, planetCtlr.index)
router.post(`/`, upload.single('image'), planetCtlr.create)
router.get(`/:id`, planetCtlr.show) 
router.put(`/:id`, upload.single('image'), planetCtlr.update) 
router.delete(`/:id`, planetCtlr.remove) 

// export "router"
module.exports = router
