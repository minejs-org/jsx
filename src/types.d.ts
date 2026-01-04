/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types.d.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { Signal } from '@minejs/signals';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    // JSX Runtime Types
    export type JSXElement          = Element | Text | DocumentFragment;
    export type ComponentFunction<P = any> = (props: P) => JSXElement | null;

    export interface JSXProps {
        children?       : any;
        ref?            : Signal<HTMLElement | null>;
        [key: string]   : any;
    }

    // Render Types
    export interface RenderOptions {
        root?           : HTMLElement;
        mode?           : 'replace' | 'append' | 'prepend';
        onMount?        : () => void;
        onUnmount?      : () => void;
    }

    export interface MountedComponent {
        element         : Element | DocumentFragment;
        unmount         : () => void;
        update          : (newElement: JSXElement) => void;
    }

    // JSX Global Declarations
    declare global {
        namespace JSX {
            type Element            = JSXElement;
            type IntrinsicElements  = Record<string, any>;
            interface ElementChildrenAttribute {
                children: object;
            }
        }
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