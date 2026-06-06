import CountUp from "../CountUp";

const numbers = [
    {
        to: 12,
        value: "K+",
        label: "Premium Properties",
    },
    {
        to: 98,
        value: "%",
        label: "Client Satisfaction",
    },
    {
        to: 4.2,
        value: "B$",
        label: "Property Value",
    },
    {
        to: 50,
        value: "+",
        label: "Global Markets",
    },
];
export default function TrustSection() {
    return (
        <section className="bg-primary text-accent flex flex-col gap-4 text-center p-10 font-heading  mb-10">
            <h3 className="text-4xl">Trusted by Thousands</h3>
            <p className="font-sans text-secondary">
                Our numbers speak for themselves
            </p>
            <div className="flex justify-around gap-5">
                {numbers.map((num) => {
                    return (
                        <div className="text-center">
                            <div className="flex">
                                <CountUp to={num.to} className="text-3xl" />
                                <p className="text-3xl font-extralight">
                                    {num.value}
                                </p>
                            </div>
                            <p className="font-sans text-secondary">
                                {num.label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
