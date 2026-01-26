import { Signal } from '@minejs/signals';

type JSXElement = Element | Text | DocumentFragment;
interface RenderOptions {
    root?: HTMLElement;
    mode?: 'replace' | 'append' | 'prepend';
    onMount?: () => void;
    onUnmount?: () => void;
}
interface MountedComponent {
    element: Element | DocumentFragment;
    unmount: () => void;
    update: (newElement: JSXElement) => void;
}
type ComponentFunction<P = any> = (props: P) => JSXElement | null;
type ContainerAs = 'div' | 'label' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav' | 'span' | 'button' | 'a' | 'form' | 'ul' | 'ol' | 'li' | (string & {});
type ContainerDisplay = 'block' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid';
type ContainerDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type ContainerAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type ContainerJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
type ContainerGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;
type ContainerSpace = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64;
type ContainerSpaceOrAuto = ContainerSpace | 'auto';
type ContainerScale = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40 | 48 | 56 | 64;
type ContainerFraction = '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | '1/5' | '2/5' | '3/5' | '4/5' | '1/6' | '5/6' | '1/12';
type ContainerWidth = 'auto' | 'full' | 'screen' | 'min' | 'max' | 'fit' | ContainerScale | ContainerFraction | (string & {}) | number;
type ContainerMaxWidth = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full' | 'min' | 'max' | 'fit' | 'prose' | ContainerScale | (string & {}) | number;
type ContainerMinWidth = 0 | 'full' | 'min' | 'max' | 'fit' | ContainerScale | (string & {}) | number;
type ContainerHeight = 'auto' | 'full' | 'screen' | 'min' | 'max' | 'fit' | ContainerScale | ContainerFraction | (string & {}) | number;
type ContainerMinHeight = 0 | 'full' | 'screen' | 'min' | 'max' | 'fit' | ContainerScale | (string & {}) | number;
type ContainerMaxHeight = 'none' | 'full' | 'screen' | 'min' | 'max' | 'fit' | ContainerScale | (string & {}) | number;
type ContainerBg = 'page' | 'surface' | 'raised' | 'brand' | 'brand-subtle' | 'success' | 'success-subtle' | 'warning' | 'warning-subtle' | 'error' | 'error-subtle' | 'info' | 'info-subtle' | 'current' | 'transparent';
type ContainerTextColor = '1' | '2' | '3' | '4' | 'inverse' | 'brand' | 'success' | 'warning' | 'error' | 'info' | 'current' | 'transparent';
type ContainerBorderColor = '1' | '2' | '3' | 'c1' | 'c2' | 'c3' | 'brand' | 'success' | 'warning' | 'error' | 'current' | 'transparent';
type ContainerBorderStyle = 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'hidden' | 'none';
type ContainerBorderWidth = 0 | 1 | 2 | 4 | 8;
type ContainerRadius = 'none' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
type ContainerShadow = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner';
type ContainerPosition = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
type ContainerOverflow = 'visible' | 'hidden' | 'scroll' | 'auto';
type ContainerCursor = 'auto' | 'default' | 'pointer' | 'wait' | 'text' | 'move' | 'help' | 'not-allowed' | 'none' | 'grab' | 'grabbing';
type ContainerUserSelect = 'none' | 'text' | 'all' | 'auto';
type ContainerPointerEvents = 'none' | 'auto';
type ContainerResize = 'none' | 'both' | 'y' | 'x';
type ContainerAnimation = 'none' | 'spin' | 'ping' | 'pulse' | 'bounce' | 'fade-in' | 'fade-out' | 'slide-in-up' | 'slide-in-down' | 'slide-in-left' | 'slide-in-right' | 'zoom-in' | 'zoom-out';
type ContainerAnimateDuration = 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000;
type ContainerAnimateDelay = 75 | 100 | 150 | 200 | 300 | 500 | 700 | 1000;
type ContainerAnimateEase = 'linear' | 'in' | 'out' | 'in-out';
type ContainerAnimateFill = 'forwards' | 'backwards' | 'both' | 'none';
type OverlayPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
interface ContainerProps {
    as?: ContainerAs;
    display?: ContainerDisplay;
    direction?: ContainerDirection;
    align?: ContainerAlign;
    justify?: ContainerJustify;
    wrap?: boolean;
    gap?: ContainerGap;
    gapX?: ContainerGap;
    gapY?: ContainerGap;
    grow?: boolean | number;
    shrink?: boolean | number;
    basis?: string | number;
    order?: number;
    w?: ContainerWidth;
    h?: ContainerHeight;
    size?: ContainerWidth;
    minW?: ContainerMinWidth;
    minH?: ContainerMinHeight;
    maxW?: ContainerMaxWidth;
    maxH?: ContainerMaxHeight;
    p?: ContainerSpace;
    px?: ContainerSpace;
    py?: ContainerSpace;
    ps?: ContainerSpace;
    pe?: ContainerSpace;
    pt?: ContainerSpace;
    pb?: ContainerSpace;
    m?: ContainerSpaceOrAuto;
    mx?: ContainerSpaceOrAuto;
    my?: ContainerSpaceOrAuto;
    ms?: ContainerSpaceOrAuto;
    me?: ContainerSpaceOrAuto;
    mt?: ContainerSpaceOrAuto;
    mb?: ContainerSpaceOrAuto;
    bg?: ContainerBg;
    color?: ContainerTextColor;
    border?: ContainerBorderWidth;
    borderStyle?: ContainerBorderStyle;
    borderColor?: ContainerBorderColor;
    radius?: ContainerRadius;
    shadow?: ContainerShadow;
    opacity?: number;
    position?: ContainerPosition;
    overflow?: ContainerOverflow;
    divider?: boolean | 'horizontal' | 'vertical';
    cursor?: ContainerCursor;
    select?: ContainerUserSelect;
    pointerEvents?: ContainerPointerEvents;
    resize?: ContainerResize;
    animate?: ContainerAnimation;
    animateDuration?: ContainerAnimateDuration;
    animateDelay?: ContainerAnimateDelay;
    animateEase?: ContainerAnimateEase;
    animateFill?: ContainerAnimateFill;
    overlay?: boolean;
    location?: OverlayPosition;
    backdrop?: boolean;
    zIndex?: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;
}
interface JSXProps extends ContainerProps {
    children?: any;
    ref?: Signal<HTMLElement | null> | HTMLElement | null;
    htmlFor?: string | Signal<string>;
    [key: string]: any;
}
declare global {
    namespace JSX {
        interface ElementChildrenAttribute {
            children: object;
        }
        type IntrinsicElements = Record<string, JSXProps>;
    }
}

