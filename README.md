<!-- ╔══════════════════════════════ BEG ══════════════════════════════╗ -->

<br>
<div align="center">
    <p>
        <img src="./assets/img/logo.png" alt="logo" style="" height="60" />
    </p>
</div>

<div align="center">
    <img src="https://img.shields.io/badge/v-0.0.1-black"/>
    <img src="https://img.shields.io/badge/🔥-@minejs-black"/>
    <br>
    <img src="https://img.shields.io/badge/coverage-97.59%25-brightgreen" alt="Test Coverage" />
    <img src="https://img.shields.io/github/issues/minejs/jsx?style=flat" alt="Github Repo Issues" />
    <img src="https://img.shields.io/github/stars/minejs/jsx?style=social" alt="GitHub Repo stars" />
</div>
<br>

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->



<!-- ╔══════════════════════════════ DOC ══════════════════════════════╗ -->

- ## Quick Start 🔥

    > **_Lightweight JSX runtime with fine-grained reactivity._**

    - ### Setup

        > install [`space`](https://github.com/solution-lib/space) first.

        ```bash
        space i @minejs/jsx
        ```

    <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - ### Usage

        ```ts
        import { jsx, Fragment, Show, For, render, mount, createRoot } from '@minejs/jsx'
        import { signal } from '@minejs/signals'
        ```

        - ### 1. Basic JSX Elements

            ```typescript
            // Create simple element
            const el = jsx('div', {
                className: 'container',
                children: 'Hello World'
            })

            // Create with attributes
            const button = jsx('button', {
                id: 'submit',
                children: 'Click me',
                onClick: () => console.log('Clicked!')
            })
            ```

        - ### 2. Reactive Content with Signals

            ```typescript
            const count = signal(0)

            const el = jsx('div', {
                children: `Count: ${count()}`
            })

            render(el, '#app')

            count.set(5) // Updates DOM automatically!
            ```

        - ### 3. Event Handling

            ```typescript
            const counter = signal(0)

            const button = jsx('button', {
                children: 'Increment',
                onClick: () => {
                    counter.set(counter() + 1)
                }
            })
            ```

        - ### 4. Control Flow Components

            ```typescript
            const isVisible = signal(true)
            const items = signal(['Apple', 'Banana', 'Orange'])

            // Conditional rendering
            const conditional = Show({
                when: isVisible(),
                children: jsx('div', { children: 'Visible!' })
            })

            // List rendering
            const list = For({
                each: items(),
                children: (item) => jsx('li', { children: item })
            })
            ```


    <br>

- ## API Reference 🔥

    - #### `jsx<P = any>(type: string | ComponentFunction, props: JSXProps | null): JSXElement`
        > Create a DOM element from JSX or component function.

        ```typescript
        // HTML element
        const div = jsx('div', {
            className: 'box',
            children: 'Content'
        })

        // Component
        const Greeting = (props) => jsx('h1', { children: `Hello, ${props.name}!` })
        const greeting = jsx(Greeting, { name: 'John' })
        ```

    - #### `jsxs(type: string | ComponentFunction, props: JSXProps | null): JSXElement`

        > Alias for jsx(). Used by TypeScript JSX transform for multiple children.

        ```typescript
        const el = jsxs('div', {
            children: [
                jsx('h1', { children: 'Title' }),
                jsx('p', { children: 'Paragraph' })
            ]
        })
        ```

    - #### `Fragment(props: { children?: any }): DocumentFragment`

        > Create a DocumentFragment to group elements without wrapper.

        ```typescript
        const frag = Fragment({
            children: [
                jsx('div', { children: 'First' }),
                jsx('div', { children: 'Second' })
            ]
        })
        ```

    - #### `component<P = any>(fn: (props: P) => JSXElement | null): ComponentFunction<P>`

        > Create a component from a function.

        ```typescript
        const Button = component<{ label: string }>((props) => {
            return jsx('button', { children: props.label })
        })
        ```

    - #### `defineComponent<P = any>(setup: (props: P) => () => JSXElement | null): ComponentFunction<P>`

        > Create a component with setup function (like Vue Composition API).

        ```typescript
        const Counter = defineComponent((props) => {
            const count = signal(0)

            return () => jsx('div', {
                children: `Count: ${count()}`
            })
        })
        ```

    - #### `Show(props: { when: boolean | Signal<boolean>, children: any }): JSXElement | null`

        > Conditional rendering based on boolean condition.

        ```typescript
        const isLoggedIn = signal(false)

        Show({
            when: isLoggedIn(),
            children: jsx('div', { children: 'Welcome back!' })
        })
        ```

    - #### `Switch(props: { children: { when: boolean | Signal<boolean>, children: any }[] }): JSXElement | null`

        > Render first matching condition.

        ```typescript
        const status = signal('loading')

        Switch({
            children: [
                { when: status() === 'loading', children: jsx('div', { children: 'Loading...' }) },
                { when: status() === 'error', children: jsx('div', { children: 'Error!' }) },
                { when: status() === 'success', children: jsx('div', { children: 'Success!' }) }
            ]
        })
        ```

    - #### `For<T>(props: { each: T[] | Signal<T[]>, children: (item: T, index: number) => JSXElement }): JSXElement`

        > Render list of items.

        ```typescript
        const todos = signal([
            { id: 1, text: 'Learn JSX' },
            { id: 2, text: 'Build app' }
        ])

        For({
            each: todos(),
            children: (todo) => jsx('li', { children: todo.text })
        })
        ```

    - #### `createElements(elements: any[]): DocumentFragment`

        > Create multiple elements at once.

        ```typescript
        const fragment = createElements([
            jsx('div', null),
            jsx('span', null),
            jsx('button', null)
        ])
        ```

    - #### `render(component: JSXElement | (() => JSXElement), container: HTMLElement | string, options?: RenderOptions): MountedComponent`

        > Render component to DOM.

        ```typescript
        const el = jsx('div', { children: 'Content' })

        const mounted = render(el, '#app', {
            mode: 'replace',
            onMount: () => console.log('Mounted!'),
            onUnmount: () => console.log('Unmounted!')
        })

        mounted.unmount()
        mounted.update(newElement)
        ```

    - #### `mount(component: JSXElement | (() => JSXElement), container: HTMLElement | string): MountedComponent`

        > Shorthand for render with replace mode.

        ```typescript
        mount(jsx('div', { children: 'App' }), '#app')
        ```

    - #### `createRoot(container: HTMLElement | string): { render: (component) => void, unmount: () => void }`

        > Create a root for multiple renders.

        ```typescript
        const root = createRoot('#app')
        root.render(jsx('div', { children: 'First' }))
        root.render(jsx('div', { children: 'Second' }))
        root.unmount()
        ```

    - #### `hydrate(component: JSXElement | (() => JSXElement), container: HTMLElement | string): MountedComponent`

        > Hydrate server-rendered HTML with client-side interactivity.

        ```typescript
        hydrate(jsx('div', { children: 'Content' }), '#app')
        ```

    - #### `createPortal(children: JSXElement, container: HTMLElement | string): JSXElement`

        > Render element to different DOM node.

        ```typescript
        const modal = createPortal(
            jsx('div', { className: 'modal', children: 'Modal content' }),
            document.body
        )
        ```

    - #### `Teleport(props: { to: string | HTMLElement, children: JSXElement }): JSXElement`

        > Alias for createPortal with component syntax.

        ```typescript
        Teleport({
            to: '#portal',
            children: jsx('div', { children: 'Teleported!' })
        })
        ```

    - #### `lazy<P = any>(loader: () => Promise<{ default: (props: P) => JSXElement }>, fallback?: JSXElement): (props: P) => JSXElement`

        > Lazy load component with dynamic import.

        ```typescript
        const HeavyComponent = lazy(
            () => import('./HeavyComponent'),
            jsx('div', { children: 'Loading...' })
        )
        ```

    - #### `ErrorBoundary(props: { fallback: (error: Error) => JSXElement, children: JSXElement }): JSXElement`

        > Catch errors in component tree.

        ```typescript
        ErrorBoundary({
            fallback: (error) => jsx('div', { children: `Error: ${error.message}` }),
            children: jsx('div', { children: 'Content' })
        })
        ```

    - #### `Suspense(props: { fallback: JSXElement, children: JSXElement | Promise<JSXElement> }): JSXElement`

        > Handle async content with fallback.

        ```typescript
        Suspense({
            fallback: jsx('div', { children: 'Loading...' }),
            children: Promise.resolve(jsx('div', { children: 'Loaded!' }))
        })
        ```

    - #### `queueUpdate(fn: () => void): void`

        > Queue DOM update to be batched.

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

    <br>


- ## Real-World Examples

  - #### Counter Component

    ```typescript
    import { jsx } from '@minejs/jsx'
    import { render } from '@minejs/jsx'
    import { signal } from '@minejs/signals'

    const count = signal(0)

    const app = jsx('div', {
        className: 'counter',
        children: [
            jsx('h1', { children: `Count: ${count()}` }),
            jsx('button', {
                children: 'Increment',
                onClick: () => count.set(count() + 1)
            })
        ]
    })

    render(app, '#app')
    ```

  - #### Todo App

    ```typescript
    import { jsx, For, Show } from '@minejs/jsx'
    import { render } from '@minejs/jsx'
    import { signal, computed } from '@minejs/signals'

    interface Todo {
        id: number
        text: string
        done: boolean
    }

    const todos = signal<Todo[]>([])
    const input = signal('')
    const filter = signal<'all' | 'active' | 'completed'>('all')

    const filteredTodos = computed(() => {
        const f = filter()
        const t = todos()

        if (f === 'active') return t.filter(todo => !todo.done)
        if (f === 'completed') return t.filter(todo => todo.done)
        return t
    })

    const addTodo = () => {
        if (input().trim()) {
            todos.update(list => [
                ...list,
                { id: Date.now(), text: input(), done: false }
            ])
            input.set('')
        }
    }

    const app = jsx('div', {
        className: 'todo-app',
        children: [
            jsx('h1', { children: 'Todos' }),
            jsx('div', {
                className: 'input-group',
                children: [
                    jsx('input', {
                        type: 'text',
                        value: input(),
                        onInput: (e) => input.set((e.target as HTMLInputElement).value),
                        placeholder: 'Add todo...'
                    }),
                    jsx('button', {
                        children: 'Add',
                        onClick: addTodo
                    })
                ]
            }),
            jsx('ul', {
                children: For({
                    each: filteredTodos(),
                    children: (todo) => jsx('li', {
                        children: [
                            jsx('input', {
                                type: 'checkbox',
                                checked: todo.done
                            }),
                            jsx('span', { children: todo.text })
                        ]
                    })
                })
            })
        ]
    })

    render(app, '#app')
    ```

  - #### Form with Validation

    ```typescript
    import { jsx, Show } from '@minejs/jsx'
    import { render } from '@minejs/jsx'
    import { signal, computed } from '@minejs/signals'

    const email = signal('')
    const password = signal('')

    const isEmailValid = computed(() => {
        return email().includes('@') && email().length > 3
    })

    const isPasswordValid = computed(() => {
        return password().length >= 8
    })

    const canSubmit = computed(() => {
        return isEmailValid() && isPasswordValid()
    })

    const form = jsx('form', {
        children: [
            jsx('div', {
                children: [
                    jsx('input', {
                        type: 'email',
                        value: email(),
                        onInput: (e) => email.set((e.target as HTMLInputElement).value),
                        placeholder: 'Email'
                    }),
                    Show({
                        when: !isEmailValid() && email(),
                        children: jsx('span', {
                            style: { color: 'red' },
                            children: 'Invalid email'
                        })
                    })
                ]
            }),
            jsx('div', {
                children: [
                    jsx('input', {
                        type: 'password',
                        value: password(),
                        onInput: (e) => password.set((e.target as HTMLInputElement).value),
                        placeholder: 'Password'
                    }),
                    Show({
                        when: !isPasswordValid() && password(),
                        children: jsx('span', {
                            style: { color: 'red' },
                            children: 'Password must be 8+ characters'
                        })
                    })
                ]
            }),
            jsx('button', {
                type: 'submit',
                disabled: !canSubmit(),
                children: 'Submit'
            })
        ]
    })

    render(form, '#app')
    ```

  - #### Dynamic List with Filtering

    ```typescript
    import { jsx, For, Show } from '@minejs/jsx'
    import { render } from '@minejs/jsx'
    import { signal, computed } from '@minejs/signals'

    const items = signal(['React', 'Vue', 'Svelte', 'SolidJS'])
    const searchTerm = signal('')

    const filtered = computed(() => {
        const term = searchTerm().toLowerCase()
        return items().filter(item => item.toLowerCase().includes(term))
    })

    const app = jsx('div', {
        children: [
            jsx('input', {
                type: 'text',
                value: searchTerm(),
                onInput: (e) => searchTerm.set((e.target as HTMLInputElement).value),
                placeholder: 'Search...'
            }),
            jsx('ul', {
                children: For({
                    each: filtered(),
                    children: (item) => jsx('li', { children: item })
                })
            }),
            Show({
                when: filtered().length === 0,
                children: jsx('p', { children: 'No results found' })
            })
        ]
    })

    render(app, '#app')
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
            import { jsx } from '@minejs/jsx'
            import { mount } from '@minejs/jsx'
            import { signal } from '@minejs/signals'

            // Create reactive state
            const count = signal(0)

            // Create UI
            const app = jsx('div', {
                className: 'container',
                children: [
                    jsx('h1', { children: `Count: ${count()}` }),
                    jsx('button', {
                        children: 'Increment',
                        onClick: () => count.set(count() + 1)
                    })
                ]
            })

            // Mount to DOM
            mount(app, '#app')
            ```

    <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - ### Using JSX Syntax (.tsx/.jsx files)

        - #### TypeScript Configuration (tsconfig.json)

            ```json
            {
                "compilerOptions": {
                    "jsx"               : "react-jsx",
                    "jsxImportSource"   : "@minejs/jsx",
                    "target"            : "ES2020",
                    "module"            : "ESNext"
                }
            }
            ```

        - #### Component File (Counter.tsx)

            ```tsx
            import { signal } from '@minejs/signals'
            import { JSXElement } from '@minejs/jsx'

            export function Counter(): JSXElement {
                const count = signal(0)

                return (
                    <div className="counter">
                        <h1>Count: {count()}</h1>
                        <button onClick={() => count.set(count() + 1)}>
                            Increment
                        </button>
                    </div>
                )
            }
            ```

        - #### Main App (app.tsx)

            ```tsx
            import { mount } from '@minejs/jsx'
            import { Counter } from './Counter'

            mount(<Counter />, '#app')
            ```

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->



<!-- ╔══════════════════════════════ END ══════════════════════════════╗ -->

<br>

---

<div align="center">
    <a href="https://github.com/maysara-elshewehy"><img src="https://img.shields.io/badge/by-Maysara-black"/></a>
</div>

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->
