import { GRADES } from '@/constants/grades';

/**
 * Greek to Latin character mapping
 */
const greekToLatin: Record<string, string> = {
  'α': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'i', 'θ': 'th',
  'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ο': 'o', 'π': 'p',
  'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'ch', 'ψ': 'ps', 'ω': 'o',
  'ά': 'a', 'έ': 'e', 'ή': 'i', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ώ': 'o',
  'Α': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'I', 'Θ': 'Th',
  'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': 'X', 'Ο': 'O', 'Π': 'P',
  'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'Ch', 'Ψ': 'Ps', 'Ω': 'O',
};

/**
 * Converts a grade name to a URL-friendly slug
 * Example: "Γ Λυκείου" -> "g-lykeiou"
 */
export function gradeToSlug(grade: string): string {
  // Convert each character to its Latin equivalent
  let converted = grade
    .toLowerCase()
    .split('')
    .map(char => {
      // If it's a Greek character, convert it
      if (greekToLatin[char]) {
        return greekToLatin[char];
      }
      // Keep spaces, hyphens, and alphanumeric characters
      if (/[a-z0-9\s-]/.test(char)) {
        return char;
      }
      // Remove other characters
      return '';
    })
    .join('');
  
  // Replace spaces with hyphens
  let slug = converted
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .trim();
  
  return slug;
}

/**
 * Converts a slug back to a grade name
 * Example: "g-lykeiou" -> "Γ Λυκείου"
 */
export function slugToGrade(slug: string): string | undefined {
  const gradeMap: Record<string, string> = {};
  GRADES.forEach(grade => {
    gradeMap[gradeToSlug(grade)] = grade;
  });
  return gradeMap[slug];
}

/**
 * Gets all grade slugs
 */
export function getAllGradeSlugs(): string[] {
  return GRADES.map(grade => gradeToSlug(grade));
}

/**
 * Gets grade data with slug
 */
export function getGradeData() {
  const result = GRADES.map(grade => {
    const slug = gradeToSlug(grade);
    // Ensure slug is not empty
    if (!slug || slug === '-' || slug.trim() === '' || slug.length === 0) {
      console.error(`Failed to generate slug for grade: "${grade}", got: "${slug}"`);
      return null;
    }
    return {
      label: grade,
      slug: slug,
      href: `/classes/${slug}`
    };
  }).filter((item): item is { label: string; slug: string; href: string } => item !== null);
  
  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('Generated grade data:', result);
  }
  
  return result;
}

