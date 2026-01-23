import { J as JSXElement, R as RenderOptions, M as MountedComponent } from './jsx-dev-runtime-DakPS8WV.js';
export { C as ComponentFunction, g as For, F as Fragment, a as JSXProps, S as Show, f as Switch, c as component, e as createElements, d as defineComponent, j as jsx, b as jsxs } from './jsx-dev-runtime-DakPS8WV.js';
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
 * Clean up class names by removing duplicates and keeping the latest one
 * @param value - Class name string
 * @returns Cleaned class name string
 */
declare function cleanClassName(value: string): string;

export { ErrorBoundary, JSXElement, MountedComponent, RenderOptions, Suspense, Teleport, cleanClassName, createPortal, createRoot, hydrate, isBrowser, lazy, minifyHTML, mount, normalizeString, onDOMReady, queueUpdate, render };
