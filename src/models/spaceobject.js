'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SpaceObject extends Model {
    static associate() {
      // Associations can be added here as the app grows.
    }
  }

  SpaceObject.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    distanceFromEarth: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0
      }
    },
    diameter: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: 0
      }
    },
    discoveredAt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'SpaceObject'
  });

  return SpaceObject;
};
