export const getDashboard = (req, res) => {
    res.json({
      message: "Welcome to your Dashboard",
      user: req.user
    });
  }; 