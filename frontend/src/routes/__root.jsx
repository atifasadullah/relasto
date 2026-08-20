import Footer from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import z from "zod";

const rootSearchSchema = z.object({
    page: z.number().catch(1),
    limit: z.number().catch(10),
});

export const Route = createRootRoute({
    validateSearch: (search) => rootSearchSchema.parse(search),
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}
