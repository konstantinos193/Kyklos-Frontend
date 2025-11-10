"use client";

import { AboutBanner } from "@/components/about/about-banner";
import { useAnnouncements } from "@/hooks/use-news";
import { BlogCard } from "@/components/blog/blog-card";

export default function AnnouncementsPage() {
  const { posts, isLoading } = useAnnouncements();

  return (
    <main>
      <AboutBanner
        title="Ανακοινώσεις"
        backgroundImage={
          "https://placehold.co/1600x500/E7B109/FFFFFF?text=%CE%91%CE%BD%CE%B1%CE%BA%CE%BF%CE%B9%CE%BD%CF%8E%CF%83%CE%B5%CE%B9%CF%82"
        }
        overlayOpacity={0.35}
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
              <div key={post._id || index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <BlogCard 
                  post={{
                    ...post,
                    category: 'Ανακοίνωση',
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Δεν υπάρχουν διαθέσιμες ανακοινώσεις αυτή τη στιγμή.</p>
          </div>
        )}
      </section>
    </main>
  );
}

