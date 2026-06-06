import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, FileText, CheckCircle2, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans selection:bg-violet-500 selection:text-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/30 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[60%] bg-indigo-500/20 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">AI Resume</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Log in
          </Link>
          <Link href="/auth/register" className="text-sm font-semibold bg-white text-slate-900 px-5 py-2.5 rounded-full hover:bg-slate-100 transition-colors shadow-lg">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Copy */}
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-violet-300 text-sm font-medium mb-8 backdrop-blur-md">
            <Sparkles className="w-4 h-4" />
            Powered by Gemini AI
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-100 to-indigo-200 leading-[1.1] mb-8 tracking-tight">
            The resume that gets you hired.
          </h1>
          
          <p className="text-lg lg:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-10">
            Generate ATS-optimized resumes in minutes. Let our AI write compelling summaries, skills, and experience descriptions tailored to your dream job.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link href="/auth/register" className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-violet-600/20 hover:shadow-violet-600/40 hover:-translate-y-1">
              Build Your Resume Free
              <ArrowRight size={20} />
            </Link>
            <div className="flex items-center gap-2 text-sm text-slate-400 font-medium px-4 py-4">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              No credit card required
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 border-t border-white/10 pt-8">
            <div className="flex -space-x-4">
              {[32, 45, 68, 12, 55].map((img, i) => (
                <img key={i} src={`https://i.pravatar.cc/150?img=${img}`} alt="User" className="w-12 h-12 rounded-full border-2 border-slate-900 object-cover" />
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-amber-400 mb-1">
                {[1,2,3,4,5].map(star => <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
              </div>
              <p className="text-sm text-slate-300 font-medium">Trusted by 10,000+ job seekers</p>
            </div>
          </div>
        </div>

        {/* Right Visual (Mockup) */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-blue-600/20 rounded-[2.5rem] blur-2xl transform rotate-3" />
          
          <div className="relative bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl transform transition-transform hover:-translate-y-2 duration-500">
            {/* Mockup Header */}
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            
            {/* Mockup Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-inner">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="h-5 w-48 bg-white/10 rounded-md mb-2" />
                  <div className="h-4 w-32 bg-white/5 rounded-md" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="h-4 w-full bg-white/5 rounded-md" />
                <div className="h-4 w-[90%] bg-white/5 rounded-md" />
                <div className="h-4 w-[95%] bg-white/5 rounded-md" />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                {[1,2,3,4].map(i => (
                  <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
                    <CheckCircle2 className="w-4 h-4 text-violet-400" />
                    <div className="h-3 w-full bg-white/10 rounded" />
                  </div>
                ))}
              </div>

              {/* AI Badge */}
              <div className="absolute -right-6 -bottom-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-200 flex items-center gap-4 animate-bounce-slow">
                <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">ATS Score</p>
                  <p className="text-xl font-black text-slate-900">98% Match</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}