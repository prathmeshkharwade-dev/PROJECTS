"use client";

import { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, MapPin, Globe, ArrowRight } from "lucide-react";

interface Props {
  resumeId: string | null;
  onNext: () => void;
}

interface PersonalInfoForm {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export default function PersonalInfoStep({ resumeId, onNext }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<PersonalInfoForm>();

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const { data } = await axios.get(`/api/resume/${resumeId}`);

      reset(data.data.personalInfo || {});
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values: PersonalInfoForm) => {
    try {
      await axios.patch(`/api/resume/${resumeId}`, {
        personalInfo: values,
      });

      onNext();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Personal Information
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Tell recruiters how they can reach you.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            icon={<User size={18} />}
            placeholder="John Doe"
            label="Full Name"
            register={register("fullName")}
          />

          <InputField
            icon={<Mail size={18} />}
            placeholder="john@example.com"
            label="Email Address"
            register={register("email")}
          />

          <InputField
            icon={<Phone size={18} />}
            placeholder="+1 234 567 8900"
            label="Phone Number"
            register={register("phone")}
          />

          <InputField
            icon={<MapPin size={18} />}
            placeholder="San Francisco, CA"
            label="Location"
            register={register("location")}
          />

          <InputField
            icon={<Globe size={18} />}
            placeholder="linkedin.com/in/johndoe"
            label="LinkedIn URL"
            register={register("linkedin")}
          />

          <InputField
            icon={<Globe size={18} />}
            placeholder="github.com/johndoe"
            label="GitHub URL"
            register={register("github")}
          />
        </div>

        <div className="w-full">
          <InputField
            icon={<Globe size={18} />}
            placeholder="https://myportfolio.com"
            label="Portfolio Website"
            register={register("portfolio")}
          />
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100">
          <button
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-2xl font-semibold transition-all duration-200 active:scale-[0.98] shadow-lg shadow-slate-900/10 disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : "Save & Continue"}
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({ label, placeholder, icon, register }: any) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors duration-200">
          {icon}
        </div>

        <input
          {...register}
          placeholder={placeholder}
          className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm"
        />
      </div>
    </div>
  );
}