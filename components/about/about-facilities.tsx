"use client";

import Image from "next/image";

interface AboutFacilitiesProps {
  title?: string;
  content?: string;
  imageUrl?: string;
}

const defaultContent = `Tα <b>ΦΡΟΝΤΙΣΤΗΡΙΑ ΚΥΚΛΟΣ</b> στεγάζονται σε ιδιόκτητες σύγχρονες εγκαταστάσεις στο κέντρο της Χαλκίδας.<br>Οι εγκαταστάσεις των <b>ΚΥΚΛΟΣ</b> είναι διαμορφωμένες κατάλληλα ώστε να ικανοποιούν στο απόλυτο τις αισθητικές απαιτήσεις και διδακτικές αναγκαιότητες μαθητών και καθηγητών.<br>Έχοντας δώσει μεγάλη βαρύτητα στην επικοινωνία με τους γονείς για την ολοκλήρωση του διδακτικού τους έργου έχουν διαμορφώσει κατάλληλους χώρους υποδοχής και γραμματειακής υποστήριξης.<br>Συγκεκριμένα οι εγκαταστάσεις αποτελούνται από:<br>Τα γραφεία της διεύθυνσης σπουδών και της γραμματείας διαμορφωμένα κατάλληλα για τις καθημερινές λειτουργικές ανάγκες ,για την υποδοχή και ενημέρωση των γονέων.

• Γραφείο καθηγητών.<br>• Βιβλιοθήκη.<br>• Αίθουσα προβολών με προτζέκτορα για την καλύτερη αφομείωση της διδακτέας ύλης στα μαθήματα όταν αυτό κρίνεται απαραίτητο.<br>• 25 αίθουσες διδασκαλίας.`;

export function AboutFacilities({
  title = "Κτηριακές εγκαταστάσεις",
  content = defaultContent,
  imageUrl = "/building/0-02-05-2db6b4fbe100045803def97de283ce520ce76147df7103391c700b83085e600d_22e3ccfda72dc3e1.jpg"
}: AboutFacilitiesProps) {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-slate-200 to-slate-100">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content column - Left side */}
            <div className="campus-content-col">
              <div className="campus-content">
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 campus-title">
                  {title}
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#CE3B49] to-[#D97706] rounded-full mb-8 line"></div>
                <div
                  className="text-slate-700 leading-relaxed space-y-4 text-base"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>

            {/* Image column - Right side */}
            <div className="campus-image-col">
              <div className="relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={imageUrl}
                    alt="ΚΥΚΛΟΣ Κτίριο"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    quality={90}
                    priority
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#E7B109] to-[#D97706] rounded-full opacity-20"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-15"></div>
                <div className="absolute top-1/2 -left-8 w-16 h-16 bg-green-500 rounded-full opacity-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
