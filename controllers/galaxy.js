const {Galaxy} = require('../models');

// show all
const index = async (req, res) => {
  try{
    const galaxies = await Galaxy.findAll();
    const contentType = req.headers['content-type'];
    
    if (contentType?.includes('application/json')) {
      res.status(200).json(galaxies);
    } else {
      res.status(200).render('galaxies/index', { galaxies });
    }
  } catch (error) {
    console.error("Error fetching galaxies:", error);
    res.status(500).json({error: "Failed to retrieve galaxies."});
  }
}

// show resource
const show = async (req,res) => {
  try {
    const galaxyId = req.params.id;
    const galaxy = await Galaxy.findByPk(galaxyId);

    if (!galaxy) {
      const contentType = req.headers['content-type'];
      if (contentType?.includes('application/json')) {
        return res.status(404).json({error: "Galaxy not found"});
      } else {
        return res.status(404).send('Galaxy not found.');
      }
    }

    const contentType = req.headers['content-type'];
    if (contentType?.includes('application/json')) {
      res.status(200).json(galaxy);
    } else {
      res.status(200).render('galaxies/show', { galaxy });
    }
  } catch (error) {
    console.error("Error fetching galaxy:", error);
    res.status(500).json({error: "Failed to retrieve galaxy."});
  }
}

// create new resource
const create = async (req, res) => {
  try{
    const galaxyData = req.body;
    if (req.file) {
      galaxyData.image = req.file.filename;
    }
    const newGalaxy = await Galaxy.create(galaxyData);
    
    const contentType = req.headers['content-type'];
    if (contentType?.includes('application/json')) {
      res.status(201).json(newGalaxy);
    } else {
      res.status(201).redirect('/galaxies');
    }
  } catch (error) {
    console.error("Error creating galaxy:", error);
    res.status(500).json({error: "Failed to create the galaxy."});
  }
}

// update existing resource
const update = async (req,res) => {
  try{
    const galaxyId = req.params.id;
    const updatedData = req.body;

    const galaxy = await Galaxy.findByPk(galaxyId);

    if(!galaxy) {
      const contentType = req.headers['content-type'];
      if (contentType?.includes('application/json')) {
        return res.status(404).json({error: "Galaxy not found."});
      } else {
        return res.status(404).send('Galaxy not found.');
      }
    }

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    await galaxy.update(updatedData);

    const contentType = req.headers['content-type'];
    if (contentType?.includes('application/json')) {
      res.status(200).json(galaxy);
    } else {
      res.status(200).redirect('/galaxies');
    }
  } catch (error) {
   console.error("Error updating galaxy:", error);
   res.status(500).json({error: "Failed to update the galaxy."});
  }
}

// remove a resource
const remove = async (req, res) => {
  try{
    const galaxyId = req.params.id;
    const galaxy = await Galaxy.findByPk(galaxyId);

    if(!galaxy){
      const contentType = req.headers['content-type'];
      if (contentType?.includes('application/json')) {
        return res.status(404).json({error: "Galaxy not found"});
      } else {
        return res.status(404).send('Galaxy not found.');
      }
    }

    await galaxy.destroy();

    const contentType = req.headers['content-type'];
    if (contentType?.includes('application/json')) {
      res.status(204).send();
    } else {
      res.status(204).redirect('/galaxies');
    }
  } catch (error) { 
    console.error("Error deleting galaxy:", error);
    res.status(500).json({error: "Failed to delete the galaxy."})
  }
}

module.exports = {index, show, create, update, remove}
