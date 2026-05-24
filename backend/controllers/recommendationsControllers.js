exports.getRecommendations = async (req, res) => {
  try {
    res.status(200).json({
      userId: req.params.userId,
      recommendations: [],
      message: "Recommendations placeholder",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
