var db = require("../models");

module.exports = function(app) {
  // Get all user
  app.get("/api/users", function(req, res) {
    // eslint-disable-next-line camelcase
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Create a new example
  app.post("/api/users", function(req, res) {
    // eslint-disable-next-line camelcase
    db.user.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Delete an example by id
  app.delete("/api/users/:id", function(req, res) {
    db.user.destroy({ where: { id: req.params.id } }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};
