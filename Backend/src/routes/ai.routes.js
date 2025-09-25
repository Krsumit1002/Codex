const express = require("express");
const router = express.Router();
const generateContent = require("../services/ai.service");

router.post("/get-review", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const review = await generateContent(code);
    res.json({ review });
  } catch (error) {
    console.error("❌ Error in AI route:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
