import { css, type DefaultTheme } from "styled-components";
import type { mediaQueries, Theme } from "./theme";

export type Size = string | number;

type Breakpoint = keyof typeof mediaQueries;

export type ResponsiveProp<T> = T | T[];

export const formatSize = (value?: Size) => {
  if (typeof value === "number") return `${value}px`;
  return value || "auto";
};

export const applyResponsiveStyles = <T extends string | number>(
  propName: string,
  propValue: ResponsiveProp<T> | undefined,
  theme: DefaultTheme,
  formatter: (value: T) => string | number = (v) => v,
) => {
  if (propValue === undefined || propValue === null) return "";

  const currentTheme = theme as unknown as Theme;

  if (!Array.isArray(propValue)) {
    return `${propName}: ${formatter(propValue)};`;
  }

  const [base, xs, sm, md, lg] = propValue;
  let styles = "";

  const orderedBreakpoints: Breakpoint[] = ["xs", "sm", "md", "lg"];
  const values = [xs, sm, md, lg];

  if (base !== undefined) {
    styles += `${propName}: ${formatter(base)};\n`;
  }

  for (let i = 0; i < orderedBreakpoints.length; i++) {
    const bp = orderedBreakpoints[i];
    const value = values[i];

    if (value !== undefined) {
      styles += `
        @media ${currentTheme.mediaQueries[bp]} {
          ${propName}: ${formatter(value)};
        }
      `;
    }
  }
  return css`
    ${styles}
  `;
};
