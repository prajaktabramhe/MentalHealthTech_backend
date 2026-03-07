export const apiErrorHandler = (err, req, res, next) => {
  console.error("API Error:", err.message);

  res.status(500).json({
    success: false,
    message: "Something went wrong with external API",
    error: err.message
  });
};