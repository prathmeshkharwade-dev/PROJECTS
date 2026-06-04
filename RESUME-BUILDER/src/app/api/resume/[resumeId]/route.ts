import { getCurrentUser } from "@/lib/getCurrentUser";
import { connectDB } from "@/lib/mongodb";
import ResumeModel from "@/models/resume.model";
import { ApiResponse } from "@/types/api.types";
import { patchFetch } from "next/dist/server/app-render/entry-base";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
     { params }: { params: Promise<{ resumeId: string }>) {
    try {
        await connectDB();

        const user = await getCurrentUser();

        const { resumeId } = await params;

        const resume = await ResumeModel.findOne({
            _id: resumeId,
            userId: user._id,
         });

        if (!resume)
            return NextResponse.json<ApiResponse>({
                success: false, message: "Resume not found"
            }, { status: 404 });


        return NextResponse.json<ApiResponse>({
            success: true,
             message: "Resume fetched successfully",
              data: resume,
        }, { status: 200 });

    } catch (error) {
        console.log("error in resume api", error);
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    
    }

}


export async function PATCH(
    req: NextRequest,
     { params }: { params: Promise<{ resumeId: string }>) {
    try {
        await connectDB();

        const user = await getCurrentUser();

        const body = await req.json();

        const { resumeId } = await params;

        const updatedResume = await ResumeModel.findOneAndUpdate(
            {
                _id: resumeId,
                userId: user._id,
            },{
                $set: body,
            },
            { 
                new: true,
                runValidators: true,  
            }
            );

        if (!updatedResume)
            return NextResponse.json<ApiResponse>({
                success: false,
                 message: "UdatedResume Falied to update",
            }, { status: 400 });


        return NextResponse.json<ApiResponse>({
            success: true,
            message: "Resume updated successfully",
            data: updatedResume,
        }, 
        { status: 200 });

    } catch (error) {
        console.log("error in UpdatedResume api", error);
        return NextResponse.json<ApiResponse>(
            {
                success: false,
                message: "Something went wrong",
            },
            { status: 500 }
        );
    
    }

}