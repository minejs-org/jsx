// src/mod/utils.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    /**
     * Minify HTML string by removing excess whitespace
     * Collapses multiple spaces, tabs, and newlines into single spaces
     * Removes leading/trailing whitespace from text nodes
     * @param html - HTML string to minify
     * @returns Minified HTML string
     */
    export function minifyHTML(html: string): string {
        // Collapse multiple whitespace characters (spaces, tabs, newlines) into single space
        return html
            .replace(/\s+/g, ' ')           // Replace multiple whitespace with single space
            .replace(/>\s+</g, '><')        // Remove spaces between closing and opening tags
            .trim();                        // Remove leading/trailing whitespace
    }

    /**
     * Normalize a string value by removing excess whitespace
     * Useful for class names, ids, and other attributes with multi-line definitions
     * @param value - String value to normalize
     * @returns Normalized string with collapsed whitespace
     */
    export function normalizeString(value: string): string {
        return value
            .replace(/\s+/g, ' ')    // Collapse multiple whitespace into single space
            .trim();                 // Remove leading/trailing whitespace
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
