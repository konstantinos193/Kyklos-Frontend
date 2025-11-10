"use client";
import { LocationIcon, PhoneIcon, ClockIcon, MailIcon } from "@/components/icons";
import { contactAPI } from "@/lib/api";
import { FAQSection } from "@/components/contact/faq-section";
import { useState } from "react";
import { generateBreadcrumbSchema, generateWebPageSchema, generateLocalBusinessSchema, generateFAQSchema } from "@/lib/seo-utils";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setMessage('Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await contactAPI.submit(formData);
      
      if (response.success) {
        // Redirect to success page after a short delay
        setTimeout(() => {
          window.location.href = '/contact/success';
        }, 1500);
        
        setMessage(response.message);
        setMessageType('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setMessage(response.message);
        setMessageType('error');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Σφάλμα κατά την αποστολή. Παρακαλώ δοκιμάστε ξανά.';
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Αρχική", url: "/" },
    { name: "Επικοινωνία", url: "/contact" },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Επικοινωνία | ΚΥΚΛΟΣ Φροντιστήριο Άρτα",
    description: "Επικοινωνήστε με το ΚΥΚΛΟΣ Φροντιστήριο. Βρισκόμαστε στη Βασιλέως Κωνσταντίνου 42, Άρτα. Τηλέφωνο: +30 26810 26671.",
    url: "/contact",
    breadcrumb: [
      { name: "Αρχική", url: "/" },
      { name: "Επικοινωνία", url: "/contact" },
    ],
  });

  const localBusinessSchema = generateLocalBusinessSchema();

  const faqSchema = generateFAQSchema([
    {
      question: "Πού βρίσκεται το φροντιστήριο;",
      answer: "Το ΚΥΚΛΟΣ Φροντιστήριο βρίσκεται στη Βασιλέως Κωνσταντίνου 42, Άρτα.",
    },
    {
      question: "Ποιες είναι οι ώρες λειτουργίας;",
      answer: "Δευτέρα - Παρασκευή: 09:00 - 21:00, Σάββατο: 10:00 - 15:00.",
    },
    {
      question: "Πώς μπορώ να επικοινωνήσω;",
      answer: "Μπορείτε να μας καλέσετε στο +30 26810 26671 ή να συμπληρώσετε τη φόρμα επικοινωνίας.",
    },
    {
      question: "Ποια μαθήματα προσφέρετε;",
      answer: "Προσφέρουμε Μαθηματικά, Φυσική, Χημεία, Βιολογία, Ελληνική Γλώσσα, Λογοτεχνία, Αρχαία, Ιστορία, Λατινικά, ΑΟΘ και Πληροφορική.",
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <main className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#CE3B49]/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#FF6B6B]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-[#CE3B49]/10 px-3 py-1 text-xs font-medium text-[#B91C1C]">
              Είμαστε εδώ για εσάς
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
              Επικοινωνία
            </h1>
            <p className="mt-3 text-base sm:text-lg text-gray-600">
              Πείτε μας τι χρειάζεστε και θα επικοινωνήσουμε άμεσα μαζί σας.
            </p>
          </div>

          {/* Quick info cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xs uppercase tracking-wide text-gray-500">Τηλέφωνο</div>
              <a href="tel:+302681026671" className="mt-1 block text-lg font-semibold text-gray-900 hover:text-[#CE3B49]">+30 26810 26671</a>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xs uppercase tracking-wide text-gray-500">Διεύθυνση</div>
              <div className="mt-1 text-lg font-semibold text-gray-900">Βασιλέως Κωνσταντίνου 42, Άρτα</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left: details + map */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900">Στοιχεία Επικοινωνίας</h2>
              <div className="mt-4 space-y-5 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#CE3B49]/10 text-[#B91C1C]">
                    <LocationIcon className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-gray-500">Διεύθυνση</div>
                    <div className="font-medium">Βασιλέως Κωνσταντίνου 42, Άρτα</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#CE3B49]/10 text-[#B91C1C]">
                    <PhoneIcon className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-gray-500">Τηλέφωνο</div>
                    <a href="tel:+302681026671" className="font-medium text-[#CE3B49] hover:underline">+30 26810 26671</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#CE3B49]/10 text-[#B91C1C]">
                    <MailIcon className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-gray-500">Email</div>
                    <a href="mailto:grkyklos-@hotmail.gr" className="font-medium text-[#CE3B49] hover:underline">grkyklos-@hotmail.gr</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#CE3B49]/10 text-[#B91C1C]">
                    <ClockIcon className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-gray-500">Ώρες Λειτουργίας</div>
                    <div className="font-medium">Δευτέρα - Παρασκευή: 09:00 - 21:00</div>
                    <div className="font-medium">Σάββατο: 10:00 - 15:00</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-2">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl">
                <iframe
                  title="Χάρτης τοποθεσίας ΚΥΚΛΟΣ Φροντιστήριο Άρτα"
                  src="https://www.google.com/maps?q=%CE%9A%CE%A5%CE%9A%CE%9B%CE%9F%CE%A3%20%CE%95%CE%BA%CF%80%CE%B1%CE%AF%CE%B4%CE%B5%CF%85%CF%83%CE%B7%20%CE%86%CF%81%CF%84%CE%B1&output=embed"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </aside>

          {/* Right: form */}
          <section className="lg:col-span-2">
            <div className="relative rounded-2xl border border-gray-200 bg-white shadow-sm p-6 sm:p-8">
              <div className="absolute inset-x-0 -top-2 mx-6 h-1 rounded-full bg-gradient-to-r from-[#CE3B49] via-[#FF6B6B] to-[#CE3B49]" />
              <h2 className="text-xl font-semibold text-gray-900">Φόρμα Επικοινωνίας</h2>
              <p className="mt-1 text-sm text-gray-600">Συμπληρώστε τη φόρμα και θα σας απαντήσουμε σύντομα.</p>

              {/* Message Display */}
              {message && (
                <div className={`mt-4 p-4 rounded-lg ${
                  messageType === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-1">Ονοματεπώνυμο *</label>
                  <input 
                    id="name" 
                    name="name"
                    type="text" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm transition-colors focus:border-[#CE3B49] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#CE3B49]/15" 
                    placeholder="Πληκτρολογήστε το όνομά σας" 
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-1">Email *</label>
                  <input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm transition-colors focus:border-[#CE3B49] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#CE3B49]/15" 
                    placeholder="name@example.com" 
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-800 mb-1">Τηλέφωνο</label>
                  <input 
                    id="phone" 
                    name="phone"
                    type="tel" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm transition-colors focus:border-[#CE3B49] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#CE3B49]/15" 
                    placeholder="π.χ. 69XXXXXXXX" 
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-800 mb-1">Θέμα *</label>
                  <input 
                    id="subject" 
                    name="subject"
                    type="text" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm transition-colors focus:border-[#CE3B49] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#CE3B49]/15" 
                    placeholder="Σύντομος τίτλος" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-1">Μήνυμα *</label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows={8} 
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="block w-full resize-none rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-gray-900 placeholder:text-gray-400 shadow-sm transition-colors focus:border-[#CE3B49] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#CE3B49]/15" 
                    placeholder="Γράψτε το μήνυμά σας εδώ..." 
                  />
                </div>
                <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#CE3B49] to-[#FF6B6B] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:shadow focus:outline-none focus:ring-4 focus:ring-[#CE3B49]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Αποστολή...
                      </>
                    ) : (
                      'Αποστολή Μηνύματος'
                    )}
                  </button>
                  <p className="text-xs text-gray-500">Με την αποστολή αποδέχεστε την πολιτική απορρήτου.</p>
                </div>
              </form>
            </div>
          </section>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Footer */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#CE3B49] to-[#FF6B6B] p-6 sm:p-8">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-white text-xl sm:text-2xl font-semibold">Χρειάζεστε άμεση βοήθεια;</h3>
                <p className="text-white/90 text-sm mt-1">Καλέστε μας και θα σας εξυπηρετήσουμε άμεσα.</p>
              </div>
              <a href="tel:+302681026671" className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#B91C1C] hover:bg-white/90 active:scale-[0.99] transition">
                +30 26810 26671
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
