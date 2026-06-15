import { PropertyCard } from "@/components/Property/Card";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/properties")({
    component: RouteComponent,
});

const PROPERTIES_URL = import.meta.env.VITE_API_BASE_URL;
const apiClient = axios.create({
    baseURL: PROPERTIES_URL,
});
const fetchProperties = () => {
    return apiClient.get("/properties");
};

function RouteComponent() {
    const { data: response } = useQuery({
        queryKey: ["properties"],
        queryFn: fetchProperties,
    });
    return (
        <div className="grid grid-cols-2 gap-4">
            {response?.data?.results.map((item, index) => {
                return <PropertyCard item={item} key={index} />;
            })}
        </div>
    );
}
