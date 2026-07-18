"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ArrowRight, Lock, Mail, User, Sparkles } from "lucide-react";
import { registerApi } from "@/apis/auth.api";
import { isAxiosError } from "axios";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormData>();

  const onSubmit = async (
    data: RegisterFormData
  ) => {
    try {
      await registerApi(data);

      router.push("/auth/login");
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        setError("root", { message: error.response.data.message || "Registration failed" });
      } else if (error instanceof Error) {
        setError("root", { message: error.message });
      } else {
        setError("root", { message: "Registration failed" });
      }
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-slate-50 selection:bg-violet-500 selection:text-white">
      {/* Left Section (Branding & Visuals) */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-slate-900">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/30 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[20%] right-[30%] w-[30%] h-[30%] bg-indigo-500/20 blur-[100px] rounded-full mix-blend-screen" />
          
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-between p-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              AI Resume Builder
            </h1>
          </div>

          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-violet-300 text-sm font-medium mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
              </span>
              Join 10,000+ Professionals
            </div>
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-100 to-indigo-200 leading-[1.1] mb-6">
              Your next career move starts here.
            </h2>
            <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-md">
              Create an account to build ATS-optimized resumes instantly. Let AI handle the heavy lifting while you focus on interviews.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="flex gap-8 mt-12">
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold text-white">3x</div>
              <p className="text-sm text-slate-400">More Interviews</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold text-white">AI</div>
              <p className="text-sm text-slate-400">Content Generation</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-2xl font-bold text-white">ATS</div>
              <p className="text-sm text-slate-400">Score Analysis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-24 relative bg-white lg:bg-transparent">
        {/* Mobile Background Elements */}
        <div className="absolute inset-0 lg:hidden overflow-hidden pointer-events-none">
           <div className="absolute top-0 right-0 w-64 h-64 bg-violet-200/50 blur-[80px] rounded-full" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200/50 blur-[80px] rounded-full" />
        </div>

        <div className="w-full max-w-[420px] relative z-10">
          <div className="mb-10 lg:hidden flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-600/30">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              AI Resume
            </h1>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Create Account 🚀
          </h2>
          <p className="text-slate-500 mt-3 text-base">
            Join us and start building your future.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
            {errors.root && (
              <div className="p-3 rounded-xl bg-rose-50/50 border border-rose-200 text-rose-600 text-sm font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
                {errors.root.message}
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 block">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors duration-200">
                  <User size={18} />
                </div>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="John Doe"
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm"
                />
              </div>
              {errors.name && (
                <p className="text-rose-500 text-sm font-medium flex items-center gap-1 mt-1.5">
                  <span className="w-1 h-1 rounded-full bg-rose-500 inline-block" />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 block">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors duration-200">
                  <Mail size={18} />
                </div>
                <input
                  {...register("email", { required: "Email is required" })}
                  placeholder="john@example.com"
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm"
                />
              </div>
              {errors.email && (
                <p className="text-rose-500 text-sm font-medium flex items-center gap-1 mt-1.5">
                  <span className="w-1 h-1 rounded-full bg-rose-500 inline-block" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 block">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors duration-200">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters required" }
                  })}
                  placeholder="••••••••"
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none shadow-sm"
                />
              </div>
              {errors.password && (
                <p className="text-rose-500 text-sm font-medium flex items-center gap-1 mt-1.5">
                  <span className="w-1 h-1 rounded-full bg-rose-500 inline-block" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-slate-900/10"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : (
                <>
                  Sign Up
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-violet-600 font-bold hover:text-violet-700 transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}