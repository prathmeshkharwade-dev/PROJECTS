export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-violet-500 selection:text-white relative">
      {/* Premium Background Accents */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-violet-100/50 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-violet-400/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 lg:py-12">
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}