"use client";

interface AboutHistoryProps {
  title?: string;
  imageUrl?: string;
  content?: string;
}

const defaultContent = `Το <b>Φροντιστήριο ΚΥΚΛΟΣ</b> ιδρύθηκε το καλοκαίρι του <b>1991</b> από τους <b>Γρηγόρη Καραβασίλη, Δημήτρη Κολιούλη, Κωνσταντίνο Μαστραπά, Ιωάννη Σδρίμα, Γεώργιο Σκούρα και Ευάγγελο Στάμο</b>.

Στόχος των ιδρυτών ήταν η δημιουργία ενός σύγχρονου και αξιόπιστου εκπαιδευτικού χώρου που θα προσφέρει ουσιαστική στήριξη στους μαθητές και υψηλού επιπέδου προετοιμασία για τις πανελλαδικές εξετάσεις.

Με τις συνεχείς επιτυχίες των μαθητών του, ο <b>ΚΥΚΛΟΣ</b> βρίσκεται σταθερά στην κορυφή της προτίμησης των μαθητών της πόλης, αποτελώντας σημείο αναφοράς στην εκπαιδευτική κοινότητα.`;

export function AboutHistory({
  title = "Ίδρυση του Φροντιστηρίου ΚΥΚΛΟΣ",
  imageUrl = "/logo.png",
  content = defaultContent
}: AboutHistoryProps) {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E7B109' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-white">
              {title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#E7B109] via-[#CE3B49] to-[#D97706] rounded-full mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Content column - Left */}
            <div className="space-y-6">
              <div 
                className="text-slate-200 leading-relaxed space-y-5 text-base sm:text-lg"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              
              {/* Stats */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                <div className="text-center p-5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl font-bold text-[#E7B109] mb-2">1991</div>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium">Έτος Ίδρυσης</div>
                </div>
                <div className="text-center p-5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl font-bold text-[#CE3B49] mb-2">30+</div>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium">Έτη Εμπειρίας</div>
                </div>
              </div>
            </div>

            {/* Image column - Right */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="aspect-square">
                  <img 
                    src={imageUrl} 
                    alt="ΚΥΚΛΟΣ Logo" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-[#E7B109] to-[#D97706] rounded-full opacity-60 blur-sm"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-40 blur-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
