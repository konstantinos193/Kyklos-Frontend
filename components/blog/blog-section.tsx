"use client";

import { BlogHeader } from "./blog-header";
import { BlogGrid } from "./blog-grid";
import { blogContent } from "./data";
import { useBlogPosts } from "@/hooks/use-blog";

export function BlogSection() {
  // Use optimized hook to fetch blog posts
  const { posts, isLoading, isError } = useBlogPosts({ limit: 6 });
  
  // Don't show anything while loading or if no posts/error
  // This prevents the skeleton loading flash
  if (isLoading || !posts || posts.length === 0 || isError) {
    return null;
  }

  return (
    <section className="relative py-24 bg-slate-200 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-[#CE3B49]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#CE3B49]/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-blue-500/20 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-purple-500/30 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <BlogHeader 
          title={blogContent.title}
          subtitle={blogContent.subtitle}
        />
        
        {/* Blog Grid */}
        <BlogGrid posts={posts} />

        {/* View All Button */}
        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#E7B109] via-[#CE3B49] to-[#D97706] hover:from-[#D97706] hover:via-[#B45309] hover:to-[#CE3B49] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Δείτε Όλα τα Άρθρα
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Decorative Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 text-white" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>
    </section>
  );
}
