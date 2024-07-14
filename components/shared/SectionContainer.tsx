export default function SectionContainer({ id, title, subtitle, children }: Readonly<
    {
        id: string;
        title: string;
        subtitle?: string;
        children: React.ReactNode;
    }
>) {
    return (
        <section id={id} className="w-full">
            <div className="container px-4 md:px-6 rounded-lg py-4 md:py-8 lg:py-16 p-2">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            {title}
                        </h2>
                        <p className="max-w-[900px] text-card-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            {subtitle}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mx-auto">
                {children}
            </div>
        </section>
    );
}