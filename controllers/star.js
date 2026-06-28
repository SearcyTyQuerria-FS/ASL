const { Star } = require("../models");

// Show all resources
const index = async (req, res) => {
  try {
    const stars = await Star.findAll();
    const contentType = req.headers['content-type'];
    
    if (contentType?.includes('application/json')) {
      res.status(200).json(stars);
    } else {
      res.status(200).render('stars/index', { stars });
    }
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
      const contentType = req.headers['content-type'];
      if (contentType?.includes('application/json')) {
        return res.status(404).json({ error: "Star not found." });
      } else {
        return res.status(404).send('Star not found.');
      }
    }

    const contentType = req.headers['content-type'];
    if (contentType?.includes('application/json')) {
      res.status(200).json(star);
    } else {
      res.status(200).render('stars/show', { star });
    }
  } catch (error) {
    console.error("Error fetching star:", error);
    res.status(500).json({ error: "Failed to retrieve star." });
  }
};

// Create a new resource
const create = async (req, res) => {
  try {
    const starData = req.body;
    if (req.file) {
      starData.image = req.file.filename;
    }
    const newStar = await Star.create(starData);

    const contentType = req.headers['content-type'];
    if (contentType?.includes('application/json')) {
      res.status(201).json(newStar);
    } else {
      res.status(201).redirect('/stars');
    }
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
      const contentType = req.headers['content-type'];
      if (contentType?.includes('application/json')) {
        return res.status(404).json({ error: "Star not found." });
      } else {
        return res.status(404).send('Star not found.');
      }
    }

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    await star.update(updatedData);
    
    const contentType = req.headers['content-type'];
    if (contentType?.includes('application/json')) {
      res.status(200).json(star);
    } else {
      res.status(200).redirect('/stars');
    }
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
      const contentType = req.headers['content-type'];
      if (contentType?.includes('application/json')) {
        return res.status(404).json({ error: "Star not found." });
      } else {
        return res.status(404).send('Star not found.');
      }
    }

    await star.destroy();
    
    const contentType = req.headers['content-type'];
    if (contentType?.includes('application/json')) {
      res.status(204).send();
    } else {
      res.status(204).redirect('/stars');
    }
  } catch (error) {
    console.error("Error deleting star:", error);
    res.status(500).json({ error: "Failed to delete the star." });
  }
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
