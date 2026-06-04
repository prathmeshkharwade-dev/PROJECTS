"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { loginApi } from "@/apis/auth.api";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      await loginApi(data);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left Side */}

      <div className="hidden lg:flex flex-col justify-center bg-linear-to-br from-slate-900 via-indigo-950 to-slate-950 text-white px-16">

        <h1 className="text-6xl font-black leading-tight">
          Welcome
          <br />
          Back
        </h1>

        <p className="mt-6 text-lg text-slate-300 max-w-md">
          Continue building and managing
          professional AI-powered resumes.
        </p>

        <div className="mt-12 flex gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
            AI Resume
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
            ATS Score
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4">
            PDF Export
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex items-center justify-center bg-slate-50 p-6">

        <div className="w-full max-w-md">

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">

            <div className="mb-8 text-blue-700" >
              <h2 className="text-3xl font-bold">
                Login
              </h2>

              <p className="text-slate-500 mt-2">
                Access your account.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
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
                  ? "Signing In..."
                  : "Login"}
              </button>
            </form>

            <p className="text-center mt-6 text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="font-semibold text-indigo-600"
              >
                Register
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}