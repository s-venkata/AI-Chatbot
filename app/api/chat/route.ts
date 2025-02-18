export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


const apiUrl = "https://api.openai.com/v1/chat/completions";
const apiKey = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const lectureFolderPath = path.join(process.cwd(), "data", "mmds");
    const lectureFiles = fs
      .readdirSync(lectureFolderPath)
      .filter((file) => file.startsWith("lecture") && file.endsWith(".json"));

    let allLectures = [];
    for (const file of lectureFiles) {
      const filePath = path.join(lectureFolderPath, file);
      const fileContent = JSON.parse(fs.readFileSync(filePath, "utf8"));
      allLectures.push(fileContent);
    }

    const assignmentDeadlinePath = path.join(process.cwd(), "data", "mmds", "assignment_deadline.json");
    const assignmentDeadline = JSON.parse(fs.readFileSync(assignmentDeadlinePath, "utf8"));

    const questionPapersFolderPath = path.join(process.cwd(), "data", "mmds");
    const questionPaperFiles = fs
      .readdirSync(questionPapersFolderPath)
      .filter((file) => file.startsWith("qp") && file.endsWith(".json") && !file.includes("_ans"));

    let allQuestions = [];
    for (const file of questionPaperFiles) {
      const filePath = path.join(questionPapersFolderPath, file);
      const fileContent = JSON.parse(fs.readFileSync(filePath, "utf8"));
      allQuestions.push(fileContent);
    }

    const outputFormatPath = path.join(process.cwd(), "data", "output_format.json");
    const outputFormat = JSON.parse(fs.readFileSync(outputFormatPath, "utf8"));

    const systemMessage = `
    Greetings are allowed. Be polite and helpful in all responses.
    You are an expert in Multimedia Databases. Use the following lecture content, question papers, and answers to assist the user:
    Give answer in less than 4 lines.
    Lecture Content: ${JSON.stringify(allLectures)}.
    Question Papers: ${JSON.stringify(allQuestions)}.
    Assignment Deadlines: ${JSON.stringify(assignmentDeadline)}.

    `;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
      model: "gpt-3.5-turbo-1106",
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: message },
        ],
        temperature: 0.3,
 
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenAI API Error:", errorData);
      return NextResponse.json(
        { error: "Failed to fetch response from OpenAI API." },
        { status: response.status }
      );
    }

    const responseData = await response.json();

    const finalMessage = responseData.choices[0]?.message?.content;
    if (!finalMessage) {
      console.error("No content in AI response.");
      return NextResponse.json(
        { error: "AI response was empty or invalid." },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: finalMessage });
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json(
      { error: "Server error occurred." },
      { status: 500 }
    );
  }
}
