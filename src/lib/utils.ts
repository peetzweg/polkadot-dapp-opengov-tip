import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function notEmpty<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value !== null && value !== undefined
}

export const truncate = (value: string) => {
  return value.substring(0, 6) + "..." + value.substring(value.length - 4)
}

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}
