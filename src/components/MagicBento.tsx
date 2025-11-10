// src/components/MagicBento.tsx
import React, { useRef, useEffect } from "react";
import "./MagicBento.css";

interface MagicBentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  glowColor?: string;
  children?: React.ReactNode;
}

export default function MagicBento({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  spotlightRadius = 300,
  particleCount = 12,
  glowColor = "132, 0, 255",
  children,
}: MagicBentoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enableStars || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const particles: any[] = [];

    canvas.width = containerRef.current.offsetWidth;
    canvas.height = containerRef.current.offsetHeight;

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.5,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = containerRef.current!.offsetWidth;
      canvas.height = containerRef.current!.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [enableStars, particleCount]);

  return (
    <div
      ref={containerRef}
      className={`
        magic-bento
        ${enableSpotlight ? "spotlight" : ""}
        ${enableBorderGlow ? "border-glow" : ""}
        ${enableTilt ? "tilt" : ""}
        ${enableMagnetism ? "magnet" : ""}
        ${clickEffect ? "click-effect" : ""}
      `}
      style={{
        "--spotlight-radius": `${spotlightRadius}px`,
        "--glow-color": glowColor,
      } as React.CSSProperties}
    >
      {enableStars && <canvas ref={canvasRef} className="stars-canvas" />}
      <div className="bento-content">
        {children || (
          <div className={`bento-text ${textAutoHide ? "auto-hide" : ""}`}>
            <h2>Powerframe</h2>
            <p>Your ultimate dashboard</p>
          </div>
        )}
      </div>
    </div>
  );
}