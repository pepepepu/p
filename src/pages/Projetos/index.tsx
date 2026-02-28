import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { Box, Text } from "../../components";
import { theme } from "../../styles/Theme/theme";

gsap.registerPlugin(Draggable);

interface PhysicsItem {
  el: HTMLElement;
  w: number;
  h: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vRot: number;
  targetRot: number;
  isDragging: boolean;
  prevX: number;
}

const projectList = ["Aura", "SGD", "media .", "Contexto", "SABES"];

const Projetos = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const shortRefs = useRef<(HTMLElement | null)[]>([]);
  const longRefs = useRef<(HTMLElement | null)[]>([]);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);
  const physicsItems = useRef<PhysicsItem[]>([]);

  const [cursorText, setCursorText] = useState("->");

  const menuItems = [
    { short: "projetos", long: "projetos" },
    { short: "pp", long: "contato" },
    { short: "ppp", long: "pedro" },
  ];

  useEffect(() => {
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.15,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.15,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let draggables: globalThis.Draggable[] = [];
    let tickerUpdate: () => void;

    const initTimer = setTimeout(() => {
      physicsItems.current = projectList
        .map((_proj, i) => {
          const el = projectsRef.current[i];
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return {
            el,
            w: rect.width,
            h: rect.height,
            x: Math.random() * (window.innerWidth - rect.width - 40) + 20,
            y: -150 - i * 120,
            vx: (Math.random() - 0.5) * 4,
            vy: 0,
            rot: 0,
            vRot: 0,
            targetRot: 0,
            isDragging: false,
            prevX: 0,
          };
        })
        .filter(Boolean) as PhysicsItem[];

      physicsItems.current.forEach((item) => {
        gsap.set(item.el, {
          x: item.x,
          y: item.y,
          rotation: item.rot,
          opacity: 1,
          visibility: "visible",
        });
        item.prevX = item.x;
      });

      tickerUpdate = () => {
        const items = physicsItems.current;
        const floor = window.innerHeight;
        const rightWall = window.innerWidth;

        items.forEach((item) => {
          if (!item.isDragging) {
            item.targetRot = 0;
            item.vy += 1.5;
            if (item.vy > 25) item.vy = 25;
            item.x += item.vx;
            item.y += item.vy;
            item.vx *= 0.9;
          }
        });

        for (let iter = 0; iter < 5; iter++) {
          items.forEach((item) => {
            if (item.isDragging) return;

            if (item.y + item.h > floor) {
              item.y = floor - item.h;
              item.vy *= -0.3;
              item.vx *= 0.8;
              item.targetRot = 0;
            }
            if (item.x < 0) {
              item.x = 0;
              item.vx *= -0.4;
            } else if (item.x + item.w > rightWall) {
              item.x = rightWall - item.w;
              item.vx *= -0.4;
            }
          });

          for (let i = 0; i < items.length; i++) {
            for (let j = i + 1; j < items.length; j++) {
              let a = items[i];
              let b = items[j];

              let centerAx = a.x + a.w / 2;
              let centerAy = a.y + a.h / 2;
              let centerBx = b.x + b.w / 2;
              let centerBy = b.y + b.h / 2;

              let overlapX = a.w / 2 + b.w / 2 - Math.abs(centerAx - centerBx);
              let overlapY = a.h / 2 + b.h / 2 - Math.abs(centerAy - centerBy);

              if (overlapX > 0 && overlapY > 0) {
                let pushA = a.isDragging ? 0 : b.isDragging ? 1 : 0.5;
                let pushB = b.isDragging ? 0 : a.isDragging ? 1 : 0.5;

                if (overlapX < overlapY) {
                  if (centerAx < centerBx) {
                    a.x -= overlapX * pushA;
                    b.x += overlapX * pushB;
                  } else {
                    a.x += overlapX * pushA;
                    b.x -= overlapX * pushB;
                  }
                  a.vx *= 0.8;
                  b.vx *= 0.8;
                } else {
                  if (centerAy < centerBy) {
                    a.y -= overlapY * pushA;
                    b.y += overlapY * pushB;

                    const overhangRight = a.x + a.w - (b.x + b.w);
                    const overhangLeft = b.x - a.x;

                    if (overhangRight > a.w * 0.7) {
                      a.targetRot = 12;
                    } else if (overhangLeft > a.w * 0.7) {
                      a.targetRot = -12;
                    } else {
                      a.targetRot = 0;
                    }
                  } else {
                    a.y += overlapY * pushA;
                    b.y -= overlapY * pushB;

                    const overhangRight = b.x + b.w - (a.x + a.w);
                    const overhangLeft = a.x - b.x;

                    if (overhangRight > b.w * 0.7) {
                      b.targetRot = 12;
                    } else if (overhangLeft > b.w * 0.7) {
                      b.targetRot = -12;
                    } else {
                      b.targetRot = 0;
                    }
                  }
                  a.vy *= 0.8;
                  b.vy *= 0.8;
                  a.vx *= 0.8;
                  b.vx *= 0.8;
                }
              }
            }
          }
        }

        items.forEach((item) => {
          if (item.isDragging) {
            item.targetRot = (item.x - item.prevX) * 0.8;
            item.prevX = item.x;
          }

          item.targetRot = Math.max(-15, Math.min(15, item.targetRot));

          item.vRot += (item.targetRot - item.rot) * 0.15;
          item.vRot *= 0.8;
          item.rot += item.vRot;

          gsap.set(item.el, { x: item.x, y: item.y, rotation: item.rot });
        });
      };

      gsap.ticker.add(tickerUpdate);

      draggables = Draggable.create(projectsRef.current, {
        type: "x,y",
        bounds: containerRef.current,
        onPress() {
          const i = projectsRef.current.indexOf(this.target);
          if (physicsItems.current[i]) {
            physicsItems.current[i].isDragging = true;
            physicsItems.current[i].vx = 0;
            physicsItems.current[i].vy = 0;
            physicsItems.current[i].prevX = this.x;
          }
        },
        onDrag() {
          const i = projectsRef.current.indexOf(this.target);
          if (physicsItems.current[i]) {
            physicsItems.current[i].x = this.x;
            physicsItems.current[i].y = this.y;
          }
        },
        onRelease() {
          const i = projectsRef.current.indexOf(this.target);
          if (physicsItems.current[i]) {
            physicsItems.current[i].isDragging = false;
          }
        },
      });
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (tickerUpdate) gsap.ticker.remove(tickerUpdate);
      draggables.forEach((d) => d.kill());
    };
  }, []);

  const handleMenuEnter = (index: number) => {
    setCursorText("<");
    if (index === 0) return;

    gsap.to(shortRefs.current[index], {
      y: -15,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
    gsap.fromTo(
      longRefs.current[index],
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.inOut" },
    );
  };

  const handleMenuLeave = (index: number) => {
    setCursorText("->");
    if (index === 0) return;

    gsap.to(longRefs.current[index], {
      y: 15,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });
    gsap.fromTo(
      shortRefs.current[index],
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.inOut" },
    );
  };

  const handleProjectEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorText("<");
    gsap.to(e.currentTarget, {
      scale: 1.05,
      backgroundColor: theme.colors.text,
      duration: 0.3,
      ease: "back.out(2)",
    });
    const textEl = e.currentTarget.querySelector("p");
    if (textEl) {
      gsap.to(textEl, { color: theme.colors.background, duration: 0.3 });
    }
  };

  const handleProjectLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorText("->");
    gsap.to(e.currentTarget, {
      scale: 1,
      backgroundColor: "transparent",
      duration: 0.3,
      ease: "power2.out",
    });
    const textEl = e.currentTarget.querySelector("p");
    if (textEl) {
      gsap.to(textEl, { color: theme.colors.text, duration: 0.3 });
    }
  };

  return (
    <Box
      ref={containerRef}
      width="100dvw"
      height="100dvh"
      background={theme.colors.background}
      position="relative"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      style={{ cursor: "none" }}
    >
      <Box
        ref={cursorRef}
        position="fixed"
        top={"0"}
        left={"0"}
        zIndex={9999}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <Text color={theme.colors.text} fontSize="1.5rem" fontWeight={700}>
          {cursorText}
        </Text>
      </Box>

      <Box
        width="100%"
        padding={theme.spacing.large}
        display="flex"
        justifyContent="flex-end"
        gap="30px"
        zIndex={10}
      >
        {menuItems.map((item, index) => {
          const isActive = index === 0;

          return (
            <Box
              key={index}
              display="grid"
              style={{ placeItems: "center", cursor: "none" }}
              onMouseEnter={() => handleMenuEnter(index)}
              onMouseLeave={() => handleMenuLeave(index)}
            >
              <Text
                ref={(el: any) => (shortRefs.current[index] = el)}
                color={theme.colors.text}
                fontWeight={500}
                fontSize="1rem"
                style={{
                  gridArea: "1/1",
                  opacity: isActive ? 0 : 1,
                }}
              >
                {item.short}
              </Text>
              <Text
                ref={(el: any) => (longRefs.current[index] = el)}
                color={theme.colors.text}
                fontWeight={500}
                fontSize="1rem"
                style={{
                  gridArea: "1/1",
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0px)" : "translateY(15px)",
                }}
              >
                {item.long}
              </Text>
            </Box>
          );
        })}
      </Box>

      {projectList.map((project, index) => (
        <Box
          key={index}
          ref={(el: any) => (projectsRef.current[index] = el)}
          position="absolute"
          top={"0"}
          left={"0"}
          background="transparent"
          style={{
            cursor: "none",
            zIndex: 10,
            opacity: 0,
            visibility: "hidden",
            transformOrigin: "center center",
          }}
          onMouseEnter={handleProjectEnter}
          onMouseLeave={handleProjectLeave}
        >
          <Text
            color={theme.colors.text}
            fontWeight={400}
            fontSize="5rem"
            style={{
              pointerEvents: "none",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            {project}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default Projetos;
