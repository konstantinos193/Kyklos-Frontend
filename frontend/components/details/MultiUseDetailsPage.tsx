import Image from 'next/image';
import Link from 'next/link';

interface CategoryItem {
  label: string;
  href: string;
}

interface LatestPostItem {
  href: string;
  title: string;
  thumbSrc?: string;
  thumbAlt?: string;
}

interface MultiUseDetailsPageProps {
  title: string;
  htmlContent: string;
  categories: CategoryItem[];
  latestPosts: LatestPostItem[];
}

export function MultiUseDetailsPage({ title, htmlContent, categories, latestPosts }: MultiUseDetailsPageProps) {
  return (
    <section className="blog-details-page py-10 md:py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="blog-details-content">
              <div className="details-content mt-6">
                <h3 className="title text-2xl md:text-3xl font-semibold text-gray-900">{title}</h3>
                <div className="prose prose-slate max-w-none mt-4 text-justify" dangerouslySetInnerHTML={{ __html: htmlContent }} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="blog-sidebar right-sidebar pt-4 lg:pt-5">
              <div className="blog-sidebar-category mt-6">
                <div className="sidebar-title">
                  <h4 className="title text-lg font-semibold text-gray-900">Επιτυχόντες</h4>
                </div>
                <ul className="category-items mt-3 space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.href}>
                      <div className="form-radio">
                        <label>
                          <Link href={cat.href} className="text-slate-700 hover:text-[#CE3B49] hover:underline">
                            {cat.label}
                          </Link>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="blog-sidebar-post mt-6">
                <div className="sidebar-title">
                  <h4 className="title text-lg font-semibold text-gray-900">Τελευταία Νέα</h4>
                </div>
                <ul className="post-items mt-3 space-y-4">
                  {latestPosts.map((post) => (
                    <li key={post.href}>
                      <div className="single-post flex items-center gap-3">
                        <div className="post-thumb flex-shrink-0">
                          <Link href={post.href} className="block h-[71px] w-[71px] overflow-hidden rounded">
                            {post.thumbSrc ? (
                              <Image src={post.thumbSrc} alt={post.thumbAlt || ''} width={71} height={71} className="h-[71px] w-[71px] object-cover" />
                            ) : (
                              <div className="h-[71px] w-[71px] bg-gray-200" />
                            )}
                          </Link>
                        </div>
                        <div className="post-content min-w-0">
                          <h4 className="post-title text-sm font-semibold text-gray-900 truncate">
                            <Link href={post.href} className="hover:underline">
                              {post.title}
                            </Link>
                          </h4>
                          <Link href={post.href} className="more mt-1 inline-flex items-center text-sm text-[#CE3B49] hover:underline">
                            Περισσότερα
                            <svg className="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MultiUseDetailsPage;


