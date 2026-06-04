import { generateAiContent } from "@/lib/gemini";
import {  ImproveContentBody } from "@/types/ai.types";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body: ImproveContentBody = await req.json();

        const { content } = body;

        if (!content)
            return NextResponse.json<ApiResponse>({
                success: false, message: "Missing fields"
            }, { status: 400 });

        const prompt = `
You are an expert resume writer, ATS optimization specialist, and technical recruiter.

Your task is to improve and enhance the provided resume content while preserving the original meaning. Optimize for ATS systems by naturally incorporating relevant keywords without overstuffing. Ensure the improved content is professional, impactful, and effectively highlights skills, experience, and value to employers.

Resume Content :
${content}

Rules:

1. Generate ONLY the improved content - no explanations, prefixes, or additional commentary.
2. Do NOT add headings, titles, labels, bullet points, numbering, markdown, or explanations.
3. Do NOT use first-person pronouns (I, me, my, we, our, us).
4. Use strong action verbs: Developed, Designed, Implemented, Built, Engineered, Managed, Optimized, Automated, Integrated, Enhanced, Streamlined, Collaborated, Architected, Deployed, Maintained.
5. Use ATS-friendly keywords relevant to the content naturally.
6. Avoid generic phrases: "hardworking", "team player", "seeking opportunities", "responsible for", "worked on", "involved in".
7. Quantify achievements with metrics (percentages, numbers, time, money) where applicable.
8. Maintain professional tone and clarity.
9. Return plain text only.
10. Do not over-explain or add unnecessary details.
11. Keep the improved content similar in length to the original.

Output:
Return ONLY the improved content text without any additional explanation or commentary.
`;


        const result = await generateAiContent(prompt);

        const improvedContent = result;

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "improvedContent created",
             data: {
                improvedContent,
            }
        }, {
            status: 201
        })

    } catch (error) {
        console.log("error in improvedContent", error);
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}