const fs = require('fs');

// Read the file with proper encoding
const content = fs.readFileSync('FUCKING EXTRA DUDE.txt', 'utf8');
const lines = content.split('\n');

const studentsByYear = {};
let currentYear = null;
let currentYearData = [];

// Helper function to escape single quotes for TypeScript strings
function escapeString(str) {
  return str.replace(/'/g, "\\'").replace(/\n/g, ' ').trim();
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Check if line is a year (4 digits)
  if (/^\d{4}$/.test(line)) {
    // Save previous year if exists
    if (currentYear && currentYearData.length > 0) {
      studentsByYear[currentYear] = currentYearData;
    }
    // Start new year
    currentYear = line;
    currentYearData = [];
    continue;
  }
  
  // Skip empty lines
  if (!line) continue;
  
  // Skip lines that are just asterisks or special characters
  if (/^[*\s]+$/.test(line)) continue;
  
  // Parse student entry
  // Format: LASTNAME FIRSTNAME      UNIVERSITY
  // The name and university are separated by multiple spaces (at least 2)
  // Try to find where the name ends and school title begins
  const parts = line.split(/\s{2,}/);
  
  if (parts.length >= 2) {
    const namePart = parts[0].trim();
    const schoolTitle = parts.slice(1).join(' ').trim();
    
    if (!namePart || !schoolTitle) continue;
    
    // Split name into last name and first name
    // Usually the last name is first, then first name(s)
    const nameParts = namePart.split(/\s+/);
    
    if (nameParts.length >= 2) {
      const lastName = nameParts[0];
      const firstName = nameParts.slice(1).join(' ');
      
      // Skip if name contains asterisks (incomplete data)
      if (lastName.includes('*') || firstName.includes('*')) {
        continue;
      }
      
      currentYearData.push({
        lastName: escapeString(lastName),
        firstName: escapeString(firstName),
        schoolTitle: escapeString(schoolTitle)
      });
    } else if (nameParts.length === 1 && schoolTitle) {
      // Sometimes only last name is provided
      if (!nameParts[0].includes('*')) {
        currentYearData.push({
          lastName: escapeString(nameParts[0]),
          firstName: '',
          schoolTitle: escapeString(schoolTitle)
        });
      }
    }
  } else {
    // Try to parse lines that might have single space separation
    // Look for pattern: LASTNAME FIRSTNAME UNIVERSITY
    // We'll try to split on the first occurrence of a long word (likely university)
    const words = line.split(/\s+/);
    if (words.length >= 3) {
      // Try to find where university name starts (usually after first 2-3 words)
      // This is a heuristic - university names are usually longer
      let nameEnd = 2;
      if (words.length > 3 && words[2].length < 5) {
        nameEnd = 3;
      }
      
      const lastName = words[0];
      const firstName = words.slice(1, nameEnd).join(' ');
      const schoolTitle = words.slice(nameEnd).join(' ');
      
      if (!lastName.includes('*') && !firstName.includes('*')) {
        currentYearData.push({
          lastName: escapeString(lastName),
          firstName: escapeString(firstName),
          schoolTitle: escapeString(schoolTitle)
        });
      }
    }
  }
}

// Save last year
if (currentYear && currentYearData.length > 0) {
  studentsByYear[currentYear] = currentYearData;
}

// Generate TypeScript code
let output = '';
const years = Object.keys(studentsByYear).sort((a, b) => parseInt(a) - parseInt(b));

for (const year of years) {
  const students = studentsByYear[year];
  const varName = `students${year}`;
  
  output += `export const ${varName}: Student[] = [\n`;
  for (const student of students) {
    output += `  { lastName: '${student.lastName}', firstName: '${student.firstName}', schoolTitle: '${student.schoolTitle}' },\n`;
  }
  output += `];\n\n`;
}

console.log(output);
console.error(`\nParsed ${years.length} years: ${years.join(', ')}`);
console.error(`Total students: ${Object.values(studentsByYear).reduce((sum, arr) => sum + arr.length, 0)}`);
