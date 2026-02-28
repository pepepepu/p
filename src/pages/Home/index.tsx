import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "../../components";
import { theme } from "../../styles/Theme/theme";

const Home = () => {
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const faceContainerRef = useRef<HTMLDivElement>(null);
  const eyesTrackRef = useRef<HTMLDivElement>(null);
  const eyesBlinkRef = useRef<HTMLSpanElement>(null);
  const mouthRef = useRef<HTMLSpanElement>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const shortRefs = useRef<(HTMLElement | null)[]>([]);
  const longRefs = useRef<(HTMLElement | null)[]>([]);

  const transitionTlRef = useRef<gsap.core.Timeline | null>(null);
  const scrollValRef = useRef(0);
  const isTransitioningRef = useRef(false);

  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("->");

  const menuItems = [
    { short: "p", long: "projetos" },
    { short: "pp", long: "contato" },
    { short: "ppp", long: "pedro" },
  ];

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      faceContainerRef.current,
      { scale: 0, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 1, ease: "back.out(1.5)" },
    );

    tl.fromTo(
      [headerRef.current, scrollRef.current],
      { opacity: 0, y: (i) => (i === 0 ? -20 : 20) },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.2 },
      "-=0.5",
    );

    const blinkTl = gsap.timeline({ repeat: -1, repeatDelay: 3.5 });
    blinkTl.to(eyesBlinkRef.current, {
      scaleX: 0.1,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.15,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.15,
      ease: "power3",
    });
    const rotateTo = gsap.quickTo(cursorRef.current, "rotation", {
      duration: 0.2,
      ease: "power3",
    });

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;

    const transitionTl = gsap.timeline({ paused: true });
    transitionTlRef.current = transitionTl;

    gsap.set(scrollLineRef.current, { transformOrigin: "bottom center" });
    gsap.set(scrollRef.current, { zIndex: 9998 });

    const textObj = { val: 0 };

    transitionTl.to(
      scrollLineRef.current,
      { scaleY: 60, duration: 1, ease: "power2.in" },
      0,
    );

    transitionTl.to(
      textObj,
      {
        val: 1,
        duration: 1,
        onUpdate: () => {
          const p = textObj.val;
          const os = "O".repeat(Math.floor(p * 15) + 1);
          const ex = "!".repeat(Math.floor(p * 10));
          if (scrollTextRef.current) {
            scrollTextRef.current.innerText = `SCR${os}LL${ex}`;
          }
        },
      },
      0,
    );

    transitionTl.to(
      scrollLineRef.current,
      { scaleX: 3000, duration: 1, ease: "power2.inOut" },
      1,
    );
    transitionTl.to(
      [faceContainerRef.current, headerRef.current, scrollTextRef.current],
      { opacity: 0, duration: 0.5 },
      1,
    );

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      const dxCursor = e.clientX - lastX;
      const dyCursor = e.clientY - lastY;

      if (Math.abs(dxCursor) > 2 || Math.abs(dyCursor) > 2) {
        const angle = Math.atan2(dyCursor, dxCursor) * (180 / Math.PI);
        rotateTo(angle);
      }

      lastX = e.clientX;
      lastY = e.clientY;

      if (faceContainerRef.current && eyesTrackRef.current) {
        const rect = faceContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dxEye = e.clientX - centerX;
        const dyEye = e.clientY - centerY;
        const angleEye = Math.atan2(dyEye, dxEye);

        const distEye = Math.min(Math.hypot(dxEye, dyEye) / 15, 15);

        gsap.to(eyesTrackRef.current, {
          x: Math.cos(angleEye) * distEye,
          y: Math.sin(angleEye) * distEye,
          duration: 0.2,
        });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioningRef.current) return;

      scrollValRef.current += e.deltaY;

      if (scrollValRef.current < 0) {
        scrollValRef.current = 0;
      } else if (scrollValRef.current > 1500) {
        scrollValRef.current = 1500;
      }

      const progress = scrollValRef.current / 1500;

      gsap.to(transitionTl, {
        progress: progress,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      });

      if (progress >= 1 && !isTransitioningRef.current) {
        isTransitioningRef.current = true;
        setTimeout(() => {
          navigate("/projetos");
        }, 600);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("wheel", handleWheel);

    return () => {
      tl.kill();
      blinkTl.kill();
      transitionTl.kill();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [navigate]);

  useEffect(() => {
    if (mouthRef.current) {
      gsap.fromTo(
        mouthRef.current,
        { scale: 0.5, opacity: 0, rotation: 90 },
        {
          scale: 1,
          opacity: 1,
          rotation: 90,
          duration: 0.4,
          ease: "back.out(2)",
        },
      );
    }
  }, [isHovering]);

  const handleMenuEnter = (index: number) => {
    setIsHovering(true);
    setCursorText("<");
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
    setIsHovering(false);
    setCursorText("->");
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

  const handleScrollEnter = () => {
    setIsHovering(true);
    setCursorText("<");
    if (!isTransitioningRef.current && scrollValRef.current === 0) {
      gsap.to(scrollLineRef.current, {
        height: "60px",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(scrollTextRef.current, {
        y: -5,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleScrollLeave = () => {
    setIsHovering(false);
    setCursorText("->");
    if (!isTransitioningRef.current && scrollValRef.current === 0) {
      gsap.to(scrollLineRef.current, {
        height: "40px",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(scrollTextRef.current, {
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <Box
      ref={containerRef}
      width="100dvw"
      height="100dvh"
      background={theme.colors.backgroundInverse}
      position="relative"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
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
        <Text
          color={theme.colors.textInverse}
          fontSize="1.5rem"
          fontWeight={700}
        >
          {cursorText}
        </Text>
      </Box>

      <Box
        ref={headerRef}
        position="absolute"
        top="0"
        width="100%"
        padding={theme.spacing.large}
        display="flex"
        justifyContent="flex-end"
        gap="30px"
        style={{ opacity: 0 }}
        zIndex={10}
      >
        {menuItems.map((item, index) => (
          <Box
            key={item.short}
            display="grid"
            style={{ placeItems: "center", cursor: "none" }}
            onMouseEnter={() => handleMenuEnter(index)}
            onMouseLeave={() => handleMenuLeave(index)}
          >
            <Text
              ref={(el: any) => (shortRefs.current[index] = el)}
              color={theme.colors.textInverse}
              fontWeight={500}
              fontSize="1rem"
              style={{ gridArea: "1/1" }}
            >
              {item.short}
            </Text>
            <Text
              ref={(el: any) => (longRefs.current[index] = el)}
              color={theme.colors.textInverse}
              fontWeight={500}
              fontSize="1rem"
              style={{
                gridArea: "1/1",
                opacity: 0,
                transform: "translateY(15px)",
              }}
            >
              {item.long}
            </Text>
          </Box>
        ))}
      </Box>

      <Box
        ref={faceContainerRef}
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        zIndex={10}
        style={{ opacity: 0 }}
      >
        <Box ref={eyesTrackRef} margin={"0 0 0 30px"}>
          <Text
            ref={eyesBlinkRef}
            as="span"
            color={theme.colors.textInverse}
            fontSize="10rem"
            fontWeight={700}
            lineHeight="0"
            style={{ transform: "rotate(90deg)", display: "inline-block" }}
          >
            :
          </Text>
        </Box>

        <Box>
          <Text
            ref={mouthRef}
            as="span"
            color={theme.colors.textInverse}
            fontSize="10rem"
            fontWeight={700}
            lineHeight="0.3"
            style={{ transform: "rotate(90deg)", display: "inline-block" }}
          >
            {isHovering ? "P" : ")"}
          </Text>
        </Box>
      </Box>

      <Box
        ref={scrollRef}
        position="absolute"
        bottom="0"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="10px"
        style={{ opacity: 0, cursor: "none" }}
        onMouseEnter={handleScrollEnter}
        onMouseLeave={handleScrollLeave}
      >
        <Text
          ref={scrollTextRef}
          color={theme.colors.textInverse}
          fontSize="0.9rem"
          textTransform="uppercase"
          letterSpacing="2px"
          fontWeight={600}
        >
          Scroll
        </Text>
        <Box
          ref={scrollLineRef}
          width="2px"
          height="40px"
          background={theme.colors.textInverse}
        />
      </Box>
    </Box>
  );
};

export default Home;
