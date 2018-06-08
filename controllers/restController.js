var express = require("express");

var router = express.Router();
var review = require("../models/review.js");

// Import the model (cat.js) to use its database functions.
var rest = require("../models/users.js");
var path = require("path");
var http = require("http");
var fs = require("fs");
var passport = require("../config/pass.js")

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  rest.all(function(data) {
    var hbsObject = {
      restaurant: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.get("/auth/google", passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get("/auth/google/callback", passport.authenticate('google'))



router.post("/api/addRest", function(req, res) {
    rest.create([req.body.name], function(result) {
      console.log(result);
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
});

router.put("/api/viewRest/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  rest.update(req.body, condition, function(result) {
    if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});



router.post("/api/review", function(req, res) {
 
  // console.log(req.body);
  review.create(
    ["username","review", "restaurant", "rating"],
    [req.body.username, req.body.review, req.body.restaurant, req.body.rating],
    function(result) {
      if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }

      // console.log(result)
    }
  );
});

// router.post("/api/login", function(req, res) {
//   auth(req, res, next, "local-login");
// })


// function auth(req, res, next, authMethod) {
//   passport.authenticate(authMethod, function (err, user, info) {
//     if (err) {
//       res.status(500)
//       res.json(err)
//     }
//     if (!user) {
//       res.status(401)
//       res.json(info.message)
//     }
//     else {
//       req.logIn(user, function (err) {
//         if (err) { return next(err); }
//         res.status(200)
//         res.json("/members");

//       });
//     }
//   })(req, res)
// }

router.get("/review", function(req, res) {
 
  // console.log(req.body);
  review.all(
    function(result) {
      var myHTML = "<html><head><title>Restaurant Reviews List</title><link rel='stylesheet' type='text/css' href='/public/assets/css/templatemo-style.css'></head><h1>Restaurant Reviews Data</h1>" +
      "<body>" +
      "<section class='featured-food'>" +
        "<div class='container'>" +
            "<div class='row'>" +
            "<div class='col-md-4'>" +
                    "<div class='food-item'>" +
                        "<table>";

                       

      
     
      console.log(result)
      for(let i=0; i<result.length; i++){
        
        myHTML += `<tr id='${result[i].id}' class='container'>`;
        myHTML += `<th>${result[i].username}</th>`;
        myHTML += `<th>${result[i].restaurant}</th>`;
        myHTML +=   `<th>${result[i].review}</th>`;
        myHTML += `<th>${result[i].rating}</th>`;
        myHTML += `</tr>`;
      }
      myHTML += "</table>";
      myHTML +=  "</div></div></div></div></section>" +
       "</body></html>";

    // Configure the response to return a status code of 200 (meaning everything went OK), and to be an HTML document
    res.writeHead(200, { "Content-Type": "text/html" });

    // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
    res.end(myHTML);

    }
  );
});

// Export routes for server.js to use.
module.exports = router;