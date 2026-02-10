import { FooterData } from "./types";

interface FooterBottomProps {
  legal: FooterData["legal"];
}

export function FooterBottom({ legal }: FooterBottomProps) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-gray-700 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-400 text-sm">
          © {currentYear}{" "}
          <a
            href="https://adinfinity.gr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 hover:text-white underline-offset-4 hover:underline"
          >
            adinfinity.gr
          </a>
          {legal?.copyright ? ` ${legal.copyright}` : null}
        </p>
      </div>
    </div>
  );
}
