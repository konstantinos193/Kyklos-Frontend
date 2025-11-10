# Buttons Redirecting to 404 Pages Report

This report lists all **buttons** (not just links) that redirect to routes that don't exist in the frontend, resulting in 404 errors.

## Summary
- **Total broken button routes found**: 12 unique routes
- **Total buttons affected**: 20+ button instances
- **Files affected**: 7 component/data files

---

## Buttons with 404 Redirects

### 1. Header Navigation - "Νέα - Εκδηλώσεις" Button
**Route**: `/news`  
**Status**: ❌ DOES NOT EXIST  
**Location**: `components/header/data.ts` (line 70)  
**Button Type**: Main navigation item (rendered as clickable navigation button)  
**Component**: `components/header/header-navigation.tsx`  
**Fix**: Create `app/news/page.tsx` or redirect to existing route (e.g., `/nea-ekdiloseis`)

---

### 2. Header Navigation Dropdown - "Ανακοινώσεις" Button
**Route**: `/news/announcements`  
**Status**: ❌ DOES NOT EXIST  
**Location**: `components/header/data.ts` (line 73)  
**Button Type**: Dropdown menu item (rendered as clickable button in dropdown)  
**Component**: `components/header/header-dropdown.tsx`  
**Fix**: Create `app/news/announcements/page.tsx` or remove from navigation

---

### 3. Header Navigation Dropdown - "Εκδηλώσεις - Φωτογραφίες" Button
**Route**: `/news/events`  
**Status**: ❌ DOES NOT EXIST  
**Location**: `components/header/data.ts` (line 74)  
**Button Type**: Dropdown menu item (rendered as clickable button in dropdown)  
**Component**: `components/header/header-dropdown.tsx`  
**Fix**: Create `app/news/events/page.tsx` or remove from navigation

---

### 4. Header Navigation Dropdown - "Σεμινάρια" Button
**Route**: `/news/seminars`  
**Status**: ❌ DOES NOT EXIST  
**Location**: `components/header/data.ts` (line 75)  
**Button Type**: Dropdown menu item (rendered as clickable button in dropdown)  
**Component**: `components/header/header-dropdown.tsx`  
**Fix**: Create `app/news/seminars/page.tsx` or remove from navigation

---

### 5. Footer Quick Links - "Νέα - Εκδηλώσεις" Button
**Route**: `/news`  
**Status**: ❌ DOES NOT EXIST  
**Location**: `components/footer/data.ts` (line 16)  
**Button Type**: Footer quick link (rendered as clickable link/button)  
**Component**: `components/footer/footer-links.tsx` (line 22)  
**Fix**: Create `app/news/page.tsx` or redirect to existing route

---

### 6. Footer Quick Links - "Blog" Button
**Route**: `/blog`  
**Status**: ❌ DOES NOT EXIST  
**Location**: `components/footer/data.ts` (line 17)  
**Button Type**: Footer quick link (rendered as clickable link/button)  
**Component**: `components/footer/footer-links.tsx` (line 22)  
**Fix**: Create `app/blog/page.tsx` or redirect to existing route

---

### 7. Blog Section - "Δείτε Όλα τα Άρθρα" Button
**Route**: `/blog`  
**Status**: ❌ DOES NOT EXIST  
**Location**: `components/blog/blog-section.tsx` (line 45)  
**Button Type**: CTA button with gradient styling  
**Component**: `components/blog/blog-section.tsx`  
**Code Reference**:
```44:52:components/blog/blog-section.tsx
          <a
            href="/blog"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#E7B109] via-[#CE3B49] to-[#D97706] hover:from-[#D97706] hover:via-[#B45309] hover:to-[#CE3B49] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Δείτε Όλα τα Άρθρα
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
```
**Fix**: Create `app/blog/page.tsx` or remove the button

---

