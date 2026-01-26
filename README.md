<!-- ╔══════════════════════════════ BEG ══════════════════════════════╗ -->

<br>
<div align="center">
    <p>
        <img src="./assets/img/logo.png" alt="logo" style="" height="60" />
    </p>
</div>

<div align="center">
    <img src="https://img.shields.io/badge/v-0.2.8-black"/>
    <img src="https://img.shields.io/badge/🔥-@minejs-black"/>
    <br>
    <img src="https://img.shields.io/badge/coverage-98.11%25-brightgreen" alt="Test Coverage" />
    <img src="https://img.shields.io/github/issues/minejs-org/jsx?style=flat" alt="Github Repo Issues" />
    <img src="https://img.shields.io/github/stars/minejs-org/jsx?style=social" alt="GitHub Repo stars" />
</div>
<br>

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->



<!-- ╔══════════════════════════════ DOC ══════════════════════════════╗ -->

- ## Quick Start 🔥

    > Lightweight JSX runtime with fine-grained reactivity..

    - ### Setup

        > install [`hmm`](https://github.com/minejs-org/hmm) first.

        ```bash
        hmm i @minejs/jsx
        ```

    <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - ### Usage

        ```ts
        import {
            jsx, Fragment,
            Show, For, render, mount, createRoot
            } from '@minejs/jsx'
        import { signal } from '@minejs/signals'
        ```

        - ### 1. Basic JSX Elements

            ```typescript
            // Create simple element
            const el = jsx('div', {
                className   : 'container',
                children    : 'Hello World'
            })

            // Create with attributes
            const button = jsx('button', {
                id          : 'submit',
                children    : 'Click me',
                onClick     : () => console.log('Clicked!')
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

        - ### 4. Lifecycle Events

            ```typescript
            const el = jsx('div', {
                children: 'I notify when I appear!',
                onload: () => {
                    console.log('Element added to DOM!')
                }
            })
            ```

        - ### 5. Layout & Styling Props

            ```typescript
            // Apply Tailwind-like props directly!
            const card = jsx('div', {
                display     : 'flex',
                direction   : 'column',
                p           : 4,        // padding: 1rem
                gap         : 2,        // gap: 0.5rem
                bg          : 'white',  // background-color
                shadow      : 'md',     // box-shadow
                radius      : 'lg',     // border-radius
                children    : 'Beautiful Card'
            })

            // Create Overlay
            const modal = jsx('div', {
                overlay     : true,
                backdrop    : true,
                location    : 'center',
                children    : 'Modal Content'
            })
            ```

    <br>

- ## API Reference 🔥

    - #### [`Render`](./docs/render.md)

        > Lightweight DOM rendering library for JSX elements.

    - #### [`Runtime`](./docs/runtime.md)

        > Lightweight JSX runtime with fine-grained reactivity.

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->



<!-- ╔══════════════════════════════ END ══════════════════════════════╗ -->

<br>

---

<div align="center">
    <a href="https://github.com/maysara-elshewehy"><img src="https://img.shields.io/badge/by-Maysara-black"/></a>
</div>

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->
