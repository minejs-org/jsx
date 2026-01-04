import { Signal } from '@minejs/signals';

/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types.d.ts
//
// Made with ❤️ by Maysara.



// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    // JSX Runtime Types
    type JSXElement          = Element | Text | DocumentFragment;
    type ComponentFunction<P = any> = (props: P) => JSXElement | null;

    interface JSXProps {
        children?       : any;
        ref?            : Signal<HTMLElement | null>;
        [key: string]   : any;
    }

    // Render Types
    interface RenderOptions {
        root?           : HTMLElement;
        mode?           : 'replace' | 'append' | 'prepend';
        onMount?        : () => void;
        onUnmount?      : () => void;
    }

    interface MountedComponent {
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

export { type ComponentFunction, ErrorBoundary, For, Fragment, type JSXElement, type JSXProps, type MountedComponent, type RenderOptions, Show, Suspense, Switch, Teleport, component, createElements, createPortal, createRoot, defineComponent, hydrate, isBrowser, jsx, jsxs, lazy, mount, onDOMReady, queueUpdate, render };
