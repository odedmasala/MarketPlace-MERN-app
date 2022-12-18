const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user/UserSchema");

const passport = (passport) => {
  /*LOCAL Strategy */
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: false,
      },
      async (email, password, callback) => {
        const user = await User.find({ email: email });
        if (!user)
          return callback(null, false, {
            message: "That email is not registered",
          });
        if (user.scope)
          if (user.scope != "email")
            return callback(null, false, {
              message: `That user connected with social access, go to ${user.scope}`,
            });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect)
          return callback(null, false, {
            message: "That password is not Correct",
          });
        console.log(user);
        callback(null, user);
      }
    )
  );
  /*GOOGLE Strategy */
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, callback) => {
        const user = {
          google_id: profile.id,
          email: profile.emails[0].value,
          isAdmin: true,
          source: "google",
        };
        const checkUser = await User.findOne({ email: user.email });
        if (!checkUser) {
          const newUser = await new User(user).save();
          callback(null, newUser);
        }

        callback(null, checkUser);
      }
    )
  );
  /*FACEBOOK Strategy */
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ["id", "email"],
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );
  /*INSERT USER TO PASSPORT-SESSION  */
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  /*REMOVE USER TO PASSPORT-SESSION  */
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

module.exports = passport;