"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeaderButton } from "./types";
import { User, LogOut } from "lucide-react";

interface HeaderButtonsProps {
  buttons: HeaderButton[];
  isScrolled: boolean;
}

export function HeaderButtons({ buttons, isScrolled }: HeaderButtonsProps) {
  const [student, setStudent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStudentLogin = () => {
      const studentData = localStorage.getItem('student');
      const studentToken = localStorage.getItem('studentToken');
      
      if (studentData && studentToken) {
        try {
          const parsedStudent = JSON.parse(studentData);
          setStudent(parsedStudent);
        } catch (error) {
          console.error('Error parsing student data:', error);
          setStudent(null);
        }
      } else {
        setStudent(null);
      }
      setIsLoading(false);
    };

    checkStudentLogin();
    
    // Listen for storage changes
    window.addEventListener('storage', checkStudentLogin);
    const handleAuthChange = () => checkStudentLogin();
    window.addEventListener('auth-change', handleAuthChange);
    
    // Polling as fallback
    const intervalId = setInterval(checkStudentLogin, 2000);

    return () => {
      window.removeEventListener('storage', checkStudentLogin);
      window.removeEventListener('auth-change', handleAuthChange);
      clearInterval(intervalId);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('student');
    localStorage.removeItem('studentToken');
    window.location.href = '/';
  };

  if (isLoading) {
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

  // If student is logged in, show student info instead of login button
  if (student) {
    return (
      <div className="hidden md:flex items-center gap-3">
        <Link href="/student/dashboard">
          <Button
            variant="default"
            size="sm"
            className="!bg-gradient-to-r !from-[#CE3B49] !to-[#FF6B6B] !text-white hover:!from-[#B91C1C] hover:!to-[#CE3B49] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            <span className="hidden lg:inline">{student.firstName} {student.lastName}</span>
            <span className="lg:hidden">Πίνακας</span>
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="!border-[#CE3B49] !text-[#CE3B49] hover:!bg-[#CE3B49] hover:!text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          title="Αποσύνδεση"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  // Show normal login button if not logged in
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
