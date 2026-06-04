import { generateAiContent } from "@/lib/gemini";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { resumeText } = body;

        if (!resumeText)
            return NextResponse.json<ApiResponse>({
                success: false, message: "Missing fields"
            }, { status: 400 });

        const prompt = `You are an expert ATS (Applicant Tracking System) specialist and resume analyst.

Analyze the provided resume text and generate a detailed ATS score report.

Resume Text:
${resumeText}

CRITICAL OUTPUT INSTRUCTIONS:

Return ONLY valid JSON in this exact format with NO other text:
{
  "overallScore": 85,
  "scores": {
    "formatting": 90,
    "keywords": 80,
    "actionVerbs": 85,
    "quantification": 75,
    "structure": 90,
    "professionalism": 88
  },
  "issues": ["issue1", "issue2"],
  "suggestions": ["suggestion1", "suggestion2"],
  "keywordsFound": ["keyword1", "keyword2"],
  "keywordsMissing": ["keyword1", "keyword2"],
  "strengths": ["strength1", "strength2"]
}

Do NOT add markdown, backticks, or explanations.
Response must start with "{" and end with "}".

Scoring Rules:

**Formatting Score (0-100):**
- Deduct 20 points for each special character, table, or graphic
- Deduct 10 points for excessive formatting (bold, italic, underline)
- Check for standard fonts and proper spacing
- Deduct for non-standard characters or symbols

**Keywords Score (0-100):**
- Identify technical keywords (programming languages, tools, frameworks)
- Check for industry-standard terminology
- Verify ATS-friendly language
- Deduct 5 points for each missing common technical keyword

**Action Verbs Score (0-100):**
- Strong verbs: Developed, Designed, Implemented, Built, Managed, Optimized, Automated, Engineered, Deployed, Enhanced, Architected
- Deduct 15 points for weak verbs: "Worked", "Helped", "Involved", "Responsible"
- Deduct 20 points for each first-person pronoun (I, me, my)

**Quantification Score (0-100):**
- Check for metrics, percentages, numbers, time periods, dollar amounts
- Deduct 15 points for each major achievement without metrics
- Look for measurable results

**Structure Score (0-100):**
- Verify standard sections: Summary, Experience, Skills, Education
- Check for consistent formatting
- Verify proper hierarchy and readability
- Deduct 15 points for each missing standard section

**Professionalism Score (0-100):**
- Check for professional language and tone
- Deduct 10 points for grammatical errors
- Deduct 10 points for generic buzzwords: "hardworking", "team player", "seeking opportunities"
- Check for clarity and conciseness

**Overall Score:**
Average of all 6 category scores, rounded to nearest whole number.

**Issues to Identify:**
- First-person pronouns (I, me, my)
- Generic phrases and buzzwords
- Special characters, tables, graphics
- Missing standard sections
- Weak action verbs
- Unquantified achievements
- Grammatical errors
- Poor formatting

**Suggestions:**
- How to improve ATS compatibility
- Keywords to add
- Sections to enhance
- Formatting improvements
- Specific action verbs to use
- Metrics to add

**Strengths:**
- Well-formatted sections
- Strong action verbs
- Good quantification
- Relevant keywords
- Professional language
- Clear structure

Output:
Return ONLY the JSON object. No text outside JSON.`;


        const result = await generateAiContent(prompt);

        const AtsScore = result;

        return NextResponse.json<ApiResponse>({
            success: true,
            message: "ATS score generated",
             data: {
                AtsScore,
            }
        }, {
            status: 201
        })

    } catch (error) {
        console.log("error in AtsScore", error);
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    }
}