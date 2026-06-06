// import { IconBath, IconBed, IconMapPin } from "@tabler/icons-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";

const properties = [
    {
        id: 1,
        title: "Modern Family Home",
        price: 685000,
        location: "Austin, TX",
        beds: 3,
        baths: 2,
        sqft: 1850,
        type: "House",
        featured: true,
        image: "https://picsum.photos/600/400?random=1",
    },
    {
        id: 2,
        title: "Luxury Downtown Apartment",
        price: 920000,
        location: "New York, NY",
        beds: 2,
        baths: 2,
        sqft: 1400,
        type: "Apartment",
        featured: true,
        image: "https://picsum.photos/600/400?random=2",
    },
    {
        id: 3,
        title: "Cozy Lakeside Cottage",
        price: 450000,
        location: "Lake Tahoe, CA",
        beds: 2,
        baths: 1,
        sqft: 1200,
        type: "Cottage",
        featured: false,
        image: "https://picsum.photos/600/400?random=3",
    },
    {
        id: 4,
        title: "Elegant Beachfront Villa",
        price: 1850000,
        location: "Miami, FL",
        beds: 5,
        baths: 4,
        sqft: 4200,
        type: "Villa",
        featured: true,
        image: "https://picsum.photos/600/400?random=4",
    },
    {
        id: 5,
        title: "Suburban Dream House",
        price: 720000,
        location: "Dallas, TX",
        beds: 4,
        baths: 3,
        sqft: 2600,
        type: "House",
        featured: false,
        image: "https://picsum.photos/600/400?random=5",
    },
    {
        id: 6,
        title: "Urban Loft",
        price: 610000,
        location: "Chicago, IL",
        beds: 2,
        baths: 2,
        sqft: 1300,
        type: "Loft",
        featured: false,
        image: "https://picsum.photos/600/400?random=6",
    },
];
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
        </section>
    );
}

function Cards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
                <Card key={property.id}>
                    <CardContent>
                        <div className="overflow-hidden rounded-lg">
                            <img
                                src={property.image}
                                alt={property.title}
                                className="w-full aspect-4/3 object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <div className="w-full">
                            <h4 className="text-2xl font-heading">
                                ${property.price.toLocaleString()}
                            </h4>
                            <p>{property.title}</p>
                            <p className="text-muted-foreground">
                                {property.location}
                            </p>
                            <Separator className="my-3" />
                            <div className="flex gap-4">
                                <span>{property.beds} beds</span>
                                <span>{property.baths} baths</span>
                                <span>{property.sqft} sqft</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
