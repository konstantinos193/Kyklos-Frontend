import Link from "next/link";
import Head from "next/head";
import { CheckCircleIcon } from "@/components/icons";

export default function ContactSuccessPage() {
  return (
    <>
      <Head>
        <title>Επικοινωνία Επιτυχής - ΚΥΚΛΟΣ Φροντιστήριο</title>
        <meta name="description" content="Το μήνυμά σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό. ΚΥΚΛΟΣ Φροντιστήριο - Εξειδικευμένο φροντιστήριο για Γυμνάσιο & Λύκειο." />
        <meta name="robots" content="noindex, nofollow" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Επικοινωνία Επιτυχής - ΚΥΚΛΟΣ Φροντιστήριο" />
        <meta property="og:description" content="Το μήνυμά σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό." />
        <meta property="og:image" content="https://kyklosedu.gr/logo.png" />
      </Head>
      
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Μήνυμα Στάλθηκε!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Ευχαριστούμε για το μήνυμά σας. Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.
          </p>
          
          <div className="space-y-3">
            <Link
              href="/"
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-[#CE3B49] to-[#FF6B6B] hover:from-[#B91C1C] hover:to-[#CE3B49] transition-all duration-200"
            >
              Επιστροφή στην Αρχική
            </Link>
            
            <Link
              href="/contact"
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Νέο Μήνυμα
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Για άμεση επικοινωνία, καλέστε μας στο{" "}
              <a href="tel:+302681026671" className="text-[#CE3B49] hover:underline font-medium">
                +30 26810 26671
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
