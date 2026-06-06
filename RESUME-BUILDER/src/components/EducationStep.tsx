"use client";

import axios from "axios";
import { useEffect } from "react";
import {
  useForm,
  useFieldArray,
} from "react-hook-form";

import {
  GraduationCap,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface Props {
  resumeId: string;
  onNext: () => void;
  onBack: () => void;
}

interface EducationForm {
  education: {
    institute: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];
}

export default function EducationStep({
  resumeId,
  onNext,
  onBack,
}: Props) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EducationForm>({
    defaultValues: {
      education: [
        {
          institute: "",
          degree: "",
          startDate: "",
          endDate: "",
        },
      ],
    },
  });

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "education",
  });

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(
        `/api/resume/${resumeId}`
      );

      if (
        data.data?.education &&
        data.data.education.length > 0
      ) {
        reset({
          education:
            data.data.education,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (
    values: EducationForm
  ) => {
    try {
      await axios.patch(
        `/api/resume/${resumeId}`,
        {
          education:
            values.education,
        }
      );

      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-50 flex items-center justify-center shadow-inner">
          <GraduationCap className="w-7 h-7 text-violet-600" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Education
          </h1>
          <p className="text-slate-500 mt-1.5 text-lg">
            Add your educational background.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-slate-50/50 border border-slate-200 rounded-3xl p-6 md:p-8 relative group transition-all duration-300 hover:shadow-md hover:border-violet-200"
            >
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors shadow-sm"
                  title="Remove Education"
                >
                  <Trash2 size={18} />
                </button>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    Institute
                  </label>
                  <input
                    {...register(`education.${index}.institute`)}
                    placeholder="e.g. Stanford University"
                    className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    Degree
                  </label>
                  <input
                    {...register(`education.${index}.degree`)}
                    placeholder="e.g. B.S. Computer Science"
                    className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    {...register(`education.${index}.startDate`)}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-slate-900 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    {...register(`education.${index}.endDate`)}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-slate-900 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            append({
              institute: "",
              degree: "",
              startDate: "",
              endDate: "",
            })
          }
          className="inline-flex items-center gap-2 bg-violet-50 hover:bg-violet-100 text-violet-700 px-6 py-3.5 rounded-2xl font-bold transition-colors border border-violet-200"
        >
          <Plus size={18} />
          Add Education
        </button>

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
            type="submit"
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