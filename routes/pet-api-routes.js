// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the pets
  app.get("/api/pets", function(req, res) {
    var query = {};
    if (req.query.owner_id) {
      query.OwnerId = req.query.owner_id;
    }
    // include all of the owners to these pets
    db.Pet.findAll({
      where: query,
      include: [db.Owner]
    }).then(function(dbPet) {
      res.json(dbPet);
    });
  });

  // Get route for retrieving a single Pet
  app.get("/api/pets/:id", function(req, res) {
    // include the owner who owns the Pet
    db.Pet.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Owner]
    }).then(function(dbPet) {
      console.log(dbPet);
      res.json(dbPet);
    });
  });

  // Pet route for saving a new Pet
  app.post("/api/pets", function(req, res) {
    db.Pet.create(req.body).then(function(dbPet) {
      res.json(dbPet);
    });
  });

  // DELETE route for deleting pets
  app.delete("/api/pets/:id", function(req, res) {
    db.Pet.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPet) {
      res.json(dbPet);
    });
  });

  // PUT route for updating pets
  app.put("/api/pets", function(req, res) {
    db.Pet.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPet) {
      res.json(dbPet);
    });
  });
};
