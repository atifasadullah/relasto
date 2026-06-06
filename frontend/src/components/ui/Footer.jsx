// import { IconBrandGoogleHome } from "@tabler/icons-react";

import { Separator } from "./separator";

export default function Footer() {
    return (
        <footer className="m-10 flex flex-col gap-5">
            <Separator />
            <div className="flex justify-between">
                <p className="text-muted-foreground">
                    Your trusted partner in luxury real estate since 2015.
                </p>
                <h3 className="font-heading lg:text-9xl text-bold bg-linear-to-r from-primary to-black text-transparent bg-clip-text">
                    Relasto
                </h3>
            </div>
            <Separator />
            <p className="text-accent-foreground">
                © 2026 Relasto. All rights reserved. Built with precision and
                care.
            </p>
        </footer>
    );
}
