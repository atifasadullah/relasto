import {
    IconSearch,
    IconSparkles,
    IconMapPin,
    IconHome2,
    IconMoneybag,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";

const selectData = [
    {
        list: [
            { label: "House", value: "house" },
            { label: "Apartment", value: "apartment" },
            { label: "Villa", value: "villa" },
            { label: "Penthouse", value: "penthouse" },
            { label: "Townhouse", value: "townhouse" },
            { label: "Office", value: "office" },
            { label: "Shop", value: "shop" },
            { label: "Land", value: "land" },
        ],
        placeholder: "Property Type",
        icon: <IconHome2 className="text-primary" />,
    },
    {
        list: [
            { label: "Under $50K", value: "0-50000" },
            { label: "$50K - $100K", value: "50000-100000" },
            { label: "$100K - $250K", value: "100000-250000" },
            { label: "$250K - $500K", value: "250000-500000" },
            { label: "$500K - $1M", value: "500000-1000000" },
            { label: "$1M+", value: "1000000+" },
        ],
        placeholder: "Budget",
        icon: <IconMoneybag className="text-primary" />,
    },
];
export function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-background">
            <div className="pointer-events-none absolute top-0 right-0 h-75 w-75 -translate-y-1/4 translate-x-1/4 rounded-full bg-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-75 w-75 translate-y-1/4 -translate-x-1/4 rounded-full bg-primary/20 blur-3xl" />
            <div className="w-full h-3 bg-primary" />

            <div className="relative flex flex-col gap-8 items-center justify-center px-4 pt-28 pb-20 text-center">
                <Badge variant="light">
                    <IconSparkles className="h-3.5 w-3.5" />
                    Premium Real Estate Platform
                </Badge>
                <div className="flex flex-col justify-center place-items-center">
                    <h1 className="max-w-3xl text-balance text-7xl font-bold leading-[1.1] tracking-tight font-heading">
                        Discover Your
                        <span className="relative mx-4 inline-block">
                            <span className="relative z-10 text-primary">
                                Dream
                            </span>
                            <span className="absolute bottom-1 left-0 z-0 h-3 w-full rounded bg-primary/15" />
                        </span>
                        Property
                    </h1>
                    <p className="mt-5 max-w-lg text-balance text-base leading-relaxed text-muted-foreground text-center">
                        Curated collections of exclusive homes, estates, and
                        investment opportunities across premier global
                        locations.
                    </p>
                </div>
                <div>
                    <Tabs defaultValue="buy" className="mt-10">
                        <TabsList>
                            <TabsTrigger value="buy">Buy</TabsTrigger>
                            <TabsTrigger value="rent">Rent</TabsTrigger>
                            <TabsTrigger value="sell">Sell</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="mt-3 flex w-full max-w-4xl items-center overflow-hidden rounded-xl border border-border bg-card shadow-lg shadow-black/5 gap-8 p-5">
                        <div className="flex flex-1 items-center gap-2.5">
                            <IconMapPin className="text-primary" />
                            <Input
                                placeholder="Search location..."
                                className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                        <Separator orientation="vertical" />
                        {selectData.map((current) => (
                            <>
                                <div className="flex items-center gap-2.5">
                                    {current.icon}
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={
                                                    current.placeholder
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {current.list.map(
                                                (propertyType) => (
                                                    <SelectItem
                                                        value={
                                                            propertyType.value
                                                        }
                                                    >
                                                        {propertyType.label}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {current.placeholder == "Property Type" && (
                                    <Separator orientation="vertical" />
                                )}
                            </>
                        ))}
                        <div className="pr-1.5">
                            <Button size="lg">
                                Search
                                <IconSearch className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
