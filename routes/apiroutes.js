// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var restArray = require("../data/restArray");
var addRest = require("../data/addRest");
var passport = require("../config/pass");
var rest = require("../models/users.js");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  function auth(req, res, next, authMethod) {
    passport.authenticate(authMethod, function (err, user, info) {
      if (err) {
        res.status(500)
        res.json(err)
      }
      if (!user) {
        res.status(401)
        res.json(info.message)
      }
      else {
        req.logIn(user, function (err) {
          if (err) { return next(err); }
          res.status(200)
          res.json("/members");
        });
      }
    })(req, res)
  }

   // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", function(req, res, next) {
    auth(req, res, next, "local-login");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res, next) {
    auth(req, res, next, "local-signup");
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

   // Route for getting some data about our user to be used client side
   app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send to home page
      res.redirect("/");
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // app.post("/api/addRest", function(req, res) {
  //   user.addRestaurant(
  //     ["restaurantName", "restaurantUrl", "review", "rating"],
  //     [req.body.id, req.body.restaurantName, req.body.restaurantUrl, req.body.review, req.body.rating],
  //     function(result) {
  //       if (result.changedRows == 0) {
  //         // If no rows were changed, then the ID must not exist, so 404
  //         return res.status(404).end();
  //       } else {
  //         res.status(200).end();
  //       }
  //     }
  //   );
  // });

  app.post("/api/review", function(req, res) {
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

  app.get("/api/viewRest", function(req, res) {
    res.json(restArray);
  });

  app.get("/api/addRest", function(req, res) {
    res.json(addRest);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the restData array)
  // ---------------------------------------------------------------------------

  app.post("/api/viewRest", function(req, res) {
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

  app.post("/api/restaurant", function(req, res) {
    rest.create([req.body.name], function(result) {
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

  app.post("/api/addRest", function(req, res) {
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

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    restArray = [];
    addRest = [];

    console.log(restArray);
  });
};

