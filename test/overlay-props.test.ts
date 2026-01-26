/* eslint-disable @typescript-eslint/no-explicit-any */
// test/index.overlay-props.test.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { test, expect, describe } from 'bun:test';
    import { JSDOM } from 'jsdom';
    import { jsx } from '../src';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    // Setup DOM environment
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;
    global.window = dom.window as any;
    global.HTMLElement = dom.window.HTMLElement;
    global.Element = dom.window.Element;
    global.Node = dom.window.Node;

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TEST ════════════════════════════════════════╗

    describe('Overlay Props', () => {
        test('overlay prop adds base classes', () => {
            const el = jsx('div', { overlay: true }) as HTMLElement;
            expect(el.className).toContain('absolute');
            expect(el.className).toContain('inset-0');
            expect(el.className).toContain('w-full');
            expect(el.className).toContain('h-full');
            expect(el.className).toContain('flex');
        });

        test('default location is center', () => {
            const el = jsx('div', { overlay: true }) as HTMLElement;
            expect(el.className).toContain('justify-center');
            expect(el.className).toContain('items-center');
        });

        test('location prop adds correct alignment classes', () => {
            const elTop = jsx('div', { overlay: true, location: 'top' }) as HTMLElement;
            expect(elTop.className).toContain('justify-center');
            expect(elTop.className).toContain('items-start');

            const elBottomRight = jsx('div', { overlay: true, location: 'bottom-right' }) as HTMLElement;
            expect(elBottomRight.className).toContain('justify-end');
            expect(elBottomRight.className).toContain('items-end');
        });

        test('backdrop prop adds background color', () => {
            const el = jsx('div', { overlay: true, backdrop: true }) as HTMLElement;
            expect(el.style.backgroundColor).toBe('rgba(0, 0, 0, 0.5)');
        });

        test('zIndex prop works with overlay', () => {
            const el = jsx('div', { overlay: true, zIndex: 50 }) as HTMLElement;
            expect(el.className).toContain('z-50');
        });

        test('overlay works with other props', () => {
            const el = jsx('div', { overlay: true, id: 'my-overlay', p: 4 }) as HTMLElement;
            expect(el.id).toBe('my-overlay');
            expect(el.className).toContain('p-4');
            expect(el.className).toContain('absolute');
        });
    });

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
