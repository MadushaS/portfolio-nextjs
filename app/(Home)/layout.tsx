import FloatingNav from "@/components/shared/FlotingNav";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <FloatingNav />
      <div className="flex min-h-screen flex-col">
        {children}
      </div>
    </>
  );
}
