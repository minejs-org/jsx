import { J as JSXElement, R as RenderOptions, M as MountedComponent, O as OverlayPosition, C as ContainerBg } from './jsx-dev-runtime-BKXZw55t.js';
export { a as ComponentFunction, e as ContainerAlign, N as ContainerAnimateDelay, L as ContainerAnimateDuration, P as ContainerAnimateEase, Q as ContainerAnimateFill, K as ContainerAnimation, b as ContainerAs, s as ContainerBorderColor, t as ContainerBorderStyle, u as ContainerBorderWidth, z as ContainerCursor, d as ContainerDirection, c as ContainerDisplay, k as ContainerFraction, g as ContainerGap, o as ContainerHeight, f as ContainerJustify, q as ContainerMaxHeight, m as ContainerMaxWidth, p as ContainerMinHeight, n as ContainerMinWidth, y as ContainerOverflow, B as ContainerPointerEvents, x as ContainerPosition, S as ContainerProps, v as ContainerRadius, D as ContainerResize, j as ContainerScale, w as ContainerShadow, h as ContainerSpace, i as ContainerSpaceOrAuto, G as ContainerTextAlign, r as ContainerTextColor, E as ContainerTextSize, I as ContainerTextTransform, F as ContainerTextWeight, H as ContainerTextWrap, A as ContainerUserSelect, l as ContainerWidth, a0 as For, W as Fragment, T as JSXProps, _ as Show, $ as Switch, X as component, Z as createElements, Y as defineComponent, U as jsx, V as jsxs } from './jsx-dev-runtime-BKXZw55t.js';
import '@minejs/signals';

/**
 * Render a component to the DOM
 * @param component - Component or JSX element to render
 * @param container - DOM element or selector to mount to
 * @param options - Rendering options (mode, callbacks)
 * @returns MountedComponent with unmount and update methods
 * @throws Error if container not found or component returns null
 * @example
 * const el = jsx('div', { children: 'Hello' });
 * render(el, document.body);
 */
declare function render(component: JSXElement | (() => JSXElement), container: HTMLElement | string, options?: RenderOptions): MountedComponent;
/**
 * Simple mount function (alias for render with replace mode)
 */
declare function mount(component: JSXElement | (() => JSXElement), container: HTMLElement | string): MountedComponent;
/**
 * Render component to a different location in the DOM
 */
declare function createPortal(children: JSXElement, container: HTMLElement | string): JSXElement;
/**
 * Hydrate server-rendered HTML with client-side interactivity
 * @param component - Component to hydrate
 * @param container - Container with server-rendered HTML
 */
declare function hydrate(component: JSXElement | (() => JSXElement), container: HTMLElement | string): MountedComponent;
/**
 * Lazy load a component with dynamic imports
 * @param loader - Async function that returns a component module
 * @param fallback - Element to show while loading (optional)
 * @returns A component that renders loaded component or fallback/error state
 * @example
 * const LazyComponent = lazy(() => import('./Component'), <div>Loading...</div>);
 */
declare function lazy<P = any>(loader: () => Promise<{
    default: (props: P) => JSXElement;
}>, fallback?: JSXElement): (props: P) => JSXElement;
/**
 * Error boundary component
 */
declare function ErrorBoundary(props: {
    fallback: (error: Error) => JSXElement;
    children: JSXElement;
}): JSXElement;
/**
 * Suspense component for handling loading states
 */
declare function Suspense(props: {
    fallback: JSXElement;
    children: JSXElement | Promise<JSXElement>;
}): JSXElement;
/**
 * Teleport component (like Vue's Teleport)
 */
declare function Teleport(props: {
    to: string | HTMLElement;
    children: JSXElement;
}): JSXElement;
/**
 * Queue a DOM update to be batched
 */
declare function queueUpdate(fn: () => void): void;
/**
 * Check if code is running in browser
 */
declare function isBrowser(): boolean;
/**
 * Wait for DOM to be ready
 */
declare function onDOMReady(callback: () => void): void;
/**
 * Create a root for rendering
 */
declare function createRoot(container: HTMLElement | string): {
    render(component: JSXElement | (() => JSXElement)): void;
    unmount(): void;
};

/**
 * Minify HTML string by removing excess whitespace
 * Collapses multiple spaces, tabs, and newlines into single spaces
 * Removes leading/trailing whitespace from text nodes
 * @param html - HTML string to minify
 * @returns Minified HTML string
 */
declare function minifyHTML(html: string): string;
/**
 * Normalize a string value by removing excess whitespace
 * Useful for class names, ids, and other attributes with multi-line definitions
 * @param value - String value to normalize
 * @returns Normalized string with collapsed whitespace
 */
declare function normalizeString(value: string): string;
/**
 * Clean up class names by removing duplicates and keeping the latest one.
 * Handles conflict groups (e.g., 'justify-start' overrides 'justify-center').
 * @param value - Class name string
 * @returns Cleaned class name string
 */
declare function cleanClassName(value: string): string;

interface DividerProps {
    orientation?: 'horizontal' | 'vertical';
    variant?: 'solid' | 'dashed' | 'dotted';
    thickness?: 'super-thin' | 'thin' | 'medium' | 'thick';
    color?: '1' | '2' | '3' | 'brand' | 'current';
    opacity?: 0 | 5 | 10 | 20 | 25 | 30 | 40 | 50 | 60 | 70 | 75 | 80 | 90 | 95 | 100;
    spacing?: 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12;
    max?: number;
    className?: string;
    role?: string;
    'aria-orientation'?: 'horizontal' | 'vertical';
    [key: string]: any;
}
/**
 * Renders a visual divider line to separate content.
 */
declare function Divider(props: DividerProps): JSXElement | null;

interface OverlayProps {
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
/**
 * Overlay component that renders a full-screen container with flexible positioning.
 */
declare function Overlay(props: OverlayProps): JSXElement;

interface TextProps {
    as?: string;
    children?: any;
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
    align?: 'start' | 'center' | 'end' | 'justify';
    color?: '1' | '2' | '3' | 'brand' | 'success' | 'warning' | 'danger' | 'info' | 'current';
    display?: 'inline' | 'block' | 'inline-block';
    italic?: boolean;
    underline?: boolean;
    lineThrough?: boolean;
    truncate?: boolean;
    noWrap?: boolean;
    className?: string;
    style?: any;
    [key: string]: any;
}
/**
 * Text component for standardized typography.
 */
declare function Text(props: TextProps): JSXElement;

interface BgKitProps {
    opacity?: number;
    bgColor: ContainerBg;
    className?: string;
    style?: any;
    [key: string]: any;
}
declare function BgKit(props: BgKitProps): JSXElement;

export { BgKit, type BgKitProps, ContainerBg, Divider, type DividerProps, ErrorBoundary, JSXElement, MountedComponent, Overlay, OverlayPosition, type OverlayProps, RenderOptions, Suspense, Teleport, Text, type TextProps, cleanClassName, createPortal, createRoot, hydrate, isBrowser, lazy, minifyHTML, mount, normalizeString, onDOMReady, queueUpdate, render };
