/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { Signal } from '@minejs/signals';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    // JSX Runtime Types
    export type JSXElement = Element | Text | DocumentFragment;

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

    export type ComponentFunction<P = any> = (props: P) => JSXElement | null;

    // Container Types
    export type ContainerAs = 'div' | 'label' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav' | 'span' | 'button' | 'a' | 'form' | 'ul' | 'ol' | 'li' | (string & {});
    export type ContainerDisplay = 'block' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid';
    export type ContainerDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
    export type ContainerAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    export type ContainerJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    export type ContainerGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
    export type ContainerSpace = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64;
    export type ContainerSpaceOrAuto = ContainerSpace | 'auto';
    export type ContainerScale = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64;
    export type ContainerFraction = '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | '1/5' | '2/5' | '3/5' | '4/5' | '1/6' | '5/6' | '1/12';
    export type ContainerWidth = 'auto' | 'full' | 'screen' | 'min' | 'max' | 'fit' | ContainerScale | ContainerFraction | (string & {}) | number;
    export type ContainerMaxWidth = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full' | 'min' | 'max' | 'fit' | 'prose' | ContainerScale | (string & {}) | number;
    export type ContainerMinWidth = 0 | 'full' | 'min' | 'max' | 'fit' | ContainerScale | (string & {}) | number;
    export type ContainerHeight = 'auto' | 'full' | 'screen' | 'min' | 'max' | 'fit' | ContainerScale | ContainerFraction | (string & {}) | number;
    export type ContainerMinHeight = 0 | 'full' | 'screen' | 'min' | 'max' | 'fit' | ContainerScale | (string & {}) | number;
    export type ContainerMaxHeight = 'none' | 'full' | 'screen' | 'min' | 'max' | 'fit' | ContainerScale | (string & {}) | number;
    export type ContainerBg = 'page' | 'surface' | 'raised' | 'brand' | 'brand-subtle' | 'success' | 'success-subtle' | 'warning' | 'warning-subtle' | 'error' | 'error-subtle' | 'info' | 'info-subtle' | 'current' | 'transparent';
    export type ContainerTextColor = '1' | '2' | '3' | '4' | 'inverse' | 'brand' | 'success' | 'warning' | 'error' | 'info' | 'current' | 'transparent';
    export type ContainerBorderColor = '1' | '2' | '3' | 'brand' | 'success' | 'warning' | 'error' | 'current' | 'transparent';
    export type ContainerBorderWidth = 0 | 1 | 2 | 4 | 8;
    export type ContainerRadius      = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
    export type ContainerShadow      = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';
    export type ContainerPosition = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
    export type ContainerOverflow = 'visible' | 'hidden' | 'scroll' | 'auto';

    // Overlay Types
    export type OverlayPosition =
        | 'center'
        | 'top'
        | 'bottom'
        | 'left'
        | 'right'
        | 'top-left'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-right';

    export interface ContainerProps {
        // Layout
        as?: ContainerAs;
        display?: ContainerDisplay;
        direction?: ContainerDirection;
        align?: ContainerAlign;
        justify?: ContainerJustify;
        wrap?: boolean;
        gap?: ContainerGap;
        gapX?: ContainerGap;
        gapY?: ContainerGap;

        // Sizing
        w?: ContainerWidth;
        h?: ContainerHeight;
        minW?: ContainerMinWidth;
        minH?: ContainerMinHeight;
        maxW?: ContainerMaxWidth;
        maxH?: ContainerMaxHeight;

        // Spacing - padding
        p?: ContainerSpace;
        px?: ContainerSpace;
        py?: ContainerSpace;
        ps?: ContainerSpace;
        pe?: ContainerSpace;
        pt?: ContainerSpace;
        pb?: ContainerSpace;

        // Spacing - margin
        m?: ContainerSpaceOrAuto;
        mx?: ContainerSpaceOrAuto;
        my?: ContainerSpaceOrAuto;
        ms?: ContainerSpaceOrAuto;
        me?: ContainerSpaceOrAuto;
        mt?: ContainerSpaceOrAuto;
        mb?: ContainerSpaceOrAuto;

        // Visual
        bg?: ContainerBg;
        color?: ContainerTextColor;
        border?: ContainerBorderWidth;
        borderColor?: ContainerBorderColor;
        radius?: ContainerRadius;
        shadow?: ContainerShadow;

        // Positioning / overflow
        position?: ContainerPosition;
        overflow?: ContainerOverflow;

        // Overlay
        overlay?: boolean;
        location?: OverlayPosition;
        backdrop?: boolean;

        // Styling
        zIndex?: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
    }

    export interface JSXProps extends ContainerProps {
        children?       : any;
        ref?            : Signal<HTMLElement | null> | HTMLElement | null;
        htmlFor?        : string | Signal<string>;
        [key: string]   : any;
    }

    // JSX Global Declarations
    declare global {
        // eslint-disable-next-line @typescript-eslint/no-namespace
        namespace JSX {
            interface ElementChildrenAttribute {
                children: object;
            }
            type IntrinsicElements = Record<string, JSXProps>;
        }
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
