"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Plus, FileText, Trash2, Briefcase } from "lucide-react";

import {
  createResumeApi,
  deleteResumeApi,
  getAllResumesApi,
} from "@/apis/resume.api";

interface Resume {
  _id: string;
  title: string;
  jobTitle: string;
  experienceLevel: string;
}

export default function ResumePage() {
  const router = useRouter();

  const [resumes, setResumes] = useState<Resume[]>([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    jobTitle: "",
    experienceLevel: "Fresher",
  });

  const fetchResumes = async () => {
    try {
      const data = await getAllResumesApi();

      setResumes(data.resumes || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleCreateResume = async () => {
    try {
      const response = await createResumeApi({
        title: formData.title,
        jobTitle: formData.jobTitle,
        experienceLevel: formData.experienceLevel,
      });

      console.log(response);

      const resumeId = response.data._id;
      console.log("reached...");

      router.push(`/resume/${resumeId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (resumeId: string) => {
    try {
      await deleteResumeApi(resumeId);

      fetchResumes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-violet-500 selection:text-white relative">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-violet-100/50 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                <FileText className="text-white w-5 h-5" />
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
            </div>
            <p className="text-slate-500 text-lg ml-[52px]">
              Manage and create your ATS-optimized resumes.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-2xl font-semibold flex items-center gap-2 transition-all duration-200 shadow-xl shadow-slate-900/10 active:scale-[0.98]"
          >
            <Plus size={20} />
            Create New Resume
          </button>
        </div>

        {/* Empty State */}
        {!loading && resumes.length === 0 && (
          <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] border-2 border-dashed border-slate-200 p-16 text-center max-w-3xl mx-auto mt-20 shadow-sm">
            <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FileText size={40} className="text-violet-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Your canvas is blank</h2>
            <p className="text-slate-500 text-lg max-w-md mx-auto mb-8">
              Let's craft a standout resume that highlights your unique journey. It only takes a few minutes with our AI.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-full font-bold text-lg inline-flex items-center gap-2 transition-all duration-300 shadow-lg shadow-violet-600/30 hover:-translate-y-1"
            >
              <Plus size={20} />
              Start Building
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm h-56 animate-pulse flex flex-col justify-between">
                <div>
                  <div className="w-3/4 h-6 bg-slate-200 rounded-md mb-4" />
                  <div className="w-1/2 h-4 bg-slate-100 rounded-md mb-6" />
                  <div className="w-24 h-8 bg-slate-100 rounded-full" />
                </div>
                <div className="w-full h-12 bg-slate-100 rounded-xl" />
              </div>
            ))}
          </div>
        )}

        {/* Resume Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="group bg-white rounded-3xl p-6 border border-slate-200 hover:border-violet-300 shadow-sm hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-6 h-6 text-violet-600" />
                  </div>
                  <button
                    onClick={() => handleDelete(resume._id)}
                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                    title="Delete Resume"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <h2 className="font-bold text-xl text-slate-900 mb-2 line-clamp-1 group-hover:text-violet-700 transition-colors">{resume.title}</h2>

                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-4">
                  <Briefcase size={16} className="text-slate-400" />
                  <span className="line-clamp-1">{resume.jobTitle}</span>
                </div>

                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-100">
                  {resume.experienceLevel}
                </span>
              </div>

              <button
                onClick={() => router.push(`/resume/${resume._id}`)}
                className="mt-8 w-full bg-slate-50 hover:bg-violet-600 text-slate-700 hover:text-white py-3.5 rounded-2xl font-semibold transition-all duration-200"
              >
                Edit Resume
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setShowModal(false)} />
          
          <div className="relative bg-white w-full max-w-md rounded-[2rem] p-8 shadow-2xl transform transition-all">
            <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mb-6">
              <Plus className="w-6 h-6 text-violet-600" />
            </div>
            
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">New Resume</h2>
            <p className="text-slate-500 mb-8">Set the foundation for your new document.</p>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 block">Resume Title</label>
                <input
                  placeholder="e.g. Frontend Developer - Google"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 block">Target Job Title</label>
                <input
                  placeholder="e.g. Senior React Developer"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 block">Experience Level</label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-3 px-4 text-slate-900 focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-200 outline-none appearance-none"
                >
                  <option>Fresher</option>
                  <option>Junior</option>
                  <option>Mid-Level</option>
                  <option>Senior</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-10">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateResume}
                className="flex-1 px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-slate-900/10"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}