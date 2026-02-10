import { ArchiveSubject, SUBJECT_LABELS } from './panhellenic-subjects';

export interface PanhellenicFile {
  fileName: string;
  displayName: string;
  subject: ArchiveSubject;
  year: number;
  url: string;
  id?: string; // Optional ID for API files (used for proxy endpoint)
}

export interface SubjectGroup {
  subject: ArchiveSubject;
  displayName: string;
  files: PanhellenicFile[];
}

// Helper function to get API URL lazily (avoid build-time evaluation issues)
const getApiBaseUrl = (): string => {
  // Safely access environment variable
  const apiUrl = typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : null;
  
  if (apiUrl && typeof apiUrl === 'string') {
    return apiUrl.replace(/\/$/, '');
  }
  
  // Default based on environment - use production URL as safe default
  // This will work in both client and server contexts
  return 'https://kyklos-backend.onrender.com';
};

// Helper function to create file URL
const createFileUrl = (subject: string, fileName: string): string => {
  const apiBaseUrl = getApiBaseUrl();
  return `${apiBaseUrl}/public/${subject}/${fileName}`;
};

// Helper function to create display name
const createDisplayName = (fileName: string, subject: string): string => {
  // Remove file extension
  let name = fileName.replace(/\.pdf$/i, '');
  
  // Handle math files with kat/pros prefixes
  if (subject === 'math') {
    if (name.includes('_kat_')) {
      name = name.replace('math_kat_', 'Μαθηματικά Κατεύθυνσης ');
    } else if (name.includes('_pros_')) {
      name = name.replace('math_pros_', 'Μαθηματικά Προσανατολισμού ');
    } else {
      name = name.replace('math_', 'Μαθηματικά ');
    }
    name = name.replace('_panellinies_net', '');
  } else if (subject === 'physics') {
    name = name.replace('fusiki_', 'Φυσική ');
    name = name.replace('_panellinies_net', '');
  } else if (subject === 'ximia') {
    name = name.replace('ximeia_', 'Χημεία ');
    name = name.replace('_panellinies_net', '');
  }
  
  // Extract year and format
  const yearMatch = name.match(/(\d{4})/);
  if (yearMatch) {
    const year = yearMatch[1];
    name = name.replace(/\d{4}/, '').trim();
    return `${name}${year}`;
  }
  
  return name;
};

// Lazy initialization to avoid build-time evaluation issues
let _mathFiles: PanhellenicFile[] | null = null;
let _physicsFiles: PanhellenicFile[] | null = null;
let _ximiaFiles: PanhellenicFile[] | null = null;
let _subjectGroups: SubjectGroup[] | null = null;

function getMathFiles(): PanhellenicFile[] {
  if (!_mathFiles) {
    _mathFiles = [
      { fileName: 'math_2025.pdf', displayName: 'Μαθηματικά 2025', subject: 'math', year: 2025, url: createFileUrl('math', 'math_2025.pdf') },
      { fileName: 'math_2024.pdf', displayName: 'Μαθηματικά 2024', subject: 'math', year: 2024, url: createFileUrl('math', 'math_2024.pdf') },
      { fileName: 'math_2023.pdf', displayName: 'Μαθηματικά 2023', subject: 'math', year: 2023, url: createFileUrl('math', 'math_2023.pdf') },
      { fileName: 'math_2022.pdf', displayName: 'Μαθηματικά 2022', subject: 'math', year: 2022, url: createFileUrl('math', 'math_2022.pdf') },
      { fileName: 'math_2021_panellinies_net.pdf', displayName: 'Μαθηματικά 2021', subject: 'math', year: 2021, url: createFileUrl('math', 'math_2021_panellinies_net.pdf') },
      { fileName: 'math_2020_panellinies_net.pdf', displayName: 'Μαθηματικά 2020', subject: 'math', year: 2020, url: createFileUrl('math', 'math_2020_panellinies_net.pdf') },
      { fileName: 'math_pros_2019_panellinies_net.pdf', displayName: 'Μαθηματικά Προσανατολισμού 2019', subject: 'math', year: 2019, url: createFileUrl('math', 'math_pros_2019_panellinies_net.pdf') },
      { fileName: 'math_pros_2018_panellinies_net.pdf', displayName: 'Μαθηματικά Προσανατολισμού 2018', subject: 'math', year: 2018, url: createFileUrl('math', 'math_pros_2018_panellinies_net.pdf') },
      { fileName: 'math_kat_2017_panellinies_net.pdf', displayName: 'Μαθηματικά Κατεύθυνσης 2017', subject: 'math', year: 2017, url: createFileUrl('math', 'math_kat_2017_panellinies_net.pdf') },
      { fileName: 'math_kat_2016_panellinies_net.pdf', displayName: 'Μαθηματικά Κατεύθυνσης 2016', subject: 'math', year: 2016, url: createFileUrl('math', 'math_kat_2016_panellinies_net.pdf') },
    ];
  }
  return _mathFiles;
}

