import styled, { css } from "styled-components";
import {
  applyResponsiveStyles,
  formatSize,
  type ResponsiveProp,
  type Size,
} from "../../../styles/Theme/responsive";

interface BoxProps {
  as?: any;
  [key: string]: any;

  display?: ResponsiveProp<string>;
  flex?: ResponsiveProp<string>;
  width?: ResponsiveProp<Size>;
  height?: ResponsiveProp<Size>;
  minWidth?: ResponsiveProp<Size>;
  minHeight?: ResponsiveProp<Size>;
  maxWidth?: ResponsiveProp<Size>;
  maxHeight?: ResponsiveProp<Size>;
  padding?: ResponsiveProp<string>;
  margin?: ResponsiveProp<string>;

  flexDirection?: ResponsiveProp<string>;
  justifyContent?: ResponsiveProp<string>;
  alignItems?: ResponsiveProp<string>;
  flexWrap?: ResponsiveProp<string>;
  gap?: ResponsiveProp<string>;

  background?: ResponsiveProp<string>;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;

  borderRadius?: ResponsiveProp<Size>;
  color?: string;
  border?: string;
  borderColor?: string;
  boxShadow?: string;

  position?: string;
  top?: ResponsiveProp<string>;
  right?: ResponsiveProp<string>;
  bottom?: ResponsiveProp<string>;
  left?: ResponsiveProp<string>;
  zIndex?: number;

  cursor?: string;
  userSelect?: string;
  transform?: string;
  transition?: any;
  opacity?: number | string;

  overflow?: string;
  overflowY?: string;
  overflowX?: string;
  hideScrollbar?: boolean;
}

const invalidProps = new Set([
  "display",
  "flex",
  "width",
  "height",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",
  "padding",
  "margin",
  "flexDirection",
  "justifyContent",
  "alignItems",
  "flexWrap",
  "gap",
  "background",
  "backgroundImage",
  "backgroundSize",
  "backgroundPosition",
  "backgroundRepeat",
  "borderRadius",
  "color",
  "border",
  "borderColor",
  "boxShadow",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "zIndex",
  "cursor",
  "userSelect",
  "transform",
  "transition",
  "opacity",
  "overflow",
  "overflowY",
  "overflowX",
  "hideScrollbar",
]);

const Box = styled.div.withConfig({
  shouldForwardProp: (prop) => !invalidProps.has(prop),
})<BoxProps>`
  /* Reset básico */
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  min-width: 0;

  /* Layout */
  ${({ theme, display }) => applyResponsiveStyles("display", display, theme)}
  ${({ theme, flex }) => applyResponsiveStyles("flex", flex, theme)}
  ${({ theme, width }) =>
    applyResponsiveStyles("width", width, theme, formatSize)}
  ${({ theme, height }) =>
    applyResponsiveStyles("height", height, theme, formatSize)}
  ${({ theme, minWidth }) =>
    applyResponsiveStyles("min-width", minWidth, theme, formatSize)}
  ${({ theme, minHeight }) =>
    applyResponsiveStyles("min-height", minHeight, theme, formatSize)}
  ${({ theme, maxWidth }) =>
    applyResponsiveStyles("max-width", maxWidth, theme, formatSize)}
  ${({ theme, maxHeight }) =>
    applyResponsiveStyles("max-height", maxHeight, theme, formatSize)}
  ${({ theme, padding }) => applyResponsiveStyles("padding", padding, theme)}
  ${({ theme, margin }) => applyResponsiveStyles("margin", margin, theme)}
  
  /* Flexbox */
  ${({ theme, flexDirection }) =>
    applyResponsiveStyles("flex-direction", flexDirection, theme)}
  ${({ theme, justifyContent }) =>
    applyResponsiveStyles("justify-content", justifyContent, theme)}
  ${({ theme, alignItems }) =>
    applyResponsiveStyles("align-items", alignItems, theme)}
  ${({ theme, flexWrap }) =>
    applyResponsiveStyles("flex-wrap", flexWrap, theme)}
  ${({ theme, gap }) => applyResponsiveStyles("gap", gap, theme)}

  /* Background */
  ${({ theme, background }) =>
    applyResponsiveStyles("background", background, theme)}
  ${({ theme, backgroundSize }) =>
    applyResponsiveStyles("background-size", backgroundSize, theme)}
  ${({ theme, backgroundPosition }) =>
    applyResponsiveStyles("background-position", backgroundPosition, theme)}
  ${({ theme, backgroundRepeat }) =>
    applyResponsiveStyles("background-repeat", backgroundRepeat, theme)}
  
  background-image: ${({ backgroundImage }) =>
    backgroundImage
      ? backgroundImage.includes("gradient")
        ? backgroundImage
        : `url(${backgroundImage})`
      : undefined};

  /* Bordas e Estilo Visual */
  ${({ theme, borderRadius }) =>
    applyResponsiveStyles("border-radius", borderRadius, theme, formatSize)}
  ${({ theme, color }) => applyResponsiveStyles("color", color, theme)}
  ${({ theme, border }) => applyResponsiveStyles("border", border, theme)}
  ${({ theme, borderColor }) =>
    applyResponsiveStyles("border-color", borderColor, theme)}
  ${({ theme, boxShadow }) =>
    applyResponsiveStyles("box-shadow", boxShadow, theme)}
  ${({ theme, opacity }) => applyResponsiveStyles("opacity", opacity, theme)}

  /* Posicionamento */
  ${({ theme, position }) => applyResponsiveStyles("position", position, theme)}
  ${({ theme, top }) => applyResponsiveStyles("top", top, theme)}
  ${({ theme, right }) => applyResponsiveStyles("right", right, theme)}
  ${({ theme, bottom }) => applyResponsiveStyles("bottom", bottom, theme)}
  ${({ theme, left }) => applyResponsiveStyles("left", left, theme)}
  ${({ theme, zIndex }) => applyResponsiveStyles("z-index", zIndex, theme)}

  /* Transformações e Interações */
  ${({ theme, transform }) =>
    applyResponsiveStyles("transform", transform, theme)}
  ${({ theme, cursor }) => applyResponsiveStyles("cursor", cursor, theme)}
  ${({ theme, userSelect }) =>
    applyResponsiveStyles("user-select", userSelect, theme)}
  
  /* Tratamento especial para transition: só aplica se for string (CSS puro) */
  ${({ theme, transition }) =>
    typeof transition === "string"
      ? applyResponsiveStyles("transition", transition, theme)
      : undefined}

  /* Overflow */
  ${({ theme, overflow }) => applyResponsiveStyles("overflow", overflow, theme)}
  ${({ theme, overflowY }) =>
    applyResponsiveStyles("overflow-y", overflowY, theme)}
  ${({ theme, overflowX }) =>
    applyResponsiveStyles("overflow-x", overflowX, theme)}

  ${({ hideScrollbar }) =>
    hideScrollbar &&
    css`
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
    `}
`;

export default Box;
