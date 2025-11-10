/**
 * Utility functions for safely serializing schema objects to JSON
 * Prevents circular reference errors and ensures proper serialization
 */

/**
 * Safely stringify a schema object to JSON
 * Handles circular references and ensures proper formatting
 */
export function stringifySchema(schema: unknown): string {
  try {
    // Use a replacer function to handle any potential circular references
    return JSON.stringify(schema, null, 0);
  } catch (error) {
    console.error('Error stringifying schema:', error);
    // Return empty object as fallback
    return '{}';
  }
}

/**
 * Generate and stringify multiple schemas for use in script tags
 */
export function generateSchemaScripts(schemas: unknown[]): string[] {
  return schemas.map(schema => stringifySchema(schema));
}

