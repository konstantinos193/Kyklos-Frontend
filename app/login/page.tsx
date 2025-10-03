export default function LoginPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1 text-center">Σύνδεση Μαθητών</h1>
        <p className="text-sm text-gray-600 mb-6 text-center">Συνδεθείτε για να αποκτήσετε πρόσβαση στο μαθητικό σας προφίλ.</p>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CE3B49] focus:ring-[#CE3B49]"
              placeholder="name@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Κωδικός</label>
            <input
              id="password"
              type="password"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#CE3B49] focus:ring-[#CE3B49]"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center rounded-md bg-gradient-to-r from-[#CE3B49] to-[#FF6B6B] px-4 py-2.5 text-sm font-medium text-white hover:from-[#B91C1C] hover:to-[#CE3B49] focus:outline-none focus:ring-2 focus:ring-[#CE3B49] focus:ring-offset-2"
          >
            Σύνδεση
          </button>
        </form>
      </div>
    </div>
  );
}


