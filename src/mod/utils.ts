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

    /**
     * Clean up class names by removing duplicates and keeping the latest one
     * @param value - Class name string
     * @returns Cleaned class name string
     */
    export function cleanClassName(value: string): string {
        const tokens = value.trim().split(/\s+/);
        // optimization: if 0 or 1 token, just return trimmed
        if (tokens.length <= 1 && tokens[0] === '') return '';
        if (tokens.length === 1) return tokens[0];

        const seen = new Set<string>();
        const result: string[] = [];

        // Iterate backwards to keep latest
        for (let i = tokens.length - 1; i >= 0; i--) {
            const token = tokens[i];
            if (token && !seen.has(token)) {
                seen.add(token);
                result.push(token);
            }
        }

        return result.reverse().join(' ');
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
