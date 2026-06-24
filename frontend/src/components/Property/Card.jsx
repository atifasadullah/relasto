import { Card, CardContent, CardFooter } from "../ui/card";

export function PropertyCard({ item }) {
    return (
        <Card>
            <CardContent>
                <div className="overflow-hidden rounded-lg grid grid-cols-2 gap-3">
                    {item.images.map((imageObject, index) => (
                        <img
                            key={index}
                            src={imageObject.image}
                            alt={item.title}
                            className="w-full aspect-4/3 object-cover transition-transform duration-300 hover:scale-105 rounded-lg"
                            loading="lazy"
                            decoding="async"
                        />
                    ))}
                </div>
            </CardContent>
            <CardFooter>{item.title}</CardFooter>
        </Card>
    );
}
