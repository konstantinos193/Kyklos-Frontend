import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const footerStyles = {
  container: "bg-[#1F1F1F] text-white py-16",
  innerContainer: "container mx-auto px-4",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12",
  sectionTitle: "text-lg font-semibold mb-6 text-[#E7B109]",
  link: "text-gray-300 hover:text-[#3BA99C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3BA99C] focus:ring-offset-2 focus:ring-offset-[#1F1F1F] rounded-sm",
  socialButton: "w-10 h-10 bg-[#0047AB] rounded-full flex items-center justify-center hover:bg-[#E7B109] transition-colors focus:outline-none focus:ring-2 focus:ring-[#E7B109] focus:ring-offset-2 focus:ring-offset-[#1F1F1F]",
  bottomBar: "border-t border-gray-700 pt-8",
  bottomContent: "flex flex-col md:flex-row justify-between items-center gap-4",
  copyright: "text-gray-400 text-sm",
  legalLinks: "flex gap-6 text-sm"
} as const;
