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
            size="sm"
            onClick={button.onClick}
            className={`${
              button.variant === "outline"
                ? "!border-[#CE3B49] !text-[#CE3B49] hover:!bg-[#CE3B49] hover:!text-white"
                : "!bg-gradient-to-r !from-[#CE3B49] !to-[#FF6B6B] !text-white hover:!from-[#B91C1C] hover:!to-[#CE3B49]"
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
