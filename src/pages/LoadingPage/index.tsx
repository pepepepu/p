import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "../../components";

import { theme } from "../../styles/Theme/theme";

const LoadingPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLSpanElement>(null);
  const leftParenRef = useRef<HTMLSpanElement>(null);
  const rightParenRef = useRef<HTMLSpanElement>(null);
  const pWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const counterObj = { value: 0 };

    tl.to(counterObj, {
      value: 100,
      duration: 4,
      ease: "power2.inOut",
      onUpdate: () => {
        setProgress(Math.round(counterObj.value));
      },
    });

    tl.to(containerRef.current, {
      gap: 0,
      duration: 0.8,
      ease: "expo.inOut",
    });

    tl.to(
      percentRef.current,
      {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: "back.in(1.7)",
      },
      "-=0.3",
    );

    tl.to(letterRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    });

    tl.to([leftParenRef.current, rightParenRef.current], {
      x: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power4.out",
    });

    tl.to(
      letterRef.current,
      {
        scale: 1.2,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      },
      "<0.1",
    );

    tl.to(
      pWrapperRef.current,
      {
        scale: 450,
        opacity: 0.9,
        duration: 1.2,
        ease: "expo.inOut",
        force3D: true,
      },
      "+=0.2",
    );

    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          navigate("/home");
        },
      },
      "-=0.4",
    );

    return () => {
      tl.kill();
    };
  }, [navigate]);

  return (
    <Box
      ref={containerRef}
      background={theme.colors.background}
      display={"flex"}
      flexDirection={"column"}
      width={"100dvw"}
      height={"100dvh"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"50px"}
      overflow={"hidden"}
    >
      <Box
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box ref={percentRef} display="flex">
          <Text
            fontSize={"1.5rem"}
            lineHeight="1"
            color={theme.colors.text}
            fontFamily="Instrument Serif"
          >
            {progress}%
          </Text>
        </Box>

        <Box
          ref={pWrapperRef}
          position="absolute"
          display="flex"
          alignItems="center"
          gap="2px"
        >
          <Text
            ref={leftParenRef}
            fontSize={"2rem"}
            color={theme.colors.text}
            fontFamily="Instrument Serif"
            style={{ transform: "translateX(-40vw)", opacity: 0 }}
          >
            (
          </Text>

          <Text
            ref={letterRef}
            fontSize={"2rem"}
            fontFamily="Instrument Serif"
            color={theme.colors.text}
            style={{ scale: 0, opacity: 0 }}
          >
            p
          </Text>

          <Text
            ref={rightParenRef}
            fontSize={"2rem"}
            fontFamily="Instrument Serif"
            color={theme.colors.text}
            style={{ transform: "translateX(40vw)", opacity: 0 }}
          >
            )
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingPage;
