/* eslint-disable @typescript-eslint/no-explicit-any */
// src/mod/runtime.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { effect, isSignal, type Signal } from '@minejs/signals';
    import type { JSXElement, JSXProps, ComponentFunction } from '../types';
    import { normalizeString } from './utils';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    /**
     * Creates a DOM element from JSX
     * This is called automatically by TypeScript when it sees JSX syntax
     */
    export function jsx(
        type: string | ComponentFunction,
        props: JSXProps | null
    ): JSXElement | null {
        // Handle component (function)
        if (typeof type === 'function') {
            return type(props || {});
        }

        // Handle HTML element (string)
        return createHTMLElement(type, props || {});
    }

    /**
     * Same as jsx() but for elements with multiple children
     * (Used by TypeScript JSX transform)
     */
    export const jsxs = jsx;

    /**
     * Fragment component (like React.Fragment)
     */
    export function Fragment(props: { children?: any }): DocumentFragment {
        const fragment = document.createDocumentFragment();
        const children = normalizeChildren(props.children);

        children.forEach(child => {
            if (child instanceof Node) {
                fragment.appendChild(child);
            }
        });

        return fragment;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ ════ ════════════════════════════════════════╗

    // ============================================================================
    // HTML ELEMENT CREATION
    // ============================================================================

    // SVG elements that need to be created with createElementNS
    const SVG_ELEMENTS = new Set([
        'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon',
        'ellipse', 'g', 'text', 'tspan', 'defs', 'clipPath', 'linearGradient',
        'radialGradient', 'stop', 'mask', 'pattern', 'image', 'use', 'symbol',
        'marker', 'foreignObject', 'animate', 'animateTransform', 'animateMotion',
        'set', 'filter', 'feBlend', 'feColorMatrix', 'feComponentTransfer',
        'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
        'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
        'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology',
        'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
        'feTurbulence', 'title', 'desc', 'metadata'
    ]);

    // MathML elements that need to be created with createElementNS
    const MATHML_ELEMENTS = new Set([
        'math', 'maction', 'maligngroup', 'malignmark', 'menclose', 'merror',
        'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mlongdiv',
        'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom',
        'mroot', 'mrow', 'ms', 'mscarries', 'mscarry', 'msgroup', 'msline',
        'mspace', 'msqrt', 'msrow', 'mstack', 'mstyle', 'msub', 'msup',
        'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover',
        'semantics', 'annotation', 'annotation-xml'
    ]);

    const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';

    function createHTMLElement(type: string, props: JSXProps): Element {
        // Determine namespace and create element appropriately
        let element: Element;

        if (SVG_ELEMENTS.has(type)) {
            element = document.createElementNS(SVG_NAMESPACE, type);
        } else if (MATHML_ELEMENTS.has(type)) {
            element = document.createElementNS(MATHML_NAMESPACE, type);
        } else {
            element = document.createElement(type);
        }

        // Check if dangerouslySetInnerHTML is present and valid - it takes precedence over children
        const hasValidDangerouslySetInnerHTML = 'dangerouslySetInnerHTML' in props
            && props.dangerouslySetInnerHTML != null
            && typeof props.dangerouslySetInnerHTML === 'object'
            && '__html' in props.dangerouslySetInnerHTML
            && typeof props.dangerouslySetInnerHTML.__html === 'string';

        // Set properties and attributes
        for (const [key, value] of Object.entries(props)) {
            if (key === 'children') {
                // Skip children if dangerouslySetInnerHTML is present and valid
                if (!hasValidDangerouslySetInnerHTML) {
                    appendChildren(element, value);
                }
            } else if (key === 'dangerouslySetInnerHTML') {
                // Handle dangerouslySetInnerHTML - inject raw HTML
                handleDangerouslySetInnerHTML(element as HTMLElement, value);
            } else if (key === 'ref') {
                // Handle ref
                handleRef(element as HTMLElement, value);
            } else if (key === 'onload') {
                // Handle onload
                handleOnLoad(element, value);
            } else if (key.startsWith('on')) {
                // Handle events (onClick, onInput, etc)
                handleEvent(element, key, value);
            } else if (key === 'className' || key === 'class') {
                // Handle className/class
                handleClassName(element, value);
            } else if (key === 'style') {
                // Handle inline styles
                handleStyle(element as HTMLElement, value);
            } else if (isSignal(value)) {
                // Handle reactive props
                handleReactiveProp(element, key, value);
            } else if (typeof value === 'boolean') {
                // Handle boolean attributes (disabled, checked, etc)
                if (value) {
                    element.setAttribute(key, '');
                }
            } else if (value != null) {
                // Handle static props
                // For SVG/MathML elements, always use setAttribute to preserve case sensitivity
                if (SVG_ELEMENTS.has(type) || MATHML_ELEMENTS.has(type)) {
                    const attrValue = typeof value === 'string' ? normalizeString(value) : String(value);
                    element.setAttribute(key, attrValue);
                } else {
                    // For HTML elements, prefer property assignment
                    if (key in element) {
                        (element as any)[key] = value;
                    } else {
                        const attrValue = typeof value === 'string' ? normalizeString(value) : String(value);
                        element.setAttribute(key, attrValue);
                    }
                }
            }
        }

        return element;
    }

    // ============================================================================
    // CHILDREN HANDLING
    // ============================================================================

    function appendChildren(parent: Element, children: any): void {
        const normalized = normalizeChildren(children);

        normalized.forEach(child => {
            if (child instanceof Node) {
                parent.appendChild(child);
            } else if (isSignal(child)) {
                // Reactive text node
                const textNode = document.createTextNode('');
                effect(() => {
                    textNode.textContent = String(child());
                });
                parent.appendChild(textNode);
            } else if (child != null && child !== false) {
                // Static text node
                parent.appendChild(document.createTextNode(String(child)));
            }
        });
    }

    function normalizeChildren(children: any): any[] {
        if (children == null || children === false) {
            return [];
        }

        if (Array.isArray(children)) {
            return children.flatMap(normalizeChildren);
        }

        return [children];
    }

    // ============================================================================
    // ONLOAD HANDLING
    // ============================================================================

    const onLoadMap = new WeakMap<Element, () => void>();
    const ONLOAD_ATTR = 'data-mine-onload';
    let observer: MutationObserver | null = null;

    function initObserver() {
        if (observer) return;
        if (typeof MutationObserver === 'undefined') return;

        observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Node.ELEMENT_NODE
                        checkOnLoad(node as Element);
                    }
                });
            });
        });

        observer.observe(document, {
            childList: true,
            subtree: true
        });
    }

    function checkOnLoad(element: Element) {
        if (element.hasAttribute(ONLOAD_ATTR)) {
            const cb = onLoadMap.get(element);
            if (cb) cb();
        }

        // Check descendants
        const descendants = element.querySelectorAll(`[${ONLOAD_ATTR}]`);
        descendants.forEach(descendant => {
            const cb = onLoadMap.get(descendant);
            if (cb) cb();
        });
    }

    function handleOnLoad(element: Element, callback: any): void {
        if (typeof callback !== 'function') return;

        onLoadMap.set(element, callback);
        element.setAttribute(ONLOAD_ATTR, 'true');
        initObserver();
    }

    // ============================================================================
    // REF HANDLING
    // ============================================================================

    function handleRef(element: HTMLElement, ref: any): void {
        if (isSignal(ref)) {
            ref.set(element);
        } else if (typeof ref === 'function') {
            ref(element);
        }
    }

    // ============================================================================
    // EVENT HANDLING
    // ============================================================================

    function handleEvent(element: Element, eventName: string, handler: any): void {
        if (typeof handler !== 'function') return;

        // Convert onClick → click, onInput → input, etc
        const event = eventName.slice(2).toLowerCase();

        element.addEventListener(event, handler);
    }

    // ============================================================================
    // CLASS NAME HANDLING
    // ============================================================================

    function handleClassName(element: Element, value: any): void {
        if (isSignal(value)) {
            // Reactive className
            effect(() => {
                const className = value();
                if (className != null) {
                    element.className = normalizeString(String(className));
                }
            });
        } else if (value != null) {
            // Static className
            element.className = normalizeString(String(value));
        }
    }

    // ============================================================================
    // STYLE HANDLING
    // ============================================================================

    function handleStyle(element: HTMLElement, value: any): void {
        if (isSignal(value)) {
            // Reactive style object
            effect(() => {
                const styles = value();
                applyStyles(element, styles);
            });
        } else {
            // Static style
            applyStyles(element, value);
        }
    }

    function applyStyles(element: HTMLElement, styles: any): void {
        if (typeof styles === 'string') {
            element.style.cssText = styles;
        } else if (typeof styles === 'object' && styles != null) {
            Object.entries(styles).forEach(([key, value]) => {
                if (value != null) {
                    // Convert camelCase to kebab-case
                    const cssKey = key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
                    element.style.setProperty(cssKey, String(value));
                }
            });
        }
    }

    // ============================================================================
    // DANGEROUSLY SET INNER HTML
    // ============================================================================

    function handleDangerouslySetInnerHTML(element: HTMLElement, value: any): void {
        if (value != null && typeof value === 'object' && '__html' in value) {
            // Extract __html property and inject as raw HTML
            const html = value.__html;
            if (typeof html === 'string') {
                element.innerHTML = html;
            }
        }
    }

    // ============================================================================
    // REACTIVE PROP HANDLING
    // ============================================================================

    function handleReactiveProp(element: Element, key: string, signal: Signal<any>): void {
        effect(() => {
            const value = signal();

            if (value != null) {
                if (key === 'className' || key === 'class') {
                    // Normalize className/class for reactive props
                    element.className = normalizeString(String(value));
                } else if (key in element) {
                    // Set as property (for input.value, etc)
                    ; (element as any)[key] = value;
                } else {
                    // Set as attribute, normalize if string
                    const attrValue = typeof value === 'string' ? normalizeString(value) : String(value);
                    element.setAttribute(key, attrValue);
                }
            } else {
                element.removeAttribute(key);
            }
        });
    }

    /**
     * Create a component from a function
     * Provides a cleaner API than raw JSX
     */
    export function component<P = any>(
        fn: (props: P) => JSXElement | null
    ): ComponentFunction<P> {
        return fn;
    }

    /**
     * Create a component with setup function
     * Similar to Vue's Composition API
     */
    export function defineComponent<P = any>(
        setup: (props: P) => () => JSXElement | null
    ): ComponentFunction<P> {
        return (props: P) => {
            const render = setup(props);
            return render();
        };
    }

    // ============================================================================
    // UTILITY FUNCTIONS
    // ============================================================================

    /**
     * Create multiple elements at once
     */
    export function createElements(elements: any[]): DocumentFragment {
        const fragment = document.createDocumentFragment();

        elements.forEach(el => {
            if (el instanceof Node) {
                fragment.appendChild(el);
            }
        });

        return fragment;
    }

    /**
     * Show/hide element based on condition
     */
    export function Show(props: {
        when: boolean | Signal<boolean>
        children: any
    }): JSXElement | null {
        if (isSignal(props.when)) {
            const placeholder = document.createComment('show');
            const parent = document.createDocumentFragment();
            parent.appendChild(placeholder);

            let currentElement: Element | null = null;

            effect(() => {
                const when = props.when as Signal<boolean>;
                const condition = when();

                if (condition && !currentElement) {
                    // Show: create and insert element
                    const children = normalizeChildren(props.children);
                    currentElement = children[0] as Element;

                    if (currentElement instanceof Node) {
                        placeholder.parentNode?.insertBefore(currentElement, placeholder);
                    }
                } else if (!condition && currentElement) {
                    // Hide: remove element
                    currentElement.remove();
                    currentElement = null;
                }
            });

            return parent as any;
        } else {
            // Static condition
            return (props.when as boolean) ? jsx(Fragment, { children: props.children }) : null;
        }
    }

    /**
     * Render different elements based on condition
     */
    export function Switch(props: {
        children: { when: boolean | Signal<boolean>; children: any }[]
    }): JSXElement | null {
        // Find first matching case
        for (const caseItem of props.children) {
            const condition = isSignal(caseItem.when) ? caseItem.when() : caseItem.when;

            if (condition) {
                return jsx(Fragment, { children: caseItem.children });
            }
        }

        return null;
    }

    /**
     * Iterate over array and render elements
     */
    export function For<T>(props: {
        each: T[] | Signal<T[]>
        children: (item: T, index: number) => JSXElement
    }): JSXElement {
        const fragment = document.createDocumentFragment();

        if (isSignal(props.each)) {
            // Reactive list
            const container = document.createElement('div');
            container.style.display = 'contents'; // Don't affect layout

            effect(() => {
                const each = props.each as Signal<T[]>;
                const items = each();
                container.innerHTML = ''; // Clear

                items.forEach((item: any, index: any) => {
                    const element = props.children(item, index);
                    if (element instanceof Node) {
                        container.appendChild(element);
                    }
                });
            });

            fragment.appendChild(container);
        } else {
            // Static list
            const each = props.each as T[];
            each.forEach((item, index) => {
                const element = props.children(item, index);
                if (element instanceof Node) {
                    fragment.appendChild(element);
                }
            });
        }

        return fragment as any;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
