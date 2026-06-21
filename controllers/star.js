const { Star } = require("../models");

// Show all resources
const index = async (req, res) => {
  try {
    const stars = await star.findAll();
    res.status(200).json(stars);
  } catch (error) {
    console.error("Error fetching stars:", error);
    res.status(500).json({ error: "Failed to retrieve stars." });
  }
};

// Show resource
const show = async (req, res) => {
  try {
    const starId = req.params.id;
    const star = await Star.findByPk(starId);

    if (!star) {
      return res.status(404).json({ error: "Star not found." });
    }

    res.status(200).json(star);
  } catch (error) {
    console.error("Error fetching star:", error);
    res.status(500).json({ error: "Failed to retrieve star." });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const starData = req.body;
    const newStar = await Star.create(starData);

    res.status(201).json(newStar);
  } catch (error) {
    console.error("Error creating star:", error);
    res.status(500).json({ error: "Failed to create the star." });
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const starId = req.params.id;
    const updatedData = req.body;

    const star = await Star.findByPk(starId);

    if (!star) {
      return res.status(404).json({ error: "Star not found." });
    }

    await star.update(updatedData);
    res.status(200).json(star);
  } catch (error) {
    console.error("Error updating star:", error);
    res.status(500).json({ error: "Failed to update the star." });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const starId = req.params.id;
    const star = await Star.findByPk(starId);

    if (!star) {
      return res.status(404).json({ error: "Star not found." });
    }

    await star.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting star:", error);
    res.status(500).json({ error: "Failed to delete the star." });
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
