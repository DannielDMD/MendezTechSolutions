import { useEffect, useRef } from "react";

export default function AbstractDesign() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;

    type StartType = { x: number; y: number; size: number };

    const stars: StartType[] = [];
    for (let i = 0; i < 40; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
      });
    }

    const drawStar = (x: number, y: number, size: number) => {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        drawStar(star.x, star.y, star.size);
        star.x += 0.1; // Reduced speed
        if (star.x > canvas.height) {
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const createVerticalDottedLines = (
    x: number,
    y: number,
    width: number,
    height: number,
    gap: number,
  ) => {
    const lines = [];
    for (let i = 0; i <= width; i += gap) {
      lines.push(
        <line
          key={i}
          x1={x + i}
          y1={y}
          x2={x + i}
          y2={y + height}
          strokeWidth="1"
          className="stroke-black dark:stroke-white"
          strokeDasharray="2 4"
          opacity="0.5"
        />,
      );
    }
    return lines;
  };

  return (
    <div className="left-[70%] relative w-[54%] h-full bg-transparent overflow-hidden">
      <style>{`
        @keyframes slowStart {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .animate-slow-start {
          animation: slowStart 3s cubic-bezier(.22,.61,.36,1)  forwards;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
        }

        .curve-3d-effect {
          filter: drop-shadow(0 10px 5px rgba(255, 255, 255, 0.2));
        }
      `}</style>
      <svg viewBox="0 0 900 900" className="absolute inset-0 w-full h-full">
        <circle cx="500" cy="100" r="120" fill="none" stroke="none" />
        <clipPath id="circle-clip">
          <circle cx="500" cy="100" r="120" />
        </clipPath>
        <g clipPath="url(#circle-clip)">
          {createVerticalDottedLines(380, -40, 240, 240, 10)}
        </g>
      </svg>
      <svg
        viewBox="0 0 600 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <g className="curve-3d-effect">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff69b4" />
              <stop offset="100%" stopColor="#8a2be2" />
            </linearGradient>
            <filter id="innerShadow" filterUnits="userSpaceOnUse">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />

              <feOffset dy="8" dx="8" />

              <feComposite
                in2="SourceAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
                result="shadowDiff"
              />

              <feFlood floodColor="#000" floodOpacity="0.85" />

              <feComposite in2="shadowDiff" operator="in" />

              <feComposite in2="SourceGraphic" operator="over" />
            </filter>
          </defs>
          <path
            d="M50,300 Q150,50 250,250 T400,200 T550,150"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="80"
            strokeLinecap="round"
            className="animate-slow-start"
            filter="url(#innerShadow)"
            style={{ animationDelay: "1s" }}
          />
        </g>

        <circle cx="30" cy="70" r="20" fill="#ff69b4" />
        <circle cx="80" cy="50" r="12" fill="#ff69b4" />
      </svg>
    </div>
  );
}
