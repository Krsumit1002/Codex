module.exports.getReview = async (req, res) => {
  try {
    const code = req.body.code;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const response = await aiService(code);

    res.json({ review: response });
  } catch (err) {
    console.error("AI Review Error:", err.message);
    res.status(500).json({ error: "Failed to fetch review" });
  }
};
