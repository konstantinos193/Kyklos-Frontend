"use client";

import Image from "next/image";
import Link from "next/link";

interface NewsPost {
  _id?: string;
  id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  author?: string | { name: string; image?: string };
  authorImage?: string;
  publishDate: string;
  readTime?: string;
  category?: string;
  type?: 'announcement' | 'event' | 'seminar' | 'education' | 'universities';
  image?: string | { url: string; alt?: string };
  tags?: string[];
  slug?: string;
}

interface NewsCardProps {
  post: NewsPost;
  index: number;
}

export function NewsCard({ post, index }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('el-GR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageUrl = () => {
    if (typeof post.image === 'string') return post.image;
    return post.image?.url || '/logo.png';
  };

  const getImageAlt = () => {
    if (typeof post.image === 'object' && post.image?.alt) return post.image.alt;
    return post.title;
  };

  const getAuthorName = () => {
    if (typeof post.author === 'object') return post.author.name;
    return post.author || 'ΚΥΚΛΟΣ';
  };

  const getAuthorImage = () => {
    if (typeof post.author === 'object' && post.author.image) return post.author.image;
    return post.authorImage || '/logo.png';
  };

  const getSlug = () => {
    return post.slug || post._id || post.id || '';
  };

  const getCategoryLabel = () => {
    if (post.category) return post.category;
    switch (post.type) {
      case 'announcement':
        return 'Ανακοίνωση';
      case 'event':
        return 'Εκδήλωση';
      case 'seminar':
        return 'Σεμινάριο';
      case 'education':
        return 'Εκπαιδευτικά Νέα';
      case 'universities':
        return 'Πανεπιστήμια';
      default:
        return 'Νέα';
    }
  };

  return (
    <article 
      className="group animate-fadeInUp h-full flex flex-col"
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'both'
      }}
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden">
          <div className="relative w-full h-48 sm:h-56">
            <Image
              src={getImageUrl()}
              alt={getImageAlt()}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
            />
          </div>
          <div className="absolute top-4 left-4">
            <span className="bg-[#E7B109] text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              {getCategoryLabel()}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#E7B109] transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-3 leading-relaxed text-sm sm:text-base flex-1">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              {post.tags.slice(0, 3).map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-medium hover:bg-[#E7B109] hover:text-white transition-colors duration-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author & Meta */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                <Image
                  src={getAuthorImage()}
                  alt={getAuthorName()}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-gray-900">{getAuthorName()}</p>
                <p className="text-xs text-gray-500">{formatDate(post.publishDate)}</p>
              </div>
            </div>
            {post.readTime && (
              <div className="text-xs sm:text-sm text-gray-500 font-medium">
                {post.readTime}
              </div>
            )}
          </div>

          {/* Read More Button */}
          <div className="pt-3 sm:pt-4 border-t border-gray-100 mt-auto">
            <Link
              href={`/news/${getSlug()}`}
              className="inline-flex items-center gap-2 text-[#E7B109] hover:text-[#D97706] font-semibold text-xs sm:text-sm transition-colors duration-300 group-hover:gap-3"
            >
              Διαβάστε Περισσότερα
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

