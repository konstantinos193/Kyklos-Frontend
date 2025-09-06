import { Button } from "@/components/ui/button";
import { HeaderButton } from "./types";

interface HeaderButtonsProps {
  buttons: HeaderButton[];
  isScrolled: boolean;
}

export function HeaderButtons({ buttons, isScrolled }: HeaderButtonsProps) {
  return (
    <div className="hidden md:flex items-center gap-3">
      {buttons.map((button, index) => {
        const buttonElement = (
          <Button
            key={index}
            variant={button.variant}
            onClick={button.onClick}
            className={`${
              button.variant === "outline"
                ? "!border-slate-300 !text-slate-700 hover:!bg-slate-50 hover:!text-slate-900 !bg-transparent shadow-sm hover:shadow-md"
                : "!bg-blue-600 !text-white hover:!bg-blue-700 shadow-sm hover:shadow-md"
            } transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium`}
          >
            {button.label}
          </Button>
        );

        if (button.href) {
          return (
            <a key={index} href={button.href} className="contents">
              {buttonElement}
            </a>
          );
        }

        return buttonElement;
      })}
    </div>
  );
}
