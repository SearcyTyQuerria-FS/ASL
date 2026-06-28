// Load in Express framework
const express = require(`express`)
const multer = require('multer')
const path = require('path')

// Load in our controller/action instances
const galaxyCtlr = require(`../controllers/galaxy.js`)

// Create a new Router instance and call it "router"
const router = new express.Router()

// Set up multer with file extension preservation
const storage = multer.diskStorage({
  destination: 'public/uploads/galaxies/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage })

// RESTful resource mappings
router.get(`/`, galaxyCtlr.index)
router.post(`/`, upload.single('image'), galaxyCtlr.create)
router.get(`/:id`, galaxyCtlr.show) 
router.put(`/:id`, upload.single('image'), galaxyCtlr.update) 
router.delete(`/:id`, galaxyCtlr.remove) 

// export "router"
module.exports = router
