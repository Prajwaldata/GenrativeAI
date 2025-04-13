// gemini.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "Your API Key";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-thinking-exp-01-21",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseModalities: [],
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const candidates = result.response.candidates;

    let processedResults = []; 

    for (let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
      for (let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
        const part = candidates[candidate_index].content.parts[part_index];
        if (part.inlineData) {
          try {
      
            const dataString = part.inlineData.data; 
            const mimeType = part.inlineData.mimeType;

            processedResults.push({
              candidateIndex: candidate_index,
              partIndex: part_index,
              data: dataString,
              mimeType: mimeType,
            });

            console.log(
              `Data for candidate ${candidate_index}, part ${part_index}:`,
              dataString,
              `MIME type: ${mimeType}`
            );
          } catch (err) {
            console.error(err);
          }
        }
      }
    }

    console.log(result.response.text());

    // Return the processed data and the text response
    return {
      text: result.response.text(),
      processedData: processedResults,
    };
  } catch (error) {
    console.error("Error in run:", error);
    return {
      text: "Error generating response.",
      processedData: [],
    };
  }
}

export default run;