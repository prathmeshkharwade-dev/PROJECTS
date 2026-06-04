"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { registerApi } from "@/apis/auth.api";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerApi(data);

      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Side */}

      <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-violet-600 via-indigo-600 to-blue-600 text-white px-16">

        <h1 className="text-6xl font-black leading-tight">
          Build ATS
          <br />
          Ready Resumes
        </h1>

        <p className="mt-6 text-lg text-white/80 max-w-md">
          Create professional resumes with AI,
          improve your profile, and get job-ready
          faster.
        </p>

        <div className="mt-12 space-y-4">
          <div className="flex items-center gap-3">
            <span>✓</span>
            <span>AI Generated Summary</span>
          </div>

          <div className="flex items-center gap-3">
            <span>✓</span>
            <span>ATS Optimization</span>
          </div>

          <div className="flex items-center gap-3">
            <span>✓</span>
            <span>PDF Resume Export</span>
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex items-center justify-center bg-slate-50 p-6">

        <div className="w-full max-w-md">

          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-8">

            <div className="mb-8">
              <h2 className="text-3xl font-bold  text-blue-600">
                Create Account
              </h2>

              <p className="text-slate-500 mt-2">
                Start building your resume today.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-slate-300 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-slate-300 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-xl border border-slate-300 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message:
                        "Password must be at least 8 characters",
                    },
                  })}
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-indigo-600 text-white py-4 font-semibold hover:bg-indigo-700 transition"
              >
                {isSubmitting
                  ? "Creating Account..."
                  : "Create Account"}
              </button>
            </form>

            <p className="text-center mt-6 text-slate-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-indigo-600"
              >
                Login
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}