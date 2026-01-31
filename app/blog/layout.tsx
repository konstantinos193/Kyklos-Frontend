import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = generateSEOMetadata({
  title: "Blog | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
  description: "Άρθρα, συμβουλές και νέα από το ΚΥΚΛΟΣ Φροντιστήριο Άρτα. Εκπαίδευση, πανελλήνιες, γυμνάσιο, λύκειο.",
  path: "/blog",
  keywords: ["blog φροντιστήριο", "εκπαίδευση άρτα", "πανελλήνιες", "συμβουλές μαθητών"],
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
