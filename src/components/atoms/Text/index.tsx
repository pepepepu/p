import styled, { css } from "styled-components";
import {
  applyResponsiveStyles,
  formatSize,
  type ResponsiveProp,
  type Size,
} from "../../../styles/Theme/responsive";

interface TextProps {
  as?: any;
  [key: string]: any;

  fontSize?: ResponsiveProp<Size>;
  fontWeight?: ResponsiveProp<number | string>;
  lineHeight?: ResponsiveProp<number | string>;
  letterSpacing?: ResponsiveProp<Size>;
  textAlign?: ResponsiveProp<string>;
  textTransform?: ResponsiveProp<string>;
  textDecoration?: ResponsiveProp<string>;
  fontStyle?: ResponsiveProp<string>;
  fontFamily?: ResponsiveProp<string>;
  color?: ResponsiveProp<string>;

  margin?: ResponsiveProp<string>;
  padding?: ResponsiveProp<string>;
  display?: ResponsiveProp<string>;

  whiteSpace?: ResponsiveProp<string>;
  wordBreak?: ResponsiveProp<string>;
  textOverflow?: ResponsiveProp<string>;

  truncate?: boolean;
}

const invalidProps = new Set([
  "fontSize",
  "fontWeight",
  "lineHeight",
  "letterSpacing",
  "textAlign",
  "textTransform",
  "textDecoration",
  "fontStyle",
  "fontFamily",
  "color",
  "margin",
  "padding",
  "display",
  "whiteSpace",
  "wordBreak",
  "textOverflow",
  "truncate",
]);

const Text = styled.p.withConfig({
  shouldForwardProp: (prop) => !invalidProps.has(prop),
})<TextProps>`
  /* Resets e Padrões do Projeto */
  margin: 0;
  padding: 0;
  font-family: "Cascadia Mono", monospace;
  font-weight: 500;
  line-height: 1;

  /* Tipografia */
  ${({ theme, fontSize }) =>
    applyResponsiveStyles("font-size", fontSize, theme, formatSize)}
  ${({ theme, fontWeight }) =>
    applyResponsiveStyles("font-weight", fontWeight, theme)}
  ${({ theme, lineHeight }) =>
    applyResponsiveStyles("line-height", lineHeight, theme)}
  ${({ theme, letterSpacing }) =>
    applyResponsiveStyles("letter-spacing", letterSpacing, theme, formatSize)}
  ${({ theme, textAlign }) =>
    applyResponsiveStyles("text-align", textAlign, theme)}
  ${({ theme, textTransform }) =>
    applyResponsiveStyles("text-transform", textTransform, theme)}
  ${({ theme, textDecoration }) =>
    applyResponsiveStyles("text-decoration", textDecoration, theme)}
  ${({ theme, fontStyle }) =>
    applyResponsiveStyles("font-style", fontStyle, theme)}
  ${({ theme, color }) => applyResponsiveStyles("color", color, theme)}
  ${({ theme, fontFamily }) =>
    applyResponsiveStyles("font-family", fontFamily, theme)}

  /* Layout & Espaçamento */
  ${({ theme, margin }) => applyResponsiveStyles("margin", margin, theme)}
  ${({ theme, padding }) => applyResponsiveStyles("padding", padding, theme)}
  ${({ theme, display }) => applyResponsiveStyles("display", display, theme)}

  /* Comportamento de Texto */
  ${({ theme, whiteSpace }) =>
    applyResponsiveStyles("white-space", whiteSpace, theme)}
  ${({ theme, wordBreak }) =>
    applyResponsiveStyles("word-break", wordBreak, theme)}
  ${({ theme, textOverflow }) =>
    applyResponsiveStyles("text-overflow", textOverflow, theme)}

  /* Utilitário: Truncate (adiciona "..." se o texto estourar o container) */
  ${({ truncate }) =>
    truncate &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
`;

export default Text;
