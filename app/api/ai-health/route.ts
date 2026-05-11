import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body =
      await req.json();

    const prompt = `
You are a safe AI healthcare assistant.

Analyze these symptoms:
${body.problem}

Return JSON only.

{
  "severity": "",
  "possibleCondition": "",
  "foodSuggestions": [],
  "precautions": [],
  "otcSuggestions": [],
  "specialist": "",
  "emergency": false,
  "emergencyMessage": ""
}
`;

const MODEL =
  "gemini-2.0-flash";

const response =
  await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    },
    {
      headers: {
        "Content-Type":
          "application/json",
      },
    }
  );

    const data =
      response.data;

    const text =
      data?.candidates?.[0]
        ?.content?.parts?.[0]
        ?.text;

    if (!text) {

      return NextResponse.json(
        {
          error:
            "No AI response",
          raw: data,
        },
        { status: 500 }
      );
    }

    const cleaned =
      text.replace(
        /```json|```/g,
        ""
      );

    return NextResponse.json(
      JSON.parse(cleaned)
    );

  } catch (error: any) {

    console.log(
      error?.response?.data ||
      error
    );

    return NextResponse.json(
      {
        error:
          "AI failed",
        details:
          error?.response?.data ||
          error.message,
      },
      { status: 500 }
    );
  }
}