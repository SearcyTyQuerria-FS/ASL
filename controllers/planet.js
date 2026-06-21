const { Planet } = require("../models");

// Show all resources
const index = async (req, res) => {
  try {
    const planets = await Planet.findAll();
    res.status(200).json(planets);
  } catch (error) {
    console.error("Error fetching planets:", error);
    res.status(500).json({ error: "Failed to retrieve planets." });
  }
};

// Show resource
const show = async (req, res) => {
  try {
    const planetId = req.params.id;
    const planet = await Planet.findByPk(planetId);

    if (!planet) {
      return res.status(404).json({ error: "Planet not found." });
    }

    res.status(200).json(planet);
  } catch (error) {
    console.error("Error fetching planet:", error);
    res.status(500).json({ error: "Failed to retrieve planet." });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const planetData = req.body;
    const newPlanet = await Planet.create(planetData);

    res.status(201).json(newPlanet);
  } catch (error) {
    console.error("Error creating planet:", error);
    res.status(500).json({ error: "Failed to create the planet." });
  }
};

// Update an existing resource
const update = async (req, res) => {
  try {
    const planetId = req.params.id;
    const updatedData = req.body;

    const planet = await Planet.findByPk(planetId);

    if (!planet) {
      return res.status(404).json({ error: "Planet not found." });
    }

    await planet.update(updatedData);
    res.status(200).json(planet);
  } catch (error) {
    console.error("Error updating planet:", error);
    res.status(500).json({ error: "Failed to update the planet." });
  }
};

// Remove a single resource
const remove = async (req, res) => {
  try {
    const planetId = req.params.id;
    const planet = await Planet.findByPk(planetId);

    if (!planet) {
      return res.status(404).json({ error: "Planet not found." });
    }

    await planet.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting planet:", error);
    res.status(500).json({ error: "Failed to delete the planet." });
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
