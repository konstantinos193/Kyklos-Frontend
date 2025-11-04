# 🏛️ ΚΥΚΛΟΣ Εκπαίδευση - Φροντιστήριο Ελληνικής Γλώσσας & Λογοτεχνίας

> **Εξειδικευμένο φροντιστήριο Ελληνικής Γλώσσας & Λογοτεχνίας**  
> 25+ έτη εμπειρίας • 95% επιτυχία • 500+ μαθητές

[![Next.js](https://img.shields.io/badge/Next.js-15.1.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## 📖 Περιγραφή

Το **ΚΥΚΛΟΣ Εκπαίδευση** είναι ένα σύγχρονο, responsive website για εξειδικευμένο φροντιστήριο Ελληνικής Γλώσσας & Λογοτεχνίας. Το project αναπτύχθηκε με τις πιο σύγχρονες τεχνολογίες web development και προσφέρει μια εξαιρετική εμπειρία χρήστη τόσο σε desktop όσο και σε mobile συσκευές.

### 🎯 Κύρια Χαρακτηριστικά

- **📱 Fully Responsive Design** - Βελτιστοποιημένο για όλες τις συσκευές
- **🌙 Dark/Light Mode** - Υποστήριξη για dark και light theme
- **⚡ Next.js 15** - Server-side rendering και static generation
- **🎨 Modern UI/UX** - Σύγχρονο design με Tailwind CSS
- **📊 Interactive Components** - Δυναμικά στοιχεία με React 19
- **🔍 SEO Optimized** - Πλήρης βελτιστοποίηση για search engines
- **♿ Accessibility** - Υποστήριξη accessibility standards
- **📱 PWA Ready** - Progressive Web App capabilities

## 🚀 Τεχνολογίες

### Frontend
- **Next.js 15.1.0** - React framework με App Router
- **React 19.0.0** - UI library με Server Components
- **TypeScript 5.7.2** - Type-safe JavaScript
- **Tailwind CSS 4.1.9** - Utility-first CSS framework

### UI Components
- **Radix UI** - Headless UI components
- **Lucide React** - Beautiful icons
- **Framer Motion** - Smooth animations
- **Embla Carousel** - Touch-friendly carousels

### Development Tools
- **ESLint 9.17.0** - Code linting
- **Prettier 3.4.2** - Code formatting
- **PostCSS 8.5.0** - CSS processing
- **Autoprefixer 10.4.20** - CSS vendor prefixes

## 📁 Δομή Project

```
my-nextjs-app/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout με metadata
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   └── ClientLayout.tsx   # Client-side layout
├── components/            # React components
│   ├── about/            # About section components
│   ├── blog/             # Blog components
│   ├── campus/           # Campus gallery components
│   ├── courses/          # Courses components
│   ├── footer/           # Footer components
│   ├── header/           # Header components
│   ├── hero/             # Hero section components
│   ├── newsletter/       # Newsletter components
│   ├── programs/         # Programs components
│   ├── specialty/        # Specialty components
│   ├── statistics/       # Statistics components
│   ├── testimonials/     # Testimonials components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
│   ├── icon.svg          # SVG favicon
│   ├── manifest.json     # PWA manifest
│   └── browserconfig.xml # Microsoft tiles config
└── styles/               # Additional styles
```

## 🛠️ Εγκατάσταση & Setup

### Προαπαιτούμενα
- **Node.js** 18.17+ 
- **npm** 9.0+ ή **pnpm** 8.0+ ή **yarn** 1.22+

### Βήματα Εγκατάστασης

1. **Clone το repository**
   ```bash
   git clone https://github.com/konstantinos193/Kyklos-Frontend.git
   cd Kyklos-Frontend
   ```

2. **Εγκατάσταση dependencies**
   ```bash
   npm install
   # ή
   pnpm install
   # ή
   yarn install
   ```

3. **Εκκίνηση development server**
   ```bash
   npm run dev
   # ή
   pnpm dev
   # ή
   yarn dev
   ```

4. **Άνοιγμα στο browser**
   ```
   http://localhost:3000
   ```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Εκκίνηση development server |
| `npm run build` | Build για production |
| `npm run start` | Εκκίνηση production server |
| `npm run lint` | Εκτέλεση ESLint |
| `npm run type-check` | TypeScript type checking |
| `npm run format` | Format code με Prettier |
| `npm run format:check` | Check code formatting |

## 🎨 Design System

### Χρώματα
- **Primary Blue**: `#1e40af` - Κύριο brand color
- **Secondary Blue**: `#0ea5e9` - Accent color
- **Success**: `#10b981` - Success states
- **Warning**: `#f59e0b` - Warning states
- **Error**: `#ef4444` - Error states

### Typography
- **Font Family**: Inter, system fonts
- **Headings**: 4xl-6xl responsive sizes
- **Body**: 16px base size με 1.6 line-height

### Spacing
- **Section Padding**: 16-24 responsive padding
- **Container Padding**: 4-8 responsive padding
- **Grid Gaps**: 4-12 responsive gaps

## 📱 Responsive Breakpoints

| Breakpoint | Width | Description |
|------------|-------|-------------|
| `sm` | 640px+ | Small devices |
| `md` | 768px+ | Medium devices |
| `lg` | 1024px+ | Large devices |
| `xl` | 1280px+ | Extra large devices |
| `2xl` | 1536px+ | 2X large devices |

## 🔧 Configuration

### Environment Variables
Δημιουργήστε ένα `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://kyklosedu.gr
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Next.js Configuration
Το `next.config.mjs` περιέχει:
- Image optimization settings
- Security headers
- Performance optimizations

## 🚀 Deployment

### Vercel (Recommended)
1. Connect το GitHub repository στο Vercel
2. Configure environment variables
3. Deploy automatically

### Other Platforms
- **Netlify**: `npm run build` → deploy `out/` folder
- **Render**: Connect GitHub → auto-deploy
- **Railway**: Connect GitHub → auto-deploy

## 📊 Performance

- **Lighthouse Score**: Optimized for performance
- **Core Web Vitals**: Optimized
- **Bundle Size**: Minimized με tree-shaking
- **Images**: Optimized με Next.js Image component

## 🔍 SEO Features

- **Meta Tags**: Comprehensive meta tag setup
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter sharing optimization
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: Auto-generated sitemap
- **Robots.txt**: Search engine crawling rules

## ♿ Accessibility

- **WCAG Guidelines** - Following accessibility best practices
- **Keyboard Navigation** support
- **Screen Reader** friendly
- **Color Contrast** optimized
- **Focus Management** proper focus handling

## 🤝 Contributing

1. Fork το repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

Αυτό το project είναι ιδιόκτητο του **ΚΥΚΛΟΣ Εκπαίδευση**. Όλα τα δικαιώματα διατηρούνται.

## 📞 Επικοινωνία

- **Website**: [kyklosedu.gr](https://kyklosedu.gr)
- **Email**: Contact us for details
- **Phone**: Contact us for details
- **Address**: Athens, Greece

## 🙏 Acknowledgments

- **Next.js Team** για το amazing framework
- **Vercel** για το hosting platform
- **Tailwind CSS** για το utility-first CSS
- **Radix UI** για τα accessible components

---

<div align="center">

**ΚΥΚΛΟΣ Εκπαίδευση** - *Προσφέρουμε ποιοτική εκπαίδευση εδώ και 25+ χρόνια*

Made with ❤️ in Greece 🇬🇷

</div>
