// Load in Express framework
const express = require(`express`)
const multer = require('multer')
const path = require('path')

// Load in our controller/action instances
const starCtlr = require(`../controllers/star.js`)

// Create a new Router instance and call it "router"
const router = new express.Router()

// Set up multer with file extension preservation
const storage = multer.diskStorage({
  destination: 'public/uploads/stars/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage })

// RESTful resource mappings
router.get(`/`, starCtlr.index)
router.post(`/`, upload.single('image'), starCtlr.create)
router.get(`/:id`, starCtlr.show) 
router.put(`/:id`, upload.single('image'), starCtlr.update) 
router.delete(`/:id`, starCtlr.remove) 

// export "router"
module.exports = router
