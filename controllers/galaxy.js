const {Galaxy} = require('../models');

// show all
const index = async (req, res) => {
  try{
    const galaxies = await Galaxy.findAll();
    res.status(200).json(galaxies);
  } catch (error) {
    console.error("Error fetching galaxies:", error);
    res.status(500).json({error: "Failed to retrieve galaxies."});
  }
}

// show resource
const show = (req,res) => {
  res.status(200).json(`Galaxy#show(:id)`)
}

// create new resource
const create = async (req, res) => {
  try{
    const galaxyData = req.body;
    const newGalaxy = await Galaxy.create(galaxyData);
    res.status(201).json(newGalaxy);
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
      return res.status(404).json({error: "Galaxy not found."})
    }

    await galaxy.update(updatedData);

    res.status(200).json(galaxy);
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
      return res.status(404).json({error: "Galaxy not found"});
    }

    await galaxy.destroy();

    res.status(204).send();
  } catch (error) { 
    console.error("Error deleting galaxy:", error);
    res.status(500).json({error: "Failed to delete the galaxy."})
  }
}

module.exports = {index, show, create, update, remove}
