const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /chatMood/chat
router.post("/chatmod", async (req, res) => {
  try {
    console.log("✅ /chatMood endpoint hit");
    const { mood } = req.body; // Get the mood from the user input

    if (!mood) {
      return res.status(400).json({ error: "Mood is required." });
    }

    // System Prompt — sets the AI's role
    const systemPrompt = `
You are an emotional well-being assistant designed to regularly check in on the user's mood and provide support.

Your goal is to encourage the user to stay connected, maintain a positive mindset, and communicate regularly about their emotional state.

Based on the user's current mood, offer some motivational tips, engage with them in a compassionate way, and suggest activities or strategies to improve their mood.

Always encourage openness, self-care, and connection with others. If the user expresses negative emotions, suggest ways to improve mood and stay connected with their support system.
`;

    // User prompt using input
    const userMessage = `
User's current mood: ${mood}
Please respond with a supportive, encouraging message that motivates the user to stay connected and focus on emotional well-being.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Use the model

    // Generate the response from Gemini
    const result = await model.generateContent(`${systemPrompt}\n\n${userMessage}`);
    const text = result.response.text();

    res.json({ success: true, reply: text }); // Return the AI response
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ success: false, error: "Failed to generate mood-check response." });
  }
});

module.exports = router;
