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

    // Regex patterns for class groups that should be mutually exclusive
    // The order matters for partial matches, though we try to use strict patterns where possible.
    const CONFLICT_GROUPS = [
        // Layout
        /^display-(.+)$/, 
        /^(block|inline-block|inline|flex|inline-flex|grid|inline-grid|table|table-row|table-cell|flow-root|contents|hidden)$/,
        /^(static|fixed|absolute|relative|sticky)$/,
        /^inset-(.+)$/,
        /^inset-x-(.+)$/,
        /^inset-y-(.+)$/,
        /^start-(.+)$/,
        /^end-(.+)$/,
        /^top-(.+)$/,
        /^bottom-(.+)$/,
        /^z-(.+)$/,

        // Flex/Grid
        /^flex-(row|col)(-reverse)?$/,
        /^flex-(wrap|nowrap)(-reverse)?$/,
        /^flex-(1|auto|initial|none)$/,
        /^basis-(.+)$/,
        /^grow(-0)?$/,
        /^shrink(-0)?$/,
        /^order-(.+)$/,
        /^gap-(\d+)$/, // gap-4
        /^gap-x-(.+)$/,
        /^gap-y-(.+)$/,
        /^justify-items-(.+)$/,
        /^justify-self-(.+)$/,
        /^justify-(start|end|center|between|around|evenly|stretch)$/, // justify-content
        /^content-(.+)$/, // align-content
        /^items-(.+)$/, // align-items
        /^self-(.+)$/, // align-self
        /^place-content-(.+)$/,
        /^place-items-(.+)$/,
        /^place-self-(.+)$/,
        /^grid-cols-(.+)$/,
        /^col-span-(.+)$/,
        /^col-start-(.+)$/,
        /^col-end-(.+)$/,
        /^grid-rows-(.+)$/,
        /^row-span-(.+)$/,
        /^row-start-(.+)$/,
        /^row-end-(.+)$/,
        /^grid-flow-(.+)$/,

        // Spacing
        /^p-(.+)$/,
        /^px-(.+)$/,
        /^py-(.+)$/,
        /^pt-(.+)$/,
        /^pb-(.+)$/,
        /^ps-(.+)$/,
        /^pe-(.+)$/,
        /^m-(.+)$/,
        /^mx-(.+)$/,
        /^my-(.+)$/,
        /^mt-(.+)$/,
        /^mb-(.+)$/,
        /^ms-(.+)$/,
        /^me-(.+)$/,

        // Sizing
        /^w-(.+)$/,
        /^min-w-(.+)$/,
        /^max-w-(.+)$/,
        /^h-(.+)$/,
        /^min-h-(.+)$/,
        /^max-h-(.+)$/,

        // Typography
        /^font-(sans|serif|mono)$/,
        /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
        /^text-(xs|sm|base|md|lg|xl|\d+xl)$/, // Font size
        /^leading-(.+)$/,
        /^tracking-(.+)$/,
        /^text-(left|center|right|justify|start|end)$/, // Text align
        /^text-(wrap|nowrap|balance|pretty)$/,
        /^(truncate|text-ellipsis|text-clip)$/,
        /^(uppercase|lowercase|capitalize|normal-case)$/,
        /^(italic|not-italic)$/,
        /^(underline|overline|line-through|no-underline)$/,
        /^text-(?!left|center|right|justify|start|end|xs|sm|base|md|lg|xl|\d+xl|wrap|nowrap|balance|pretty|ellipsis|clip).+$/, // Text color

        // Background & Effects
        /^bg-(?!blend).+$/, // Background color
        /^bg-blend-(.+)$/,
        /^mix-blend-(.+)$/,
        /^shadow(.*)$/,
        /^opacity-(.+)$/,
        /^blur(.*)$/,
        /^brightness-(.+)$/,
        /^contrast-(.+)$/,
        /^grayscale(.*)$/,
        /^invert(.*)$/,
        /^saturate-(.+)$/,
        /^sepia(.*)$/,
        /^hue-rotate-(.+)$/,
        /^backdrop-blur(.*)$/,
        /^transition(.*)$/
    ];

    /**
     * Clean up class names by removing duplicates and keeping the latest one.
     * Handles conflict groups (e.g., 'justify-start' overrides 'justify-center').
     * @param value - Class name string
     * @returns Cleaned class name string
     */
    export function cleanClassName(value: string): string {
        const tokens = value.trim().split(/\s+/);
        // optimization: if 0 or 1 token, just return trimmed
        if (tokens.length <= 1 && tokens[0] === '') return '';
        if (tokens.length === 1) return tokens[0];

        const seenGroups = new Set<number | string>();
        const result: string[] = [];

        // Iterate backwards to keep latest
        for (let i = tokens.length - 1; i >= 0; i--) {
            const token = tokens[i];
            if (!token) continue;

            let matchedGroup: number | string = token; // Default to token itself (exact match dedupe)

            // Check if token belongs to a known conflict group
            for (let g = 0; g < CONFLICT_GROUPS.length; g++) {
                if (CONFLICT_GROUPS[g].test(token)) {
                    matchedGroup = g;
                    break;
                }
            }

            if (!seenGroups.has(matchedGroup)) {
                seenGroups.add(matchedGroup);
                result.push(token);
            }
        }

        return result.reverse().join(' ');
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
