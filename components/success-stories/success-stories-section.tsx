"use client";

import SuccessStoryCard from './success-story-card';
import { successStories } from './success-stories-data';

export default function SuccessStoriesSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ιστορίες Επιτυχίας
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Διαβάστε τις εμπειρίες των μαθητών μας που πέτυχαν τα στόχους τους 
            και εισήλθαν στα πανεπιστήμια των ονείρων τους
          </p>
        </div>

        {/* Success Stories Carousel */}
        <SuccessStoryCard stories={successStories} />

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Θέλετε να γίνετε η επόμενη ιστορία επιτυχίας;
            </h3>
            <p className="text-gray-600 mb-6">
              Εγγραφείτε στο ΚΥΚΛΟΣ Φροντιστήριο και ξεκινήστε το ταξίδι προς την επιτυχία σας
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#E7B109] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#D97706] transition-colors">
                Εγγραφή Τώρα
              </button>
              <button className="border-2 border-[#E7B109] text-[#E7B109] px-8 py-3 rounded-lg font-semibold hover:bg-[#E7B109] hover:text-white transition-colors">
                Μάθετε Περισσότερα
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
