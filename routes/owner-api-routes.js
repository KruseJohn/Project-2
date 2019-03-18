var db = require("../models");

module.exports = function(app) {
  app.get("/api/owners", function(req, res) {
    // 1. include all of each Owner's Pets
    db.Owner.findAll({
      include: [db.Pet]
    }).then(function(dbOwner) {
      res.json(dbOwner);
    });
  });

  app.get("/api/owners/:id", function(req, res) {
    // include all of one Owner's Pets here
    db.Owner.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Pet]
    }).then(function(dbOwner) {
      res.json(dbOwner);
    });
  });

  app.post("/api/owners", function(req, res) {
    db.Owner.create(req.body).then(function(dbOwner) {
      res.json(dbOwner);
    });
  });

  app.delete("/api/owners/:id", function(req, res) {
    db.Owner.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOwner) {
      res.json(dbOwner);
    });
  });
};