### 8. Blog Card - "Διαβάστε Περισσότερα" Buttons
**Route**: `/blog/[slug]` (dynamic routes)  
**Status**: ❌ DOES NOT EXIST  
**Location**: `components/blog/blog-card.tsx` (line 89)  
**Button Type**: "Read More" button on each blog post card  
**Component**: `components/blog/blog-card.tsx`  
**Code Reference**:
```87:97:components/blog/blog-card.tsx
          <div className="mt-4 pt-4 border-t border-gray-100">
            <a
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-[#E7B109] hover:text-[#D97706] font-semibold text-sm transition-colors duration-300 group-hover:gap-3"
            >
              Διαβάστε Περισσότερα
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
```
**Affected Blog Posts** (6 buttons total):
- `/blog/10-symvoules-gia-epitychimenes-panellinies`
- `/blog/pos-na-diaheiristeis-to-agxos-ton-exetaseon`
- `/blog/oi-kalyteres-methodoi-meletis-gia-kathe-mathima`
- `/blog/programmatismos-xronou-to-kleidi-tis-epitychias`
- `/blog/texnologia-stin-ekpaideusi-ta-neotera-ergaleia`
- `/blog/i-simasia-tis-oikogeneiakis-ypostirixis`

**Fix**: Create `app/blog/[slug]/page.tsx` or remove blog posts

---

### 9. Specialty Card - "Κατεβάστε το Prospectus" Button
**Route**: `/prospectus` (missing leading slash in data, but should be `/prospectus`)  
**Status**: ❌ DOES NOT EXIST  
**Location**: `components/specialty/data.ts` (line 15)  
**Button Type**: Specialty card button with icon  
**Component**: `components/specialty/specialty-card.tsx` (line 36)  
**Code Reference**:
```35:39:components/specialty/specialty-card.tsx
          <a 
            href={item.href} 
            target={item.target}
            className="block p-10 text-center bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group-hover:border-[#E7B109] relative overflow-hidden group-hover:-translate-y-2"
          >
```
**Note**: The href in data.ts is `"prospectus"` (missing leading slash), but even with `/prospectus` the route doesn't exist.  
**Fix**: Create `app/prospectus/page.tsx` or update to point to actual file/route, and fix the href to include leading slash

---

### 10. Specialty Card - "Οι καλύτεροι της δεκαετίας" Button
**Route**: `/oi-kalyteroi-olon-ton-epoxon` (missing leading slash in data, but should be `/oi-kalyteroi-olon-ton-epoxon`)  
**Status**: ❌ DOES NOT EXIST  
**Location**: `components/specialty/data.ts` (line 23)  
**Button Type**: Specialty card button with icon  
**Component**: `components/specialty/specialty-card.tsx` (line 36)  
**Note**: The href in data.ts is `"oi-kalyteroi-olon-ton-epoxon"` (missing leading slash), but even with `/oi-kalyteroi-olon-ton-epoxon` the route doesn't exist.  
**Fix**: Create `app/oi-kalyteroi-olon-ton-epoxon/page.tsx` or remove from specialty data, and fix the href to include leading slash

---

### 11. Campus Gallery - "Περισσότερα" Button
**Route**: `/gallery` (missing leading slash)  
**Status**: ⚠️ MISSING LEADING SLASH (route exists but button href is broken)  
**Location**: `components/campus/data.ts` (line 6)  
**Button Type**: CTA button with gradient styling  
**Component**: `components/campus/campus-content.tsx` (line 20)  
**Code Reference**:
```19:32:components/campus/campus-content.tsx
        <a
          href={buttonHref}
          className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#E7B109] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span>{buttonText}</span>
          <svg 
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
```
**Current Value**: `buttonHref: "gallery"`  
**Should Be**: `buttonHref: "/gallery"`  
**Fix**: Change to `"/gallery"` in `components/campus/data.ts` (line 6)

---

