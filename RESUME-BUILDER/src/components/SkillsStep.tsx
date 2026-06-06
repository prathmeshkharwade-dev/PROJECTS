"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles, X } from "lucide-react";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

export default function SkillsStep({ resumeId, onNext, onBack }: Props) {
  console.log("kya yaha pr hai--------->", resumeId);
  const [skills, setSkills] = useState<string[]>([]);
  console.log("skilsss ->", skills);
  const [skillInput, setSkillInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}/`);

      setSkills(data.data.skills || []);
    } catch (error) {
      console.log(error);
    }
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;

    setSkills((prev) => [...prev, skillInput.trim()]);

    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((item) => item !== skill));
  };

  const generateSkills = async () => {
    try {
      setAiLoading(true);
      console.log("heyy.....");

      const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);

      console.log("data in resume find", resumeData);

      const resume = resumeData.data;

      const { data } = await axios.post("/api/ai/generate-skills", {
        jobTitle: "web developer",
        experienceLevel: "mid-level",
      });

      console.log("bhai ai ne response diya ", data);

      setSkills(data.data.skills);
    } catch (error) {
      console.log(error);
      alert("AI is currently experiencing high demand or an error occurred. Please try again later.");
    } finally {
      setAiLoading(false);
    }
  };

  const saveSkills = async () => {
    try {
      setLoading(true);

      await axios.patch(`/api/resume/${resumeId}`, {
        skills,
      });

      onNext();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Skills</h1>
          <p className="text-slate-500 mt-1.5 text-lg">
            Add skills relevant to your role. Let AI find the best ones.
          </p>
        </div>

        <button
          onClick={generateSkills}
          disabled={aiLoading}
          className="group relative flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-2xl font-bold shadow-lg shadow-violet-500/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {aiLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <Sparkles size={18} className="group-hover:animate-pulse" />
          )}
          {aiLoading ? "Generating..." : "Generate with AI"}
        </button>
      </div>

      <div className="bg-slate-50/50 border border-slate-200 rounded-3xl p-6 sm:p-8">
        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSkill()}
            placeholder="e.g. React.js, TypeScript, Node.js"
            className="flex-1 bg-white border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm"
          />

          <button
            onClick={addSkill}
            type="button"
            className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-semibold transition-all duration-200 active:scale-[0.98] shadow-md"
          >
            Add
          </button>
        </div>

        {/* Skills Pills */}
        <div className="flex flex-wrap gap-3 mt-8">
          {skills?.length === 0 && (
            <div className="w-full py-8 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
              No skills added yet. Type above or generate with AI.
            </div>
          )}
          {skills?.map((skill) => (
            <div
              key={skill}
              className="group flex items-center gap-2 bg-white border border-violet-200 text-violet-700 px-4 py-2.5 rounded-full font-medium shadow-sm hover:border-violet-300 hover:bg-violet-50 transition-colors"
            >
              {skill}
              <button 
                onClick={() => removeSkill(skill)}
                className="w-5 h-5 rounded-full flex items-center justify-center bg-violet-100 text-violet-500 hover:bg-rose-100 hover:text-rose-500 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-semibold transition-colors"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <button
          onClick={saveSkills}
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-slate-900/10"
        >
          {loading ? "Saving..." : "Save & Continue"}
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}