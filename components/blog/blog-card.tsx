"use client";

import { BlogPost } from "./types";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('el-GR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article 
      className="group animate-fadeInUp"
      style={{
        animationDelay: `${index * 150}ms`,
        animationFillMode: 'both'
      }}
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-2 border border-gray-100">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-[#E7B109] text-white px-3 py-1 rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#E7B109] transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-medium hover:bg-[#E7B109] hover:text-white transition-colors duration-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author & Meta */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                <p className="text-xs text-gray-500">{formatDate(post.publishDate)}</p>
              </div>
            </div>
            <div className="text-sm text-gray-500 font-medium">
              {post.readTime}
            </div>
          </div>

          {/* Read More Button */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <a
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-[#E7B109] hover:text-[#D97706] font-semibold text-sm transition-colors duration-300 group-hover:gap-3"
            >
              Διαβάστε Περισσότερα
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
