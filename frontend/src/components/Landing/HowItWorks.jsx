import { IconCalendar, IconKey, IconSearch } from "@tabler/icons-react";

const cards = [
    {
        id: 1,
        icon: <IconSearch />,
        title: "Search & Filter",
        description:
            "Explore verified listings and narrow down by location, price, and property type.",
    },
    {
        id: 2,
        icon: <IconCalendar />,
        title: "Schedule a Visit",
        description:
            "Book a tour with a trusted agent at a time that works best for your schedule.",
    },
    {
        id: 3,
        icon: <IconKey />,
        title: "Close the Deal",
        description:
            "Finalize paperwork with confidence and get the keys to your dream home.",
    },
];
function HowItWorks() {
    return (
        <section className="my-10 md:my-20 py-12 md:py-16 flex flex-col gap-8 md:gap-12 justify-center items-center">
            <div className="flex flex-col gap-2 text-center px-4">
                <p className="text-primary uppercase text-sm font-bold tracking-wider">
                    HOW IT WORKS
                </p>
                <h3 className="font-heading text-3xl md:text-4xl text-foreground">
                    Simple Steps to Your Dream Home
                </h3>
            </div>
            <div className="relative w-full max-w-6xl px-4">
                {/* Connecting dashed line - only visible on horizontal desktop layout */}
                <div className="hidden md:block absolute top-7 left-[16%] right-[16%] border-t border-dashed border-muted-foreground/30" />
                
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 text-center">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className="flex flex-col items-center gap-3"
                        >
                            <div className="w-fit rounded-lg bg-background p-3 shadow-md border border-border/50 text-primary">
                                {card.icon}
                            </div>

                            <p className="text-sm font-semibold text-primary/80">0{card.id}</p>
                            <h3 className="font-heading text-xl md:text-2xl text-foreground">
                                {card.title}
                            </h3>
                            <p className="px-6 sm:px-20 md:px-6 lg:px-12 text-sm text-muted-foreground leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
