import { IconBrandGoogleHome } from "@tabler/icons-react";
import { Separator } from "./separator";
const footer = [
    {
        heading: "Quick Links",
        quickLinks: [
            "Buy a Home",
            "Rent a Home",
            "Sell a Home",
            "Find an Agent",
        ],
    },
    {
        heading: "Property Types",
        quickLinks: ["Houses", "Apartments", "Condos", "Townhomes", "Land"],
    },
    {
        heading: "Contact",
        quickLinks: ["support@gmail.com", "+1 (800) 555-0199"],
    },
];
export default function Footer() {
    return (
        <footer className="m-6 md:m-10 grid gap-5">
            <Separator />
            <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-5">
                <div>
                    <span className="w-fit font-heading flex gap-2 text-2xl text-primary justify-center place-items-center">
                        <IconBrandGoogleHome />
                        <p>Relasto</p>
                    </span>
                    <p className="text-muted-foreground max-w-sm mt-2 text-sm md:text-base">
                        Find Your Perfect Place. Browse thousands of verified
                        listings and move with confidence.
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                    {footer.map((footerSection, index) => (
                        <div key={index}>
                            <p className="font-heading font-semibold">{footerSection.heading}</p>
                            <ul className="my-4 ml-4 text-muted-foreground [&>li]:mt-2 text-sm md:text-base">
                                {footerSection.quickLinks.map((quickLink, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a
                                            href="#"
                                            className="font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary"
                                        >
                                            {quickLink}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <span className="pointer-events-none bg-linear-to-b from-primary to-white bg-clip-text text-left lg:text-center text-6xl sm:text-8xl leading-none font-heading font-semibold whitespace-pre-wrap text-transparent dark:from-white dark:to-slate-900/10 self-start lg:self-end">
                    Relasto
                </span>
            </div>
            <Separator />
            <p className="text-accent-foreground text-sm">
                © 2026 Relasto. All rights reserved.
            </p>
        </footer>
    );
}
