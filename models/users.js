var orm = require("../config/orm.js");

var user = {
  all: function(cb) {
      orm.all("restaurant", function(res) {
          cb(res);
      });
  },
  create: function(vals, cb) {
      orm.create("restaurant", ['name'], vals, function(res) {
          cb(res);
      });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = user;