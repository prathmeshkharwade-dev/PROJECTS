"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import PersonalInfoStep from "@/components/PersonalInfoStep";
import EducationStep from "@/components/EducationStep";
import SkillsStep from "@/components/SkillsStep";
import ProjectsStep from "@/components/ProjectSetup";
import ExperienceStep from "@/components/ExperienceStep";

import { Check } from "lucide-react";

export default function ResumeBuilderPage() {
  const params = useParams();

  const resumeId = params.resumeId as string;

  const [step, setStep] = useState(1);

  const steps = [
    "Personal Info",
    "Education",
    "Skills",
    "Projects",
    "Experience",
  ];

  return (
    <div className="space-y-8">
      {/* Progress Bar Container */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between relative">
          {/* Connecting Line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full z-0 overflow-hidden">
             <div 
               className="h-full bg-violet-500 transition-all duration-500 ease-out"
               style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
             />
          </div>

          {/* Step Circles */}
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === step;
            const isCompleted = stepNumber < step;

            return (
              <div key={label} className="relative z-10 flex flex-col items-center gap-2 group">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    isActive 
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30 scale-110" 
                      : isCompleted 
                        ? "bg-violet-100 text-violet-600" 
                        : "bg-white border-2 border-slate-200 text-slate-400"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                </div>
                <span className={`absolute -bottom-6 text-xs font-semibold whitespace-nowrap transition-colors duration-300 hidden sm:block ${
                  isActive ? "text-violet-700" : isCompleted ? "text-slate-600" : "text-slate-400"
                }`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40 p-6 sm:p-10">
      {step === 1 && (
        <PersonalInfoStep resumeId={resumeId} onNext={() => setStep(2)} />
      )}

      {step === 2 && (
        <EducationStep
          resumeId={resumeId}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <SkillsStep
          resumeId={resumeId}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <ProjectsStep
          resumeId={resumeId}
          onBack={() => setStep(3)}
          onNext={() => setStep(5)}
        />
      )}

      {step === 5 && (
        <ExperienceStep
          resumeId={resumeId}
          onBack={() => setStep(4)}
          onNext={() => setStep(6)}
        />
      )}

      {/* Step 6 */}
      {/* Achievements */}

      {/* Step 7 */}
      {/* Summary */}

      {/* Step 8 */}
      {/* Preview */}
      </div>
    </div>
  );
}