import { developerEvents, DeveloperEventType } from '@/data/events';
import React, { useRef, HTMLProps } from 'react';
import { motion, useTransform, useScroll } from "framer-motion";
import { Calendar, MapPin } from 'lucide-react';

export default function Events(props: HTMLProps<HTMLDivElement>) {
    return (
        <section className="" {...props}>
            <div className="py-16 xl:pb-4 flex justify-center gap-4 md:px-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    Developer Community Events
                </h2>
            </div>
            <HorizontalScrollCarousel />
        </section>
    );
};
const HorizontalScrollCarousel = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[200vh] -top-16">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-4">
                    {developerEvents.map((card) => {
                        return <Card card={card} key={card.id} />;
                    })}
                </motion.div>
            </div>
        </section>
    );
};

const Card = ({ card }: { card: DeveloperEventType }) => {
    return (
        <div
            key={card.id}
            className="group relative h-[450px] w-[450px] overflow-hidden rounded-2xl group"
        >
            <div
                style={{
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
            ></div>
            <div className="absolute hidden group-hover:grid inset-0 z-10 place-content-stretch w-full transition-transform duration-300">
                <div className="bg-gradient-to-br from-card to-white/0 p-8 font-black uppercase text-accent backdrop-blur-lg flex flex-col">
                    <h3 className="text-3xl flex-grow font-semibold text-white">{card.title}</h3>
                    <div className="flex items-center text-lg font-medium text-white mt-4">
                        <Calendar className="mr-2" />{card.date}
                    </div>
                    <div className="flex items-center text-lg font-medium text-white mt-2">
                        <MapPin className="mr-2" />{card.venue}
                    </div>
                </div>
            </div>
        </div>
    );
};