"use client";
import Link from "next/link";
import { BookOpenIcon, GraduationCapIcon, TargetIcon } from "@/components/icons";
import { AboutBanner } from "@/components/about/about-banner";
import { useState } from "react";
import { curriculumSections } from "@/components/curriculum/data";
import { CurriculumSectionView } from "@/components/curriculum/section";
import { SubjectCard } from "@/components/curriculum/subject-card";

export default function CurriculumPage() {
  const subjects = [
    { href: "/curriculum/mathematics", label: "Μαθηματικά", description: "Άλγεβρα, Γεωμετρία, Ανάλυση" },
    { href: "/curriculum/physics", label: "Φυσική", description: "Μηχανική, Ηλεκτρομαγνητισμός, Κύματα" },
    { href: "/curriculum/chemistry", label: "Χημεία", description: "Οργανική, Ανόργανη, Φυσικοχημεία" },
    { href: "/curriculum/biology", label: "Βιολογία", description: "Κυτταρική, Γενετική, Οικολογία" },
    { href: "/curriculum/algebra", label: "Άλγεβρα", description: "Εξισώσεις, συναρτήσεις, ανισότητες" },
    { href: "/curriculum/geometry", label: "Γεωμετρία", description: "Θεωρήματα, αποδείξεις, στερεομετρία" },
    { href: "/curriculum/ancient-greek", label: "Αρχαία", description: "Γραμματική, συντακτικό, μετάφραση" },
    { href: "/curriculum/greek-literature", label: "Έκθεση - Λογοτεχνία", description: "Κατανόηση κειμένου, παραγωγή λόγου" },
    { href: "/curriculum/history", label: "Ιστορία", description: "Ελληνική και παγκόσμια ιστορία" },
    { href: "/curriculum/latin", label: "Λατινικά", description: "Μετάφραση, γραμματική, συντακτικό" },
    { href: "/curriculum/economics", label: "ΑΟΘ / Οικονομικά", description: "Μικρο/μακροοικονομία" },
    { href: "/curriculum/informatics", label: "Πληροφορική", description: "Ανάπτυξη εφαρμογών" },
  ];

  return (
    <main className="relative">
      {/* Banner matching About styling */}
      <AboutBanner
        title="Πρόγραμμα Σπουδών"
        backgroundImage={
          "https://placehold.co/1600x500/E7B109/FFFFFF?text=%CE%A0%CF%81%CF%8C%CE%B3%CF%81%CE%B1%CE%BC%CE%BC%CE%B1+%CE%A3%CF%80%CE%BF%CF%85%CE%B4%CF%8E%CE%BD"
        }
        overlayOpacity={0.35}
      />

      {/* Subjects */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {subjects.map((s, i) => {
            const palettes = [
              { bg: "F3F4F6", fg: "1F2937" }, // gray
              { bg: "FFE4E6", fg: "9F1239" }, // rose
              { bg: "E0F2FE", fg: "0369A1" }, // sky
              { bg: "ECFDF5", fg: "065F46" }, // emerald
              { bg: "FEF3C7", fg: "92400E" }, // amber
              { bg: "EDE9FE", fg: "5B21B6" }, // violet
            ];
            const pal = palettes[i % palettes.length];
            const text = encodeURIComponent(s.label);
            const imageUrl = `https://placehold.co/800x320/${pal.bg}/${pal.fg}?text=${text}`;
            return (
              <SubjectCard
                key={s.href}
                href={s.href}
                title={s.label}
                description={s.description}
                icon={(i % 3 === 0 ? "book" : i % 3 === 1 ? "cap" : "target") as any}
                imageUrl={imageUrl}
              />
            );
          })}
        </div>
      </section>

      {/* Curriculum Sections with Tabs */}
      <SectionsTabs />
    </main>
  );
}

function SectionsTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Αναλυτικό Πρόγραμμα</h2>
        <span className="text-[11px] sm:text-xs text-slate-500">ώρες/εβδομάδα</span>
      </div>

      <div className="mt-4 overflow-x-auto">
        <div className="inline-flex min-w-full gap-2 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          {curriculumSections.map((s, idx) => (
            <button
              key={s.title}
              onClick={() => setActiveIndex(idx)}
              className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeIndex === idx
                  ? "bg-gradient-to-r from-[#CE3B49] to-[#FF6B6B] text-white"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <CurriculumSectionView section={curriculumSections[activeIndex]} />
      </div>
    </section>
  );
}