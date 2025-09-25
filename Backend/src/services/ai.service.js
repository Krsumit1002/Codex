const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);

async function generateContent(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`
      Review this code:

      ${prompt}

      Check tha error and fix it only if there is an error.
      If there is no error, just say "No error found".
      Provide only the fixed code, provide explanation.
    `);

    return result.response.text();
  } catch (err) {
    console.error("❌ AI Service Error:", err.message);
    return "AI could not generate a response.";
  }
}

module.exports = generateContent;
