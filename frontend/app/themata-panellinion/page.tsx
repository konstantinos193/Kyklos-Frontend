export default function ThemataPanellinionPage() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Θέματα Πανελληνίων
        </h1>
        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-[#E7B109] to-[#D97706] rounded-full mx-auto mb-4 sm:mb-6"></div>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Συγκεντρωμένα θέματα και ενδεικτικές λύσεις για προετοιμασία.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <a href="#" className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Γλώσσα & Λογοτεχνία</h2>
          <p className="text-gray-600 text-sm">Θέματα προηγούμενων ετών και ύλη.</p>
        </a>
        <a href="#" className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Μαθηματικά</h2>
          <p className="text-gray-600 text-sm">Ενότητες, εκφωνήσεις και λύσεις.</p>
        </a>
        <a href="#" className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Θετικές Επιστήμες</h2>
          <p className="text-gray-600 text-sm">Φυσική, Χημεία, Βιολογία.</p>
        </a>
      </div>
    </main>
  );
}


