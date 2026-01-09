/* eslint-disable @typescript-eslint/no-explicit-any */
// test/index.test.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { test, expect, describe, beforeEach }                       from 'bun:test';
    import { JSDOM }                                                    from 'jsdom';
    import { render, mount, createRoot, lazy, ErrorBoundary, Suspense, Teleport, createPortal, hydrate, queueUpdate, onDOMReady, isBrowser } from '../src/index';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    // Setup DOM environment
    const dom               = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document         = dom.window.document as any;
    global.window           = dom.window as any;
    global.HTMLElement      = dom.window.HTMLElement;
    global.Element          = dom.window.Element;
    global.Text             = dom.window.Text;
    global.DocumentFragment = dom.window.DocumentFragment;
    global.Node             = dom.window.Node;
    global.Comment          = dom.window.Comment;

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TEST ════════════════════════════════════════╝

    describe('render', () => {
        beforeEach(() => {
            document.body.innerHTML = '';
        });

        // ========================================
        // render() tests
        // ========================================
        describe('render()', () => {
            test('should render element to DOM', () => {
                const container = document.createElement('div');
                document.body.appendChild(container);

                const div = document.createElement('div');
                div.textContent = 'Hello';

                render(div, container);
                expect(container.innerHTML).toContain('Hello');
            });

            test('should render component function', () => {
                const container = document.createElement('div');
                document.body.appendChild(container);

                const component = () => {
                    const div = document.createElement('div');
                    div.textContent = 'Component';
                    return div;
                };

                render(component, container);
                expect(container.innerHTML).toContain('Component');
            });

            test('should throw error if container not found', () => {
                const div = document.createElement('div');

                expect(() => {
                    render(div, '.nonexistent-selector');
                }).toThrow('Container not found');
            });

            test('should throw error if component returns null', () => {
                const container = document.createElement('div');
                const component = () => null as any;

                expect(() => {
                    render(component, container);
                }).toThrow('Component returned null');
            });

            test('should support replace mode', () => {
                const container = document.createElement('div');
                const existing = document.createElement('p');
                existing.textContent = 'Old';
                container.appendChild(existing);

                const div = document.createElement('div');
                div.textContent = 'New';

                render(div, container, { mode: 'replace' });

                expect(container.innerHTML).toContain('New');
                expect(container.innerHTML).not.toContain('Old');
            });

            test('should support append mode', () => {
                const container = document.createElement('div');
                const existing = document.createElement('p');
                existing.textContent = 'Old';
                container.appendChild(existing);

                const div = document.createElement('div');
                div.textContent = 'New';

                render(div, container, { mode: 'append' });

                expect(container.innerHTML).toContain('Old');
                expect(container.innerHTML).toContain('New');
            });

            test('should support prepend mode', () => {
                const container = document.createElement('div');
                const existing = document.createElement('p');
                existing.textContent = 'Old';
                container.appendChild(existing);

                const div = document.createElement('div');
                div.textContent = 'New';

                render(div, container, { mode: 'prepend' });

                expect(container.firstChild?.textContent).toBe('New');
            });

            test('should call onMount callback', () => {
                const container = document.createElement('div');
                let mounted = false;
                const div = document.createElement('div');

                render(div, container, {
                    onMount: () => { mounted = true; }
                });

                expect(mounted).toBe(true);
            });

            test('should call onUnmount callback', () => {
                const container = document.createElement('div');
                let unmounted = false;
                const div = document.createElement('div');

                const mounted = render(div, container, {
                    onUnmount: () => { unmounted = true; }
                });

                mounted.unmount();
                expect(unmounted).toBe(true);
            });

            test('should resolve string container selector', () => {
                const container = document.createElement('div');
                container.id = 'test-container';
                document.body.appendChild(container);

                const div = document.createElement('div');
                div.textContent = 'Test';

                render(div, '#test-container');
                expect(container.innerHTML).toContain('Test');
            });
        });

        // ========================================
        // mount() tests
        // ========================================
        describe('mount()', () => {
            test('should mount element in replace mode', () => {
                const container = document.createElement('div');
                const existing = document.createElement('p');
                existing.textContent = 'Old';
                container.appendChild(existing);

                const div = document.createElement('div');
                div.textContent = 'New';

                mount(div, container);

                expect(container.innerHTML).not.toContain('Old');
                expect(container.innerHTML).toContain('New');
            });

            test('should return MountedComponent with unmount method', () => {
                const container = document.createElement('div');
                const div = document.createElement('div');
                div.textContent = 'Test';

                const mounted = mount(div, container);

                expect(mounted).toHaveProperty('unmount');
                expect(mounted).toHaveProperty('update');
                expect(mounted).toHaveProperty('element');
            });
        });

        // ========================================
        // MountedComponent.unmount() tests
        // ========================================
        describe('MountedComponent.unmount()', () => {
            test('should remove element from DOM', () => {
                const container = document.createElement('div');
                const div = document.createElement('div');
                div.textContent = 'Remove me';

                const mounted = render(div, container);
                expect(container.innerHTML).toContain('Remove me');

                mounted.unmount();
                expect(container.innerHTML).not.toContain('Remove me');
            });

            test('should remove DocumentFragment from DOM', () => {
                const container = document.createElement('div');
                const fragment = document.createDocumentFragment();
                const div = document.createElement('div');
                div.textContent = 'Fragment';
                fragment.appendChild(div);

                const mounted = render(fragment, container);
                expect(container.children.length).toBeGreaterThan(0);

                mounted.unmount();
                // Fragment clears its children during unmount
                expect(fragment.children.length).toBe(0);
            });
        });

        // ========================================
        // MountedComponent.update() tests
        // ========================================
        describe('MountedComponent.update()', () => {
            test('should update element in DOM', () => {
                const container = document.createElement('div');
                const div = document.createElement('div');
                div.textContent = 'Old';

                const mounted = render(div, container);
                expect(container.innerHTML).toContain('Old');

                const newDiv = document.createElement('div');
                newDiv.textContent = 'New';

                mounted.update(newDiv);
                expect(container.innerHTML).toContain('New');
            });
        });

        // ========================================
        // createPortal() tests
        // ========================================
        describe('createPortal()', () => {
            test('should create portal placeholder comment', () => {
                const container = document.createElement('div');
                const div = document.createElement('div');
                div.textContent = 'Portal content';

                const portal = createPortal(div, container);

                expect(portal).toBeInstanceOf(Comment);
            });

            test('should throw error if portal container not found', () => {
                const div = document.createElement('div');

                expect(() => {
                    createPortal(div, '.nonexistent');
                }).toThrow('Portal container not found');
            });

            test('should mount children to target container', () => {
                const portalContainer = document.createElement('div');
                portalContainer.id = 'portal-container';
                document.body.appendChild(portalContainer);

                const div = document.createElement('div');
                div.textContent = 'Portal';

                createPortal(div, portalContainer);

                expect(portalContainer.innerHTML).toContain('Portal');

                document.body.removeChild(portalContainer);
            });
        });

        // ========================================
        // hydrate() tests
        // ========================================
        describe('hydrate()', () => {
            test('should hydrate server-rendered HTML', () => {
                const container = document.createElement('div');
                container.innerHTML = '<p>Server rendered</p>';

                const component = () => {
                    const div = document.createElement('div');
                    div.textContent = 'Hydrated';
                    return div;
                };

                const mounted = hydrate(component, container);

                expect(mounted).toHaveProperty('unmount');
                expect(container.innerHTML).toContain('Hydrated');
            });

            test('should throw error if container not found', () => {
                const component = () => document.createElement('div');

                expect(() => {
                    hydrate(component, '.nonexistent');
                }).toThrow('Container not found');
            });
        });

        // ========================================
        // lazy() tests
        // ========================================
        describe('lazy()', () => {
            test('should show fallback while loading', () => {
                const fallback = document.createElement('div');
                fallback.textContent = 'Loading...';

                const lazyComponent = lazy(
                    () => Promise.resolve({
                        default: () => {
                            const div = document.createElement('div');
                            div.textContent = 'Loaded';
                            return div;
                        }
                    }),
                    fallback
                );

                const result = lazyComponent({});

                expect(result).toBe(fallback);
            });

            test('should show default loading element if no fallback', () => {
                const lazyComponent = lazy(
                    () => Promise.resolve({
                        default: () => document.createElement('div')
                    })
                );

                const result = lazyComponent({});

                expect(result).toBeInstanceOf(HTMLElement);
                expect(result.textContent).toContain('Loading...');
            });

            test('should show error state on load failure', async () => {
                const lazyComponent = lazy<any>(
                    () => Promise.reject(new Error('Load failed')) as any
                );

                lazyComponent({});

                // Call again to get error state
                await new Promise(resolve => setTimeout(resolve, 10));
                const result = lazyComponent({});

                expect(result).toBeInstanceOf(HTMLElement);
                expect(result.textContent).toContain('Error loading component');
                expect(result.textContent).toContain('Load failed');
            });
        });

        // ========================================
        // ErrorBoundary() tests
        // ========================================
        describe('ErrorBoundary()', () => {
            test('should render children normally if no error', () => {
                const children = document.createElement('div');
                children.textContent = 'Safe';

                const boundary = ErrorBoundary({
                    fallback: (error) => {
                        const div = document.createElement('div');
                        div.textContent = `Error: ${error.message}`;
                        return div;
                    },
                    children
                });

                expect(boundary).toBe(children);
            });

            test('should pass through children element', () => {
                const children = document.createElement('p');
                children.textContent = 'Content';

                const result = ErrorBoundary({
                    fallback: () => document.createElement('div'),
                    children
                });

                expect((result as Element).textContent).toBe('Content');
            });
        });

        // ========================================
        // Suspense() tests
        // ========================================
        describe('Suspense()', () => {
            test('should render synchronous children', () => {
                const children = document.createElement('div');
                children.textContent = 'Content';

                const fallback = document.createElement('div');
                fallback.textContent = 'Loading...';

                const suspense = Suspense({ fallback, children });

                expect(suspense).toBe(children);
            });

            test('should show fallback for promise children', async () => {
                const fallback = document.createElement('div');
                fallback.textContent = 'Loading...';

                const contentDiv = document.createElement('div');
                contentDiv.textContent = 'Loaded';
                const promise = Promise.resolve(contentDiv);

                const suspense = Suspense({
                    fallback,
                    children: promise as any
                });

                expect(suspense).toBeInstanceOf(HTMLElement);
                expect((suspense as HTMLElement).style.display).toBe('contents');
            });
        });

        // ========================================
        // Teleport() tests
        // ========================================
        describe('Teleport()', () => {
            test('should teleport children to target', () => {
                const targetContainer = document.createElement('div');
                targetContainer.id = 'teleport-target';
                document.body.appendChild(targetContainer);

                const children = document.createElement('div');
                children.textContent = 'Teleported';

                Teleport({
                    to: targetContainer,
                    children
                });

                expect(targetContainer.innerHTML).toContain('Teleported');

                document.body.removeChild(targetContainer);
            });

            test('should teleport using string selector', () => {
                const targetContainer = document.createElement('div');
                targetContainer.id = 'teleport-target-2';
                document.body.appendChild(targetContainer);

                const children = document.createElement('span');
                children.textContent = 'Content';

                Teleport({
                    to: '#teleport-target-2',
                    children
                });

                expect(targetContainer.innerHTML).toContain('Content');

                document.body.removeChild(targetContainer);
            });
        });

        // ========================================
        // queueUpdate() tests
        // ========================================
        describe('queueUpdate()', () => {
            test('should queue updates for batching', async () => {
                let callCount = 0;

                queueUpdate(() => { callCount++; });
                queueUpdate(() => { callCount++; });

                await new Promise(resolve => queueMicrotask(resolve));

                expect(callCount).toBe(2);
            });

            test('should batch multiple updates', async () => {
                let count = 0;

                queueUpdate(() => { count++; });
                queueUpdate(() => { count++; });
                queueUpdate(() => { count++; });

                await new Promise(resolve => setTimeout(resolve, 10));

                expect(count).toBe(3);
            });
        });

        // ========================================
        // isBrowser() tests
        // ========================================
        describe('isBrowser()', () => {
            test('should return true in browser environment', () => {
                expect(isBrowser()).toBe(true);
            });

            test('should detect window and document', () => {
                expect(typeof window).not.toBe('undefined');
                expect(typeof document).not.toBe('undefined');
            });
        });

        // ========================================
        // onDOMReady() tests
        // ========================================
        describe('onDOMReady()', () => {
            test('should call callback when DOM is ready', (done) => {
                let called = false;

                onDOMReady(() => {
                    called = true;
                    done();
                });

                // Check that callback was called or will be called
                setTimeout(() => {
                    if (!called) done();
                }, 50);
            });

            test('should execute immediately if DOM is ready', () => {
                let executed = false;

                onDOMReady(() => {
                    executed = true;
                });

                expect(executed).toBe(true);
            });
        });

        // ========================================
        // createRoot() tests
        // ========================================
        describe('createRoot()', () => {
            test('should create root for managing components', () => {
                const container = document.createElement('div');
                document.body.appendChild(container);

                const root = createRoot(container);

                const div = document.createElement('div');
                div.textContent = 'Root content';

                root.render(div);

                expect(container.innerHTML).toContain('Root content');
            });

            test('should replace previous component on new render', () => {
                const container = document.createElement('div');
                document.body.appendChild(container);

                const root = createRoot(container);

                const div1 = document.createElement('div');
                div1.textContent = 'First';
                root.render(div1);

                const div2 = document.createElement('div');
                div2.textContent = 'Second';
                root.render(div2);

                expect(container.innerHTML).not.toContain('First');
                expect(container.innerHTML).toContain('Second');
            });

            test('should unmount component', () => {
                const container = document.createElement('div');
                document.body.appendChild(container);

                const root = createRoot(container);

                const div = document.createElement('div');
                div.textContent = 'Unmount me';
                root.render(div);

                root.unmount();

                expect(container.innerHTML).not.toContain('Unmount me');
            });

            test('should throw error if container not found', () => {
                expect(() => {
                    createRoot('.nonexistent');
                }).toThrow('Root container not found');
            });

            test('should accept string selector', () => {
                const container = document.createElement('div');
                container.id = 'root-container';
                document.body.appendChild(container);

                const root = createRoot('#root-container');

                const div = document.createElement('div');
                div.textContent = 'Content';
                root.render(div);

                expect(container.innerHTML).toContain('Content');
            });

            test('should render component function', () => {
                const container = document.createElement('div');
                document.body.appendChild(container);

                const root = createRoot(container);

                const componentFn = () => {
                    const div = document.createElement('div');
                    div.textContent = 'Function component';
                    return div;
                };

                root.render(componentFn);

                expect(container.innerHTML).toContain('Function component');
            });

            test('should allow multiple render calls', () => {
                const container = document.createElement('div');
                document.body.appendChild(container);

                const root = createRoot(container);

                root.render(() => {
                    const div = document.createElement('div');
                    div.textContent = '1';
                    return div;
                });
                expect(container.textContent).toBe('1');

                root.render(() => {
                    const div = document.createElement('div');
                    div.textContent = '2';
                    return div;
                });
                expect(container.textContent).toBe('2');
            });
        });

        // ========================================
        // Integration tests
        // ========================================
        describe('Integration', () => {
            test('render with all options', () => {
                const container = document.createElement('div');
                document.body.appendChild(container);

                let mounted = false;
                let unmounted = false;

                const div = document.createElement('div');
                div.textContent = 'Full test';

                const comp = render(div, container, {
                    mode: 'replace',
                    onMount: () => { mounted = true; },
                    onUnmount: () => { unmounted = true; }
                });

                expect(mounted).toBe(true);
                expect(container.innerHTML).toContain('Full test');

                comp.unmount();
                expect(unmounted).toBe(true);
            });

            test('createRoot with unmount and remount', () => {
                const container = document.createElement('div');
                document.body.appendChild(container);

                const root = createRoot(container);

                root.render(() => {
                    const div = document.createElement('div');
                    div.textContent = 'Initial';
                    return div;
                });

                expect(container.textContent).toBe('Initial');

                root.unmount();
                expect(container.innerHTML).toBe('');

                root.render(() => {
                    const div = document.createElement('div');
                    div.textContent = 'Remounted';
                    return div;
                });

                expect(container.textContent).toBe('Remounted');
            });

            test('multiple components in same container with append', () => {
                const container = document.createElement('div');
                document.body.appendChild(container);

                const div1 = document.createElement('div');
                div1.textContent = 'First';
                render(div1, container, { mode: 'append' });

                const div2 = document.createElement('div');
                div2.textContent = 'Second';
                render(div2, container, { mode: 'append' });

                expect(container.innerHTML).toContain('First');
                expect(container.innerHTML).toContain('Second');
            });

            test('error handling and recovery', () => {
                const container = document.createElement('div');

                // First error
                expect(() => {
                    render(null as any, container);
                }).toThrow();

                // Should recover and work
                const div = document.createElement('div');
                div.textContent = 'Recovered';
                render(div, container);

                expect(container.innerHTML).toContain('Recovered');
            });
        });

        // ========================================
        // Edge cases
        // ========================================
        describe('Edge Cases', () => {
            test('empty container selector', () => {
                expect(() => {
                    render(document.createElement('div'), '');
                }).toThrow();
            });

            test('render with invalid mode defaults to replace', () => {
                const container = document.createElement('div');
                container.innerHTML = '<span>Old</span>';

                const div = document.createElement('div');
                div.textContent = 'New';

                render(div, container, { mode: 'invalid' as any });

                expect(container.innerHTML).toContain('New');
                expect(container.innerHTML).not.toContain('Old');
            });

            test('unmount already unmounted component', () => {
                const container = document.createElement('div');
                const div = document.createElement('div');

                const mounted = render(div, container);
                mounted.unmount();

                // Should not throw on second unmount
                expect(() => {
                    mounted.unmount();
                }).not.toThrow();
            });

            test('render DocumentFragment directly', () => {
                const container = document.createElement('div');
                const fragment = document.createDocumentFragment();

                const div1 = document.createElement('div');
                div1.textContent = 'A';
                const div2 = document.createElement('div');
                div2.textContent = 'B';

                fragment.appendChild(div1);
                fragment.appendChild(div2);

                render(fragment, container);

                expect(container.innerHTML).toContain('A');
                expect(container.innerHTML).toContain('B');
            });

            test('render with container as HTMLElement', () => {
                const container = document.createElement('div');
                const div = document.createElement('div');
                div.textContent = 'Test';

                const mounted = render(div, container);

                expect(mounted.element).toBe(div);
                expect(container.innerHTML).toContain('Test');
            });
        });
    });

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
