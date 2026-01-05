// src/index.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    // Export types
    export type {
        JSXElement,
        JSXProps,
        ComponentFunction,
        RenderOptions,
        MountedComponent
    } from './types';

    // Export JSX runtime
    export {
        jsx,
        jsxs,
        Fragment,
        component,
        defineComponent,
        Show,
        Switch,
        For,
        createElements
    } from './mod/runtime';

    // Export render utilities
    export {
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
    } from './mod/render';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
