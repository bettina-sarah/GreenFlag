import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// code from chatgpt
export function formatDate(Datestr: string): string {
  const date = new Date(Datestr)
  
  const formattedDate = new Intl.DateTimeFormat('en-US',{month:'short',day:'2-digit',timeZone:'UTC'}).format(date)

  return formattedDate
}
