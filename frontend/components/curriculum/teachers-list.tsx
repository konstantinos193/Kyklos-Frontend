"use client";

import { Mail, Phone, GraduationCap, Award, Clock, Star } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experience: number;
  education: string;
  email: string;
  phone: string;
  image?: string;
  rating: number;
  subjects: string[];
  availability: string;
  bio: string;
}

interface TeachersListProps {
  title: string;
  teachers: Teacher[];
}

export function TeachersList({ title, teachers }: TeachersListProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 lg:p-7 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap className="w-5 h-5 text-[#E7B109]" />
        <h3 className="text-base sm:text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              {/* Teacher Image */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-to-br from-[#E7B109] to-[#D97706] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {teacher.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>

              {/* Teacher Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                      {teacher.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {teacher.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {teacher.specialization}
                    </p>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {renderStars(teacher.rating)}
                    </div>
                    <span className="text-xs text-slate-500 ml-1">
                      ({teacher.rating}/5)
                    </span>
                  </div>
                </div>

                {/* Experience and Education */}
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    <span>{teacher.experience} χρόνια εμπειρία</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GraduationCap className="w-3 h-3" />
                    <span>{teacher.education}</span>
                  </div>
                </div>

                {/* Subjects */}
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1">
                    {teacher.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 mt-3 line-clamp-2">
                  {teacher.bio}
                </p>

                {/* Contact and Availability */}
                <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      <span>{teacher.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      <span>{teacher.phone}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>{teacher.availability}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-3">
                  <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-[#E7B109] bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors">
                    Επικοινωνία
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg font-semibold text-slate-900">{teachers.length}</p>
            <p className="text-xs text-slate-500">Διδάσκοντες</p>
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900">
              {teachers.reduce((sum, teacher) => sum + teacher.experience, 0) / teachers.length}
            </p>
            <p className="text-xs text-slate-500">Μέση Εμπειρία</p>
          </div>
        </div>
      </div>
    </div>
  );
}
