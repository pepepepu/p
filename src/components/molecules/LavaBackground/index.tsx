import gsap from "gsap";
import { useEffect, useRef } from "react";
import { theme } from "../../../styles/Theme/theme";

const LavaBackground = () => {
  const lavaRef = useRef(null);

  useEffect(() => {
    const blobs = gsap.utils.toArray(".blob", lavaRef.current) as HTMLElement[];

    blobs.forEach((blob) => {
      gsap.to(blob, {
        x: () => gsap.utils.random(-300, window.innerWidth + 300),
        y: () => gsap.utils.random(-300, window.innerHeight + 300),
        scale: () => gsap.utils.random(0.5, 2),
        duration: () => gsap.utils.random(15, 30),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: () => gsap.utils.random(-20, 0),
      });
    });

    return () => {
      gsap.killTweensOf(blobs);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        backgroundColor: theme.colors.background,
      }}
    >
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="30" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  
                    0 1 0 0 0  
                    0 0 1 0 0  
                    0 0 0 30 -15"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      <div
        ref={lavaRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          filter: "url(#goo)",
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="blob"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "25vw",
              height: "25vw",
              minWidth: "200px",
              minHeight: "200px",
              backgroundColor: theme.colors.black,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backdropFilter: "blur(10px)",
        }}
      />

      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.15,
          mixBlendMode: "overlay",
        }}
      >
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.1"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
};

export default LavaBackground;
