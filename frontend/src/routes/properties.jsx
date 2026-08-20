import { PropertyCard } from "@/components/Property/Card";
import { SkeletonCard } from "@/components/Property/skeleton-card";
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
    const { data: response, isLoading } = useQuery({
        queryKey: ["properties"],
        queryFn: fetchProperties,
    });
    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {isLoading
                ? Array.from({ length: 10 }).map((_, index) => (
                      <SkeletonCard key={index} />
                  ))
                : response?.data?.results?.map((currElem, i) => (
                      <PropertyCard key={i} item={currElem} />
                  ))}
        </div>
    );
}
