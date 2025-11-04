import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1e40af" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://kyklosedu.gr"),
  title: {
    default: "ΚΥΚΛΟΣ Φροντιστήριο Άρτα | Γυμνάσιο Λύκειο ΕΠΑΛ | 95% Επιτυχία",
    template: "%s | ΚΥΚΛΟΣ Φροντιστήριο Άρτα"
  },
  description:
    "Κορυφαίο φροντιστήριο στην Άρτα! Μαθηματικά, Φυσική, Χημεία, Βιολογία, Ελληνική Γλώσσα, Λογοτεχνία, Αρχαία, Ιστορία, Λατινικά, ΑΟΘ, Πληροφορική. Γυμνάσιο, Λύκειο, ΕΠΑΛ. 25+ χρόνια εμπειρίας, 95% επιτυχία στις Πανελλαδικές εξετάσεις. Προετοιμασία για όλες τις κατευθύνσεις.",
  keywords: [
    "φροντιστήριο άρτα",
    "φροντιστήριο ελληνομάθεια άρτα",
    "ελληνική γλώσσα άρτα", 
    "λογοτεχνία άρτα",
    "μαθηματικά άρτα",
    "φυσική άρτα",
    "χημεία άρτα",
    "βιολογία άρτα",
    "αρχαία άρτα",
    "ιστορία άρτα",
    "λατινικά άρτα",
    "αοθ άρτα",
    "πληροφορική άρτα",
    "γυμνάσιο άρτα",
    "λύκειο άρτα",
    "επαλ άρτα",
    "πανελλήνιες εξετάσεις άρτα",
    "φροντιστήριο κύκλος άρτα",
    "kyklosedu",
    "μαθησιακό κέντρο άρτα",
    "ελληνικά μαθήματα άρτα",
    "γλωσσική εκπαίδευση άρτα",
    "φιλολογική εκπαίδευση άρτα",
    "θετικές επιστήμες άρτα",
    "θεωρητική κατεύθυνση άρτα",
    "υγείας κατεύθυνση άρτα",
    "οικονομίας κατεύθυνση άρτα",
    "φροντιστήριο βασιλέως κωνσταντίνου",
    "φροντιστήριο κέντρο άρτας",
    "ελληνική γλώσσα γυμνάσιο",
    "ελληνική γλώσσα λύκειο",
    "λογοτεχνία γυμνάσιο",
    "λογοτεχνία λύκειο",
    "μαθηματικά γυμνάσιο",
    "μαθηματικά λύκειο",
    "φυσική γυμνάσιο",
    "φυσική λύκειο",
    "χημεία γυμνάσιο",
    "χημεία λύκειο",
    "πανελλήνιες 2024",
    "πανελλήνιες 2025",
    "εξετάσεις γυμνασίου",
    "εξετάσεις λυκείου",
    "μαθησιακό κέντρο ελληνομάθεια",
    "φροντιστήριο επαγγελματικής εκπαίδευσης",
    "φροντιστήριο δευτεροβάθμιας εκπαίδευσης",
    "φροντιστήριο θετικές επιστήμες",
    "φροντιστήριο θεωρητική κατεύθυνση",
    "φροντιστήριο υγείας κατεύθυνση",
    "φροντιστήριο οικονομίας κατεύθυνση"
  ],
  authors: [{ name: "ΚΥΚΛΟΣ Εκπαίδευση", url: "https://kyklosedu.gr" }],
  creator: "ΚΥΚΛΟΣ Εκπαίδευση",
  publisher: "ΚΥΚΛΟΣ Εκπαίδευση",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://kyklosedu.gr",
    languages: {
      "el-GR": "https://kyklosedu.gr",
    },
  },
  openGraph: {
    type: "website",
    locale: "el_GR",
    url: "https://kyklosedu.gr",
    siteName: "ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
    title: "ΚΥΚΛΟΣ Φροντιστήριο Άρτα | Γυμνάσιο Λύκειο ΕΠΑΛ | 95% Επιτυχία",
    description: "Κορυφαίο φροντιστήριο στην Άρτα! Μαθηματικά, Φυσική, Χημεία, Βιολογία, Ελληνική Γλώσσα, Λογοτεχνία, Αρχαία, Ιστορία, Λατινικά, ΑΟΘ, Πληροφορική. Γυμνάσιο, Λύκειο, ΕΠΑΛ. 25+ χρόνια εμπειρίας, 95% επιτυχία στις Πανελλαδικές εξετάσεις.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "ΚΥΚΛΟΣ Φροντιστήριο Άρτα - Γυμνάσιο Λύκειο ΕΠΑΛ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ΚΥΚΛΟΣ Φροντιστήριο Άρτα | Γυμνάσιο Λύκειο ΕΠΑΛ | 95% Επιτυχία",
    description: "Κορυφαίο φροντιστήριο στην Άρτα! Μαθηματικά, Φυσική, Χημεία, Βιολογία, Ελληνική Γλώσσα, Λογοτεχνία, Αρχαία, Ιστορία, Λατινικά, ΑΟΘ, Πληροφορική. 25+ χρόνια εμπειρίας, 95% επιτυχία στις Πανελλαδικές εξετάσεις.",
    images: ["/logo.png"],
    creator: "@kyklosedu",
  },
  icons: {
    icon: [
      { url: "/logo.png", sizes: "16x16", type: "image/png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/logo.png",
        color: "#1e40af",
      },
    ],
    shortcut: "/logo.png",
  },
  manifest: "/manifest.json",
  category: "education",
  classification: "Educational Services",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "ΚΥΚΛΟΣ Εκπαίδευση",
    "application-name": "ΚΥΚΛΟΣ Εκπαίδευση",
    "msapplication-TileColor": "#1e40af",
    "msapplication-config": "/browserconfig.xml",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "ΚΥΚΛΟΣ Εκπαίδευση",
    "alternateName": "Φροντιστήριο Κύκλος",
    "description": "Εξειδικευμένο φροντιστήριο Ελληνικής Γλώσσας & Λογοτεχνίας. 25+ έτη εμπειρίας, 95% επιτυχία, 500+ μαθητές.",
    "url": "https://kyklosedu.gr",
    "logo": "https://kyklosedu.gr/logo.png",
    "image": "https://kyklosedu.gr/logo.png",
    "telephone": "2681026671",
    "email": "Email Address",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Βασιλέως Κωνσταντίνου 42",
      "addressLocality": "Αρτα",
      "addressCountry": "GR"
    },
    "foundingDate": "1999",
    "numberOfEmployees": "5-10",
    "areaServed": {
      "@type": "City",
      "name": "Αρτα, Greece"
    },
    "serviceType": [
      "Ελληνική Γλώσσα",
      "Λογοτεχνία",
      "Μαθηματικά",
      "Φυσική",
      "Χημεία",
      "Βιολογία",
      "Αρχαία",
      "Ιστορία",
      "Λατινικά",
      "ΑΟΘ",
      "Πληροφορική",
      "Γυμνάσιο",
      "Λύκειο",
      "ΕΠΑΛ",
      "Πανελλήνιες Εξετάσεις"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Εκπαιδευτικά Προγράμματα",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Ελληνική Γλώσσα Γυμνασίου"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Course",
            "name": "Ελληνική Γλώσσα Λυκείου"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Λογοτεχνία Γυμνασίου"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Λογοτεχνία Λυκείου"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Μαθηματικά Γυμνασίου"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Μαθηματικά Λυκείου"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Φυσική Γυμνασίου"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Φυσική Λυκείου"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Χημεία Γυμνασίου"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Χημεία Λυκείου"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Αρχαία Λυκείου"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Ιστορία Λυκείου"
          }
        }
      ]
    },
    "sameAs": [
      "https://facebook.com/kyklosedu",
      "https://instagram.com/kyklosedu",
      "https://twitter.com/kyklosedu",
      "https://linkedin.com/company/kyklosedu"
    ]
  }

  return (
    <html lang="el">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
