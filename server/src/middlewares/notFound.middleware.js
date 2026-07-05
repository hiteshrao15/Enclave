const notFound = (req, res) => {
  if (req.originalUrl === "/" || req.originalUrl === "") {
    return res.status(200).json({
      success: true,
      message: "API is running. Use /api/health for health checks.",
    });
  }

  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  });
};

export default notFound;