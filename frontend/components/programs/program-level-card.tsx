"use client";

import { ProgramLevel } from "./types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ProgramLevelCardProps {
  level: ProgramLevel;
}

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600", 
  purple: "from-purple-500 to-purple-600",
  yellow: "from-yellow-500 to-yellow-600",
  red: "from-red-500 to-red-600",
  indigo: "from-indigo-500 to-indigo-600"
};

const borderColorClasses = {
  blue: "border-blue-200 hover:border-blue-300",
  green: "border-green-200 hover:border-green-300",
  purple: "border-purple-200 hover:border-purple-300", 
  yellow: "border-yellow-200 hover:border-yellow-300",
  red: "border-red-200 hover:border-red-300",
  indigo: "border-indigo-200 hover:border-indigo-300"
};

export function ProgramLevelCard({ level }: ProgramLevelCardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${borderColorClasses[level.color]} hover:scale-105`}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${colorClasses[level.color]} p-6 rounded-t-2xl text-white`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl sm:text-2xl font-bold">{level.name}</h3>
          <span className="text-sm sm:text-base font-medium bg-white/20 px-3 py-1 rounded-full">
            {level.duration}
          </span>
        </div>
        <p className="text-white/90 text-sm sm:text-base">{level.description}</p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Total Hours */}
        <div className="mb-4 sm:mb-6 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <span className="text-2xl font-bold text-gray-800">{level.totalHours}</span>
            <span className="text-gray-600 font-medium">Ώρες/Εβδομάδα</span>
          </div>
        </div>

        {/* Subjects (collapsible) */}
        <Accordion type="single" collapsible>
          <AccordionItem value="subjects">
            <AccordionTrigger className="px-3 text-base text-gray-800">
              Επίπεδα και Ώρες
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {level.subjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <div>
                        <h5 className="font-medium text-gray-800">{subject.name}</h5>
                        <p className="text-sm text-gray-600">{subject.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold text-gray-800">{subject.hours}</span>
                      <span className="text-sm text-gray-600">ώρες/εβδ</span>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* CTA Button */}
        <div className="mt-6">
          <button className={`w-full bg-gradient-to-r ${colorClasses[level.color]} text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}>
            Μάθετε Περισσότερα
          </button>
        </div>
      </div>
    </div>
  );
}
