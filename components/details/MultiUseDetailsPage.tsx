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
  latestPosts?: LatestPostItem[];
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MultiUseDetailsPage;


