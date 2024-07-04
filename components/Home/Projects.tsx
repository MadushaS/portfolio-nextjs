import ProjectCard, { ProjectType } from "./Project-card";

import SummarizerImage from '@/public/images/t5_summarizer.png';
import CognizerImage from '@/public/images/cognizer.jpg';
import TravelAgencyImage from '@/public/images/travel_agency.svg';
import liveLocation from '@/public/images/live_location.svg';
import FuzzyYtIcon from '@/public/images/fuzzy-yt.jpg';
import LilPawsImage from '@/public/images/lilpaws.png';


const myProjects: ProjectType[] = [
    {
        "title": "T5 Based Text Summarizer",
        "description": "The t5_xsum_samsum_billsum_cnn_dailymail model is a text summarization model fine-tuned on the t5-base architecture, a versatile text-to-text transfer transformer. This powerful model excels at generating abstractive summaries from input text.",
        "image": SummarizerImage,
        "year": "2023",
        "technologies": ["T5-base", "TensorFlow", "PyTorch", "Python", "Hugging Face", "Kaggle"],
        "tags": ["Text Summarization", "NLP", "AI"],
        "demoLink": "https://huggingface.co/madushakv/t5_xsum_samsum_billsum_cnn_dailymail",
        "license": "MIT"
    },
    {
        "title": "Cogniezer",
        "description": "This is is a REST API built using FastAPI, used to summarize the given audio clip. This uses Azure  The model is trained using the Samsum dataset and MeetingBank-transcript dataset, developed for the 2nd year project for the BSc Hons Computer Science degree at the University of Kelaniya.",
        "image": CognizerImage,
        "year": "2023",
        "technologies": ["FastAPI", "Python", "T5-base", "Azure Text-to-Speech", "Docker"],
        "tags": ["Speech to Text", "NLP", "AI", "REST API"],
        "githubRepo": "https://github.com/InsiderCloud/Cogniezer-Backend",
        "demoLink": "#",
        "license": "MIT"
    },
    {
        "title": "Travel Agency",
        "description": "This is a travel agency website. It is a website that allows users to book a trip to a destination of their choice. It also allows users to view the destinations they have booked for and the total cost of the trip.",
        "image": TravelAgencyImage,
        "year": "2023",
        "technologies": ["Express", "MongoDB", "Auth0", "Bootstrap", "OpenAI", "OpemWeatherMap"],
        "tags": ["Travel", "Web Development"],
        "githubRepo": "https://github.com/MadushaS/travel_agency_node",
        "demoLink": "https://travel.madusha.dev/",
        "license": "MIT"
    },
    {
        "title": "Live GPS Tracker",
        "description": "This is a GPS tracker that allows users to track the location of their vehicles in real-time. It also allows users to view the route taken by the vehicle and the speed at which it is traveling.",
        "image": liveLocation,
        "year": "2023",
        "technologies": ["React", "TailwidnCSS", "Supabase", "OpenMap"],
        "tags": ["GeoLocation", "Database", "Web Development"],
        "githubRepo": "https://github.com/MadushaS/vehicle-tracking",
        "demoLink": "https://travel.madusha.dev/",
        "license": "MIT"
    },
    {
        "title": "Fuzzy Yt Downloader",
        "description": "This is a web application that allows users to download videos from YouTube. It also allows users to convert the downloaded videos to different formats and resolutions.",
        "image": FuzzyYtIcon,
        "year": "2023",
        "technologies": ["Python", "GTK", "Glade", "PyTube", "GNOME"],
        "tags": ["Gtk", "GNOME Development"],
        "githubRepo": "https://github.com/MadushaS/fuzzy-yt",
        "license": "MIT"
    },
    {
        "title": "Petshop - Static Webiste",
        "description": "This is a static website for a pet shop. It is a branding website for a pet shop.",
        "image": LilPawsImage,
        "year": "2021",
        "technologies": ["HTML", "CSS", "JavaScript"],
        "tags": ["Web Development"],
        "githubRepo": "https://github.com/MadushaS/Petshop",
        "demoLink": "https://petshop.madusha.dev/",
        "license": "MIT"
    }
]

export default function Projects(props: Readonly<React.HTMLProps<HTMLDivElement>>) {
    return (
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Latest Projects</h2>
                        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Check out some of my recent work and see what I&apos;ve been up to.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">

                    {myProjects.map((project, index) => {
                        return (
                            <ProjectCard key={index} project={project} />
                        )
                    })}
                </div>
            </div>
        </section>
    );
}