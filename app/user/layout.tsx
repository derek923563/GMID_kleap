import { UserSidebar } from "@/components/gmid/UserSidebar";
import { CyberBackground } from "@/components/gmid/CyberBackground";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#060612] text-[#e8f4ff]" style={{ fontFamily: "var(--font-sans)" }}>
      <CyberBackground />
      <UserSidebar />
      <main className="relative z-10 lg:ml-[240px] min-h-screen transition-all duration-300">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
