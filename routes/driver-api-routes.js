var db = require("../models");

module.exports = function(app) {
  app.get("/api/drivers", function(req, res) {
    // include all of each Owner's Pets
    db.Driver.findAll({
      /*  include: [db.Pet] */
    }).then(function(dbDriver) {
      res.json(dbDriver);
    });
  });

  app.get("/api/drivers/:id", function(req, res) {
    // include all of the Owner's Pets here
    db.Driver.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Pet]
    }).then(function(dbDriver) {
      res.json(dbDriver);
    });
  });

  app.post("/api/drivers", function(req, res) {
    db.Driver.create(req.body).then(function(dbDriver) {
      res.json(dbDriver);
    });
  });

  app.delete("/api/drivers/:id", function(req, res) {
    db.Driver.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbDriver) {
      res.json(dbDriver);
    });
  });
};