/**
 * Creates a DOM element from JSX
 * This is called automatically by TypeScript when it sees JSX syntax
 */
declare function jsx(type: string | ComponentFunction, props: JSXProps | null): JSXElement | null;
/**
 * Same as jsx() but for elements with multiple children
 * (Used by TypeScript JSX transform)
 */
declare const jsxs: typeof jsx;
/**
 * Fragment component (like React.Fragment)
 */
declare function Fragment(props: {
    children?: any;
}): DocumentFragment;
/**
 * Create a component from a function
 * Provides a cleaner API than raw JSX
 */
declare function component<P = any>(fn: (props: P) => JSXElement | null): ComponentFunction<P>;
/**
 * Create a component with setup function
 * Similar to Vue's Composition API
 */
declare function defineComponent<P = any>(setup: (props: P) => () => JSXElement | null): ComponentFunction<P>;
/**
 * Create multiple elements at once
 */
declare function createElements(elements: any[]): DocumentFragment;
/**
 * Show/hide element based on condition
 */
declare function Show(props: {
    when: boolean | Signal<boolean>;
    children: any;
}): JSXElement | null;
/**
 * Render different elements based on condition
 */
declare function Switch(props: {
    children: {
        when: boolean | Signal<boolean>;
        children: any;
    }[];
}): JSXElement | null;
/**
 * Iterate over array and render elements
 */
declare function For<T>(props: {
    each: T[] | Signal<T[]>;
    children: (item: T, index: number) => JSXElement;
}): JSXElement;

export { type ContainerUserSelect as A, type ContainerPointerEvents as B, type ComponentFunction as C, type ContainerResize as D, type ContainerAnimation as E, type ContainerAnimateDuration as F, type ContainerAnimateDelay as G, type ContainerAnimateEase as H, type ContainerAnimateFill as I, type JSXElement as J, type ContainerProps as K, type JSXProps as L, type MountedComponent as M, jsx as N, type OverlayPosition as O, jsxs as P, Fragment as Q, type RenderOptions as R, component as S, defineComponent as T, createElements as U, Show as V, Switch as W, For as X, type ContainerAs as a, type ContainerDisplay as b, type ContainerDirection as c, type ContainerAlign as d, type ContainerJustify as e, type ContainerGap as f, type ContainerSpace as g, type ContainerSpaceOrAuto as h, type ContainerScale as i, type ContainerFraction as j, type ContainerWidth as k, type ContainerMaxWidth as l, type ContainerMinWidth as m, type ContainerHeight as n, type ContainerMinHeight as o, type ContainerMaxHeight as p, type ContainerBg as q, type ContainerTextColor as r, type ContainerBorderColor as s, type ContainerBorderStyle as t, type ContainerBorderWidth as u, type ContainerRadius as v, type ContainerShadow as w, type ContainerPosition as x, type ContainerOverflow as y, type ContainerCursor as z };
