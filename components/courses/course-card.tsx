"use client";

import Link from "next/link";
import { Course } from "./types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'epal':
        return 'bg-[#E7B109] text-white';
      case 'lykeioy':
        return 'bg-[#CE3B49] text-white';
      case 'gymnasioy':
        return 'bg-[#D97706] text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Category Badge */}
      <div className="absolute top-3 right-3 z-10">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(course.category)}`}>
          {course.categoryLabel}
        </span>
      </div>

      {/* Content */}
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

        {/* Accordion for Subjects */}
        {course.subjects && course.subjects.length > 0 && (
          <Accordion type="single" collapsible className="mb-4">
            <AccordionItem value="subjects" className="border-0">
              <AccordionTrigger className="px-0 text-sm text-gray-800 hover:no-underline">
                Μαθήματα και Ώρες
              </AccordionTrigger>
              <AccordionContent className="px-0 pt-2">
                <div className="space-y-2">
                  {course.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center gap-3">
                        {subject.icon && <span className="text-xl">{subject.icon}</span>}
                        <div>
                          <h5 className="font-medium text-gray-800 text-sm">{subject.name}</h5>
                          {subject.description && (
                            <p className="text-xs text-gray-600">{subject.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-base font-bold text-gray-800">{subject.hours}</span>
                        <span className="text-xs text-gray-600">ώρες/εβδ</span>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* Action Button */}
        <Link
          href={course.applyHref}
          className="block w-full bg-gradient-to-r from-[#E7B109] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white text-center py-2.5 px-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
        >
          Επικοινωνία
        </Link>
      </div>
    </div>
  );
}
