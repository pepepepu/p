import { useState, useEffect } from "react";
import { theme } from "../styles/Theme/theme";

export const useDeviceType = () => {
  const mobileBreakpoint = parseInt(theme.breakpoints.sm);

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= mobileBreakpoint,
  );
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth > mobileBreakpoint,
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= mobileBreakpoint);
      setIsDesktop(width > mobileBreakpoint);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint]);

  return { isMobile, isDesktop };
};
