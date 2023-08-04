import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind 클래스 이름 병합 목적으로 사용
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
