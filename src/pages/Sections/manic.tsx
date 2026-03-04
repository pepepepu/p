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
      "Aura é um motor de reflexão sonora conectado aos seus dados do Last.fm. Seu histórico de escuta se transforma em uma paisagem viva de luz, cor e emoção.",
    path: "M 0 100 Q 50 -50 100 100",
    link: "https://github.com/pepepepu/aura",
  },
  {
    title: "media .",
    description:
      "Um hub de identidade cultural que transforma seus dados do Spotify, Last.fm, Letterboxd e Pinterest em uma interface visual unificada, em tempo real.",
    path: "M 10 50 Q 50 -20 90 50 T 10 50",
    link: "https://www.behance.net/gallery/241873165/media-Cultural-Identity-Hub-Dashboard",
  },
  {
    title: "SGD",
    description:
      "Sistema de Gestão de Demandas desenvolvido para a EBSERH. Atuação como desenvolvedor front-end responsável pela construção completa da interface, arquitetura de componentes e fluxos, utilizando React e TypeScript.",
    path: "M 20 50 L 50 20 L 80 50 L 50 80 Z",
    link: "#",
  },
  {
    title: "Portal do Servidor",
    description:
      "Portal oficial do Servidor do Estado de Sergipe. Responsável pelo design completo da plataforma (web e mobile), com foco em usabilidade, acessibilidade e na otimização dos serviços da Secretaria de Estado da Administração.",
    path: "M 10 10 C 50 90, 50 10, 90 90",
    link: "#",
  },
];

const Manic = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceType();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const scrollTween = gsap.to(wrapper, {
        x: () => -(wrapper.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + wrapper.scrollWidth,
          invalidateOnRefresh: true,
        },
      });

      const columns = gsap.utils.toArray<HTMLElement>(".project-column");

      columns.forEach((col) => {
        const path = col.querySelector(".project-path");
        const animWrapper = col.querySelector(".project-anim-wrapper");

        if (path) {
          gsap.fromTo(
            path,
            { strokeDashoffset: 200 },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: col,
                containerAnimation: scrollTween,
                start: "left 80%",
                end: "right 20%",
                scrub: true,
              },
            },
          );
        }

        if (animWrapper) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: col,
              containerAnimation: scrollTween,
              start: "left 85%",
              end: "right 15%",
              scrub: true,
            },
          });

          tl.fromTo(
            animWrapper,
            { opacity: 0, filter: "blur(15px)" },
            {
              opacity: 1,
              filter: "blur(0px)",
              duration: 1,
              ease: "power2.out",
            },
          )
            .to(animWrapper, {
              opacity: 1,
              filter: "blur(0px)",
              duration: 2,
            })
            .to(animWrapper, {
              opacity: 0,
              filter: "blur(15px)",
              duration: 1,
              ease: "power2.in",
            });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={sectionRef}
      width="100%"
      height="100dvh"
      style={{
        overflow: "hidden",
        mixBlendMode: "difference",
        color: theme.colors.background,
        backgroundColor: "transparent",
      }}
    >
      <Box
        ref={wrapperRef}
        display="flex"
        height="100%"
        style={{ width: "max-content", willChange: "transform" }}
      >
        <Box
          style={{
            width: isMobile ? "7.5vw" : "5vw",
            flexShrink: 0,
          }}
        />

        <Box
          className="project-column"
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          style={{
            width: isMobile ? "85vw" : "55vw",
            height: "100%",
            padding: isMobile ? "0 2rem" : "0 5rem",
            flexShrink: 0,
          }}
        >
          <Box
            className="project-anim-wrapper"
            width="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Text
              fontSize={isMobile ? "3.5rem" : "5rem"}
              fontFamily="Instrument Serif"
              style={{
                lineHeight: 0.9,
                textTransform: "lowercase",
                display: "block",
                wordWrap: "break-word",
              }}
            >
              convergência entre front-end e design ui/ux.
            </Text>
            <Box width={isMobile ? "100%" : "70%"} margin={"1rem 0 0 0"}>
              <Text
                fontSize={isMobile ? "1rem" : "1.2rem"}
                fontFamily="Instrument Serif"
                textAlign={"justify"}
                style={{ opacity: 0.8, whiteSpace: "normal" }}
              >
                Navegando pela interseção entre a lógica estrutural e o sentir,
                esculpo interfaces que transcendem a tela. Minha prática é um
                exercício contínuo de coreografar o espaço digital, moldando
                ecossistemas complexos com React, React Native, TypeScript e
                Vue.js. É no embate entre a precisão cirúrgica da engenharia e a
                crueza da estética brutalista que encontro meu norte: reduzo o
                ruído para amplificar a função, forjando sistemas onde o código
                se torna poesia tátil e a forma abraça brutalmente o seu
                propósito.
              </Text>
            </Box>
          </Box>
        </Box>

        {projectsData.map((project, index) => (
          <Box
            key={index}
            className="project-column"
            position="relative"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            style={{
              width: isMobile ? "85vw" : "55vw",
              height: "100%",
              padding: isMobile ? "0 2rem" : "0 5rem",
              flexShrink: 0,
              cursor: "pointer",
            }}
            onClick={() => {
              if (project.link !== "#") {
                window.open(project.link, "_blank", "noopener,noreferrer");
              }
            }}
          >
            <Box
              className="project-anim-wrapper"
              width="100%"
              height="100%"
              position="relative"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box
                position="absolute"
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                style={{
                  top: 0,
                  left: 0,
                  pointerEvents: "none",
                  zIndex: 0,
                  opacity: 0.3,
                }}
              >
                <svg
                  width={isMobile ? "120%" : "100%"}
                  height={isMobile ? "120%" : "100%"}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                  style={{ overflow: "visible", mixBlendMode: "difference" }}
                >
                  <path
                    className="project-path"
                    d={project.path}
                    fill="none"
                    stroke={theme.colors.background}
                    strokeWidth={isMobile ? "1.5" : "0.5"}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    pathLength="200"
                    style={{ strokeDasharray: 200, strokeDashoffset: 200 }}
                  />
                </svg>
              </Box>

              <Box style={{ zIndex: 1 }}>
                <Text
                  className="project-title"
                  fontSize={isMobile ? "4rem" : "8rem"}
                  fontFamily="Instrument Serif"
                  style={{
                    textTransform: "uppercase",
                    lineHeight: 0.85,
                    display: "block",
                    wordWrap: "break-word",
                  }}
                >
                  {project.title}
                </Text>
                <Box width={isMobile ? "100%" : "60%"}>
                  <Text
                    fontSize={isMobile ? "1rem" : "1.2rem"}
                    fontFamily="Instrument Serif"
                    style={{ opacity: 0.8, whiteSpace: "normal" }}
                  >
                    {project.description}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}

        <Box
          style={{
            width: isMobile ? "7.5vw" : "22.5vw",
            flexShrink: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default Manic;
