import {
    IconArrowRight,
    IconCircleCheck,
    IconHomeSearch,
} from "@tabler/icons-react";
import { Button } from "../ui/button";

const qualities = ["No hidden fees", "Expert guidance", "Premium support"];
function CTASection() {
    return (
        <section className="w-full p-10 mb-10 flex justify-center place-items-center">
            <div className="bg-primary-foreground rounded-2xl border border-primary p-6 text-center flex flex-col gap-14 max-w-fit">
                <div>
                    <h3 className="font-heading text-4xl font-bold">
                        Ready to Find Your Dream Home?
                    </h3>
                    <p className="pt-4 text-lg text-muted-foreground">
                        Join thousands of satisfied clients who found their
                        perfect property with Relasto
                    </p>
                </div>
                <div className="flex gap-10 justify-center">
                    {qualities.map((quality) => (
                        <div className="flex gap-2">
                            <IconCircleCheck className="text-primary" />
                            <p>{quality}</p>
                        </div>
                    ))}
                </div>
                <div className="flex gap-4 justify-center">
                    <Button size="lg">
                        Sign Up <IconArrowRight />
                    </Button>
                    <Button variant="outline" size="lg">
                        Browse Properties <IconHomeSearch />
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default CTASection;
