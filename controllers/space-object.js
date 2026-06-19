const { SpaceObject } = require('../src/models')

const findSpaceObject = async (id) => {
  const parsedId = Number.parseInt(id, 10)

  if (Number.isNaN(parsedId)) {
    return null
  }

  return SpaceObject.findByPk(parsedId)
}

// Show all space objects
const index = async (req, res) => {
  try {
    const where = {}

    if (req.query.type) {
      where.type = req.query.type
    }

    const spaceObjects = await SpaceObject.findAll({
      where,
      order: [['name', 'ASC']]
    })

    res.status(200).json(spaceObjects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Show a single space object
const show = async (req, res) => {
  try {
    const spaceObject = await findSpaceObject(req.params.id)

    if (!spaceObject) {
      return res.status(404).json({ error: 'Space object not found' })
    }

    res.status(200).json(spaceObject)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Create a new space object
const create = async (req, res) => {
  try {
    const spaceObject = await SpaceObject.create(req.body)

    res
      .status(201)
      .location(`/space-objects/${spaceObject.id}`)
      .json(spaceObject)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Update an existing space object
const update = async (req, res) => {
  try {
    const spaceObject = await findSpaceObject(req.params.id)

    if (!spaceObject) {
      return res.status(404).json({ error: 'Space object not found' })
    }

    await spaceObject.update(req.body)

    res.status(200).json(spaceObject)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Remove a single space object
const remove = async (req, res) => {
  try {
    const spaceObject = await findSpaceObject(req.params.id)

    if (!spaceObject) {
      return res.status(404).json({ error: 'Space object not found' })
    }

    await spaceObject.destroy()

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { index, show, create, update, remove }
