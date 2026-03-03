import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import { Box, Text } from "../../components";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "A Distorção",
    description:
      "A percepção se dobra sobre si mesma, criando novas realidades visuais.",
    svg: (
      <path d="M 15,50 C 15,10 85,10 85,50 C 85,90 35,90 35,55 C 35,35 65,35 65,50 C 65,60 45,60 45,50" />
    ),
  },
  {
    id: 2,
    title: "O Abismo",
    description:
      "Estruturas que olham de volta, revelando a complexidade do vazio.",
    svg: <path d="M 30,15 L 85,30 L 70,85 L 15,70 Z" />,
  },
  {
    id: 3,
    title: "Fragmentos",
    description:
      "Lógica reconstruída a partir do caos, onde o excesso se torna ordem.",
    svg: <path d="M 50,15 L 85,85 L 15,85 Z" />,
  },
  {
    id: 4,
    title: "Colapso",
    description:
      "Sistemas falhando graciosamente, transformando erro em expressão.",
    svg: (
      <>
        <path d="M 20,20 L 80,80" />
        <path d="M 80,20 L 20,80" />
        <path d="M 50,15 L 50,85" />
      </>
    ),
  },
  {
    id: 5,
    title: "Regeneração",
    description:
      "O transbordar do ser, consumindo e recriando a própria identidade.",
    svg: (
      <path d="M 50,50 m -35,0 a 35,35 0 1,0 70,0 a 35,35 0 1,0 -70,0 M 50,50 m -10,0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0" />
    ),
  },
];

const Twisted = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const detailsPanelRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const [isDetailedView, setIsDetailedView] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".shape-trigger", {
        x: (i) => `${(i - 2) * 12}vw`,
        y: "0vh",
        scale: 1,
        opacity: 0,
        filter: "blur(15px)",
      });
      gsap.set(introTextRef.current, {
        opacity: 0,
        filter: "blur(10px)",
        y: 20,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(introTextRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        overwrite: "auto",
      }).to(
        ".shape-trigger",
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.8",
      );

      gsap.to(".twisted-master", {
        opacity: 0,
        filter: "blur(15px)",
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 70%",
          end: "bottom top",
          scrub: 1,
        },
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onLeaveBack: resetToLineLayout,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const ctx = gsap.context(() => {
      if (isDetailedView) {
        gsap.to(".shape-trigger", {
          x: "-18vw",
          y: (i) => `${(i - 2) * 12}vh`,
          scale: 0.6,
          duration: 0.8,
          ease: "power3.inOut",
          overwrite: "auto",
        });

        gsap.to(introTextRef.current, {
          opacity: 0,
          filter: "blur(10px)",
          y: -20,
          duration: 0.5,
          ease: "power2.in",
          overwrite: "auto",
        });

        gsap.to(detailsPanelRef.current, {
          opacity: 1,
          x: 0,
          pointerEvents: "auto",
          duration: 0.6,
          delay: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to(".shape-trigger", {
          x: (i) => `${(i - 2) * 12}vw`,
          y: "0vh",
          scale: 1,
          duration: 0.8,
          ease: "power3.inOut",
          overwrite: "auto",
        });

        gsap.to(introTextRef.current, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.8,
          delay: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(detailsPanelRef.current, {
          opacity: 0,
          x: 20,
          pointerEvents: "none",
          duration: 0.4,
          ease: "power2.in",
          overwrite: "auto",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isDetailedView]);

  useLayoutEffect(() => {
    if (isFirstRender.current) return;

    const ctx = gsap.context(() => {
      if (isDetailedView && selectedProjectId !== null) {
        projects.forEach((p) => {
          const isSelected = p.id === selectedProjectId;
          gsap.to(`.shape-trigger-${p.id}`, {
            opacity: isSelected ? 1 : 0.2,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
        });

        gsap.fromTo(
          ".info-content",
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          },
        );
      } else if (!isDetailedView) {
        gsap.to(".shape-trigger", {
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedProjectId, isDetailedView]);

  const resetToLineLayout = () => {
    setIsDetailedView(false);
    setSelectedProjectId(null);
  };

  const handleProjectClick = (id: number) => {
    setSelectedProjectId(id);
    if (!isDetailedView) {
      setIsDetailedView(true);
    }
  };

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <Box
      ref={sectionRef}
      width="100%"
      height="100dvh"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        className="twisted-master"
        width="100%"
        height="100%"
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          ref={introTextRef}
          style={{
            position: "absolute",
            top: "38%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 3,
            pointerEvents: "none",
            width: "80%",
          }}
        >
          <Text fontSize="1.8dvw" fontFamily="Instrument Serif">
            Each project explores depth over simplicity, where architecture,
            algorithms, and logic converge under deliberate design
          </Text>
        </Box>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 0,
            height: 0,
            zIndex: 2,
            marginTop: 20,
          }}
        >
          {projects.map((project) => {
            const isSelected = project.id === selectedProjectId;
            return (
              <div
                key={project.id}
                className={`shape-trigger shape-trigger-${project.id}`}
                style={{
                  position: "absolute",
                  width: "8vw",
                  height: "8vw",
                  minWidth: "80px",
                  minHeight: "80px",
                  marginLeft: "-4vw",
                  marginTop: "-4vw",
                  cursor: "pointer",
                }}
                onClick={() => handleProjectClick(project.id)}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget.querySelector("svg"), {
                    strokeWidth: isSelected || !isDetailedView ? 2.5 : 3.5,
                    duration: 0.3,
                    overwrite: "auto",
                  });
                  if (isDetailedView && !isSelected) {
                    gsap.to(e.currentTarget, {
                      opacity: 0.6,
                      duration: 0.3,
                      overwrite: "auto",
                    });
                  }
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget.querySelector("svg"), {
                    strokeWidth: isSelected ? 2.5 : 1.5,
                    duration: 0.3,
                    overwrite: "auto",
                  });
                  if (isDetailedView && !isSelected) {
                    gsap.to(e.currentTarget, {
                      opacity: 0.2,
                      duration: 0.3,
                      overwrite: "auto",
                    });
                  }
                }}
              >
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                  style={{
                    width: "100%",
                    height: "100%",
                    fill: "none",
                    stroke: isSelected ? "#ffffff" : "currentColor",
                    strokeWidth: isSelected ? 2.5 : 1.5,
                    transition: "stroke 0.3s ease",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                  }}
                >
                  {project.svg}
                </svg>
              </div>
            );
          })}
        </div>

        <Box
          ref={detailsPanelRef}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          textAlign="left"
          style={{
            position: "absolute",
            left: "38%",
            width: "45%",
            zIndex: 1,
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <div
            className="info-content"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Box margin="0 0 15px 0">
              <Text
                fontSize="3.5dvw"
                fontFamily="Instrument Serif"
                lineHeight={1}
              >
                {selectedProject.title}
              </Text>
            </Box>
            <Box margin="0 0 30px 0">
              <Text fontSize="1.3dvw" fontFamily="Instrument Serif">
                {selectedProject.description}
              </Text>
            </Box>
            <button
              style={{
                backgroundColor: "transparent",
                border: "1px solid #ffffff",
                color: "#ffffff",
                padding: "12px 25px",
                fontFamily: "Instrument Serif",
                fontSize: "1dvw",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: "50px",
              }}
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  duration: 0.3,
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, {
                  backgroundColor: "transparent",
                  color: "#ffffff",
                  duration: 0.3,
                })
              }
            >
              view project
            </button>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Twisted;
