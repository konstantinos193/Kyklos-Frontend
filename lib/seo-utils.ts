import { Metadata } from "next";

const BASE_URL = "https://kyklosedu.gr";
const SITE_NAME = "ΚΥΚΛΟΣ Φροντιστήριο Άρτα";
const DEFAULT_IMAGE = "/logo.png";

export interface PageSEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  image?: string;
  type?: "website" | "article" | "course";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
}

export function generateMetadata(config: PageSEOConfig): Metadata {
  const url = `${BASE_URL}${config.path}`;
  const imageUrl = config.image 
    ? (config.image.startsWith("http") ? config.image : `${BASE_URL}${config.image}`)
    : `${BASE_URL}${DEFAULT_IMAGE}`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: url,
      languages: {
        "el-GR": url,
      },
    },
    openGraph: {
      type: config.type === "course" ? "website" : (config.type || "website"),
      locale: "el_GR",
      url: url,
      siteName: SITE_NAME,
      title: config.title,
      description: config.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      ...(config.publishedTime && { publishedTime: config.publishedTime }),
      ...(config.modifiedTime && { modifiedTime: config.modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [imageUrl],
      creator: "@kyklosedu",
    },
    robots: config.noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    other: {
      "geo.region": "GR-31",
      "geo.placename": "Άρτα",
      "geo.position": "39.1609;20.9856",
      "ICBM": "39.1609, 20.9856",
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${BASE_URL}#organization`,
    name: "ΚΥΚΛΟΣ Εκπαίδευση",
    alternateName: "Φροντιστήριο Κύκλος",
    description: "Εξειδικευμένο φροντιστήριο Ελληνικής Γλώσσας & Λογοτεχνίας. 30+ έτη εμπειρίας, 95% επιτυχία, 500+ μαθητές.",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/logo.png`,
    telephone: "+302681026671",
    email: "grkyklos-@hotmail.gr",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Βασιλέως Κωνσταντίνου 42",
      addressLocality: "Άρτα",
      addressRegion: "Ήπειρος",
      postalCode: "47100",
      addressCountry: "GR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.1609,
      longitude: 20.9856,
    },
    foundingDate: "1999",
    numberOfEmployees: "5-10",
    areaServed: {
      "@type": "City",
      name: "Άρτα, Greece",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+30-26810-26671",
      contactType: "customer service",
      areaServed: "GR",
      availableLanguage: ["Greek"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "15:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/kyklosedu",
      "https://www.instagram.com/kyklosedu",
      "https://twitter.com/kyklosedu",
      "https://linkedin.com/company/kyklosedu",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}#localbusiness`,
    name: "ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
    image: `${BASE_URL}/logo.png`,
    url: BASE_URL,
    telephone: "+302681026671",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Βασιλέως Κωνσταντίνου 42",
      addressLocality: "Άρτα",
      addressRegion: "Ήπειρος",
      postalCode: "47100",
      addressCountry: "GR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.1609,
      longitude: 20.9856,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "21:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "15:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
    },
  };
}

export interface CourseSchemaConfig {
  name: string;
  description: string;
  provider: string;
  courseCode?: string;
  educationalLevel?: string;
  teaches?: string[];
  url: string;
}

export function generateCourseSchema(config: CourseSchemaConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: config.name,
    description: config.description,
    provider: {
      "@type": "EducationalOrganization",
      name: config.provider,
      url: BASE_URL,
    },
    ...(config.courseCode && { courseCode: config.courseCode }),
    ...(config.educationalLevel && { educationalLevel: config.educationalLevel }),
    ...(config.teaches && { teaches: config.teaches }),
    url: `${BASE_URL}${config.url}`,
    inLanguage: "el",
    isAccessibleForFree: false,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "50",
    },
  };
}

export interface ArticleSchemaConfig {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}

export function generateArticleSchema(config: ArticleSchemaConfig) {
  const imageUrl = config.image
    ? (config.image.startsWith("http") ? config.image : `${BASE_URL}${config.image}`)
    : `${BASE_URL}${DEFAULT_IMAGE}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: config.headline,
    description: config.description,
    image: imageUrl,
    datePublished: config.datePublished,
    dateModified: config.dateModified || config.datePublished,
    author: {
      "@type": "Organization",
      name: config.author,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${config.url}`,
    },
    inLanguage: "el",
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateWebPageSchema(config: {
  name: string;
  description: string;
  url: string;
  breadcrumb?: BreadcrumbItem[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.name,
    description: config.description,
    url: `${BASE_URL}${config.url}`,
    inLanguage: "el",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: BASE_URL,
    },
    ...(config.breadcrumb && {
      breadcrumb: generateBreadcrumbSchema(config.breadcrumb),
    }),
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    inLanguage: "el-GR",
    description: "Εξειδικευμένο φροντιστήριο Ελληνικής Γλώσσας & Λογοτεχνίας. Γυμνάσιο, Λύκειο, ΕΠΑΛ. Άρτα.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Speakable schema for voice search (Google Assistant, etc.).
 * Pass an array of short text snippets that summarize the page for voice answers.
 */
export function generateSpeakableSchema(config: { speakable: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: config.speakable.map((text) => ({
      "@type": "SpeakableSpecification",
      text,
    })),
  };
}

