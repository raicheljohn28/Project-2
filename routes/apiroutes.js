// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var restArray = require("../data/restArray");
var addRest = require("../data/addRest");
// var passport = require("../config/pass");
var rest = require("../models/users.js");
// var express = require("express");
// var app = express();

module.exports = function (app) {
  app.post("/api/review", function (req, res) {
    console.log("=====================")
    console.log(req.body);
    // review.create(
    //   ["restaurantName","username", "review", "rating"],
    //   [req.body.name, req.body.restaurantName, req.body.username, req.body.review, req.body.rating],
    //   function(result) {
    //     if (result.changedRows == 0) {
    //       // If no rows were changed, then the ID must not exist, so 404
    //       return res.status(404).end();
    //     } else {
    //       res.status(200).end();
    //     }
    //   }
    // );
  });

  // app.put("/api/review", function(req, res) {
  //   console.log(req.body);
  //   var condition = `id = ${req.body.id}`;
  //   user.update(
  //     {
  //       review: req.body.review,
  //       username: req.body.username
  //     },
  //     condition,
  //     function(result) {
  //       if (result.changedRows == 0) {
  //         return res.status(404).end();
  //       } else {
  //         res.status(200).end();
  //       }
  //     }
  //   );
  // });

  app.get("/api/viewRest", function (req, res) {
    res.json(restArray);
  });

  app.get("/api/addRest", function (req, res) {
    res.json(addRest);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the restData array)
  // ---------------------------------------------------------------------------

  app.post("/api/viewRest", function (req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware

    if (restArray.length < 5) {
      restArray.push(req.body);
      res.json(true);
    }
    else {
      addRest.push(req.body);
      res.json(false);
    }
  });

  app.post("/api/restaurant", function (req, res) {
    rest.create([req.body.name], function (result) {
      console.log(result);
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });

  // app.post("/restaurant", function(req, res) {
  //   var postData = req.body;
  //   connection.query("INSERT INTO restaurant SET ? ", postData, function(error, results, field) {
  //     if(error) throw error;
  //     res.end(JSON.stringify(results));
  //   });
  // });

  app.post("/api/addRest", function (req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
    if (restData.length < 5) {
      restData.push(req.body);
      res.json(true);
    }
    else {
      addData.push(req.body);
      res.json(false);
    }
  });


  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function () {
    // Empty out the arrays of data
    restArray = [];
    addRest = [];

    console.log(restArray);
  });

}