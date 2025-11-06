"use client";
import { lazy, Suspense } from "react";
import { SubjectCard } from "@/components/curriculum/subject-card";

const SectionsTabs = lazy(() => import("@/components/curriculum/sections-tabs").then(m => ({ default: m.SectionsTabs })));

// Move imageMap outside component to avoid recreation on every render
const IMAGE_MAP: Record<string, string> = {
  "Μαθηματικά": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=320&fit=crop",
  "Φυσική": "https://thumbs.dreamstime.com/b/physics-wall-equations-written-famous-black-board-193222178.jpg",
  "Χημεία": "https://plus.unsplash.com/premium_photo-1661434779070-cf8fc0e253ab?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Βιολογία": "https://cdn.pixabay.com/photo/2018/07/15/10/44/dna-3539309_640.jpg",
  "Άλγεβρα": "https://cdn.pixabay.com/photo/2015/11/15/07/47/geometry-1044090_1280.jpg",
  "Γεωμετρία": "https://img.freepik.com/premium-photo/mathematical-geometry-shapes-dark-background-3d-render_975254-1828.jpg?semt=ais_hybrid&w=740&q=80",
  "Αρχαία": "https://www.postposmo.com/wp-content/uploads/2021/02/PINTURA-ROMANA-3.jpeg",
  "Έκθεση - Λογοτεχνία": "/logotenxeia.png",
  "Ιστορία": "https://images.stockcake.com/public/f/6/5/f6504098-3aee-4cad-a8cd-96aef63eaeb7_large/historical-artifact-display-stockcake.jpg",
  "Λατινικά": "https://upload.wikimedia.org/wikipedia/commons/f/f5/Aristotle_latin_manuscript.jpg",
  "ΑΟΘ / Οικονομικά": "https://img.freepik.com/free-vector/hand-drawn-flat-design-stock-market-concept_23-2149154264.jpg",
  "Πληροφορική": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2F6c41P3JIMTpPP1sMciktCZ_LG6eX3pnag&s",
};

const SUBJECTS = [
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

export default function CurriculumPage() {
  return (
    <main className="relative">
      {/* Banner - custom hero markup */}
      <div className="relative w-full bg-gradient-to-tr from-[#0f172a] via-[#1f2937] to-[#E7B109]">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px, 24px 24px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#0b1c2a', opacity: 0.35 }}
        />
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl">
            <div className="text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">Πρόγραμμα Σπουδών</h1>
              <div className="mt-4 h-1 w-20 bg-gradient-to-r from-[#CF3B49] to-[#E7B109] rounded-full"></div>
              <p className="mt-4 text-sm sm:text-base text-white/80 max-w-2xl">
                Σύγχρονο πρόγραμμα σπουδών με εξατομικευμένη υποστήριξη, στοχευμένη προετοιμασία και μετρήσιμα αποτελέσματα.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-1 w-full bg-gradient-to-r from-[#CF3B49] to-[#E7B109]"></div>
        </div>
      </div>

      {/* Subjects */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {SUBJECTS.map((s, i) => {
            const imageUrl = IMAGE_MAP[s.label] || "https://source.unsplash.com/800x320/?education,school";
            return (
              <SubjectCard
                key={s.href}
                href={s.href}
                title={s.label}
                description={s.description}
                icon={(i % 3 === 0 ? "book" : i % 3 === 1 ? "cap" : "target") as any}
                imageUrl={imageUrl}
                priority={i < 4}
              />
            );
          })}
        </div>
      </section>

      {/* Curriculum Sections with Tabs */}
      <Suspense fallback={<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">Loading...</div>}>
        <SectionsTabs />
      </Suspense>
    </main>
  );
}