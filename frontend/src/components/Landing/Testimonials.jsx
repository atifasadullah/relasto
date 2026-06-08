import { IconStar } from "@tabler/icons-react";
import { Card, CardContent } from "../ui/card";
import LogoLoop from "../ui/LogoLoop";

const testimonials = [
    {
        id: 1,
        rating: 5,
        quote: "Relasto made finding our family home effortless. The listings were accurate and the agents were genuinely helpful.",
        name: "Sarah Mitchell",
        image: "https://i.pravatar.cc/150?img=47",
    },
    {
        id: 2,
        rating: 5,
        quote: "I rented my apartment in under a week. The search tools are intuitive and everything was verified — no surprises.",
        name: "James Carter",
        image: "https://i.pravatar.cc/150?img=12",
    },
    {
        id: 3,
        rating: 5,
        quote: "Selling through Relasto was smooth from start to finish. I felt informed and supported at every single step.",
        name: "Elena Rodriguez",
        image: "https://i.pravatar.cc/150?img=32",
    },
    {
        id: 4,
        rating: 5,
        quote: "The platform helped me compare properties quickly and connect with trusted agents in my area.",
        name: "David Thompson",
        image: "https://i.pravatar.cc/150?img=15",
    },
    {
        id: 5,
        rating: 4,
        quote: "As a first-time buyer, I appreciated the transparency and guidance throughout the process.",
        name: "Sophia Walker",
        image: "https://i.pravatar.cc/150?img=20",
    },
    {
        id: 6,
        rating: 5,
        quote: "Every listing I viewed matched the details provided. It saved me a lot of time and effort.",
        name: "Michael Brown",
        image: "https://i.pravatar.cc/150?img=53",
    },
    {
        id: 7,
        rating: 5,
        quote: "Relasto made house hunting enjoyable. The filters were powerful and easy to use.",
        name: "Emma Wilson",
        image: "https://i.pravatar.cc/150?img=5",
    },
    {
        id: 8,
        rating: 4,
        quote: "I found a great rental property within days. The experience was much better than other platforms.",
        name: "Daniel Lee",
        image: "https://i.pravatar.cc/150?img=11",
    },
    {
        id: 9,
        rating: 5,
        quote: "Excellent customer support and verified listings gave me confidence throughout the search.",
        name: "Olivia Martinez",
        image: "https://i.pravatar.cc/150?img=24",
    },
    {
        id: 10,
        rating: 5,
        quote: "The scheduling feature made it easy to arrange property visits around my busy work schedule.",
        name: "Ethan Johnson",
        image: "https://i.pravatar.cc/150?img=14",
    },
    {
        id: 11,
        rating: 5,
        quote: "I sold my property faster than expected and received great support from start to finish.",
        name: "Ava Garcia",
        image: "https://i.pravatar.cc/150?img=44",
    },
    {
        id: 12,
        rating: 4,
        quote: "Clean interface, reliable information, and a smooth experience overall. Highly recommended.",
        name: "Noah Anderson",
        image: "https://i.pravatar.cc/150?img=18",
    },
];

function Testimonials() {
    return (
        <section className="my-10 p-10 flex flex-col gap-6 bg-secondary">
            <div className=" flex flex-col gap-2 text-center">
                <p className="text-primary uppercase text-sm font-bold">
                    Testimonials
                </p>
                <h3 className="font-heading text-3xl">What Our Clients Say</h3>
            </div>
            <LogoLoop
                items={testimonials}
                speed={80}
                gap={24}
                pauseOnHover
                fadeOut
                renderItem={(testimonial) => (
                    <Card className="w-87.5">
                        <CardContent className="flex flex-col gap-4 p-6">
                            <div className="flex gap-1">
                                {Array.from({
                                    length: testimonial.rating,
                                }).map((_, i) => (
                                    <IconStar
                                        key={i}
                                        className="size-4 fill-current text-primary"
                                    />
                                ))}
                            </div>

                            <p className="italic font-heading">
                                "{testimonial.quote}"
                            </p>

                            <div className="flex items-center gap-3">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="size-12 rounded-full"
                                />

                                <p className="font-medium">
                                    {testimonial.name}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            />
        </section>
    );
}

export default Testimonials;