function getPhysicsFiles(): PanhellenicFile[] {
  if (!_physicsFiles) {
    _physicsFiles = [
      { fileName: 'fusiki_2025.pdf', displayName: 'Φυσική 2025', subject: 'physics', year: 2025, url: createFileUrl('physics', 'fusiki_2025.pdf') },
      { fileName: 'fusiki_2024.pdf', displayName: 'Φυσική 2024', subject: 'physics', year: 2024, url: createFileUrl('physics', 'fusiki_2024.pdf') },
      { fileName: 'fusiki_2023.pdf', displayName: 'Φυσική 2023', subject: 'physics', year: 2023, url: createFileUrl('physics', 'fusiki_2023.pdf') },
      { fileName: 'fusiki_2022.pdf', displayName: 'Φυσική 2022', subject: 'physics', year: 2022, url: createFileUrl('physics', 'fusiki_2022.pdf') },
      { fileName: 'fusiki_2021_panellinies_net.pdf', displayName: 'Φυσική 2021', subject: 'physics', year: 2021, url: createFileUrl('physics', 'fusiki_2021_panellinies_net.pdf') },
      { fileName: 'fusiki_2020_panellinies_net.pdf', displayName: 'Φυσική 2020', subject: 'physics', year: 2020, url: createFileUrl('physics', 'fusiki_2020_panellinies_net.pdf') },
      { fileName: 'fusiki_2019_panellinies_net.pdf', displayName: 'Φυσική 2019', subject: 'physics', year: 2019, url: createFileUrl('physics', 'fusiki_2019_panellinies_net.pdf') },
      { fileName: 'fusiki_2018_panellinies_net.pdf', displayName: 'Φυσική 2018', subject: 'physics', year: 2018, url: createFileUrl('physics', 'fusiki_2018_panellinies_net.pdf') },
      { fileName: 'fusiki_2017_panellinies_net.pdf', displayName: 'Φυσική 2017', subject: 'physics', year: 2017, url: createFileUrl('physics', 'fusiki_2017_panellinies_net.pdf') },
      { fileName: 'fusiki_2016_panellinies_net.pdf', displayName: 'Φυσική 2016', subject: 'physics', year: 2016, url: createFileUrl('physics', 'fusiki_2016_panellinies_net.pdf') },
    ];
  }
  return _physicsFiles;
}

function getXimiaFiles(): PanhellenicFile[] {
  if (!_ximiaFiles) {
    _ximiaFiles = [
      { fileName: 'ximeia_2025.pdf', displayName: 'Χημεία 2025', subject: 'ximia', year: 2025, url: createFileUrl('ximia', 'ximeia_2025.pdf') },
      { fileName: 'ximeia_2024.pdf', displayName: 'Χημεία 2024', subject: 'ximia', year: 2024, url: createFileUrl('ximia', 'ximeia_2024.pdf') },
      { fileName: 'ximeia_2023.pdf', displayName: 'Χημεία 2023', subject: 'ximia', year: 2023, url: createFileUrl('ximia', 'ximeia_2023.pdf') },
      { fileName: 'ximeia_2022.pdf', displayName: 'Χημεία 2022', subject: 'ximia', year: 2022, url: createFileUrl('ximia', 'ximeia_2022.pdf') },
      { fileName: 'ximeia_2021_panellinies_net.pdf', displayName: 'Χημεία 2021', subject: 'ximia', year: 2021, url: createFileUrl('ximia', 'ximeia_2021_panellinies_net.pdf') },
      { fileName: 'ximeia_2020_panellinies_net.pdf', displayName: 'Χημεία 2020', subject: 'ximia', year: 2020, url: createFileUrl('ximia', 'ximeia_2020_panellinies_net.pdf') },
      { fileName: 'ximeia_2019_panellinies_net.pdf', displayName: 'Χημεία 2019', subject: 'ximia', year: 2019, url: createFileUrl('ximia', 'ximeia_2019_panellinies_net.pdf') },
      { fileName: 'ximeia_2018_panellinies_net.pdf', displayName: 'Χημεία 2018', subject: 'ximia', year: 2018, url: createFileUrl('ximia', 'ximeia_2018_panellinies_net.pdf') },
      { fileName: 'ximeia_2017_panellinies_net.pdf', displayName: 'Χημεία 2017', subject: 'ximia', year: 2017, url: createFileUrl('ximia', 'ximeia_2017_panellinies_net.pdf') },
      { fileName: 'ximeia_2016_panellinies_net.pdf', displayName: 'Χημεία 2016', subject: 'ximia', year: 2016, url: createFileUrl('ximia', 'ximeia_2016_panellinies_net.pdf') },
      { fileName: 'ximeia_2015_panellinies_net.pdf', displayName: 'Χημεία 2015', subject: 'ximia', year: 2015, url: createFileUrl('ximia', 'ximeia_2015_panellinies_net.pdf') },
    ];
  }
  return _ximiaFiles;
}

