import {
    IconArrowsUpDown,
    IconHome,
    IconLocation,
    IconSearch,
    IconSparkles,
} from "@tabler/icons-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "../ui/input-group";

const inputs = [
    {
        icon: <IconLocation />,
        placeholder: "Location",
    },
    {
        icon: <IconHome />,
        placeholder: "Property type",
    },
    {
        icon: <IconArrowsUpDown />,
        placeholder: "Range",
    },
];
const triggers = ["Buy", "Rent", "Lease"];
export function HeroSection() {
    return (
        <section className="flex justify-center place-items-center m-10">
            <div className="flex flex-col place-content-center items-center gap-10">
                <Badge variant="light">
                    <IconSparkles />
                    Premium Real Estate Platform
                </Badge>
                <h1 className="text-7xl font-heading font-bold text-center">
                    Discover Your Dream <br /> Property
                </h1>
                <h2 className="text-lg font-sans text-center text-muted-foreground">
                    Explore the world's finest luxury real estate. Curated
                    collections of exclusive homes, estates, <br /> and
                    investment opportunities across premier global locations.
                </h2>
                <div className="flex flex-col justify-between gap-2 rounded-lg w-xl border border-primary/10 focus-within:border-primary p-5">
                    <Tabs defaultValue="Buy">
                        <TabsList>
                            {triggers.map((curEle) => (
                                <TabsTrigger value={curEle}>
                                    {curEle}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>
                    <Separator />
                    <div className="flex gap-3 text-center justify-center place-items-center">
                        {inputs.map((input) => (
                            <InputGroup>
                                <InputGroupInput
                                    placeholder={input.placeholder}
                                />
                                <InputGroupAddon>{input.icon}</InputGroupAddon>
                            </InputGroup>
                        ))}
                    </div>
                    <Button>
                        Search <IconSearch />
                    </Button>
                </div>
            </div>
        </section>
    );
}
