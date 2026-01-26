// src/kit/divider.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { jsx } from '../mod/runtime';
    import type { JSXElement } from '../types';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    export interface DividerProps {
        // Orientation
        orientation?        : 'horizontal' | 'vertical';

        // Variant
        variant?            : 'solid' | 'dashed' | 'dotted';

        // Thickness
        thickness?          : 'super-thin' | 'thin' | 'medium' | 'thick';

        // Color
        color?              : '1' | '2' | '3' | 'brand' | 'current';

        // Opacity
        opacity?            : 0 | 5 | 10 | 20 | 25 | 30 | 40 | 50 | 60 | 70 | 75 | 80 | 90 | 95 | 100;

        // Spacing
        spacing?            : 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12;

        // Max dimension percentage
        max?                : number;

        // Styling
        className?          : string;

        // Accessibility
        role?               : string;
        'aria-orientation'? : 'horizontal' | 'vertical';

        // Any other props
        [key: string]: any;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    /**
     * Renders a visual divider line to separate content.
     */
    export function Divider(props: DividerProps): JSXElement | null {
        const {
            orientation     = 'horizontal',
            variant         = 'solid',
            thickness       = 'thin',
            color           = '2',
            opacity         = 50,
            spacing,
            className       = '',
            role            = 'separator',
            ...restProps
        } = props;

        // Thickness classes
        const thicknessClasses = {
            horizontal: {
                'super-thin': 'border-t border-1',
                thin        : 'border-t',
                medium      : 'border-t-2',
                thick       : 'border-t-4'
            },
            vertical: {
                'super-thin': 'border-s border-1',
                thin        : 'border-s',
                medium      : 'border-s-2',
                thick       : 'border-s-4'
            }
        };

        // Variant classes
        const variantClasses = {
            solid           : 'border-solid',
            dashed          : 'border-dashed',
            dotted          : 'border-dotted'
        };

        // Color classes
        const colorClasses = {
            '1'             : 'border-c1',
            '2'             : 'border-c2',
            '3'             : 'border-c3',
            'brand'         : 'border-brand',
            'current'       : 'border-current'
        };

        const opacityClasses = {
            0               : 'opacity-0',
            5               : 'opacity-5',
            10              : 'opacity-10',
            20              : 'opacity-20',
            25              : 'opacity-25',
            30              : 'opacity-30',
            40              : 'opacity-40',
            50              : 'opacity-50',
            60              : 'opacity-60',
            70              : 'opacity-70',
            75              : 'opacity-75',
            80              : 'opacity-80',
            90              : 'opacity-90',
            95              : 'opacity-95',
            100             : 'opacity-100'
        };

        // Spacing classes
        let spacingClass = '';
        if (spacing !== undefined) {
            const map = {
                horizontal: {
                    0           : 'my-0',
                    1           : 'my-1',
                    2           : 'my-2',
                    3           : 'my-3',
                    4           : 'my-4',
                    6           : 'my-6',
                    8           : 'my-8',
                    12          : 'my-12'
                },
                vertical: {
                    0           : 'mx-0',
                    1           : 'mx-1',
                    2           : 'mx-2',
                    3           : 'mx-3',
                    4           : 'mx-4',
                    6           : 'mx-6',
                    8           : 'mx-8',
                    12          : 'mx-12'
                }
            };
            // @ts-ignore
            spacingClass = map[orientation][spacing] || '';
        }

        // Base classes
        const baseClasses = [
            // @ts-ignore
            thicknessClasses[orientation][thickness],
            // @ts-ignore
            variantClasses[variant],
            // @ts-ignore
            colorClasses[color],
            // @ts-ignore
            opacityClasses[opacity],
            spacingClass,
            orientation === 'horizontal' ? 'w-full' : 'h-full',
            className
        ]
            .filter(Boolean)
            .join(' ');

        const { style, max = 90, ...restPropsWithoutStyle } = restProps as { style?: Record<string, unknown>; max?: number };
        const dimensionKey = orientation === 'horizontal' ? 'maxWidth' : 'maxHeight';
        const mergedStyle = {
            ...style,
            [dimensionKey]: `${max}%`
        };

        return jsx('div', {
            className: baseClasses,
            role: role,
            'aria-orientation': orientation,
            style: mergedStyle,
            ...restPropsWithoutStyle
        });
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝
