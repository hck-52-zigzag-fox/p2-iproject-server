if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const passport = require("passport");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const FacebookStrategy = require("passport-facebook").Strategy;

const router = require("./routes");
const { errorHandler } = require("./middlewares/errorHandler");

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:
        "https://zigzag-fox-nadya-iproject.web.app/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

app.use("/", router);
app.use(errorHandler);

app.listen(port, (req, res) => {
  console.log(`listening on port: ${port}`);
});

module.exports = app;
