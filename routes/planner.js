const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// POST /chatPlan/chat
router.post("/chat", async (req, res) => {
  try {
    console.log("✅ /planer/chat endpoint hit");
    const { cgpa, subjects } = req.body;

    if (!cgpa || !Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ error: "CGPA and subjects are required." });
    }

    // System Prompt — sets the AI's role
    const systemPrompt = `
You are an expert academic advisor and study coach helping university students improve in their weak subjects.

Based on the student's current CGPA and the specific subjects they are struggling with this week, generate a detailed 1-day study roadmap.

The roadmap should:
- Focus only on the listed weak subjects.
- Include a structured daily plan for 1 days .
- Try to make the response easy and very short.
- Suggest study hours, break times, and specific tasks (e.g., reading chapters, solving problems, practicing past questions).
- Recommend effective study strategies for each subject (e.g., flashcards for theory-heavy topics, problem-solving drills for math).
- Provide short motivational tips and healthy study habits to boost focus and discipline.
- Be clear, encouraging, and actionable — suitable for university students aiming to improve grades.

Assume the student genuinely wants to improve this day, and your goal is to provide them a focused, achievable, and supportive daily plan.
`;

    // User prompt using input
    const userMessage = `
Student CGPA: ${cgpa}
Weak subjects this week: ${subjects.join(", ")}
Please create a weekly study roadmap based on this.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // or "gemini-2.0" or "gemini-2.0-pro"
    
const result = await model.generateContent(`${systemPrompt}\n\n${userMessage}`);


    const text = result.response.text();
    res.json({ success: true, reply: text });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ success: false, error: "Failed to generate plan." });
  }
});

module.exports = router;
