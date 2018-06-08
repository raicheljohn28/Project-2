var orm = require("../config/orm.js");

var review = {
    all: function(cb) {
        orm.all("review", function(res) {
            cb(res);
        });
    },
    create: function(cols, vals, cb) {
        orm.create("review", cols, vals, function(res) {
            cb(res);
        });
    }
};



// Export the database functions for the controller (catsController.js).
module.exports = review;