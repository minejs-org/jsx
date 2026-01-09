<!-- ╔══════════════════════════════ BEG ══════════════════════════════╗ -->

<br>
<div align="center">
    <p>
        <img src="../assets/img/render.png" alt="logo" style="" height="60" />
    </p>
</div>

<div align="center">
    <a href="../README.md"> <img src="https://img.shields.io/badge/🔥-@minejs/jsx-black"/> </a>
    <br>
    <img src="https://img.shields.io/badge/coverage-97.33%25-brightgreen" alt="Test Coverage" />
</div>
<br>

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->



<!-- ╔══════════════════════════════ DOC ══════════════════════════════╗ -->

- ## Quick Start 🔥

    > **_Lightweight DOM rendering library for JSX elements._**

    - ### Setup

        > install [`hmm`](https://github.com/minejsx-org/hmm) first.

        ```bash
        hmm i @minejsx/render
        ```

    <div align="center"> <img src="../assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - ### Usage

        ```ts
        import { render, mount, createRoot } from '@minejsx/render'
        ```

        - ### 1. Render Elements to DOM

            ```typescript
            // Create and render element
            const div = document.createElement('div')
            div.textContent = 'Hello World'

            render(div, '#app')
            ```

        - ### 2. Render with Different Modes

            ```typescript
            const element = document.createElement('p')
            element.textContent = 'Content'

            // Replace mode (default)
            render(element, '#app', { mode: 'replace' })

            // Append mode
            render(element, '#app', { mode: 'append' })

            // Prepend mode
            render(element, '#app', { mode: 'prepend' })
            ```

        - ### 3. Unmount and Update

            ```typescript
            const element = document.createElement('div')
            element.textContent = 'Original'

            const mounted = render(element, '#app')

            // Update element
            const newElement = document.createElement('div')
            newElement.textContent = 'Updated'
            mounted.update(newElement)

            // Unmount element
            mounted.unmount()
            ```

        - ### 4. Lifecycle Callbacks

            ```typescript
            const element = document.createElement('div')

            render(element, '#app', {
                onMount: () => console.log('Component mounted!'),
                onUnmount: () => console.log('Component unmounted!')
            })
            ```

        - ### 5. Create Root for Multiple Renders

            ```typescript
            const root = createRoot('#app')

            root.render(document.createElement('div'))
            root.render(document.createElement('span'))
            root.unmount()
            ```

    <br>

- ## API Reference 🔥

    - #### `render(component: JSXElement | (() => JSXElement), container: HTMLElement | string, options?: RenderOptions): MountedComponent`
        > Render a component to the DOM with various modes and callbacks.

        ```typescript
        const el = document.createElement('div')
        el.textContent = 'Content'

        const mounted = render(el, '#app', {
            mode: 'replace',
            onMount: () => console.log('mounted'),
            onUnmount: () => console.log('unmounted')
        })
        ```

        **Options:**
        - `mode`: `'replace' | 'append' | 'prepend'` - How to mount (default: `'replace'`)
        - `onMount`: `() => void` - Callback when mounted
        - `onUnmount`: `() => void` - Callback when unmounted

    - #### `mount(component: JSXElement | (() => JSXElement), container: HTMLElement | string): MountedComponent`

        > Shorthand for `render` with replace mode.

        ```typescript
        const el = document.createElement('div')
        mount(el, '#app')
        ```

    - #### `MountedComponent.unmount(): void`

        > Remove element from DOM and trigger onUnmount callback.

        ```typescript
        const mounted = render(element, container)
        mounted.unmount()
        ```

    - #### `MountedComponent.update(newElement: JSXElement): void`

        > Replace element with new element in DOM.

        ```typescript
        const mounted = render(element, container)
        mounted.update(newElement)
        ```

    - #### `createPortal(children: JSXElement, container: HTMLElement | string): JSXElement`

        > Render element to a different DOM node, returns placeholder comment.

        ```typescript
        const element = document.createElement('div')
        element.textContent = 'Portal content'

        const portal = createPortal(element, '#modal-root')
        ```

    - #### `hydrate(component: JSXElement | (() => JSXElement), container: HTMLElement | string): MountedComponent`

        > Hydrate server-rendered HTML with client-side interactivity.

        ```typescript
        hydrate(() => document.createElement('div'), '#app')
        ```

    - #### `lazy<P = any>(loader: () => Promise<{ default: (props: P) => JSXElement }>, fallback?: JSXElement): (props: P) => JSXElement`

        > Lazy load a component with dynamic import and fallback.

        ```typescript
        const LazyComponent = lazy(
            () => Promise.resolve({
                default: () => document.createElement('div')
            }),
            document.createElement('div') // fallback
        )
        ```

    - #### `ErrorBoundary(props: { fallback: (error: Error) => JSXElement, children: JSXElement }): JSXElement`

        > Catch errors in component tree and show fallback.

        ```typescript
        ErrorBoundary({
            fallback: (error) => {
                const div = document.createElement('div')
                div.textContent = `Error: ${error.message}`
                return div
            },
            children: element
        })
        ```

    - #### `Suspense(props: { fallback: JSXElement, children: JSXElement | Promise<JSXElement> }): JSXElement`

        > Handle async content with fallback while loading.

        ```typescript
        Suspense({
            fallback: document.createElement('div'),
            children: Promise.resolve(element)
        })
        ```

    - #### `Teleport(props: { to: string | HTMLElement, children: JSXElement }): JSXElement`

        > Alias for `createPortal` with component syntax.

        ```typescript
        Teleport({
            to: '#portal',
            children: element
        })
        ```

    - #### `queueUpdate(fn: () => void): void`

        > Queue a DOM update to be batched with microtasks.

        ```typescript
        queueUpdate(() => {
            // DOM update
        })
        ```

    - #### `onDOMReady(callback: () => void): void`

        > Execute callback when DOM is ready.

        ```typescript
        onDOMReady(() => {
            console.log('DOM ready!')
        })
        ```

    - #### `isBrowser(): boolean`

        > Check if running in browser environment.

        ```typescript
        if (isBrowser()) {
            console.log('Running in browser!')
        }
        ```

    - #### `createRoot(container: HTMLElement | string): { render: (component) => void, unmount: () => void }`

        > Create a root for managing multiple component renders.

        ```typescript
        const root = createRoot('#app')
        root.render(() => document.createElement('div'))
        root.unmount()
        ```

    <br>


- ## Real-World Examples

  - #### Simple Counter Component

    ```typescript
    import { render } from '@minejsx/render'
    import { signal } from '@minejs/signals'

    const count = signal(0)

    const render_ui = () => {
        const container = document.createElement('div')
        container.className = 'counter'

        const h1 = document.createElement('h1')
        h1.textContent = `Count: ${count()}`

        const button = document.createElement('button')
        button.textContent = 'Increment'
        button.onclick = () => count.set(count() + 1)

        container.appendChild(h1)
        container.appendChild(button)
        return container
    }

    render(render_ui, '#app')
    ```

  - #### Modal with Portal

    ```typescript
    import { render, createPortal } from '@minejsx/render'

    const modal = document.createElement('div')
    modal.className = 'modal'
    modal.textContent = 'Modal Content'

    // Create modal in body
    const portal = createPortal(modal, document.body)

    // Render elsewhere
    render(portal, '#app')
    ```

  - #### Lazy Loading Component

    ```typescript
    import { render, lazy } from '@minejsx/render'

    const fallback = document.createElement('div')
    fallback.textContent = 'Loading...'

    const HeavyComponent = lazy(
        () => import('./HeavyComponent'),
        fallback
    )

    const element = HeavyComponent({})
    render(element, '#app')
    ```

  - #### Multiple Renders with Root

    ```typescript
    import { render, createRoot } from '@minejsx/render'

    const root = createRoot('#app')

    const page1 = document.createElement('div')
    page1.textContent = 'Page 1'

    const page2 = document.createElement('div')
    page2.textContent = 'Page 2'

    // Render first page
    root.render(page1)

    // Switch to second page
    root.render(page2)

    // Cleanup
    root.unmount()
    ```

  - #### Error Boundary Example

    ```typescript
    import { render, ErrorBoundary } from '@minejsx/render'

    const content = document.createElement('div')
    content.textContent = 'Safe content'

    const boundary = ErrorBoundary({
        fallback: (error) => {
            const div = document.createElement('div')
            div.style.color = 'red'
            div.textContent = `Something went wrong: ${error.message}`
            return div
        },
        children: content
    })

    render(boundary, '#app')
    ```


- ## More 🔥

    - ### Vanilla Setup (No Framework)

        - #### HTML :

            ```html
            <!DOCTYPE html>
            <html>
            <head>
                <title>My App</title>
            </head>
            <body>
                <div id="app"></div>
                <script type="module" src="./app.ts"></script>
            </body>
            </html>
            ```

        - #### TypeScript/JavaScript (app.ts)

            ```typescript
            import { render } from '@minejsx/render'

            // Create element
            const app = document.createElement('div')
            app.className = 'container'

            const title = document.createElement('h1')
            title.textContent = 'Hello World'

            app.appendChild(title)

            // Render to DOM
            render(app, '#app')
            ```

    <div align="center"> <img src="../assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - ### With JSX Transform

        - #### TypeScript Configuration (tsconfig.json)

            ```json
            {
                "compilerOptions": {
                    "jsx": "react-jsx",
                    "jsxImportSource": "@minejsx/runtime"
                }
            }
            ```

        - #### Component File (App.tsx)

            ```jsx
            import { render } from '@minejsx/render'
            import type { JSXElement } from '@minejsx/runtime';
            import { signal } from '@minejs/signals'

            const count = signal(0)

            export default function App(): JSXElement {
                return (
                    <div className="app">
                        <h1>Count: {count()}</h1>
                        <button onclick={() => count.set(count() + 1)}>
                            Increment
                        </button>
                    </div>
                );
            }
            ```

        - #### Main Entry (main.tsx)

            ```tsx
            import { render } from '@minejsx/render'
            import App from './App'

            render(<App />, '#app')
            ```

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->



<!-- ╔══════════════════════════════ END ══════════════════════════════╗ -->

<br>

---

<div align="center">
    <a href="https://github.com/maysara-elshewehy"><img src="https://img.shields.io/badge/by-Maysara-black"/></a>
</div>

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->