// Group files by subject - lazy getter
export function getSubjectGroups(): SubjectGroup[] {
  if (!_subjectGroups) {
    _subjectGroups = [
      {
        subject: 'math',
        displayName: SUBJECT_LABELS.math,
        files: getMathFiles().sort((a, b) => b.year - a.year),
      },
      {
        subject: 'physics',
        displayName: SUBJECT_LABELS.physics,
        files: getPhysicsFiles().sort((a, b) => b.year - a.year),
      },
      {
        subject: 'ximia',
        displayName: SUBJECT_LABELS.ximia,
        files: getXimiaFiles().sort((a, b) => b.year - a.year),
      },
    ];
  }
  return _subjectGroups;
}

// Export as a lazy getter for backward compatibility
let _subjectGroupsExport: SubjectGroup[] | null = null;
export const subjectGroups: SubjectGroup[] = (() => {
  // Create a proxy that lazily initializes
  return new Proxy([] as SubjectGroup[], {
    get(target, prop) {
      if (!_subjectGroupsExport) {
        _subjectGroupsExport = getSubjectGroups();
      }
      const value = (_subjectGroupsExport as any)[prop];
      if (typeof value === 'function') {
        return value.bind(_subjectGroupsExport);
      }
      return value;
    },
    ownKeys() {
      if (!_subjectGroupsExport) {
        _subjectGroupsExport = getSubjectGroups();
      }
      return Reflect.ownKeys(_subjectGroupsExport);
    },
    getOwnPropertyDescriptor(target, prop) {
      if (!_subjectGroupsExport) {
        _subjectGroupsExport = getSubjectGroups();
      }
      return Reflect.getOwnPropertyDescriptor(_subjectGroupsExport, prop);
    },
    has(target, prop) {
      if (!_subjectGroupsExport) {
        _subjectGroupsExport = getSubjectGroups();
      }
      return prop in _subjectGroupsExport;
    },
  });
})();

// Get files by year
export const getFilesByYear = (year: number): PanhellenicFile[] => {
  const allFiles = [...getMathFiles(), ...getPhysicsFiles(), ...getXimiaFiles()];
  return allFiles.filter(file => file.year === year).sort((a, b) => {
    const subjectOrder = { math: 0, physics: 1, ximia: 2 };
    return subjectOrder[a.subject] - subjectOrder[b.subject];
  });
};

// Get all files grouped by year (for archive)
export const getFilesByYearGrouped = (): Record<number, PanhellenicFile[]> => {
  const allFiles = [...getMathFiles(), ...getPhysicsFiles(), ...getXimiaFiles()];
  const grouped: Record<number, PanhellenicFile[]> = {};
  
  allFiles.forEach(file => {
    if (!grouped[file.year]) {
      grouped[file.year] = [];
    }
    grouped[file.year].push(file);
  });
  
  // Sort files within each year by subject
  Object.keys(grouped).forEach(year => {
    grouped[parseInt(year)].sort((a, b) => {
      const subjectOrder = { math: 0, physics: 1, ximia: 2 };
      return subjectOrder[a.subject] - subjectOrder[b.subject];
    });
  });
  
  return grouped;
};

