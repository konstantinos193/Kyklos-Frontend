"use client";

import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Course } from "@/components/courses/types";
import { formatHours } from "@/utils/format-hours";

interface GradeCardProps {
  course: Course;
  animationDelay?: number;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  lykeioy: { bg: "bg-[#CE3B49]", text: "text-white" },
  gymnasioy: { bg: "bg-[#D97706]", text: "text-white" },
  epal: { bg: "bg-[#E7B109]", text: "text-white" },
};

export function GradeCard({ course, animationDelay = 0 }: GradeCardProps) {
  const categoryColor = categoryColors[course.category] || categoryColors.lykeioy;

  return (
    <div
      className="animate-fadeInUp"
      style={{ animationDelay: `${animationDelay}ms`, animationFillMode: "both" }}
    >
      <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
        {/* Category Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColor.bg} ${categoryColor.text}`}>
            {course.categoryLabel}
          </span>
        </div>

        <div className="relative p-6">
          {/* Title */}
          <h4 className="text-xl font-bold text-gray-900 mb-4 pr-16">
            {course.title}
          </h4>

          {/* Hours Display */}
          <div className="mb-4 text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <span className="text-2xl font-bold text-gray-800">{course.duration}</span>
              <span className="text-gray-600 font-medium">Ώρες/Εβδομάδα</span>
            </div>
          </div>

          {/* Subjects Accordion */}
          {course.subjects && course.subjects.length > 0 && (
            <div className="mb-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="subjects" className="border-0">
                  <AccordionTrigger className="px-0 text-sm text-gray-800 hover:no-underline">
                    Μαθήματα και Ώρες
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-2">
                      {course.subjects.map((subject, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            {subject.icon && <span className="text-lg">{subject.icon}</span>}
                            <span className="text-sm text-gray-800">{subject.name}</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-700">
                            {formatHours(subject.hours)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {/* Contact Button */}
          <Link
            href={course.applyHref}
            className="block w-full bg-gradient-to-r from-[#E7B109] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white text-center py-2.5 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            Επικοινωνία
          </Link>
        </div>
      </div>
    </div>
  );
}

