// import { IconBath, IconBed, IconMapPin } from "@tabler/icons-react";
import { IconHomeSearch } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Cards } from "./Cards";

export default function FeaturedProperties() {
    return (
        <section className="m-10 flex flex-col gap-6">
            <div className=" flex flex-col gap-2">
                <p className="text-primary uppercase text-sm font-bold">
                    Featured Properties
                </p>
                <h3 className="font-heading text-3xl">Homes You'll Fall For</h3>
                <p className="text-muted-foreground">
                    A curated glimpse — thousands more waiting for you.
                </p>
            </div>
            <Cards />
            <Separator />
            <div className="flex justify-between">
                <p className="text-muted-foreground">
                    Showing 6 of 12,400+ active listings across 200 cities
                </p>
                <Button>
                    Browse Properties <IconHomeSearch />
                </Button>
            </div>
        </section>
    );
}
