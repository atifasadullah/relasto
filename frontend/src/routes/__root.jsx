import Dock from "@/components/Dock";
import Footer from "@/components/ui/Footer";
import {
    IconBookmark,
    IconHome,
    IconSettings,
    IconUser,
} from "@tabler/icons-react";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: RootComponent,
});

const items = [
    {
        icon: <IconHome color="white" />,
        label: "Home",
        onClick: () => alert("Home!"),
    },
    {
        icon: <IconBookmark color="white" />,
        label: "Profile",
        onClick: () => alert("Profile!"),
    },
    {
        icon: <IconUser color="white" />,
        label: "Profile",
        onClick: () => alert("Profile!"),
    },
    {
        icon: <IconSettings color="white" />,
        label: "Settings",
        onClick: () => alert("Settings!"),
    },
];
function RootComponent() {
    return (
        <>
            <div className="w-full h-10 bg-primary mb-10" />
            <Outlet />
            <Footer />
            {/* <Dock
                items={items}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
            /> */}
        </>
    );
}
