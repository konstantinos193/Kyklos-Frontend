"use client";

import { useBlogPost } from "@/hooks/use-blog";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { post, isLoading, isError } = useBlogPost(slug);

  if (isError) {
    notFound();
  }

  if (isLoading) {
    return (
      <main className="min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('el-GR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-[#E7B109] hover:text-[#D97706] mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Επιστροφή στο Blog
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="bg-[#E7B109] text-white px-3 py-1 rounded-full text-xs font-semibold">
              {post.category}
            </span>
            <span>{formatDate(post.publishDate)}</span>
            {post.readTime && <span>• {post.readTime}</span>}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image?.url && (
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              src={post.image.url}
              alt={post.image.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 pb-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-700 mb-8 font-medium leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Main Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Ετικέτες:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-[#E7B109] hover:text-white transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author */}
          {post.author && (
            <div className="mt-12 pt-8 border-t border-gray-200 flex items-center gap-4">
              {post.author.image && (
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-600">Συγγραφέας</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

