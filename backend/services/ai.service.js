const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateStudySchedule = async (userData, subjects, constraints) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    As an AI Study Expert, generate a highly optimized study schedule for a student with the following details:
    
    User Profile:
    - Daily Study Goal: ${userData.preferences.dailyStudyGoal} hours
    - Sleep Schedule: ${userData.preferences.sleepSchedule.wakeUp} to ${userData.preferences.sleepSchedule.sleep}
    - Break Preference: ${userData.preferences.breakDuration} minutes
    - Productivity Peak: ${userData.preferences.productivityHours.join(", ")}
    
    Subjects & Topics:
    ${subjects.map(s => `- ${s.name} (Difficulty: ${s.difficulty}/5, Exam Date: ${s.examDate || 'N/A'}): ${s.topics.filter(t => !t.isCompleted).map(t => t.name).join(", ")}`).join("\n")}
    
    Constraints:
    - Start Date: ${constraints.startDate}
    - End Date: ${constraints.endDate}
    
    Guidelines:
    1. Prioritize subjects with higher difficulty and closer exam dates.
    2. Balance difficult subjects with easier ones to avoid burnout.
    3. Include regular breaks and revision sessions.
    4. Focus heavier study blocks during productivity peak hours.
    5. Return the schedule as a structured JSON object.
    
    Format:
    {
      "schedule": [
        {
          "day": "Monday",
          "date": "YYYY-MM-DD",
          "sessions": [
            { "startTime": "HH:mm", "endTime": "HH:mm", "subject": "Name", "topic": "Name", "type": "study/break/revision" }
          ]
        }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // Extract JSON from the response (LLMs sometimes wrap it in markdown)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
};

module.exports = { generateStudySchedule };
