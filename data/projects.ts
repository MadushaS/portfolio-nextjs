import { StaticImageData } from "next/image";

import SummarizerImage from "@/public/images/projects/t5_summarizer.jpg";
import CognizerImage from "@/public/images/projects/cognizer.jpg";
import TravelAgencyImage from "@/public/images/projects/travel.jpg";
import liveLocation from "@/public/images/projects/tracker.jpg";
import FuzzyYtIcon from "@/public/images/projects/fuzzy-yt.jpg";
import Portfolio from "@/public/images/projects/portfolio.jpg";

export type ProjectType = {
  title: string;
  description: string;
  license: string;
  image: string | StaticImageData;
  year: string;
  technologies: string[];
  tags: string[];
  githubRepo?: string;
  demoLink?: string;
};

const ProjectsList: ProjectType[] = [
  {
    title: "Personal Portfolio",
    description:
      "This is my personal portfolio website. It is a website that showcases my projects, skills, and experience. It also allows users to contact me.",
    image: Portfolio,
    year: "2024",
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "TailwindCSS",
      "Shadcn/ui",
      "Framer Motion",
      "Sanity",
      "PostHog",
      "CloudFlare",
    ],
    tags: ["Web Development"],
    githubRepo: "https://github.com/MadushaS/portfolio-nextjs",
    demoLink: "https://madusha.dev/",
    license: "MIT",
  },
  {
    title: "T5 Based Text Summarizer",
    description:
      "The t5 xsum samsum billsum cnn_dailymail model is a text summarization model fine-tuned on the t5-base architecture, a versatile text-to-text transfer transformer. This powerful model excels at generating abstractive summaries from input text.",
    image: SummarizerImage,
    year: "2023",
    technologies: [
      "T5-base",
      "TensorFlow",
      "PyTorch",
      "Python",
      "Hugging Face",
      "Kaggle",
    ],
    tags: ["Text Summarization", "NLP", "AI"],
    demoLink:
      "https://huggingface.co/madushakv/t5_xsum_samsum_billsum_cnn_dailymail",
    license: "MIT",
  },
  {
    title: "Cogniezer",
    description:
      "This is is a REST API built using FastAPI, used to summarize the given audio clip. This uses Azure  The model is trained using the Samsum dataset and MeetingBank-transcript dataset, developed for the 2nd year project for the BSc Hons Computer Science degree at the University of Kelaniya.",
    image: CognizerImage,
    year: "2023",
    technologies: [
      "FastAPI",
      "Python",
      "T5-base Transformer",
      "Azure Text-to-Speech",
      "Docker",
    ],
    tags: ["Speech to Text", "NLP", "AI", "REST API"],
    githubRepo: "https://github.com/InsiderCloud/Cogniezer-Backend",
    demoLink: "#",
    license: "MIT",
  },
  {
    title: "Travel Agency",
    description:
      "This is a travel agency website. It is a website that allows users to book a trip to a destination of their choice. It also allows users to view the destinations they have booked for and the total cost of the trip.",
    image: TravelAgencyImage,
    year: "2023",
    technologies: [
      "Express",
      "MongoDB",
      "Auth0",
      "Bootstrap",
      "OpenAI",
      "OpemWeatherMap",
    ],
    tags: ["Travel", "Web Development"],
    githubRepo: "https://github.com/MadushaS/travel_agency_node",
    demoLink: "https://travel.madusha.dev/",
    license: "MIT",
  },
  {
    title: "Live GPS Tracker",
    description:
      "This is a GPS tracker that allows users to track the location of their vehicles in real-time. It also allows users to view the route taken by the vehicle and the speed at which it is traveling.",
    image: liveLocation,
    year: "2023",
    technologies: ["React", "TailwidnCSS", "Supabase", "kinde Auth", "OpenMap"],
    tags: ["GeoLocation", "Database", "Web Development"],
    githubRepo: "https://github.com/MadushaS/vehicle-tracking",
    demoLink: "https://tracker.madusha.dev/",
    license: "MIT",
  },
  {
    title: "Fuzzy Yt Downloader",
    description:
      "This is a web application that allows users to download videos from YouTube. It is built using Python and GTK and is designed to be simple and easy to use.",
    image: FuzzyYtIcon,
    year: "2023",
    technologies: ["Python", "GTK", "Glade", "PyTube", "GNOME"],
    tags: ["Gtk", "GNOME Development"],
    githubRepo: "https://github.com/MadushaS/fuzzy-yt",
    license: "MIT",
  },
];

export { ProjectsList };
