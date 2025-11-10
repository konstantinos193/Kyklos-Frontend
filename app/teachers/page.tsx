import { TeachersBanner } from "@/components/teachers/teachers-banner";
import { AboutStaff } from "@/components/about/about-staff";
import { generateMetadata as generateSEOMetadata, generateWebPageSchema, generateBreadcrumbSchema } from "@/lib/seo-utils";
import { Metadata } from "next";

export const metadata: Metadata = generateSEOMetadata({
  title: "Καθηγητές | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
  description: "Γνωρίστε τους εξειδικευμένους καθηγητές του ΚΥΚΛΟΣ Φροντιστήριου στην Άρτα! Εμπειροι επαγγελματίες με αποδεδειγμένη εμπειρία σε όλα τα μαθήματα. Μαθηματικά, Φυσική, Χημεία, Φιλολογία, Οικονομικά και Πληροφορική.",
  keywords: [
    "καθηγητές φροντιστηρίου άρτα",
    "μαθηματικοί καθηγητές",
    "φυσικοί καθηγητές",
    "χημικοί καθηγητές",
    "φιλόλογοι καθηγητές",
    "οικονομικοί καθηγητές",
    "πληροφορική καθηγητές",
    "εκπαιδευτικό προσωπικό άρτα",
    "εξειδικευμένοι καθηγητές",
    "εμπειρία καθηγητών",
    "φροντιστήριο κύκλος καθηγητές",
  ],
  path: "/teachers",
  type: "website",
});

export default function TeachersPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Αρχική", url: "/" },
    { name: "Καθηγητές", url: "/teachers" },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Καθηγητές | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
    description: "Γνωρίστε τους εξειδικευμένους καθηγητές του ΚΥΚΛΟΣ Φροντιστήριου στην Άρτα!",
    url: "/teachers",
    breadcrumb: [
      { name: "Αρχική", url: "/" },
      { name: "Καθηγητές", url: "/teachers" },
    ],
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <main className="min-h-screen">
        <TeachersBanner 
          title="Οι Καθηγητές μας"
          description="Εξειδικευμένοι καθηγητές με αποδεδειγμένη εμπειρία σε όλα τα μαθήματα. Προσωπική προσέγγιση, σύγχρονες μεθόδους διδασκαλίας και αφοσίωση στην επιτυχία κάθε μαθητή."
        />
        <AboutStaff />
      </main>
    </>
  );
}

