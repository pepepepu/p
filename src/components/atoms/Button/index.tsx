import styled, { css } from "styled-components";
import {
  applyResponsiveStyles,
  formatSize,
  type ResponsiveProp,
  type Size,
} from "../../../styles/Theme/responsive";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "text";
  width?: ResponsiveProp<Size>;
  margin?: ResponsiveProp<string>;
  padding?: ResponsiveProp<string>;
  fontSize?: ResponsiveProp<Size>;
}

const invalidProps = new Set([
  "variant",
  "width",
  "margin",
  "padding",
  "fontSize",
]);

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !invalidProps.has(prop),
})<ButtonProps>`
  font-family: "Cascadia Mono", monospace;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  /* Usando borderRadius: none para um visual mais quadrado/brutalista */
  border-radius: ${({ theme }) => theme.borderRadius.none || "0px"};

  /* Layout responsivo */
  ${({ theme, width }) =>
    applyResponsiveStyles("width", width, theme, formatSize)}
  ${({ theme, margin }) => applyResponsiveStyles("margin", margin, theme)}
  ${({ theme, padding = "12px 24px" }) =>
    applyResponsiveStyles("padding", padding, theme)}
  ${({ theme, fontSize = "16px" }) =>
    applyResponsiveStyles("font-size", fontSize, theme, formatSize)}

  /* Variantes Preto & Branco */
  ${({ theme, variant = "solid" }) => {
    if (variant === "outline") {
      return css`
        background: ${theme.colors.background};
        color: ${theme.colors.text};
        border: 2px solid ${theme.colors.border};
        &:hover:not(:disabled) {
          background: ${theme.colors.backgroundInverse};
          color: ${theme.colors.textInverse};
        }
      `;
    }
    if (variant === "text") {
      return css`
        background: transparent;
        color: ${theme.colors.text};
        border: 2px solid transparent;
        &:hover:not(:disabled) {
          text-decoration: underline;
        }
      `;
    }

    return css`
      background: ${theme.colors.backgroundInverse};
      color: ${theme.colors.textInverse};
      border: 2px solid ${theme.colors.border};
      &:hover:not(:disabled) {
        background: ${theme.colors.background};
        color: ${theme.colors.text};
      }
    `;
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default Button;
