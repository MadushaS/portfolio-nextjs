import { BlogNavBar } from "@/components/shared/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BlogNavBar />
      <div className="mt-4 sm:-mt-8 md:-mt-12 lg:-mt-16 xl:-mt-16">
        {children}
      </div>
    </>
  );
}
