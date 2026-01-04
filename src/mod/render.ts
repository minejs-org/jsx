/* eslint-disable @typescript-eslint/no-explicit-any */
// src/mod/render.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { JSXElement, RenderOptions, MountedComponent } from '../types';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    let updateQueue: (() => void)[] = [];
    let isFlushPending = false;

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

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
    export function render(
    component: JSXElement | (() => JSXElement),
    container: HTMLElement | string,
    options: RenderOptions = {}
    ): MountedComponent {
    // Resolve container
    const target = typeof container === 'string'
        ? document.querySelector(container)
        : container;

    if (!target) {
        throw new Error(`Container not found: ${container}`);
    }

    // Get element from component
    const element = typeof component === 'function' ? component() : component;

    if (!element) {
        throw new Error('Component returned null or undefined');
    }

    // Mount to DOM based on mode
    const mode = options.mode || 'replace';

    switch (mode) {
        case 'replace':
        target.innerHTML = '';
        target.appendChild(element as Node);
        break;

        case 'append':
        target.appendChild(element as Node);
        break;

        case 'prepend':
        target.insertBefore(element as Node, target.firstChild);
        break;

        default:
        // Invalid mode, fall back to replace
        target.innerHTML = '';
        target.appendChild(element as Node);
    }

    // Call onMount callback
    options.onMount?.();

    // Return mounted component interface
    return {
        element: element as Element | DocumentFragment,

        unmount: () => {
        if (element instanceof Element) {
            element.remove();
        } else if (element instanceof DocumentFragment) {
            // DocumentFragment doesn't have remove method, remove all children
            while (element.firstChild) {
            element.removeChild(element.firstChild);
            }
        }
        options.onUnmount?.();
        },

        update: (newElement: JSXElement) => {
        if (element instanceof Element && newElement instanceof Element) {
            element.replaceWith(newElement);
        } else if (newElement instanceof Element) {
            // If current is DocumentFragment and new is Element
            if (element instanceof DocumentFragment && element.parentNode) {
            element.parentNode.replaceChild(newElement, element);
            }
        }
        }
    };
    }

    /**
     * Simple mount function (alias for render with replace mode)
     */
    export function mount(
    component: JSXElement | (() => JSXElement),
    container: HTMLElement | string
    ): MountedComponent {
    return render(component, container, { mode: 'replace' });
    }

    /**
     * Render component to a different location in the DOM
     */
    export function createPortal(
    children: JSXElement,
    container: HTMLElement | string
    ): JSXElement {
    const target = typeof container === 'string'
        ? document.querySelector(container)
        : container;

    if (!target) {
        throw new Error(`Portal container not found: ${container}`);
    }

    // Create a placeholder comment
    const placeholder = document.createComment('portal');

    // Mount children to target
    if (children instanceof Node) {
        target.appendChild(children);
    }

    return placeholder as any;
    }

    /**
     * Hydrate server-rendered HTML with client-side interactivity
     * @param component - Component to hydrate
     * @param container - Container with server-rendered HTML
     */
    export function hydrate(
    component: JSXElement | (() => JSXElement),
    container: HTMLElement | string
    ): MountedComponent {
    const targetElement = typeof container === 'string'
        ? document.querySelector(container)
        : container;

    const target = targetElement instanceof HTMLElement ? targetElement : null;

    if (!target) {
        throw new Error(`Container not found: ${container}`);
    }

    // For now, just replace (future: smart hydration)
    return render(component, target, { mode: 'replace' });
    }

    /**
     * Lazy load a component with dynamic imports
     * @param loader - Async function that returns a component module
     * @param fallback - Element to show while loading (optional)
     * @returns A component that renders loaded component or fallback/error state
     * @example
     * const LazyComponent = lazy(() => import('./Component'), <div>Loading...</div>);
     */
    export function lazy<P = any>(
    loader: () => Promise<{ default: (props: P) => JSXElement }>,
    fallback?: JSXElement
    ): (props: P) => JSXElement {
    let loadedComponent: ((props: P) => JSXElement) | null = null;
    let loading = false;
    let error: Error | null = null;

    return (props: P) => {
        // If already loaded, return component
        if (loadedComponent) {
        return loadedComponent(props);
        }

        // If error occurred, show error
        if (error) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'crux-lazy-error';
        errorDiv.textContent = `Error loading component: ${error.message}`;
        errorDiv.style.color = 'red';
        return errorDiv;
        }

        // If not loading yet, start loading
        if (!loading) {
        loading = true;

        loader()
            .then(module => {
            loadedComponent = module.default;
            // TODO: Trigger re-render when loaded
            })
            .catch(err => {
            error = err instanceof Error ? err : new Error(String(err));
            // TODO: Trigger re-render on error
            });
        }

        // Show fallback while loading
        return fallback || createLoadingElement();
    };
    }

    function createLoadingElement(): HTMLElement {
    const div = document.createElement('div');
    div.textContent = 'Loading...';
    return div;
    }

    /**
     * Error boundary component
     */
    export function ErrorBoundary(props: {
    fallback: (error: Error) => JSXElement
    children: JSXElement
    }): JSXElement {
    try {
        return props.children;
    } catch (error) {
        return props.fallback(error as Error);
    }
    }

    /**
     * Suspense component for handling loading states
     */
    export function Suspense(props: {
    fallback: JSXElement
    children: JSXElement | Promise<JSXElement>
    }): JSXElement {
    if (props.children instanceof Promise) {
        // Create container for async content
        const container = document.createElement('div');
        container.style.display = 'contents';

        // Show fallback first
        if (props.fallback instanceof Node) {
        container.appendChild(props.fallback);
        }

        // Load actual content
        props.children.then(element => {
        container.innerHTML = '';
        if (element instanceof Node) {
            container.appendChild(element);
        }
        });

        return container;
    } else {
        return props.children;
    }
    }

    /**
     * Teleport component (like Vue's Teleport)
     */
    export function Teleport(props: {
    to: string | HTMLElement
    children: JSXElement
    }): JSXElement {
    return createPortal(props.children, props.to);
    }

    /**
     * Queue a DOM update to be batched
     */
    export function queueUpdate(fn: () => void): void {
    updateQueue.push(fn);

    if (!isFlushPending) {
        isFlushPending = true;
        queueMicrotask(flushUpdates);
    }
    }

    /**
     * Flush all queued updates
     */
    function flushUpdates(): void {
    const updates = updateQueue;
    updateQueue = [];
    isFlushPending = false;

    updates.forEach(fn => fn());
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ HELP ════════════════════════════════════════╗

    /**
     * Check if code is running in browser
     */
    export function isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
    }

    /**
     * Wait for DOM to be ready
     */
    export function onDOMReady(callback: () => void): void {
    if (isBrowser()) {
        if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
        } else {
        callback();
        }
    }
    }

    /**
     * Create a root for rendering
     */
    export function createRoot(container: HTMLElement | string) {
    const target = typeof container === 'string'
        ? document.querySelector(container)
        : container;

    if (!target || !(target instanceof HTMLElement)) {
        throw new Error(`Root container not found: ${container}`);
    }

    let mounted: MountedComponent | null = null;

    return {
        render(component: JSXElement | (() => JSXElement)) {
        if (mounted) {
            mounted.unmount();
        }
        mounted = render(component, target);
        },

        unmount() {
        if (mounted) {
            mounted.unmount();
            mounted = null;
        }
        }
    };
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ ════ ════════════════════════════════════════╗

    export default {
    render,
    mount,
    hydrate,
    createPortal,
    lazy,
    ErrorBoundary,
    Suspense,
    Teleport,
    createRoot,
    onDOMReady,
    isBrowser,
    queueUpdate
    };

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
