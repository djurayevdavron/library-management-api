export default (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      statusCode: 403,
      message: "Ruxsat yo'q"
    });
  }

  next();
};