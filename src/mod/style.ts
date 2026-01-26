
import type {
    ContainerProps,
    ContainerDisplay,
    ContainerDirection,
    ContainerAlign,
    ContainerJustify,
    ContainerMaxWidth,
    ContainerBorderWidth,
    ContainerRadius,
    ContainerShadow,
    ContainerSpace,
    ContainerSpaceOrAuto
} from '../types';

// ╔════════════════════════════════════════ MAPS ════════════════════════════════════════╗

const displayClassMap: Record<ContainerDisplay, string> = {
    block: 'block',
    'inline-block': 'inline-block',
    flex: 'flex',
    'inline-flex': 'inline-flex',
    grid: 'grid',
    'inline-grid': 'inline-grid'
};

const directionClassMap: Record<ContainerDirection, string> = {
    row: 'flex-row',
    'row-reverse': 'flex-row-reverse',
    column: 'flex-col',
    'column-reverse': 'flex-col-reverse'
};

const alignClassMap: Record<ContainerAlign, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline'
};

const justifyClassMap: Record<ContainerJustify, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
};

const maxWidthClassMap: Record<ContainerMaxWidth, string> = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
    min: 'max-w-min',
    max: 'max-w-max',
    fit: 'max-w-fit',
    none: 'max-w-none',
    prose: 'max-w-prose'
};

const borderWidthClassMap: Record<ContainerBorderWidth, string> = {
    0: 'border-0',
    1: 'border',
    2: 'border-2',
    4: 'border-4',
    8: 'border-8'
};

const radiusClassMap: Record<ContainerRadius, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    base: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full'
};

const shadowClassMap: Record<ContainerShadow, string> = {
    none: 'shadow-none',
    xs: 'shadow-xs',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    inner: 'shadow-inner'
};

// ╔════════════════════════════════════════ HELP ════════════════════════════════════════╗

function spacingClass(prefix: string, value: ContainerSpace | undefined): string | undefined {
    if (value === undefined) return undefined;
    return `${prefix}-${value}`;
}

function marginClass(prefix: string, value: ContainerSpaceOrAuto | undefined): string | undefined {
    if (value === undefined) return undefined;
    if (value === 'auto') return `${prefix}-auto`;
    return `${prefix}-${value}`;
}

const SCALE = new Set([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64
]);
const FRACTIONS = new Set(['1/2', '1/3', '2/3', '1/4', '2/4', '3/4', '1/5', '2/5', '3/5', '4/5', '1/6', '5/6', '1/12']);

const W_KEYWORDS = new Set(['auto', 'full', 'screen', 'min', 'max', 'fit']);
const H_KEYWORDS = new Set(['auto', 'full', 'screen', 'min', 'max', 'fit']);
const MIN_W_KEYWORDS = new Set(['0', 'full', 'min', 'max', 'fit']);
const MAX_W_KEYWORDS = new Set(['none', 'full', 'min', 'max', 'fit']);
const MIN_H_KEYWORDS = new Set(['0', 'full', 'screen', 'min', 'max', 'fit']);
const MAX_H_KEYWORDS = new Set(['none', 'full', 'screen', 'min', 'max', 'fit']);

