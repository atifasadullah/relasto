import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { AppLogo } from "./logo";

// Hamburger icon component with animated path states
const HamburgerIcon = ({ className, ...props }) => (
    <svg
        aria-label="Toggle Menu"
        className={cn("pointer-events-none", className)}
        fill="none"
        height={16}
        role="img"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width={16}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
            d="M4 12L20 12"
        />
        <path
            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
            d="M4 12H20"
        />
        <path
            className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
            d="M4 12H20"
        />
    </svg>
);

const defaultNavigationLinks = [
    { to: "/", label: "Home" },
    { to: "/properties", label: "Properties" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About" },
];

export const Navbar = React.forwardRef(
    (
        {
            className,
            logo = <AppLogo />,
            logoHref = "/",
            navigationLinks = defaultNavigationLinks,
            signInText = "Sign In",
            signInHref = "/signin",
            ctaText = "Get Started",
            ctaHref = "/get-started",
            onSignInClick,
            onCtaClick,
            ...props
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <header
                ref={ref}
                className={cn(
                    "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6",
                    className
                )}
                {...props}
            >
                <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
                    {/* Left side: Logo & Navigation */}
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Trigger */}
                        <div className="md:hidden">
                            <Popover open={isOpen} onOpenChange={setIsOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                                        size="icon"
                                        variant="ghost"
                                    >
                                        <HamburgerIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    align="start"
                                    className="w-48 p-2 mt-2"
                                >
                                    <NavigationMenu className="max-w-none w-full">
                                        <NavigationMenuList className="flex-col items-start gap-1 w-full">
                                            {navigationLinks.map(
                                                (link, index) => (
                                                    <NavigationMenuItem
                                                        className="w-full"
                                                        key={index}
                                                    >
                                                        <Link
                                                            to={link.to}
                                                            onClick={() =>
                                                                setIsOpen(false)
                                                            }
                                                            activeProps={{
                                                                className:
                                                                    "bg-accent text-accent-foreground font-semibold",
                                                            }}
                                                            inactiveProps={{
                                                                className:
                                                                    "text-foreground/80 hover:text-foreground",
                                                            }}
                                                            className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground no-underline"
                                                        >
                                                            {link.label}
                                                        </Link>
                                                    </NavigationMenuItem>
                                                )
                                            )}
                                        </NavigationMenuList>
                                    </NavigationMenu>
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Logo */}
                        <Link
                            to={logoHref}
                            className="flex items-center space-x-2 text-primary hover:text-primary/90 transition-colors no-underline"
                        >
                            <div className="text-2xl">{logo}</div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6">
                            <NavigationMenu>
                                <NavigationMenuList className="gap-1">
                                    {navigationLinks.map((link, index) => (
                                        <NavigationMenuItem key={index}>
                                            <Link
                                                to={link.to}
                                                activeProps={{
                                                    className:
                                                        "bg-accent text-accent-foreground font-semibold",
                                                }}
                                                inactiveProps={{
                                                    className:
                                                        "text-foreground/80 hover:text-foreground",
                                                }}
                                                className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 no-underline"
                                            >
                                                {link.label}
                                            </Link>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>

                    {/* Right side: Auth Action Buttons */}
                    <div className="flex items-center gap-3">
                        {onSignInClick ? (
                            <Button
                                className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                onClick={onSignInClick}
                                size="sm"
                                variant="ghost"
                            >
                                {signInText}
                            </Button>
                        ) : (
                            <Button
                                asChild
                                className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                size="sm"
                                variant="ghost"
                            >
                                <Link to={signInHref}>{signInText}</Link>
                            </Button>
                        )}

                        {onCtaClick ? (
                            <Button
                                className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                                onClick={onCtaClick}
                                size="sm"
                            >
                                {ctaText}
                            </Button>
                        ) : (
                            <Button
                                asChild
                                className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                                size="sm"
                            >
                                <Link to={ctaHref}>{ctaText}</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </header>
        );
    }
);

Navbar.displayName = "Navbar";

export { AppLogo, HamburgerIcon };
