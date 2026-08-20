import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";

export function PropertyCard({ item }) {
    function getOriginalPicsumUrl(url) {
        if (!url) return "";
        const match = url.match(/\/media\/https%3A\/(picsum\.photos\/.+)$/);
        return match ? `https://${match[1]}` : url;
    }

    const images = item?.images || [];

    const statusMap = {
        L: {
            label: "For Lease",
            variant: "secondary",
            className:
                "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        },
        S: {
            label: "For Sale",
            variant: "default",
            className:
                "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
        },
        R: {
            label: "For Rent",
            variant: "outline",
            className:
                "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
        },
        A: {
            label: "Active",
            variant: "secondary",
            className:
                "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
        },
    };

    const typeMap = {
        I: "Industrial",
        C: "Commercial",
        R: "Residential",
        A: "Agricultural",
    };

    const formattedPrice = item?.price
        ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
          }).format(item.price)
        : null;

    const getFeatureHighlights = () => {
        const f = item?.features;
        if (!f) return null;

        const list = [];
        if (f.bedrooms !== undefined) list.push(`${f.bedrooms} Beds`);
        if (f.bathrooms !== undefined) list.push(`${f.bathrooms} Baths`);
        if (f.sqft !== undefined) list.push(`${f.sqft.toLocaleString()} sqft`);
        if (f.acres !== undefined) list.push(`${f.acres} Acres`);
        if (f.loading_docks !== undefined)
            list.push(`${f.loading_docks} Docks`);
        if (f.parking !== undefined) list.push(`${f.parking} Spots`);

        return list.slice(0, 3).join(" • ");
    };

    const statusInfo = statusMap[item?.status] || {
        label: item?.status,
        variant: "outline",
    };

    return (
        <Card className="overflow-hidden flex flex-col justify-between">
            <CardContent className="p-4 flex flex-col gap-3">
                {/* Image Grid */}
                <div className="flex flex-col gap-2">
                    {images[0] && (
                        <div>
                            <img
                                src={getOriginalPicsumUrl(images[0].image)}
                                alt={item?.title}
                                className="w-full aspect-4/3 object-cover rounded-lg"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    )}
                    {(images[1] || images[2]) && (
                        <div className="grid grid-cols-2 gap-2">
                            {images[1] && (
                                <img
                                    src={getOriginalPicsumUrl(images[1].image)}
                                    alt={item?.title}
                                    className="w-full aspect-4/3 object-cover rounded-lg"
                                    loading="lazy"
                                    decoding="async"
                                />
                            )}
                            {images[2] && (
                                <img
                                    src={getOriginalPicsumUrl(images[2].image)}
                                    alt={item?.title}
                                    className="w-full aspect-4/3 object-cover rounded-lg"
                                    loading="lazy"
                                    decoding="async"
                                />
                            )}
                        </div>
                    )}
                </div>

                {/* Status & Type Row */}
                <div className="flex items-center justify-between">
                    <Badge variant={"default"} className={statusInfo.className}>
                        {statusInfo.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                        {typeMap[item?.type] || item?.type}
                    </span>
                </div>

                {/* Main Content */}
                <div>
                    <p className="text-xl font-bold">{formattedPrice}</p>
                    <h3 className="font-semibold line-clamp-1">
                        {item?.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {item?.street}, {item?.city}, {item?.state} {item?.zip}
                    </p>
                </div>
            </CardContent>
            <CardFooter className="px-4 py-3 bg-muted/50 border-t text-xs text-muted-foreground font-medium">
                {getFeatureHighlights() || "No specs available"}
            </CardFooter>
        </Card>
    );
}
