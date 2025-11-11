"use client";

import { AboutBanner } from "@/components/about/about-banner";
import { useEducationNews } from "@/hooks/use-news";
import { NewsCard } from "@/components/news/news-card";

export default function EducationNewsPage() {
  const { posts, isLoading } = useEducationNews();

  return (
    <main>
      <AboutBanner
        title="Εκπαιδευτικά Νέα"
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any, index: number) => (
              <NewsCard 
                key={post._id || index}
                post={{
                  ...post,
                  category: 'Εκπαιδευτικά Νέα',
                  type: 'education',
                  author: post.author?.name || 'ΚΥΚΛΟΣ',
                  authorImage: post.author?.image || '/logo.png',
                  image: post.image?.url || '/logo.png',
                  slug: post.slug || post._id,
                }}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Δεν υπάρχουν διαθέσιμα εκπαιδευτικά νέα αυτή τη στιγμή.</p>
          </div>
        )}
      </section>
    </main>
  );
}


