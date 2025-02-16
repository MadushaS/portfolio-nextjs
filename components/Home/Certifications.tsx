import Image from "next/image";
import Link from "next/link";

import GHAS from "@/public/images/certifications/ghas.png";

const certs = [
  {
    image: GHAS,
    alt: "GHAS",
    link: "https://www.credly.com/badges/c0a6736d-3b56-4b17-be20-ca2c2bf10927/public_url",
  },
];

export default function Certifications() {
  return (
    <div className="flex">
      {certs.map(({ image, alt, link }) => (
        <Link key={alt} href={link}>
          <Image
            src={image}
            alt="GHAS"
            width={64}
            height={64}
            className="hover:bg-muted inline-block h-16 w-16 rounded-2xl p-1"
          />
        </Link>
      ))}
    </div>
  );
}
