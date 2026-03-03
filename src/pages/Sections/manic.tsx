import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Box, Text } from "../../components";
import { theme } from "../../styles/Theme/theme";
import { useDeviceType } from "../../hooks/useDeviceType";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: "aura",
    description:
      "Aura is a sonic reflection engine connected to your Last.fm data. Your listening history transforms into a living landscape of light, color, and emotion.",
    path: "M 10 90 L 50 10 L 90 90 Z",
    link: "https://github.com/pepepepu/aura",
  },
  {
    title: "media .",
    description:
      "media . A cultural identity hub that turns your Spotify, Last.fm, Letterboxd, and Pinterest data into a unified, real-time visual interface.",
    path: "M 10 50 Q 50 10 90 50 T 90 90",
    link: "https://www.behance.net/gallery/241873165/media-Cultural-Identity-Hub-Dashboard",
  },
];

const ProjectCard = ({
  project,
}: {
  project: (typeof projectsData)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { isMobile } = useDeviceType();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pathRef.current,
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            end: "center 40%",
            scrub: 1,
          },
        },
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    if (isMobile) return;
    gsap.to(cardRef.current, {
      scale: 0.96,
      duration: 0.4,
      ease: "power3.out",
    });
    gsap.to(pathRef.current, {
      strokeWidth: 4,
      filter: "drop-shadow(0px 0px 12px rgba(255,255,255,0.8))",
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(pathRef.current, {
      strokeWidth: 2,
      filter: "drop-shadow(0px 0px 0px rgba(255,255,255,0))",
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handleClick = () => {
    window.open(project.link, "_blank", "noopener,noreferrer");
  };

  return (
    <Box
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        aspectRatio: isMobile ? "auto" : "1 / 2",
        border: `1px solid ${theme.colors.background}`,
        display: "flex",
        flexDirection: isMobile ? "row" : "column",
        alignItems: isMobile ? "center" : "stretch",
        cursor: "pointer",
        overflow: "hidden",
        padding: isMobile ? "1rem" : "0",
        gap: isMobile ? "1rem" : "0",
      }}
    >
      <Box
        height={isMobile ? "60px" : "60%"}
        width={isMobile ? "60px" : "100%"}
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{
          borderBottom: isMobile
            ? "none"
            : `1px solid ${theme.colors.background}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: isMobile ? "100%" : "60%",
            height: isMobile ? "100%" : "60%",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            style={{ overflow: "visible" }}
          >
            <path
              ref={pathRef}
              d={project.path}
              fill="none"
              stroke={theme.colors.background}
              strokeWidth="2"
              strokeLinejoin="miter"
              strokeLinecap="square"
              pathLength="100"
              style={{ strokeDasharray: 100, strokeDashoffset: 100 }}
            />
          </svg>
        </div>
      </Box>

      <Box
        height={isMobile ? "auto" : "40%"}
        width="100%"
        padding={isMobile ? "0" : "1.5rem"}
        display="flex"
        flexDirection="column"
        justifyContent={isMobile ? "center" : "space-between"}
        gap={isMobile ? "0.5rem" : "0"}
      >
        <Text
          fontSize={isMobile ? "1.2rem" : "1.5rem"}
          fontFamily="Instrument Serif"
          style={{ textTransform: "uppercase" }}
        >
          {project.title}
        </Text>
        <Text
          fontSize={isMobile ? "0.85rem" : "1rem"}
          fontFamily="Instrument Serif"
          fontStyle={"italic"}
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: isMobile ? 2 : "none",
          }}
        >
          {project.description}
        </Text>
      </Box>
    </Box>
  );
};

const Manic = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceType();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card-wrapper");

      const tlIn = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });

      tlIn.fromTo(
        cards,
        { y: 150, opacity: 0, filter: "blur(15px)", scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          stagger: 0.05,
          ease: "power2.out",
        },
      );

      const tlOut = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 60%",
          end: "bottom 10%",
          scrub: 1,
        },
      });

      tlOut.to(cards, {
        y: -150,
        opacity: 0,
        filter: "blur(15px)",
        scale: 0.9,
        stagger: 0.05,
        ease: "power2.in",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      width="100%"
      minHeight="100dvh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="10vh 0"
      style={{ mixBlendMode: "difference", color: theme.colors.background }}
    >
      <Box
        ref={gridRef}
        width="90vw"
        display={isMobile ? "flex" : "grid"}
        flexDirection={isMobile ? "column" : "row"}
        style={{
          gridTemplateColumns: isMobile ? "none" : "repeat(6, 1fr)",
          gap: isMobile ? "1rem" : "1.5vw",
        }}
      >
        {projectsData.map((project, index) => (
          <div key={index} className="project-card-wrapper">
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default Manic;
