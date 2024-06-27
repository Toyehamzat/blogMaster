import passport from "passport";

const protectedRoute = (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, next);
};

export default protectedRoute;
