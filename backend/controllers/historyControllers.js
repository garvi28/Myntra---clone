exports.addtoHistory = async (req, res) => {
  try {
    res.status(200).json({ message: "History added", payload: req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
