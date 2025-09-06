import { SpecialtyContent } from "./types";
import { BookIcon, DocumentIcon, TrophyIcon } from "./icons";

export const specialtyContent: SpecialtyContent = {
  items: [
    {
      id: "themata-panellinion",
      title: "Θέματα Πανελληνίων",
      href: "themata-panellinion",
      icon: "book"
    },
    {
      id: "prospectus",
      title: "Κατεβάστε το Prospectus",
      href: "prospectus",
      target: "_blank",
      icon: "document",
      isActive: true
    },
    {
      id: "oi-kalyteroi-olon-ton-epoxon",
      title: "Οι καλύτεροι της δεκαετίας",
      href: "oi-kalyteroi-olon-ton-epoxon",
      icon: "trophy"
    }
  ]
};

export { BookIcon, DocumentIcon, TrophyIcon };
