const { Planet } = require("../models");

// Show all resources
const index = async (req, res) => {
  try {
    const planets = await Planet.findAll();
    const contentType = req.headers['content-type'];
    
    if (contentType?.includes('application/json')) {
      res.status(200).json(planets);
    } else {
      res.status(200).render('planets/index', { planets });
    }
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
      const contentType = req.headers['content-type'];
      if (contentType?.includes('application/json')) {
        return res.status(404).json({ error: "Planet not found." });
      } else {
        return res.status(404).send('Planet not found.');
      }
    }

    const contentType = req.headers['content-type'];
    if (contentType?.includes('application/json')) {
      res.status(200).json(planet);
    } else {
      res.status(200).render('planets/show', { planet });
    }
  } catch (error) {
    console.error("Error fetching planet:", error);
    res.status(500).json({ error: "Failed to retrieve planet." });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const planetData = req.body;
    if (req.file) {
      planetData.image = req.file.filename;
    }
    const newPlanet = await Planet.create(planetData);

    const contentType = req.headers['content-type'];
    if (contentType?.includes('application/json')) {
      res.status(201).json(newPlanet);
    } else {
      res.status(201).redirect('/planets');
    }
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
      const contentType = req.headers['content-type'];
      if (contentType?.includes('application/json')) {
        return res.status(404).json({ error: "Planet not found." });
      } else {
        return res.status(404).send('Planet not found.');
      }
    }

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    await planet.update(updatedData);
    
    const contentType = req.headers['content-type'];
    if (contentType?.includes('application/json')) {
      res.status(200).json(planet);
    } else {
      res.status(200).redirect('/planets');
    }
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
      const contentType = req.headers['content-type'];
      if (contentType?.includes('application/json')) {
        return res.status(404).json({ error: "Planet not found." });
      } else {
        return res.status(404).send('Planet not found.');
      }
    }

    await planet.destroy();
    
    const contentType = req.headers['content-type'];
    if (contentType?.includes('application/json')) {
      res.status(204).send();
    } else {
      res.status(204).redirect('/planets');
    }
  } catch (error) {
    console.error("Error deleting planet:", error);
    res.status(500).json({ error: "Failed to delete the planet." });
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
