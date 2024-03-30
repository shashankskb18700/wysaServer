const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const User = require("../model/Users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

module.exports = passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,

      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
        googleId: profile.id,
      }).then((existingUser) => {
        if (!existingUser) {
          User.create({
            googleId: profile.id,
          }).then((user) => {
            done(null, user);
          });
        } else {
          done(null, existingUser);
        }
      });
    }
  )
);
