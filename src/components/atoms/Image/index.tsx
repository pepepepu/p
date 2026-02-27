import styled from "styled-components";
import {
  applyResponsiveStyles,
  formatSize,
  type ResponsiveProp,
  type Size,
} from "../../../styles/Theme/responsive";

interface ImageProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "width" | "height"
> {
  width?: ResponsiveProp<Size>;
  height?: ResponsiveProp<Size>;
  maxWidth?: ResponsiveProp<Size>;
  maxHeight?: ResponsiveProp<Size>;
  margin?: ResponsiveProp<string>;
  objectFit?: ResponsiveProp<string>;
  objectPosition?: ResponsiveProp<string>;
  borderRadius?: ResponsiveProp<Size>;
}

const invalidProps = new Set([
  "width",
  "height",
  "maxWidth",
  "maxHeight",
  "margin",
  "objectFit",
  "objectPosition",
  "borderRadius",
]);

const Image = styled.img.withConfig({
  shouldForwardProp: (prop) => !invalidProps.has(prop),
})<ImageProps>`
  display: block;
  max-width: 100%;

  /* Dimensões responsivas */
  ${({ theme, width }) =>
    applyResponsiveStyles("width", width, theme, formatSize)}
  ${({ theme, height }) =>
    applyResponsiveStyles("height", height, theme, formatSize)}
  ${({ theme, maxWidth }) =>
    applyResponsiveStyles("max-width", maxWidth, theme, formatSize)}
  ${({ theme, maxHeight }) =>
    applyResponsiveStyles("max-height", maxHeight, theme, formatSize)}
  
  /* Layout */
  ${({ theme, margin }) => applyResponsiveStyles("margin", margin, theme)}
  
  /* Comportamento da Imagem */
  ${({ theme, objectFit = "cover" }) =>
    applyResponsiveStyles("object-fit", objectFit, theme)}
  ${({ theme, objectPosition }) =>
    applyResponsiveStyles("object-position", objectPosition, theme)}
  
  /* Bordas */
  ${({ theme, borderRadius }) =>
    applyResponsiveStyles("border-radius", borderRadius, theme, formatSize)}
`;

export default Image;
