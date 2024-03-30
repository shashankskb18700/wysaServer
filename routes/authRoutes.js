const passport = require("passport");
module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("http://localhost:3000/home");

      io.emmit("Heloo");
      io.emmit("welcome to wysa");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
    res.redirect("http://localhost:3000/auth/google");
  });

  app.get("/api/current_user", (req, res) => {
    console.log(req.user);
    res.send(req.user);
  });
};
