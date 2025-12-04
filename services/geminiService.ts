import { GoogleGenAI } from "@google/genai";
import { Applicant, ScorecardResult } from "../types";

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeRiskWithGemini = async (
  applicant: Applicant,
  result: ScorecardResult
): Promise<string> => {
  try {
    const prompt = `
      Act as a Senior Credit Risk Underwriter.
      Analyze the following loan applicant profile and the scorecard result.

      Applicant Data:
      ${JSON.stringify(applicant, null, 2)}

      Scorecard Result:
      - Credit Score: ${result.score}
      - Risk Tier: ${result.tier}
      - Probability of Default: ${(result.pd * 100).toFixed(2)}%

      Task:
      1. Provide a professional executive summary of the risk profile.
      2. Identify specific red flags or mitigating factors that the quantitative model might have under/overweighted (e.g., job stability vs income).
      3. Give a final recommendation (Approve, Reject, or Manual Review) with a brief justification.
      
      Format the output in clean Markdown. Keep it concise but insightful.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Unable to generate analysis at this time.";
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return "An error occurred while communicating with the AI service. Please try again.";
  }
};
