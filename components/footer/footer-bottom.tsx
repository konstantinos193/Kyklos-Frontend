import { FooterData } from "./types";

interface FooterBottomProps {
  legal: FooterData["legal"];
}

export function FooterBottom({ legal }: FooterBottomProps) {
  return (
    <div className="border-t border-gray-700 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm">{legal.copyright}</p>
      </div>
    </div>
  );
}
