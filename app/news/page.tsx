"use client";

import Link from "next/link";
import { AboutBanner } from "@/components/about/about-banner";
import { useNewsPosts } from "@/hooks/use-news";
import { BlogCard } from "@/components/blog/blog-card";

export default function NewsPage() {
  const { posts, isLoading } = useNewsPosts({ limit: 12 });

  const categories = [
    { 
      href: "/news/announcements", 
      label: "Ανακοινώσεις", 
      description: "Σημαντικές ανακοινώσεις και ενημερώσεις",
      type: "announcement" as const
    },
    { 
      href: "/news/events", 
      label: "Εκδηλώσεις - Φωτογραφίες", 
      description: "Εκδηλώσεις και φωτογραφίες από τις δραστηριότητες μας",
      type: "event" as const
    },
    { 
      href: "/news/seminars", 
      label: "Σεμινάρια", 
      description: "Εκπαιδευτικά σεμινάρια και εργαστήρια",
      type: "seminar" as const
    },
  ];

  return (
    <main>
      <AboutBanner
        title="Νέα - Εκδηλώσεις"
        backgroundImage={
          "https://placehold.co/1600x500/E7B109/FFFFFF?text=%CE%9D%CE%AD%CE%B1+%CE%95%CE%BA%CE%B4%CE%B7%CE%BB%CF%8E%CF%83%CE%B5%CE%B9%CF%82"
        }
        overlayOpacity={0.35}
      />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Κατηγορίες</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((c) => (
            <Link key={c.href} href={c.href} className="group block">
              <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#B91C1C]">{c.label}</h3>
                <p className="mt-1 text-sm text-gray-600">{c.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#B91C1C]">
                  Δείτε περισσότερα
                  <span aria-hidden>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-slate-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Τελευταία Νέα</h2>
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
                    category: post.type === 'announcement' ? 'Ανακοίνωση' : post.type === 'event' ? 'Εκδήλωση' : 'Σεμινάριο',
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
            <p className="text-gray-600">Δεν υπάρχουν διαθέσιμα νέα αυτή τη στιγμή.</p>
          </div>
        )}
      </section>
    </main>
  );
}

