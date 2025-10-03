export default function ChemistryPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900">Χημεία</h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">Δομή μαθήματος, στόχοι και ενότητες.</p>

        <div className="mt-6 sm:mt-8 space-y-5 sm:space-y-6">
          <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">Ενότητες</h2>
            <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
              <li>Οργανική Χημεία</li>
              <li>Ανόργανη Χημεία</li>
              <li>Φυσικοχημεία</li>
            </ul>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">Στόχοι</h2>
            <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
              <li>Κατανόηση χημικών αντιδράσεων</li>
              <li>Πειραματικές δεξιότητες</li>
              <li>Εφαρμογές στη βιομηχανία</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}


