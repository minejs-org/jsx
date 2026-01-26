
// src/kit/bg-kit.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { jsx } from '../mod/runtime';
    import type { ContainerBg, JSXElement } from '../types';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    export interface BgKitProps {
        opacity?: number;
        bgColor: ContainerBg;
        className?: string;
        style?: any;
        [key: string]: any;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export function BgKit(props: BgKitProps): JSXElement {
        const { bgColor = 'surface', opacity = 100, className = '', style, ...rest } = props;

        return jsx('div', {
            className: `
                absolute
                inset-0
                bg-${bgColor}
                opacity-${opacity}
                pointer-events-none
                -z-10
                ${className}
            `,
            style,
            ...rest
        })!;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
