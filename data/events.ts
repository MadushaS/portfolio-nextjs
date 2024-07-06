import OSS24 from "@/public/images/events/oss24.jpeg"
import CNSL from "@/public/images/events/cnsl_meetup.jpeg"
import DevOps from "@/public/images/events/devops.jpeg"
import GitHubActions from "@/public/images/events/github_actions.jpeg"
import ICATC2023 from "@/public/images/events/icatc.jpeg"
import CodespaceWebinar from "@/public/images/events/github_codespaces.jpeg"
import FossUokAGM from "@/public/images/events/fossuok_agm.jpeg"
import gitbase from "@/public/images/events/gitbase.jpeg"
import GitHubSession from "@/public/images/events/github1.jpeg"

type DeveloperEventType = {
  id: number;
  title: string;
  date: string;
  venue: string;
  image: string;
}
const developerEvents: DeveloperEventType[] = [
  { 
    id: 1, 
    title: "Open Source Summit '24 - University of Kelaniya", 
    date: "2024 April",
    venue: "University of Kelaniya",
    image: OSS24.src 
  },
  { 
    id: 2, 
    title: "Cloud Native Sri Lanka Meetups", 
    date: "2024 April",
    venue: "hatch Colombo",
    image: CNSL.src 
  },
  { 
    id: 3, 
    title: "DevOps Workshop", 
    date: "2024 March",
    venue: "University of Kelaniya",
    image: DevOps.src 
  },
  { 
    id: 4, 
    title: "GitHub Actions Workshop", 
    date: "2024 March",
    venue: "University of Kelaniya",
    image: GitHubActions.src 
  },
  { 
    id: 6, 
    title: "GitHub Codespaces Webinar", 
    date: "2024 February",
    venue: "Online",
    image: CodespaceWebinar.src 
  },
  { 
    id: 5, 
    title: "International Conference on Advanced Technologies in Computing", 
    date: "2023 December",
    venue: "University of Kelaniya",
    image: ICATC2023.src 
  },
  { 
    id: 7, 
    title: "FOSS Community of University of Kelaniya AGM", 
    date: "2023 August",
    venue: "University of Kelaniya",
    image: FossUokAGM.src 
  },
  { 
    id: 9, 
    title: "GitHub Workshop", 
    date: "2023 July",
    venue: "University of Kelaniya",
    image: GitHubSession.src 
  },
  { 
    id: 8, 
    title: "Gitbase Webinar", 
    date: "2022 Sept",
    venue: "Online",
    image: gitbase.src 
  },
];

export { developerEvents };
export type { DeveloperEventType };
