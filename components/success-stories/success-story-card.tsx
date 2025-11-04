"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SuccessStory {
  id: string;
  studentName: string;
  university: string;
  ranking: string;
  scores: {
    subject: string;
    score: number;
  }[];
  question: string;
  answer: string;
  image: string;
}

interface SuccessStoryCardProps {
  stories: SuccessStory[];
}

export default function SuccessStoryCard({ stories }: SuccessStoryCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentStory = stories[currentIndex];

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const goToStory = (index: number) => {
    setCurrentIndex(index);
  };

  if (!stories.length) return null;

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Diagonal Split Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#E7B109] via-[#E7B109] to-transparent opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-gray-200 via-gray-200 to-transparent opacity-90"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-6">
              {/* Large Opening Quote */}
              <div className="text-6xl sm:text-8xl text-gray-800 font-bold leading-none">
                ""
              </div>

              {/* Question */}
              <div className="text-lg sm:text-xl text-gray-800 font-bold leading-relaxed" style={{fontFamily: 'Inter, system-ui, sans-serif'}}>
                {currentStory.question}
              </div>

              {/* Answer */}
              <div className="text-base sm:text-lg text-gray-700 leading-relaxed" style={{fontFamily: 'Georgia, serif'}}>
                "{currentStory.answer}"
              </div>

              {/* Large Closing Quote */}
              <div className="text-6xl sm:text-8xl text-[#E7B109] font-bold leading-none text-right">
                ""
              </div>
            </div>

            {/* Right Side - Student Info */}
            <div className="space-y-6">
              {/* Student Photo */}
              <div className="relative">
                <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={currentStory.image}
                    alt={currentStory.studentName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Student Details */}
              <div className="text-center space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {currentStory.studentName}
                </h3>
                <p className="text-lg text-gray-700">
                  {currentStory.university}
                </p>
                <p className="text-base text-[#E7B109] font-semibold">
                  {currentStory.ranking}
                </p>
              </div>

              {/* Scores */}
              {currentStory.scores && currentStory.scores.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {currentStory.scores.map((score, index) => (
                    <div key={index} className="bg-white/80 rounded-lg p-3 text-center">
                      <div className="text-sm text-gray-600">{score.subject}</div>
                      <div className="text-lg font-bold text-[#E7B109]">{score.score}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevStory}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors z-20"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={nextStory}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors z-20"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {stories.map((_, index) => (
          <button
            key={index}
            onClick={() => goToStory(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex
                ? 'bg-[#E7B109]'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
