import { AdminSidebar } from "@/components/gmid/AdminSidebar";
import { CyberBackground } from "@/components/gmid/CyberBackground";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#060612] text-[#e8f4ff]" style={{ fontFamily: "var(--font-sans)" }}>
      <CyberBackground />
      <AdminSidebar />
      <main className="relative z-10 lg:ml-[240px] min-h-screen transition-all duration-300">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
