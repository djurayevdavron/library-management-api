export default (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);

    next();

  } catch (err) {

    return res.status(400).json({
      statusCode: 400,
      message: "Validatsiya xatosi",

      errors: err.issues.map((e) => ({
        field: e.path[0],
        message: e.message
      }))
    });
  }
};