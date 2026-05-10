export default (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    message: err.message || "Server xatosi"
  });
};