"use client";

import axios from "axios";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { ArrowLeft, ArrowRight, Plus, Trash2, Sparkles } from "lucide-react";

interface Props {
  resumeId: any;
  onNext: () => void;
  onBack: () => void;
}

interface Project {
  title: string;
  techStack: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
}

interface FormValues {
  projects: Project[];
}

export default function ProjectsStep({ resumeId, onNext, onBack }: Props) {
  const {
    register,
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      projects: [
        {
          title: "",
          techStack: "",
          description: "",
          githubUrl: "",
          liveUrl: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      if (data.data.projects?.length) {
        reset({
          projects: data.data.projects.map((project: any) => ({
            ...project,
            techStack: Array.isArray(project.techStack)
              ? project.techStack.join(", ")
              : "",
          })),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateDescription = async (index: number) => {
    try {
      const project = watch(`projects.${index}`);

      const { data: resumeData } = await axios.get(`/api/resume/${resumeId}`);

      const resume = resumeData.data;

      const { data } = await axios.post(
        "/api/ai/generate-project-description",
        {
          jobTitle: "web developer",
          experienceLevel: "mid-level",
          techStack: ["html", "css", "react", "nodejs"],
        }
      );
      console.log("data we get from project description", data);

      setValue(`projects.${index}.description`, data.data.projectDescription);
    } catch (error) {
      console.log(error);
      alert("AI is currently experiencing high demand or an error occurred. Please try again later.");
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const formattedProjects = values.projects.map((project) => ({
        ...project,
        techStack: project.techStack.split(",").map((tech) => tech.trim()),
      }));

      await axios.patch(`/api/resume/${resumeId}`, {
        projects: formattedProjects,
      });

      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Projects</h1>
          <p className="text-slate-500 mt-1.5 text-lg">Showcase your best work.</p>
        </div>

        <button
          type="button"
          onClick={() =>
            append({
              title: "",
              techStack: "",
              description: "",
              githubUrl: "",
              liveUrl: "",
            })
          }
          className="inline-flex items-center gap-2 bg-violet-50 hover:bg-violet-100 text-violet-700 px-6 py-3.5 rounded-2xl font-bold transition-colors border border-violet-200"
        >
          <Plus size={18} />
          Add Project
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
                  title="Remove Project"
                >
                  <Trash2 size={18} />
                </button>
              )}

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Project Title</label>
                  <input
                    {...register(`projects.${index}.title`)}
                    placeholder="e.g. E-Commerce Platform"
                    className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Tech Stack (comma separated)</label>
                  <input
                    {...register(`projects.${index}.techStack`)}
                    placeholder="e.g. React, Next.js, MongoDB"
                    className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">GitHub URL</label>
                  <input
                    {...register(`projects.${index}.githubUrl`)}
                    placeholder="https://github.com/..."
                    className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Live URL</label>
                  <input
                    {...register(`projects.${index}.liveUrl`)}
                    placeholder="https://..."
                    className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <label className="block text-sm font-semibold text-slate-700">Project Description</label>
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
                  rows={5}
                  {...register(`projects.${index}.description`)}
                  placeholder="Describe your project, the problems it solved, and the value it created..."
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
            {isSubmitting ? "Saving..." : "Save & Continue"}
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}