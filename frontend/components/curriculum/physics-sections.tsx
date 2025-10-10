"use client";

import { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, BookOpen, Users, Atom } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
  level: 'basic' | 'intermediate' | 'advanced';
  prerequisites?: string[];
}

const physicsSections: Section[] = [
  {
    id: 'mechanics',
    title: 'Μηχανική',
    description: 'Θεμελιώδεις αρχές της κίνησης και δυνάμεων',
    duration: '12 ώρες',
    level: 'basic',
    topics: [
      'Κινηματική - κίνηση σε μία διάσταση',
      'Δυναμική - νόμοι του Newton',
      'Ενέργεια και έργο',
      'Ορμή και κρούσεις',
      'Ταλαντώσεις και απλό αρμονικό κίνηση',
      'Βαρυτική δύναμη και κίνηση πλανητών'
    ]
  },
  {
    id: 'thermodynamics',
    title: 'Θερμοδυναμική',
    description: 'Θερμότητα, θερμοκρασία και ενεργειακές μετατροπές',
    duration: '8 ώρες',
    level: 'intermediate',
    prerequisites: ['Μηχανική'],
    topics: [
      'Θερμοκρασία και θερμότητα',
      'Θερμοδυναμικοί νόμοι',
      'Εντροπία και ελεύθερη ενέργεια',
      'Θερμικές μηχανές',
      'Κινητική θεωρία αερίων',
      'Φάσεις της ύλης'
    ]
  },
  {
    id: 'waves',
    title: 'Κύματα & Ταλαντώσεις',
    description: 'Μηχανικά και ηλεκτρομαγνητικά κύματα',
    duration: '10 ώρες',
    level: 'intermediate',
    topics: [
      'Μηχανικά κύματα',
      'Ηχητικά κύματα',
      'Ηλεκτρομαγνητικά κύματα',
      'Φαινόμενα συμβολής και περίθλασης',
      'Διασπορά και πολωση',
      'Ακουστικά φαινόμενα'
    ]
  },
  {
    id: 'electricity',
    title: 'Ηλεκτρισμός',
    description: 'Ηλεκτρικά φαινόμενα και κυκλώματα',
    duration: '12 ώρες',
    level: 'intermediate',
    topics: [
      'Ηλεκτρικό φορτίο και πεδίο',
      'Ηλεκτρικό δυναμικό',
      'Ηλεκτρικό ρεύμα και αντίσταση',
      'Κυκλώματα DC και AC',
      'Καταχωρητές και πηνία',
      'Ηλεκτρική ενέργεια και ισχύς'
    ]
  },
  {
    id: 'magnetism',
    title: 'Μαγνητισμός',
    description: 'Μαγνητικά πεδία και ηλεκτρομαγνητισμός',
    duration: '8 ώρες',
    level: 'advanced',
    prerequisites: ['Ηλεκτρισμός'],
    topics: [
      'Μαγνητικά πεδία',
      'Ηλεκτρομαγνητική επαγωγή',
      'Νόμος του Faraday',
      'Μετασχηματιστές',
      'Ηλεκτρομαγνητικά κύματα',
      'Εφαρμογές μαγνητισμού'
    ]
  },
  {
    id: 'modern-physics',
    title: 'Σύγχρονη Φυσική',
    description: 'Ατομική, πυρηνική και κβαντική φυσική',
    duration: '10 ώρες',
    level: 'advanced',
    prerequisites: ['Μηχανική', 'Ηλεκτρισμός'],
    topics: [
      'Ατομική δομή και φάσματα',
      'Κβαντική μηχανική',
      'Πυρηνική φυσική',
      'Σχετικότητα',
      'Στοιχειώδη σωματίδια',
      'Αστροφυσική'
    ]
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'basic':
      return 'bg-green-100 text-green-800';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getLevelText = (level: string) => {
  switch (level) {
    case 'basic':
      return 'Βασικό';
    case 'intermediate':
      return 'Μεσαίο';
    case 'advanced':
      return 'Προχωρημένο';
    default:
      return 'Άγνωστο';
  }
};

export function PhysicsSections() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['mechanics']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const totalHours = physicsSections.reduce((sum, section) => {
    const hours = parseInt(section.duration.split(' ')[0]);
    return sum + hours;
  }, 0);

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <Atom className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Σύνοψη Προγράμματος</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">Συνολικές Ώρες:</span>
            <span className="font-semibold text-gray-900">{totalHours} ώρες</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-600">Ενότητες:</span>
            <span className="font-semibold text-gray-900">{physicsSections.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">Επίπεδα:</span>
            <span className="font-semibold text-gray-900">3</span>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {physicsSections.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          
          return (
            <div
              key={section.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-xl"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{section.title}</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(section.level)}`}>
                      {getLevelText(section.level)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{section.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{section.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{section.topics.length} θέματα</span>
                    </div>
                    {section.prerequisites && section.prerequisites.length > 0 && (
                      <div className="text-xs text-orange-600">
                        Προαπαιτούμενα: {section.prerequisites.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-4">
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4">
                    <h5 className="text-sm font-medium text-gray-900 mb-3">Θέματα που καλύπτονται:</h5>
                    <ul className="space-y-2">
                      {section.topics.map((topic, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E7B109] flex-shrink-0"></span>
                          <span className="text-sm text-gray-700">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Learning Path */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Συνιστώμενη Σειρά Μελέτης</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E7B109] text-white rounded-full flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <div>
              <p className="font-medium text-gray-900">Μηχανική</p>
              <p className="text-sm text-gray-600">Θεμελιώδεις αρχές κίνησης</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E7B109] text-white rounded-full flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <div>
              <p className="font-medium text-gray-900">Θερμοδυναμική</p>
              <p className="text-sm text-gray-600">Θερμότητα και ενέργεια</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E7B109] text-white rounded-full flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <div>
              <p className="font-medium text-gray-900">Κύματα & Ταλαντώσεις</p>
              <p className="text-sm text-gray-600">Μηχανικά και ηλεκτρομαγνητικά κύματα</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E7B109] text-white rounded-full flex items-center justify-center text-sm font-semibold">
              4
            </div>
            <div>
              <p className="font-medium text-gray-900">Ηλεκτρισμός</p>
              <p className="text-sm text-gray-600">Ηλεκτρικά φαινόμενα</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E7B109] text-white rounded-full flex items-center justify-center text-sm font-semibold">
              5
            </div>
            <div>
              <p className="font-medium text-gray-900">Μαγνητισμός</p>
              <p className="text-sm text-gray-600">Μαγνητικά πεδία</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E7B109] text-white rounded-full flex items-center justify-center text-sm font-semibold">
              6
            </div>
            <div>
              <p className="font-medium text-gray-900">Σύγχρονη Φυσική</p>
              <p className="text-sm text-gray-600">Ατομική και κβαντική φυσική</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
