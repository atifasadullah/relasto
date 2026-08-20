import Footer from "@/components/ui/Footer";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/ui/navbar";

export const Route = createRootRoute({
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
