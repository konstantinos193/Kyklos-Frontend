"use client";

interface AboutHistoryProps {
  title?: string;
  imageUrl?: string;
  content?: string;
}

const defaultContent = `Τα <b>Φροντιστήρια ΚΥΚΛΟΣ</b> ιδρύθηκαν το 1995 από τον φυσικό <b>[Όνομα Ιδρυτή]</b> και τους τότε συνεργάτες του, μετά από ένα μεγάλο διάστημα παρουσίας και διδακτικής εμπειρίας στα Φροντιστηριακά δρώμενα της πόλης μας.

Παρουσία που είχε σφραγιστεί με ένα πολύ μεγάλο πλήθος επιτυχόντων μαθητών στις υψηλόβαθμες Πανεπιστημιακές σχολές.

Τα δεδομένα αυτά έδωσαν ώθηση στη δημιουργία των σημερινών σύγχρονων <b>Φροντιστηρίων ΚΥΚΛΟΣ [Εταιρεία]</b>, που αποτελούν πρωτοποριακή μορφή στην ιδιωτική παιδεία.

Οι μεγάλες <b>επιτυχίες</b> τους, επαναλαμβανόμενες σε <b>ετήσια</b> βάση, τα έχουν φέρει στην κορυφή της <b>εμπιστοσύνης</b> και της <b>προτίμησης</b> των μαθητών της πόλης μας και της ευρύτερης περιοχής.`;

export function AboutHistory({
  title = "Ίδρυση",
  imageUrl = "/logo.png",
  content = defaultContent
}: AboutHistoryProps) {
  return (
    <section className="py-20 lg:py-24 bg-slate-900 text-white campus-visit-area">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 campus-title">
              {title}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#CE3B49] to-[#D97706] rounded-full mx-auto line"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center campus-visit-wrapper">
            {/* Content column - now on left */}
            <div className="campus-content-col order-2 lg:order-1">
              <div className="campus-content">
                <div 
                  className="text-slate-300 leading-relaxed space-y-6 text-lg"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
                
                {/* Stats */}
                <div className="mt-12 grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-3xl font-bold text-[#CE3B49] mb-2">1995</div>
                    <div className="text-sm text-slate-400">Έτος Ίδρυσης</div>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-3xl font-bold text-[#CE3B49] mb-2">25+</div>
                    <div className="text-sm text-slate-400">Έτη Εμπειρίας</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image column - now on right */}
            <div className="campus-image-col order-1 lg:order-2">
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={imageUrl} 
                    alt="ΚΥΚΛΟΣ Logo" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                {/* Different decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#E7B109] rounded-full opacity-80"></div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-500 rounded-full opacity-60"></div>
                <div className="absolute top-1/2 -left-8 w-12 h-12 bg-purple-500 rounded-full opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
