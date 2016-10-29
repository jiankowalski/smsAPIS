module.exports = function(req, res, next) {
  res.locals.flash = { success: [], error: [], warning: [] };

  if(!req.session.flash) {
    req.session.flash = { success: [], error: [], warning: [] };
    return next();
  }
  res.locals.flash = _.clone(req.session.flash);

  // Clear flash
  req.session.flash = { success: [], error: [], warning: [] };
  return next();
};