const resolveSize = (
    key: 'w' | 'h' | 'min-w' | 'min-h' | 'max-w' | 'max-h',
    val: string | number | undefined,
    map?: Record<string, string>
) => {
    if (val === undefined) return null;

    // Check map first (e.g. max-w-xs)
    if (map && val in map) {
        return { class: map[val] };
    }

    // Check numeric scale
    if (typeof val === 'number' && SCALE.has(val)) {
        return { class: `${key}-${val}` };
    }

    // Check fractions (only for w, h)
    if ((key === 'w' || key === 'h') && FRACTIONS.has(val as string)) {
        return { class: `${key}-${val}` };
    }

    // Check keywords
    const keywords =
        key === 'w' ? W_KEYWORDS :
        key === 'h' ? H_KEYWORDS :
        key === 'min-w' ? MIN_W_KEYWORDS :
        key === 'min-h' ? MIN_H_KEYWORDS :
        key === 'max-w' ? MAX_W_KEYWORDS :
        MAX_H_KEYWORDS;

    if (keywords.has(val as string)) {
        return { class: `${key}-${val}` };
    }

    // Also check scale for min/max props (we added loops to SCSS)
    if (['min-w', 'max-w', 'min-h', 'max-h'].includes(key) && typeof val === 'number' && SCALE.has(val)) {
         return { class: `${key}-${val}` };
    }

    // Fallback to inline style
    const styleProp =
        key === 'w' ? 'width' :
        key === 'h' ? 'height' :
        key === 'min-w' ? 'minWidth' :
        key === 'min-h' ? 'minHeight' :
        key === 'max-w' ? 'maxWidth' :
        'maxHeight';

    return { style: { [styleProp]: val } };
};

// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

export const STYLE_PROPS = new Set([
    'display', 'direction', 'align', 'justify', 'wrap',
    'gap', 'gapX', 'gapY',
    'w', 'h', 'minW', 'minH', 'maxW', 'maxH',
    'p', 'px', 'py', 'ps', 'pe', 'pt', 'pb',
    'm', 'mx', 'my', 'ms', 'me', 'mt', 'mb',
    'bg', 'color', 'border', 'borderColor', 'radius', 'shadow',
    'position', 'overflow', 'zIndex'
]);

export function resolveStyleProps(props: ContainerProps): { className: string; style: any } {
    const {
        display,
        direction,
        align,
        justify,
        wrap,
        gap,
        gapX,
        gapY,
        w,
        h,
        minW,
        minH,
        maxW,
        maxH,
        p,
        px,
        py,
        ps,
        pe,
        pt,
        pb,
        m,
        mx,
        my,
        ms,
        me,
        mt,
        mb,
        bg,
        color,
        border,
        borderColor,
        radius,
        shadow,
        position,
        overflow,
        zIndex,
    } = props;

    const wRes = resolveSize('w', w);
    const hRes = resolveSize('h', h);
    const minWRes = resolveSize('min-w', minW);
    const minHRes = resolveSize('min-h', minH);
    const maxWRes = resolveSize('max-w', maxW, maxWidthClassMap);
    const maxHRes = resolveSize('max-h', maxH);

    const computedStyle = {
        ...wRes?.style,
        ...hRes?.style,
        ...minWRes?.style,
        ...minHRes?.style,
        ...maxWRes?.style,
        ...maxHRes?.style,
    };

    const classes = [
        display && displayClassMap[display],
        direction && directionClassMap[direction],
        align && alignClassMap[align],
        justify && justifyClassMap[justify],
        wrap && 'flex-wrap',
        gap !== undefined && `gap-${gap}`,
        gapX !== undefined && `gap-x-${gapX}`,
        gapY !== undefined && `gap-y-${gapY}`,
        wRes?.class,
        hRes?.class,
        minWRes?.class,
        minHRes?.class,
        maxWRes?.class,
        maxHRes?.class,
        spacingClass('p', p),
        spacingClass('px', px),
        spacingClass('py', py),
        spacingClass('ps', ps),
        spacingClass('pe', pe),
        spacingClass('pt', pt),
        spacingClass('pb', pb),
        marginClass('m', m),
        marginClass('mx', mx),
        marginClass('my', my),
        marginClass('ms', ms),
        marginClass('me', me),
        marginClass('mt', mt),
        marginClass('mb', mb),
        bg && `bg-${bg}`,
        color && `text-${color}`,
        border !== undefined && borderWidthClassMap[border],
        borderColor && `border-${borderColor}`,
        radius && radiusClassMap[radius],
        shadow && shadowClassMap[shadow],
        position,
        overflow && `overflow-${overflow}`,
        zIndex && `z-${zIndex}`,
    ]
        .filter(Boolean)
        .join(' ');

    return {
        className: classes,
        style: Object.keys(computedStyle).length > 0 ? computedStyle : undefined
    };
}
