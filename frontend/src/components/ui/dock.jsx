"use client";

import React, { useRef } from "react";
import { cva } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

const DEFAULT_SIZE = 48;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 150;
const DEFAULT_DISABLEMAGNIFICATION = false;

// Upgraded with a premium glassmorphism aesthetic and clean geometry
const dockVariants = cva(
    "fixed top-8 left-1/2 -translate-x-1/2 mx-auto flex h-[72px] w-max items-center justify-center gap-3 rounded-3xl border border-white/60 bg-white/30 p-3 shadow backdrop-blur-xl transition dark:border-white/10 dark:bg-black/30 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 z-50"
);

const Dock = React.forwardRef(
    (
        {
            className,
            children,
            iconSize = DEFAULT_SIZE,
            iconMagnification = DEFAULT_MAGNIFICATION,
            disableMagnification = DEFAULT_DISABLEMAGNIFICATION,
            iconDistance = DEFAULT_DISTANCE,
            direction = "middle",
            ...props
        },
        ref
    ) => {
        const mouseX = useMotionValue(Infinity);

        const renderChildren = () => {
            return React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === DockIcon) {
                    return React.cloneElement(child, {
                        ...child.props,
                        mouseX: mouseX,
                        size: iconSize,
                        magnification: iconMagnification,
                        disableMagnification: disableMagnification,
                        distance: iconDistance,
                    });
                }
                return child;
            });
        };

        return (
            <motion.div
                ref={ref}
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                {...props}
                style={{
                    left: "calc(50% - var(--removed-body-scroll-bar-size, 0px) / 2)",
                    ...props.style,
                }}
                className={cn(dockVariants({ className }), {
                    "items-start": direction === "top",
                    "items-center": direction === "middle",
                    "items-end": direction === "bottom",
                })}
            >
                {renderChildren()}
            </motion.div>
        );
    }
);

Dock.displayName = "Dock";

const DockIcon = ({
    size = DEFAULT_SIZE,
    magnification = DEFAULT_MAGNIFICATION,
    disableMagnification,
    distance = DEFAULT_DISTANCE,
    mouseX,
    className,
    children,
    ...props
}) => {
    const ref = useRef(null);
    const padding = Math.max(8, size * 0.15);

    // Calculate distance directly from the center of the icon
    const distanceCalc = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: 0,
        };
        return val - bounds.x - bounds.width / 2;
    });

    // Fluid linear mapping based on cursor proximity
    const sizeTransform = useTransform(
        distanceCalc,
        [-distance, 0, distance],
        [size, disableMagnification ? size : magnification, size]
    );

    // Tuned physics for macOS-like fluidity
    const scaleSize = useSpring(sizeTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    return (
        <motion.div
            ref={ref}
            style={{
                width: scaleSize,
                height: scaleSize,
                padding,
            }}
            className={cn(
                "relative flex aspect-square cursor-pointer items-center justify-center rounded-2xl will-change-transform",
                "bg-white/50 shadow-sm transition-colors duration-200 hover:bg-white/80 dark:bg-white/5 dark:hover:bg-white/10",
                disableMagnification &&
                    "transition-transform duration-200 hover:scale-105",
                className
            )}
            {...props}
        >
            <div className="flex h-full w-full items-center justify-center transition-transform duration-200 ease-out">
                {children}
            </div>
        </motion.div>
    );
};
DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
