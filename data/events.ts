type DeveloperEventType = {
  id: number;
  title: string;
  description: string;
  image: string
}
const developerEvents: DeveloperEventType[] = [
  {
    id: 1,
    title: "HackThePlanet 2023",
    description:
      "An annual hackathon focusing on environmental tech solutions.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "DevCon 2023",
    description:
      "The ultimate conference for web developers, featuring workshops, talks, and networking opportunities.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Women in Tech Summit",
    description:
      "A conference to inspire and empower women in the technology industry.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Mobile World Congress",
    description:
      "The world’s largest exhibition for the mobile industry, featuring prominent executives representing mobile operators, device manufacturers, technology providers.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "Global Game Jam",
    description:
      "An event that stirs a global creative frenzy in game development.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    title: "AI & Big Data Expo",
    description:
      "A showcase of next-generation technologies and strategies from the world of Artificial Intelligence & Big Data.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    title: "Cloud Expo",
    description:
      "A conference that brings together the best brains in the cloud computing industry to discuss the latest trends and technologies.",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    title: "Blockchain Expo",
    description:
      "A global series of events that cover the future of enterprise technology, including Blockchain, IoT, AI & Big Data.",
    image: "https://via.placeholder.com/150",
  },
];

export { developerEvents };
export type { DeveloperEventType };
