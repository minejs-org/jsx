// src/kit/text.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { jsx } from '../mod/runtime';
    import type { JSXElement } from '../types';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    export interface TextProps {
        // Semantic Tag
        as?                 : string;

        // Content
        children?           : any;

        // Typography
        size?               : 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
        weight?             : 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
        align?              : 'start' | 'center' | 'end' | 'justify';
        color?              : '1' | '2' | '3' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'current';
        
        // Display
        display?            : 'inline' | 'block' | 'inline-block';
        
        // Decoration
        italic?             : boolean;
        underline?          : boolean;
        lineThrough?        : boolean;
        
        // Layout
        truncate?           : boolean;
        noWrap?             : boolean;

        // Styling
        className?          : string;
        style?              : any;

        // Any other props
        [key: string]: any;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    /**
     * Text component for standardized typography.
     */
    export function Text(props: TextProps): JSXElement {
        const {
            as: Tag = 'p',
            children,
            size = 'base',
            weight = 'normal',
            align = 'start',
            color = '1',
            display,
            italic,
            underline,
            lineThrough,
            truncate,
            noWrap,
            className = '',
            style,
            ...rest
        } = props;

        const classes = [
            `text-${size}`,
            `font-${weight}`,
            `text-${align}`,
            `text-${color}`,
            display,
            italic && 'italic',
            underline && 'underline',
            lineThrough && 'line-through',
            truncate && 'truncate',
            noWrap && 'whitespace-nowrap',
            className
        ]
            .filter(Boolean)
            .join(' ');

        return jsx(Tag, {
            className: classes,
            style,
            ...rest,
            children
        })!;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
