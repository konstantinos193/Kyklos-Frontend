export interface SuccessStoryItem {
  title: string;
  href: string;
}

const availableStartYears = [
  2025,
  2024,
  2023,
  2016,
  2015,
  2014,
  2013,
  2012,
  2011,
  2006,
  2005,
  2004,
  2003,
  2002,
  2000,
  1999,
  1998,
  1997,
  1996,
  1995,
  1994,
  1993,
  1992,
] as const;

export const successStories: SuccessStoryItem[] = availableStartYears.map((startYear) => ({
  title: `Επιτυχόντες Έτος ${startYear}-${startYear + 1}`,
  href: `/epityxontes/epityxontes-etos-${startYear}-${startYear + 1}`,
}));

export default successStories;

