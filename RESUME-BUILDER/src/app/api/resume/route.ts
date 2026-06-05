import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import ResumeModel from "@/models/Resume.model";
import { ApiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const userId = await getCurrentUser();

    const resumes = await ResumeModel.find({ user_id: userId }).sort({ createdAt: -1 });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Resumes fetched successfully",
        data: { resumes },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in get all resumes api", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
