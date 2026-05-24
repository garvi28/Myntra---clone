exports.registerToken = async (req, res) => {
  try {
    res.status(200).json({ message: "Token registered", token: req.body.token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.sendOrderNotification = async (req, res) => {
  try {
    res.status(200).json({ message: "Notification sent", payload: req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
