"use client";

import { AboutBanner } from "@/components/about/about-banner";
import { useBlogPosts } from "@/hooks/use-blog";
import { BlogCard } from "@/components/blog/blog-card";
import { useState } from "react";
import { generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo-utils";

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { posts, pagination, isLoading } = useBlogPosts({ 
    page, 
    limit: 12,
    search: searchTerm || undefined 
  });

  // Structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Αρχική", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Blog | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
    description: "Διαβάστε τα τελευταία άρθρα και νέα από το ΚΥΚΛΟΣ Φροντιστήριο στην Άρτα. Εκπαιδευτικό υλικό, συμβουλές για τις πανελλήνιες εξετάσεις και νέα για τον εκπαιδευτικό τομέα.",
    url: "/blog",
    breadcrumb: [
      { name: "Αρχική", url: "/" },
      { name: "Blog", url: "/blog" },
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
      <main>
      <AboutBanner
        title="Blog"
        backgroundImage={
          "https://placehold.co/1600x500/E7B109/FFFFFF?text=Blog"
        }
        overlayOpacity={0.35}
      />

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-gray-600 leading-relaxed">
            Καλώς ήρθατε στο blog του φροντηστηρίου ΚΥΚΛΟΣ! Εδώ θα βρείτε εκπαιδευτικά άρθρα, 
            συμβουλές για τις πανελλήνιες εξετάσεις, νέα για τον εκπαιδευτικό τομέα και χρήσιμες πληροφορίες 
            για μαθητές και γονείς. Η ομάδα των καθηγητών μας μοιράζεται την εμπειρία της για να σας βοηθήσει 
            να πετύχετε τους εκπαιδευτικούς σας στόχους.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Αναζήτηση άρθρων..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-[#E7B109] outline-none"
          />
        </div>
      </section>

      {/* Blog Posts */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-slate-50">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any, index: number) => (
                <div key={post._id || index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <BlogCard 
                    post={{
                      ...post,
                      author: post.author?.name || 'ΚΥΚΛΟΣ',
                      authorImage: post.author?.image || '/logo.png',
                      image: post.image?.url || '/logo.png',
                      slug: post.slug || post._id,
                    }}
                    index={index}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={!pagination.hasPrev}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Προηγούμενο
                </button>
                <span className="px-4 py-2">
                  Σελίδα {pagination.current} από {pagination.pages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                  disabled={!pagination.hasNext}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Επόμενο
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              {searchTerm ? "Δεν βρέθηκαν άρθρα για την αναζήτησή σας." : "Δεν υπάρχουν διαθέσιμα άρθρα αυτή τη στιγμή."}
            </p>
            {!searchTerm && (
              <div className="space-y-4">
                <p className="text-gray-500">
                  Εξερευνήστε τις ενότητες του φροντηστηρίου μας:
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a href="/curriculum" className="inline-flex items-center px-4 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#d4a008] transition-colors">
                    Πρόγραμμα Σπουδών
                  </a>
                  <a href="/current-affairs" className="inline-flex items-center px-4 py-2 bg-[#CE3B49] text-white rounded-lg hover:bg-[#b83442] transition-colors">
                    Επικαιρότητα
                  </a>
                  <a href="/contact" className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Επικοινωνία
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
    </>
  );
}

