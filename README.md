# ΚΥΚΛΟΣ Εκπαίδευση - Where Greek Literature Goes to Die (and Get Resurrected)

<div class="flex items-center justify-start">
  <a href="https://kyklosedu.gr" class="flex items-center">
    <img alt="ΚΥΚΛΟΣ Εκπαίδευση" loading="eager" width="120" height="40" decoding="async" class="object-contain transition-all duration-300 max-w-[120px] sm:max-w-[140px] md:max-w-none" style="color:transparent;height:auto" src="https://kyklosedu.gr/logo.png">
  </a>
</div>

> **Because someone has to teach these kids ancient Greek** 
> 25+ years of psychological warfare • 95% success rate (the other 5% became philosophers) • 500+ victims

**Author**: [konstantinos193](https://github.com/konstantinos193)  
**Property**: [adinfinity.gr](https://adinfinity.gr/)  
**Year**: 2026

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## The Grim Reality

The **ΚΥΚΛΟΣ Εκπαίδευση** is what happens when you combine 25+ years of dealing with teenagers and modern web technology. It's a digital asylum where we torture students with Homer and Sappho until they either learn Greek literature or develop a healthy appreciation for modern art. Built with technology so new it's probably still in beta.

### What We've Got

- **Responsive Design** - Works on phones, tablets, and whatever device the kids are using to cheat these days
- **Dark/Light Mode** - Because reading ancient texts causes eye strain in any theme
- **Next.js 16** - Server-side rendering so fast it's like the gods themselves are serving your pages
- **Modern UI/UX** - Clean enough to impress parents, confusing enough to keep students on their toes
- **Interactive Components** - Buttons that actually work, unlike our students' motivation
- **SEO Optimized** - Because even Google needs to know about our suffering
- **Accessibility** - WCAG compliant, unlike the Greek education system
- **PWA Ready** - Installable on phones so students can't escape homework

## The Tech Stack That Keeps Us Sane

### Frontend
- **Next.js 16.1.6** - React framework that makes our lives marginally less miserable
- **React 19.2.4** - UI library with Server Components (because client-side is for peasants)
- **TypeScript 5.9.3** - Type-safe JavaScript so we don't accidentally summon Cthulhu
- **Tailwind CSS 4.1.18** - Utility-first CSS framework because writing CSS is beneath us

### UI Components
- **Radix UI** - Headless UI components that actually work with screen readers
- **Lucide React** - Beautiful icons that don't look like they were drawn by a toddler
- **Framer Motion** - Smooth animations to distract students from the pain of learning
- **Embla Carousel** - Touch-friendly carousels that work better than our attendance system

### Development Tools
- **ESLint 10.0.0** - Code linting because we make mistakes (unlike our students, obviously)
- **Prettier 3.8.1** - Code formatting to maintain the illusion of professionalism
- **PostCSS 8.5.6** - CSS processing that's more reliable than our coffee machine
- **Autoprefixer 10.4.24** - CSS vendor prefixes for browsers that still exist in 2026

## The Digital Catacombs

```
Kyklos-Frontend/
├── app/                    # Next.js App Router (the modern way)
│   ├── layout.tsx         # Root layout with metadata and existential dread
│   ├── page.tsx           # Homepage where dreams go to die
│   ├── globals.css        # Global styles that somehow work
│   ├── ClientLayout.tsx   # Client-side layout for the suffering
│   ├── about/             # About us (mostly lies)
│   ├── admin/             # Admin panel where we control everything
│   ├── api/               # API routes that actually talk to the backend
│   ├── auth/              # Authentication because we can't trust anyone
│   ├── blog/              # Blog posts nobody reads
│   ├── campus/            # Pictures of our humble institution
│   ├── contact/           # Contact form that sends to /dev/null
│   ├── courses/           # Course descriptions that sound impressive
│   ├── curriculum/        # Curriculum that changes every year
│   ├── epityxontes/       # Success stories (heavily edited)
│   ├── lucille-packs/     # Whatever this is, it's important
│   ├── news/              # News that's probably outdated
│   ├── panhellenic/       # Exam preparation materials
│   ├── programs/          # Programs that cost money
│   ├── success-stories/   # More success stories (different lies)
│   └── teachers/          # Teacher profiles (embellished)
├── components/            # React components (67 of them, help)
│   ├── about/            # About section components
│   ├── admin/            # Admin components (the powerful stuff)
│   ├── auth/             # Authentication components
│   ├── backgrounds/      # Background components for visual torture
│   ├── blog/             # Blog components
│   ├── building/         # Building-related components
│   ├── campus/           # Campus gallery components
│   ├── contact/          # Contact components
│   ├── courses/          # Course components
│   ├── curriculum/       # Curriculum components (32 files!)
│   ├── details/          # Detail components
│   ├── epityxontes/      # Success story components
│   ├── footer/           # Footer components (11 files)
│   ├── header/           # Header components (16 files)
│   ├── hero/             # Hero section components
│   ├── icons/            # Icon components
│   ├── lucille-packs/    # More of whatever this is
│   ├── news/             # News components
│   ├── newsletter/       # Newsletter components
│   ├── panhellenic/      # Exam components
│   ├── programs/         # Program components
│   ├── specialty/        # Specialty components
│   ├── statistics/       # Statistics components (13 files)
│   ├── success-stories/  # Success story components
│   ├── teachers/         # Teacher components
│   ├── testimonials/     # Testimonial components
│   ├── theme-provider.tsx # Theme provider for dark/light mode
│   └── ui/               # Reusable UI components (52 files!)
├── hooks/                # Custom React hooks
│   ├── use-blog.ts       # Blog hook
│   ├── use-image-preload.ts # Image preloading hook
│   ├── use-mobile.ts     # Mobile detection hook
│   ├── use-news.ts       # News hook
│   └── use-toast.ts      # Toast notification hook
├── lib/                  # Utility functions and dark magic
│   ├── api-url.ts        # API URL configuration
│   ├── api.ts            # API utilities
│   ├── cloudinary-utils.ts # Cloudinary image utilities
│   ├── image-utils.ts    # Image manipulation utilities
│   ├── panhellenic-data.ts # Exam data utilities
│   ├── panhellenic-subjects.ts # Exam subjects
│   ├── schema-utils.ts   # Schema validation utilities
│   ├── seo-utils.ts      # SEO utilities
│   ├── time-utils.ts     # Time manipulation utilities
│   ├── token-manager.ts  # Token management (probably important)
│   ├── utils.ts          # General utilities
│   └── stubs/            # Canvas stubs for PDF.js
├── constants/            # Constants that never change
│   └── grades.ts         # Grade definitions
├── data/                 # Static data
│   └── success-stories.ts # Fabricated success stories
├── public/               # Static assets
│   ├── icon.svg          # SVG favicon
│   ├── logo.png          # The actual logo
│   ├── logotenxeia.png   # Another logo (why?)
│   ├── manifest.json     # PWA manifest
│   └── browserconfig.xml # Microsoft tiles config
└── styles/               # Additional styles we forgot about
```

## Setup Instructions (Follow These or Die Trying)

### What You Need Before You Cry
- **Node.js** 20.9.0+ (because ancient versions are for ancient Greeks)
- **npm** 9.0+ or **pnpm** 8.0+ or **yarn** 1.22+ (we don't judge, but we prefer pnpm)

### The Ritual of Installation

1. **Clone this monstrosity**
   ```bash
   git clone https://github.com/konstantinos193/Kyklos-Frontend.git
   cd Kyklos-Frontend
   ```

2. **Install the dependencies** (pray to the tech gods)
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Start the development server** (hold your breath)
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   yarn dev
   ```

4. **Open in browser** (if it worked, buy a lottery ticket)
   ```
   http://localhost:3000
   ```

## Available Commands (Use Wisely)

| Command | What It Actually Does |
|--------|---------------------|
| `npm run dev` | Starts development server with turbo (fast) |
| `npm run dev:memory` | Same but with more memory (for when you break it) |
| `npm run build` | Builds for production (hope you have coffee) |
| `npm run start` | Starts production server (if you dare) |
| `npm run lint` | Finds all your mistakes and judges you |
| `npm run type-check` | TypeScript validation because TypeScript hates you |
| `npm run format` | Formats code so it looks like you know what you're doing |
| `npm run format:check` | Checks if code is formatted (spoiler: it's not) |

## Design System (Because We Pretend to Be Professionals)

### Colors That Don't Hurt Your Eyes
- **Primary Blue**: `#1e40af` - The color of our students' tears
- **Secondary Blue**: `#0ea5e9` - The color of our coffee mugs
- **Success**: `#10b981` - The color of passing grades (rare)
- **Warning**: `#f59e0b` - The color of approaching deadlines
- **Error**: `#ef4444` - The color of failed exams

### Typography (Fonts That Actually Work)
- **Font Family**: Inter, system fonts (because we're practical)
- **Headings**: 4xl-6xl responsive sizes (big and impressive)
- **Body**: 16px base size with 1.6 line-height (readable, surprisingly)

### Spacing (Because White Space is Expensive)
- **Section Padding**: 16-24 responsive padding (breathing room)
- **Container Padding**: 4-8 responsive padding (not too cramped)
- **Grid Gaps**: 4-12 responsive gaps (organized chaos)

## Responsive Breakpoints (For All Those Devices)

| Breakpoint | Width | What It's For |
|------------|-------|---------------|
| `sm` | 640px+ | Small devices (phones of students) |
| `md` | 768px+ | Medium devices (tablets of teachers) |
| `lg` | 1024px+ | Large devices (laptops of admins) |
| `xl` | 1280px+ | Extra large devices (desktops of the wealthy) |
| `2xl` | 1536px+ | 2X large devices (for showing off) |

## Configuration (The Dark Arts)

### Environment Variables (Don't Commit These)
Create a `.env.local` file and pray you don't mess up:

```env
NEXT_PUBLIC_SITE_URL=https://kyklosedu.gr
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Next.js Configuration (The Magic Box)
The `next.config.mjs` contains:
- Image optimization settings (WebP, AVIF, all the fancy stuff)
- Security headers (because we care about security, sometimes)
- Performance optimizations (Turbopack, webpack magic)
- Canvas stubs for PDF.js (don't ask)
- Remote image patterns (for stealing images from the internet)
- TypeScript build errors ignored (because we live dangerously)

## Deployment (Where Things Break)

### Vercel (The Easy Way)
1. Connect GitHub repository to Vercel
2. Configure environment variables (don't forget this time)
3. Deploy automatically and pray

### Other Platforms (For the Brave)
- **Netlify**: `npm run build` → deploy `out/` folder (good luck)
- **Render**: Connect GitHub → auto-deploy (if it works)
- **Railway**: Connect GitHub → auto-deploy (another gamble)

## Performance (We Try, Okay?)

- **Lighthouse Score**: Optimized for performance (most of the time)
- **Core Web Vitals**: Optimized (until we add more features)
- **Bundle Size**: Minimized with tree-shaking (still too big)
- **Images**: Optimized with Next.js Image component (WebP, AVIF, etc.)

## SEO Features (Because Google is Watching)

- **Meta Tags**: Comprehensive meta tag setup (we read the docs)
- **Open Graph**: Social media sharing optimization (for the parents)
- **Twitter Cards**: Twitter sharing optimization (for the cool kids)
- **Structured Data**: JSON-LD schema markup (Google loves this)
- **Sitemap**: Auto-generated sitemap (so Google can find everything)
- **Robots.txt**: Search engine crawling rules (play nice, Google)

## Accessibility (We Actually Care About This)

- **WCAG Guidelines** - Following accessibility best practices (mostly)
- **Keyboard Navigation** support (because not everyone uses a mouse)
- **Screen Reader** friendly (we test with VoiceOver, sometimes)
- **Color Contrast** optimized (no more invisible text)
- **Focus Management** proper focus handling (tab order makes sense)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

That's it. Don't overcomplicate it.

## License

Copyright 2026 adinfinity.gr. All rights reserved.

Don't steal our stuff.

## Security

Found a security issue? Email adenfinity@gmail.com

Don't open public issues for security vulnerabilities.

## Support

Need help? Email adenfinity@gmail.com

Or check the GitHub issues.

## Changelog

### v1.0.0 - 2026-03-01
- Initial release
- Next.js 16, React 19, TypeScript 5.9
- Responsive design, dark/light mode
- Full accessibility support

That's all that matters.

---

<div align="center">

**ΚΥΚΛΟΣ Εκπαίδευση** - *Where Greek literature meets modern technology and everyone suffers equally*

Built with caffeine, frustration, and a touch of ancient Greek wisdom by [konstantinos193](https://github.com/konstantinos193) for [adinfinity.gr](https://adinfinity.gr/)

[Star this repo](https://github.com/konstantinos193/Kyklos-Frontend) • [Report issues](https://github.com/konstantinos193/Kyklos-Frontend/issues) • [Start a discussion](https://github.com/konstantinos193/Kyklos-Frontend/discussions)

</div>

## Project Statistics

### GitHub Stats

![GitHub stars](https://img.shields.io/github/stars/konstantinos193/Kyklos-Frontend?style=social)
![GitHub forks](https://img.shields.io/github/forks/konstantinos193/Kyklos-Frontend?style=social)
![GitHub issues](https://img.shields.io/github/issues/konstantinos193/Kyklos-Frontend)
![GitHub pull requests](https://img.shields.io/github/issues-pr/konstantinos193/Kyklos-Frontend)

### Badges

![License](https://img.shields.io/badge/license-Proprietary-red)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Build](https://img.shields.io/badge/build-Passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-85%25-green)

## Related Projects

### Our Other Repositories

- [Kyklos-Backend](https://github.com/konstantinos193/Kyklos-Backend) - The API backend
- [Kyklos-Admin](https://github.com/konstantinos193/Kyklos-Admin) - Admin dashboard
- [Kyklos-Mobile](https://github.com/konstantinos193/Kyklos-Mobile) - Mobile app (coming soon)

### External Links

- [Website](https://kyklosedu.gr) - Our main website
- [Blog](https://kyklosedu.gr/blog) - Educational blog
- [Contact](https://kyklosedu.gr/contact) - Get in touch

## Roadmap

### Q1 2026
- [ ] Student authentication system
- [ ] Teacher access management
- [ ] Exam material access control
- [ ] Mobile app development
- [ ] Performance optimizations

### Q2 2026
- [ ] Advanced analytics dashboard
- [ ] Video streaming for lectures
- [ ] Real-time collaboration tools
- [ ] AI-powered essay grading
- [ ] Parent portal

### Q3 2026
- [ ] Virtual classroom features
- [ ] Online exam proctoring
- [ ] Advanced reporting system
- [ ] Integration with school management systems
- [ ] Multilingual support

### Q4 2026
- [ ] Machine learning recommendations
- [ ] Advanced accessibility features
- [ ] Progressive Web App enhancements
- [ ] Offline mode support
- [ ] API for third-party integrations
