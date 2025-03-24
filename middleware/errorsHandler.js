function errorsHandler(err, req, res, next) {
  res.status(500);
  res.json({
    error: err.message,
  });
}

//Export Middleware
module.exports = errorsHandler;
