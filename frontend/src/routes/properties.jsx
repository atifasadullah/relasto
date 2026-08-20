import { PropertyCard } from "@/components/Property/Card";
import { SkeletonCard } from "@/components/Property/skeleton-card";
import { PaginationBar } from "@/components/ui/Pagination-Bar";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import z from "zod";

const propertySearchSchema = z.object({
    page: z.number().catch(1),
    limit: z.number().catch(10),
});

export const Route = createFileRoute("/properties")({
    validateSearch: (search) => propertySearchSchema.parse(search),
    component: RouteComponent,
});

const PROPERTIES_URL = import.meta.env.VITE_API_BASE_URL;
const apiClient = axios.create({
    baseURL: PROPERTIES_URL,
});

const fetchProperties = async (pageNum, limitNum) => {
    const { data } = await apiClient.get("/properties", {
        params: { page: pageNum, limit: limitNum },
    });
    return data;
};

function RouteComponent() {
    const { page, limit } = Route.useSearch();

    const { data, isLoading } = useQuery({
        queryKey: ["properties", page, limit],
        queryFn: () => fetchProperties(page, limit),
    });

    // Handle nested object response structures safely
    const properties = data?.results || data?.data?.results || [];
    const totalCount = data?.count || data?.data?.count || 0;

    return (
        <div className="px-4">
            <div className="grid grid-cols-2 gap-4 p-4">
                {isLoading
                    ? Array.from({ length: limit }).map((_, index) => (
                          <SkeletonCard key={index} />
                      ))
                    : properties.map((currElem, i) => (
                          <PropertyCard
                              key={currElem.id || i}
                              item={currElem}
                          />
                      ))}
            </div>
            <div className="p-4">
                <PaginationBar
                    currentPage={page}
                    pageSize={limit}
                    totalCount={totalCount}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
