export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
};
