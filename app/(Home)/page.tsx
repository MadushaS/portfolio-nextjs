import SmoothLoader from "@/components/shared/SmoothLoader";
import HomePageContainer from "@/components/Home/HomePage";

export const metadata = {
  title: "Madusha Sandaruwan - Portfolio Website",
  description:
    "Madusha is a GitHub certified full-stack developer who loves to build things that live on the internet. He develops exceptional websites and web apps that provide intuitive, pixel-perfect user interfaces with efficient and modern backends.",
};

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col">
      <SmoothLoader />
      <HomePageContainer />
    </div>
  );
}
