export function AppLogo({ className = "w-10 h-10" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 360 400"
            className={className}
        >
            <defs>
                <linearGradient
                    id="dynamicPrimary"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="var(--sidebar-primary)" />
                    <stop offset="100%" stopColor="var(--primary)" />
                </linearGradient>

                <linearGradient
                    id="dynamicAccent"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="var(--ring)" />
                    <stop offset="100%" stopColor="var(--primary)" />
                </linearGradient>
            </defs>

            <g>
                {/* Upper Stem & Loop */}
                <path
                    d="M 115 340 V 165 C 115 135 130 110 155 95 L 185 75 C 205 62 232 65 250 82 L 268 100 C 285 117 285 145 268 162 L 250 180 C 230 200 200 212 170 212 H 150 V 340 C 150 354 142 365 132.5 365 C 123 365 115 354 115 340 Z"
                    fill="url(#dynamicPrimary)"
                />

                {/* Lower Wave Leg */}
                <path
                    d="M 150 212 C 185 212 215 230 235 260 L 252 285 C 265 305 285 315 308 315 C 324 315 336 327 336 343 C 336 359 324 371 308 371 C 275 371 247 355 228 325 L 211 298 C 195 275 172 262 145 262 H 138 C 125 262 115 252 115 240 C 115 228 125 218 138 218 Z"
                    fill="url(#dynamicAccent)"
                />

                {/* Accent Tip Dot */}
                <circle
                    cx="308"
                    cy="343"
                    r="9"
                    fill="var(--primary-foreground)"
                    opacity="0.9"
                />
            </g>
        </svg>
    );
}
