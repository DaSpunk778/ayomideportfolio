import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-[#09090b] text-[#f4f4f5] overflow-x-hidden"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(124,58,237,0.3) transparent",
      }}
    >
  <Navbar />
    </div>
  );
}
