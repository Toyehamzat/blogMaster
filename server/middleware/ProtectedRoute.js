const passport = require("passport");

const protectedRoute = (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, next);
};

module.exports = protectedRoute;