### 12. Curriculum Success Stories - Category Buttons (14 buttons)
**Route**: `/curriculum/epityxontes-etos-*` (multiple year routes)  
**Status**: ❌ DOES NOT EXIST  
**Location**: `app/curriculum/[slug]/page.tsx` (lines 16-30)  
**Button Type**: Category link buttons in sidebar  
**Component**: `components/details/MultiUseDetailsPage.tsx` (line 48)  
**Code Reference**:
```44:54:components/details/MultiUseDetailsPage.tsx
                  {categories.map((cat) => (
                    <li key={cat.href}>
                      <div className="form-radio">
                        <label>
                          <Link href={cat.href} className="text-slate-700 hover:text-[#CE3B49] hover:underline">
                            {cat.label}
                          </Link>
                        </label>
                      </div>
                    </li>
                  ))}
```
**Broken Routes** (14 buttons total):
- `/curriculum/epityxontes-etos-2024-2025`
- `/curriculum/epityxontes-etos-2023-2024`
- `/curriculum/epityxontes-etos-2022-2023`
- `/curriculum/epityxontes-etos-2021-2022`
- `/curriculum/epityxontes-etos-2020-2021`
- `/curriculum/epityxontes-etos-2019-2020`
- `/curriculum/epityxontes-etos-2018-2019`
- `/curriculum/epityxontes-etos-2017-2018`
- `/curriculum/epityxontes-etos-2016-2017`
- `/curriculum/epityxontes-etos-2015-2016`
- `/curriculum/epityxontes-etos-2014-2015`
- `/curriculum/epityxontes-etos-2013-2014`
- `/curriculum/epityxontes-etos-2012-2013`
- `/curriculum/epityxontes-etos-2011-2012`
- `/curriculum/epityxontes-etos-2010-2011`

**Note**: These routes should probably link to `/epityxontes/epityxontes-etos-*` instead, or the routes should be created under `/curriculum/`.  
**Fix**: Update links to point to `/epityxontes/epityxontes-etos-*` routes, or create the missing routes under `/curriculum/`

---

## Summary by Component

### Header Components
- **4 buttons** in `components/header/data.ts` → `/news` routes
- **1 button** in header navigation dropdowns

### Footer Components
- **2 buttons** in `components/footer/data.ts` → `/news` and `/blog`

### Blog Components
- **1 button** in `components/blog/blog-section.tsx` → `/blog`
- **6 buttons** in `components/blog/blog-card.tsx` → `/blog/[slug]` (one per blog post)

### Specialty Components
- **2 buttons** in `components/specialty/data.ts` → `/prospectus` and `/oi-kalyteroi-olon-ton-epoxon`

### Campus Components
- **1 button** in `components/campus/data.ts` → `gallery` (missing leading slash)

### Curriculum Components
- **14 buttons** in `app/curriculum/[slug]/page.tsx` → `/curriculum/epityxontes-etos-*` routes

---

## Files to Update

1. **`components/header/data.ts`** - Fix or remove `/news` routes (lines 70, 73-75)
2. **`components/footer/data.ts`** - Fix or remove `/news` and `/blog` (lines 16-17)
3. **`components/blog/blog-section.tsx`** - Fix or remove `/blog` button (line 45)
4. **`components/blog/blog-card.tsx`** - Fix or remove `/blog/[slug]` buttons (line 89)
5. **`components/specialty/data.ts`** - Fix or remove `/prospectus` and `/oi-kalyteroi-olon-ton-epoxon`, add leading slashes (lines 15, 23)
6. **`components/campus/data.ts`** - Fix `gallery` to `/gallery` (line 6)
7. **`app/curriculum/[slug]/page.tsx`** - Fix success story links to point to `/epityxontes/` routes (lines 16-30)

---

## Recommendations

1. **Create missing routes** for `/news`, `/blog`, `/prospectus`, `/oi-kalyteroi-olon-ton-epoxon` if they're needed
2. **Fix relative paths** by adding leading slashes where missing
3. **Redirect or consolidate** `/news` routes if you have `/nea-ekdiloseis` and `/epikairotita` already
4. **Fix curriculum success story links** to point to correct `/epityxontes/` routes instead of `/curriculum/` routes
5. **Remove broken buttons** if routes aren't needed

---

**Report Generated**: $(date)  
**Total Broken Button Routes**: 12 unique routes  
**Total Buttons Affected**: 30+ button instances  
**Total Affected Files**: 7 files

