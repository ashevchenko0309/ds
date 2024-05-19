import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getRandomRGB = () => {
  const getRandomValue = () => Math.floor(Math.random() * 256);
  const r = getRandomValue();
  const g = getRandomValue();
  const b = getRandomValue();
  return `${r} ${g} ${b}`;
};

export const updateCSSVariable = (variable = "", value = "") => {
  document.documentElement.style.setProperty(variable, value);
}
