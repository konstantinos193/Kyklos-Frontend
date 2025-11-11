"use client";

import { useNewsPost } from "@/hooks/use-news";
import { useParams, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function NewsPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const { post, isLoading, isError } = useNewsPost(slug);

  if (isError) {
    notFound();
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="h-64 sm:h-96 bg-gray-200 rounded mb-8"></div>
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

  const getCategoryLabel = (type: string) => {
    switch (type) {
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

  const getCategoryPath = (type: string) => {
    switch (type) {
      case 'announcement':
        return '/news/announcements';
      case 'event':
        return '/news/events';
      case 'seminar':
        return '/news/seminars';
      case 'education':
        return '/current-affairs/education';
      case 'universities':
        return '/current-affairs/universities';
      default:
        return '/news';
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Link 
            href={getCategoryPath(post.type)}
            className="inline-flex items-center gap-2 text-[#E7B109] hover:text-[#D97706] mb-4 sm:mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm sm:text-base">Επιστροφή στα Νέα</span>
          </Link>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
            <span className="bg-[#E7B109] text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
              {getCategoryLabel(post.type)}
            </span>
            <span className="whitespace-nowrap">{formatDate(post.publishDate || post.createdAt)}</span>
            {post.readTime && <span className="whitespace-nowrap">• {post.readTime}</span>}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image?.url && (
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="relative w-full h-48 sm:h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={post.image.url}
              alt={post.image.alt || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
            />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pb-12">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 font-medium leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Main Content */}
          <div 
            className="prose prose-sm sm:prose-base md:prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-[#E7B109] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-img:rounded-lg prose-img:shadow-md"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Ετικέτες:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-xs sm:text-sm font-medium hover:bg-[#E7B109] hover:text-white transition-colors cursor-default"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author */}
          {post.author && (
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 flex items-center gap-4">
              {post.author.image && (
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">{post.author.name}</p>
                <p className="text-xs sm:text-sm text-gray-600">Συγγραφέας</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

