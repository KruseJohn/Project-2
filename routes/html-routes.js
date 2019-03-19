var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // cms route loads cms.html
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  app.get("/dcs", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/dcs.html"));
  });

  // blog route loads blog.html
  app.get("/blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // owners route loads owner-manager.html
  app.get("/owners", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/owner-manager.html"));
  });

  // drivers route loads driver-manager.html
  app.get("/drivers", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/driver-manager.html"));
  });
};
