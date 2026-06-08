import Footer from "@/components/ui/Footer";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
    IconBrandGoogleHome,
    IconHome,
    IconUserPentagon,
} from "@tabler/icons-react";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <Dock>
                <DockIcon>
                    <IconHome className="text-primary" stroke={1.2} />
                </DockIcon>
                <DockIcon>
                    <IconBrandGoogleHome
                        className="text-primary"
                        stroke={1.2}
                    />
                </DockIcon>
                <DockIcon>
                    <IconUserPentagon className="text-primary" stroke={1.2} />
                </DockIcon>
            </Dock>
            <Outlet />
            <Footer />
        </>
    );
}
