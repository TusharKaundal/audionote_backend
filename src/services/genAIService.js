import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

const genAI = new GoogleGenAI({});

// Convert Buffer to blob and upload
const transcribeAudio = async (buffer, mimeType) => {
  const blob = new Blob([buffer], { type: mimeType });
  const myfile = await genAI.files.upload({
    file: blob,
    config: { mimeType },
  });

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: createUserContent([
      createPartFromUri(myfile.uri, mimeType),
      "Transcribe this audio word-for-word",
    ]),
  });

  await genAI.files.delete({ name: myfile.name });

  return response.text;
};

const summarizeText = async (transcript) => {
  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: [
      {
        role: "user",
        parts: [
          { text: `Summarize this below text briefly:\n\n${transcript}` },
        ],
      },
    ],
  });

  return response.text;
};

export { transcribeAudio, summarizeText };
