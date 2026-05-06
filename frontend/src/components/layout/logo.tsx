import * as React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  variant?: "full" | "icon" | "wordmark";
}

export function ProFlowLogo({
  size = 32,
  variant = "full",
  className,
  ...props
}: LogoProps) {
  const scale = size / 32;
  const textSize = variant === "icon" ? 0 : 14;
  const width = variant === "icon" ? size : size * 3.5 + textSize * 5;

  return (
    <svg
      width={width}
      height={size}
      viewBox={`0 0 ${width / scale} ${32}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* Icon: Stylized P with flow lines */}
      <g transform={`scale(${scale})`}>
        {/* Flow background */}
        <path
          d="M6 8C6 5.79086 7.79086 4 10 4H18C20.2091 4 22 5.79086 22 7V10C22 12.2091 20.2091 14 18 14H12C9.79086 14 8 15.7909 8 18V24C8 26.2091 9.79086 28 12 28H22"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-primary/30"
        />
        {/* Main P shape */}
        <path
          d="M8 4H16C19.3137 4 22 6.68629 22 10C22 13.3137 19.3137 16 16 16H8V4Z"
          fill="currentColor"
          className="text-primary"
        />
        <rect
          x="4"
          y="2"
          width="4"
          height="28"
          rx="2"
          fill="currentColor"
          className="text-primary"
        />
        {/* Flow arrow */}
        <path
          d="M18 20L22 24L18 28"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        />
        <path
          d="M14 24H22"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="text-primary"
        />
      </g>

      {/* Wordmark */}
      {variant !== "icon" && (
        <text
          x={variant === "full" ? 38 : 0}
          y={22}
          fill="currentColor"
          className="text-foreground font-bold"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: textSize,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          {variant === "full" && "Pro"}
          <tspan fill="currentColor" className="text-primary">
            Flow
          </tspan>
        </text>
      )}
    </svg>
  );
}

export function ProFlowLogoMinimal({
  size = 32,
  className,
  ...props
}: Omit<LogoProps, "variant">) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect
        width="32"
        height="32"
        rx="8"
        fill="currentColor"
        className="text-primary"
      />
      <path
        d="M10 8H18C20.2091 8 22 9.79086 22 12C22 14.2091 20.2091 16 18 16H10V8Z"
        fill="white"
        fillOpacity="0.9"
      />
      <rect
        x="8"
        y="8"
        width="3"
        height="16"
        rx="1.5"
        fill="white"
        fillOpacity="0.9"
      />
      <path
        d="M14 20L18 24L14 28"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 24H18"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ProFlowLogoAbstract({
  size = 32,
  className,
  ...props
}: Omit<LogoProps, "variant">) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient
          id="proflow-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="currentColor" className="text-primary" />
          <stop
            offset="100%"
            stopColor="currentColor"
            className="text-accent"
          />
        </linearGradient>
      </defs>
      {/* Hexagon base */}
      <path
        d="M24 4L42 14V34L24 44L6 34V14L24 4Z"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
        className="text-primary"
      />
      {/* Flow lines */}
      <path
        d="M16 18H24C26.2091 18 28 19.7909 28 22C28 24.2091 26.2091 26 24 26H16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-primary"
      />
      <path
        d="M20 22L24 22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-primary"
      />
      <path
        d="M28 22H32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-primary/70"
      />
    </svg>
  );
}
