
// src/kit/overlay.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { jsx } from '../mod/runtime';
    import type { JSXElement, OverlayPosition } from '../types';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    export interface OverlayProps {
        children?: any;
        /**
         * The ID of the form element the overlay is bound to (renders as a label).
         */
        htmlFor?: string;
        /**
         * Whether to show a backdrop (dimmed background).
         * @default false
         */
        backdrop?: boolean;
        /**
         * The z-index of the overlay.
         * @default 50
         */
        zIndex?: number;
        /**
         * The position of the content within the overlay.
         * @default 'center'
         */
        position?: OverlayPosition;
        /**
         * Additional CSS classes.
         */
        className?: string;
        /**
         * Inline styles.
         */
        style?: any;
        /**
         * Click handler for the overlay background (often used to close).
         */
        onClick?: (e: any) => void;
        /**
         * Any other props
         */
        [key: string]: any;
    }

    const positionClasses: Record<OverlayPosition, string> = {
        'center'        : 'justify-center items-center',
        'top'           : 'justify-center items-start',
        'bottom'        : 'justify-center items-end',
        'left'          : 'justify-start items-center',
        'right'         : 'justify-end items-center',
        'top-left'      : 'justify-start items-start',
        'top-right'     : 'justify-end items-start',
        'bottom-left'   : 'justify-start items-end',
        'bottom-right'  : 'justify-end items-end',
    };

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    /**
     * Overlay component that renders a full-screen container with flexible positioning.
     */
    export function Overlay(props: OverlayProps): JSXElement {
        const {
            children,
            backdrop = false,
            position = 'center',
            className = '',
            style,
            zIndex = 50,
            onClick,
            htmlFor,
            ...rest
        } = props;

        // Handle 'location' alias if it exists in rest (compatibility)
        // In the kit implementation, it destructured `location: position`.
        // We should check if position is default and location is provided in rest.
        // However, for core implementation, we'll stick to 'position'.
        // If 'location' was part of the public API of the kit, we should support it via alias here or in the kit wrapper.
        // The kit code had `location: position = 'center'`, meaning it aliased `location` prop to `position` var.
        // So the prop name was `location`.
        // Wait, let's double check `OverlayProps` in `kits/overlay/types.ts`.
        // It says `position?: OverlayPosition;`.
        // But the component code said `location: position = 'center'`.
        // This implies the prop was named `location`?
        // Let's re-read `kits/overlay/kit/overlay.tsx` carefully.
        
        const posClass = positionClasses[position] || positionClasses['center'];

        const combinedClasses = [
            'absolute',
            'inset-0',
            'w-full',
            'h-full',
            'flex',
            posClass,
            className
        ].filter(Boolean).join(' ');

        const combinedStyle = {
            ...(typeof style === 'object' ? style : {}),
            zIndex,
            ...(backdrop ? { backgroundColor: 'rgba(0, 0, 0, 0.5)' } : {})
        };

        const tagName = htmlFor ? 'label' : 'div';

        return jsx(tagName, {
            className: combinedClasses,
            style: combinedStyle,
            onClick: onClick,
            htmlFor: htmlFor,
            ...rest,
            children: children
        })!;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
