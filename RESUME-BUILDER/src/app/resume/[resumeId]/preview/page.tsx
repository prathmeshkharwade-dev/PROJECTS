"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Download, Sparkles } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { getATSScoreApi } from "@/apis/ai.api";

interface Resume {
  title: string;
  summary: string;

  personalInfo: {
    fullname: string;
    email: string;
    mobile: string;
    location: string;
    github: string;
    portfolio: string;
  };

  education: {
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];

  skills: string[];

  projects: {
    title: string;
    description: string;
    techStack: string[];
    githubUrl: string;
    liveUrl: string;
  }[];

  workExperience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];

  certifications: string[];
}

export default function ResumePreviewPage() {
  const [resume, setResume] = useState<Resume | null>(null);

  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  const { resumeId } = useParams();
  const router = useRouter();

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      console.log("main resume in data", data);

      setResume(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleATSScore = async () => {
    try {
      setAnalyzing(true);
      const resumeText = JSON.stringify(resume);
      const responseData = await getATSScoreApi({ resumeText });
      
      const atsData = responseData?.data?.AtsScore;
      
      if (!atsData) {
        throw new Error("Invalid response format from server.");
      }

      const score = atsData.atsScore || "N/A";
      const summary = atsData.summary || "No feedback provided.";
      const strengths = atsData.strengths?.length ? `\n\nStrengths:\n- ${atsData.strengths.join('\n- ')}` : '';
      const improvements = atsData.improvements?.length ? `\n\nAreas for Improvement:\n- ${atsData.improvements.join('\n- ')}` : '';
      
      alert(`ATS Score: ${score}/100\n\nSummary:\n${summary}${strengths}${improvements}`);
    } catch (error) {
      console.log(error);
      alert("Failed to analyze ATS score. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading Resume...
      </div>
    );
  }

  if (!resume) return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-violet-500 selection:text-white relative pb-20">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-violet-100/50 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 text-white">
            <Eye size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Resume Preview</h1>
            <p className="text-slate-500 mt-1">Review your generated document before exporting.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Actions Sidebar */}
          <div className="lg:col-span-3 order-2 lg:order-1 lg:sticky lg:top-8">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col gap-4">
              <h2 className="font-bold text-lg text-slate-900 mb-2">Actions</h2>

              <button 
                onClick={handleATSScore}
                disabled={analyzing}
                className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-5 py-3.5 rounded-2xl font-bold shadow-lg shadow-violet-500/25 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70"
              >
                <Sparkles size={18} className={analyzing ? "animate-spin" : "group-hover:animate-pulse"} />
                {analyzing ? "Analyzing..." : "Analyze ATS Score"}
              </button>

              <button 
                onClick={() => window.print()}
                className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3.5 rounded-2xl font-semibold transition-all duration-200 shadow-md active:scale-[0.98]"
              >
                <Download size={18} />
                Download PDF
              </button>

              <button 
                onClick={() => router.push(`/resume/${resumeId}`)}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 px-5 py-3.5 rounded-2xl font-semibold transition-all duration-200 active:scale-[0.98]"
              >
                <Eye size={18} />
                Edit Resume
              </button>
            </div>
          </div>

          {/* Resume Document */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <div
              id="resume-preview"
              className="bg-white shadow-2xl shadow-slate-200/50 rounded-sm p-12 max-w-[850px] mx-auto min-h-[1100px] print:p-0 print:shadow-none"
            >
              {/* Header */}
              <header className="border-b-2 border-slate-800 pb-6 mb-8 text-center sm:text-left">
                <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-2">
                  {resume.personalInfo?.fullname}
                </h1>

                <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-slate-600 text-sm font-medium">
                  {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
                  {resume.personalInfo?.mobile && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span>{resume.personalInfo.mobile}</span>
                    </>
                  )}
                  {resume.personalInfo?.location && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span>{resume.personalInfo.location}</span>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 mt-2 text-slate-600 text-sm font-medium">
                  {resume.personalInfo?.github && (
                    <a href={resume.personalInfo.github} target="_blank" rel="noreferrer" className="hover:text-violet-600 transition-colors">
                      {resume.personalInfo.github.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                  {resume.personalInfo?.github && resume.personalInfo?.portfolio && <span className="text-slate-300">•</span>}
                  {resume.personalInfo?.portfolio && (
                    <a href={resume.personalInfo.portfolio} target="_blank" rel="noreferrer" className="hover:text-violet-600 transition-colors">
                      {resume.personalInfo.portfolio.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
              </header>

              {/* Summary */}
              {resume.summary && (
                <section className="mb-8">
                  <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-3 border-b border-slate-200 pb-1">
                    Professional Summary
                  </h2>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {resume.summary}
                  </p>
                </section>
              )}

              {/* Skills */}
              {resume.skills && resume.skills.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-3 border-b border-slate-200 pb-1">
                    Technical Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Experience */}
              {resume.workExperience && resume.workExperience.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-200 pb-1">
                    Experience
                  </h2>

                  <div className="space-y-6">
                    {resume.workExperience.map((exp, index) => (
                      <div key={index}>
                        <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-2">
                          <div>
                            <h3 className="font-bold text-slate-900">{exp.position}</h3>
                            <p className="text-violet-700 font-semibold text-sm">{exp.company}</p>
                          </div>
                          <p className="text-sm font-medium text-slate-500 mt-1 sm:mt-0 whitespace-nowrap">
                            {exp.startDate} – {exp.endDate || "Present"}
                          </p>
                        </div>
                        <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects */}
              {resume.projects && resume.projects.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-200 pb-1">
                    Projects
                  </h2>

                  <div className="space-y-6">
                    {resume.projects.map((project, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-slate-900">{project.title}</h3>
                        </div>
                        <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap mb-2">
                          {project.description}
                        </p>
                        {project.techStack && project.techStack.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {project.techStack.map((tech) => (
                              <span key={tech} className="text-xs font-medium text-slate-500 border border-slate-200 rounded px-2 py-0.5">
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education */}
              {resume.education && resume.education.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-200 pb-1">
                    Education
                  </h2>

                  <div className="space-y-4">
                    {resume.education.map((edu, index) => (
                      <div key={index} className="flex flex-col sm:flex-row justify-between sm:items-start">
                        <div>
                          <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                          <p className="text-slate-700 text-sm">{edu.institute}</p>
                        </div>
                        <p className="text-sm font-medium text-slate-500 mt-1 sm:mt-0">
                          {edu.startDate} – {edu.endDate}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Certifications */}
              {resume.certifications && resume.certifications.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-slate-200 pb-1">
                    Certifications
                  </h2>

                  <ul className="list-disc pl-5 space-y-1">
                    {resume.certifications.map((cert, index) => (
                      <li key={index} className="text-slate-700 text-sm">{cert}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}