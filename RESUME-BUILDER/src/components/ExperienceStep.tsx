"use client";

import axios from "axios";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { ArrowLeft, ArrowRight, Plus, Trash2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

interface ExperienceItem {
  company: string;
  role: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

interface FormValues {
  experience: ExperienceItem[];
}

export default function ExperienceStep({ resumeId, onNext, onBack }: Props) {
  let router = useRouter();

  const {
    register,
    control,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      experience: [
        {
          company: "",
          role: "",
          employmentType: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      if (data.data.workExperience?.length) {
        reset({
          experience: data.data.workExperience,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateDescription = async (index: number) => {
    try {
      const exp = watch(`experience.${index}`);

      const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);

      const resume = resumeData.data;

      const { data } = await axios.post("/api/ai/generate-experience", {
        jobRole: exp.role,
        experienceLevel: resume.experienceLevel,
      });

      setValue(`experience.${index}.description`, data.description);
    } catch (error) {
      console.log(error);
      alert("AI is currently experiencing high demand or an error occurred. Please try again later.");
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      await axios.patch(`/api/resume/${resumeId}`, {
        workExperience: values.experience,
      });

      router.push(`/resume/${resumeId}/preview`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Work Experience</h1>
          <p className="text-slate-500 mt-1.5 text-lg">
            Showcase your professional journey.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            append({
              company: "",
              role: "",
              employmentType: "",
              startDate: "",
              endDate: "",
              currentlyWorking: false,
              description: "",
            })
          }
          className="inline-flex items-center gap-2 bg-violet-50 hover:bg-violet-100 text-violet-700 px-6 py-3.5 rounded-2xl font-bold transition-colors border border-violet-200"
        >
          <Plus size={18} />
          Add Experience
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-slate-50/50 border border-slate-200 rounded-3xl p-6 md:p-8 relative group transition-all duration-300 hover:shadow-md hover:border-violet-200">
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors shadow-sm"
                  title="Remove Experience"
                >
                  <Trash2 size={18} />
                </button>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Company Name</label>
                  <input
                    {...register(`experience.${index}.company`)}
                    placeholder="e.g. Google"
                    className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Job Title</label>
                  <input
                    {...register(`experience.${index}.role`)}
                    placeholder="e.g. Frontend Engineer"
                    className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Employment Type</label>
                  <select
                    {...register(`experience.${index}.employmentType`)}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-slate-900 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none appearance-none shadow-sm"
                  >
                    <option value="">Select Type</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Internship</option>
                    <option>Contract</option>
                    <option>Freelance</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1 space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">Start Date</label>
                    <input
                      type="date"
                      {...register(`experience.${index}.startDate`)}
                      className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-slate-900 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-1.5">
                    <label className="block text-sm font-semibold text-slate-700">End Date</label>
                    <input
                      type="date"
                      {...register(`experience.${index}.endDate`)}
                      disabled={watch(`experience.${index}.currentlyWorking`)}
                      className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-slate-900 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none disabled:opacity-50 disabled:bg-slate-50 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="inline-flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register(`experience.${index}.currentlyWorking`)}
                    className="w-5 h-5 rounded border-slate-300 text-violet-600 focus:ring-violet-500 transition-colors"
                  />
                  <span className="text-sm font-semibold text-slate-700 select-none">I currently work here</span>
                </label>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="block text-sm font-semibold text-slate-700">Role Description</label>
                  <button
                    type="button"
                    onClick={() => generateDescription(index)}
                    className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl font-medium shadow-md shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 text-sm"
                  >
                    <Sparkles size={16} className="group-hover:animate-pulse" />
                    Generate with AI
                  </button>
                </div>

                <textarea
                  rows={6}
                  {...register(`experience.${index}.description`)}
                  placeholder="Describe your key responsibilities, achievements, and the impact you made..."
                  className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm resize-none"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-semibold transition-colors"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-slate-900/10"
          >
            {isSubmitting ? "Finishing..." : "Save & Preview"}
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}