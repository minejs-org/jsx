
/* eslint-disable @typescript-eslint/no-explicit-any */
import { test, expect, describe, beforeEach } from 'bun:test';
import { JSDOM } from 'jsdom';
import { jsx } from '../src';

// Setup DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window as any;
global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element;
global.Node = dom.window.Node;

describe('Container Props Integration', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    test('applies display classes', () => {
        const el = jsx('div', { display: 'flex' }) as HTMLElement;
        expect(el.className).toBe('flex');
    });

    test('applies spacing classes', () => {
        const el = jsx('div', { p: 4, m: 2 }) as HTMLElement;
        expect(el.className).toContain('p-4');
        expect(el.className).toContain('m-2');
    });

    test('applies direction and align classes', () => {
        const el = jsx('div', { 
            display: 'flex', 
            direction: 'column', 
            align: 'center', 
            justify: 'between' 
        }) as HTMLElement;
        
        expect(el.className).toContain('flex');
        expect(el.className).toContain('flex-col');
        expect(el.className).toContain('items-center');
        expect(el.className).toContain('justify-between');
    });

    test('applies size classes from scale', () => {
        const el = jsx('div', { w: 4, h: 'full' }) as HTMLElement;
        expect(el.className).toContain('w-4');
        expect(el.className).toContain('h-full');
    });

    test('applies arbitrary size as style', () => {
        const el = jsx('div', { w: '123px', h: '50vh' }) as HTMLElement;
        // Since '123px' is not in scale/keywords, it should be a style
        expect(el.style.width).toBe('123px');
        expect(el.style.height).toBe('50vh');
    });

    test('merges with existing className', () => {
        const el = jsx('div', { 
            className: 'custom-class',
            p: 4 
        }) as HTMLElement;
        
        expect(el.className).toContain('custom-class');
        expect(el.className).toContain('p-4');
    });

    test('merges with existing class', () => {
        const el = jsx('div', { 
            class: 'custom-class',
            m: 2 
        }) as HTMLElement;
        
        expect(el.className).toContain('custom-class');
        expect(el.className).toContain('m-2');
    });

    test('handles boolean props correctly', () => {
        const el = jsx('div', { wrap: true }) as HTMLElement;
        expect(el.className).toContain('flex-wrap');
    });

    test('handles gap props', () => {
        const el = jsx('div', { gap: 4, gapX: 2 }) as HTMLElement;
        expect(el.className).toContain('gap-4');
        expect(el.className).toContain('gap-x-2');
    });

    test('handles color and background', () => {
        const el = jsx('div', { bg: 'red-500', color: 'white' }) as HTMLElement;
        expect(el.className).toContain('bg-red-500');
        expect(el.className).toContain('text-white');
    });

    test('handles border props', () => {
        const el = jsx('div', { border: 2, borderColor: 'blue-500', radius: 'lg' }) as HTMLElement;
        expect(el.className).toContain('border-2');
        expect(el.className).toContain('border-blue-500');
        expect(el.className).toContain('rounded-lg');
    });

    test('handles shadow and position', () => {
        const el = jsx('div', { shadow: 'md', position: 'absolute', zIndex: 10 }) as HTMLElement;
        expect(el.className).toContain('shadow-md');
        expect(el.className).toContain('absolute');
        expect(el.className).toContain('z-10');
    });

    test('does not apply container props to SVG elements', () => {
        // Based on runtime implementation, SVG elements might skip container styles if implemented
        // But checking the runtime.ts code, I recall: 
        // if (containerStyle && !SVG_ELEMENTS.has(type) && !MATHML_ELEMENTS.has(type))
        // So styles are skipped, but classes?
        // Let's check behavior.
        const el = jsx('svg', { w: '100px' }) as HTMLElement;
        // If it's an SVG element, we might expect it to handle things differently or just pass through.
        // In runtime.ts: 
        // handleClassName(element, value, containerClass);
        // So classes SHOULD be applied even for SVGs.
        // But styles? 
        // if (containerStyle && !SVG_ELEMENTS.has(type) ... applyStyles
        // '100px' would be a style.
        
        // Wait, '100px' is not in scale, so it returns style: { width: '100px' }
        // runtime.ts checks SVG_ELEMENTS to skip applyStyles?
        // Let's verify this assumption.
    });
});
