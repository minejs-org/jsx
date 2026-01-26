
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
    ContainerSpaceOrAuto,
    OverlayPosition,
    ContainerCursor,
    ContainerUserSelect,
    ContainerPointerEvents,
    ContainerResize,
    ContainerAnimation,
    ContainerAnimateDuration,
    ContainerAnimateDelay,
    ContainerAnimateEase,
    ContainerAnimateFill,
    ContainerTextSize,
    ContainerTextWeight,
    ContainerTextAlign,
    ContainerTextWrap,
    ContainerTextTransform
} from '../types';

// ╔════════════════════════════════════════ MAPS ════════════════════════════════════════╗

const overlayPositionClassMap: Record<OverlayPosition, string> = {
    'center': 'justify-center items-center',
    'top': 'justify-center items-start',
    'bottom': 'justify-center items-end',
    'left': 'justify-start items-center',
    'right': 'justify-end items-center',
    'top-left': 'justify-start items-start',
    'top-right': 'justify-end items-start',
    'bottom-left': 'justify-start items-end',
    'bottom-right': 'justify-end items-end',
};

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
    '2xl': 'shadow-2xl',
    inner: 'shadow-inner'
};

const borderStyleClassMap: Record<string, string> = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
    double: 'border-double',
    groove: 'border-groove',
    ridge: 'border-ridge',
    inset: 'border-inset',
    hidden: 'border-hidden',
    none: 'border-none'
};

const cursorClassMap: Record<ContainerCursor, string> = {
    auto: 'cursor-auto',
    default: 'cursor-default',
    pointer: 'cursor-pointer',
    wait: 'cursor-wait',
    text: 'cursor-text',
    move: 'cursor-move',
    help: 'cursor-help',
    'not-allowed': 'cursor-not-allowed',
    none: 'cursor-none',
    grab: 'cursor-grab',
    grabbing: 'cursor-grabbing'
};

const selectClassMap: Record<ContainerUserSelect, string> = {
    none: 'select-none',
    text: 'select-text',
    all: 'select-all',
    auto: 'select-auto'
};

const pointerEventsClassMap: Record<ContainerPointerEvents, string> = {
    none: 'pointer-events-none',
    auto: 'pointer-events-auto'
};

const resizeClassMap: Record<ContainerResize, string> = {
    none: 'resize-none',
    both: 'resize',
    y: 'resize-y',
    x: 'resize-x'
};

const animateClassMap: Record<ContainerAnimation, string> = {
    none: 'animate-none',
    spin: 'animate-spin',
    ping: 'animate-ping',
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
    'fade-in': 'animate-fade-in',
    'fade-out': 'animate-fade-out',
    'slide-in-up': 'animate-slide-in-up',
    'slide-in-down': 'animate-slide-in-down',
    'slide-in-left': 'animate-slide-in-left',
    'slide-in-right': 'animate-slide-in-right',
    'zoom-in': 'animate-zoom-in',
    'zoom-out': 'animate-zoom-out'
};

const animateEaseClassMap: Record<ContainerAnimateEase, string> = {
    linear: 'animate-ease-linear',
    in: 'animate-ease-in',
    out: 'animate-ease-out',
    'in-out': 'animate-ease-in-out'
};

const animateFillClassMap: Record<ContainerAnimateFill, string> = {
    forwards: 'animate-fill-forwards',
    backwards: 'animate-fill-backwards',
    both: 'animate-fill-both',
    none: 'animate-fill-none'
};

const textSizeClassMap: Record<ContainerTextSize, string> = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl',
    '7xl': 'text-7xl',
    '8xl': 'text-8xl',
    '9xl': 'text-9xl'
};

const textWeightClassMap: Record<ContainerTextWeight, string> = {
    thin: 'font-thin',
    extralight: 'font-extralight',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black'
};

const textAlignClassMap: Record<ContainerTextAlign, string> = {
    start: 'text-start',
    end: 'text-end',
    left: 'text-left',
    right: 'text-right',
    center: 'text-center',
    justify: 'text-justify'
};

const textWrapClassMap: Record<ContainerTextWrap, string> = {
    wrap: 'text-wrap',
    nowrap: 'text-nowrap',
    balance: 'text-balance',
    pretty: 'text-pretty'
};

const textTransformClassMap: Record<ContainerTextTransform, string> = {
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    capitalize: 'capitalize',
    none: 'normal-case'
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
    'grow', 'shrink', 'basis', 'order',
    'gap', 'gapX', 'gapY',
    'w', 'h', 'size', 'minW', 'minH', 'maxW', 'maxH',
    'p', 'px', 'py', 'ps', 'pe', 'pt', 'pb',
    'm', 'mx', 'my', 'ms', 'me', 'mt', 'mb',
    'bg', 'color', 'border', 'borderStyle', 'borderColor', 'radius', 'shadow', 'opacity',
    'position', 'overflow', 'zIndex',
    'overlay', 'location', 'backdrop',
    'divider',
    'cursor', 'select', 'pointerEvents', 'resize',
    'animate', 'animateDuration', 'animateDelay', 'animateEase', 'animateFill',
    'textSize', 'textWeight', 'textAlign', 'textWrap', 'textTransform', 'italic', 'underline', 'lineThrough', 'truncate'
]);

export function resolveStyleProps(props: ContainerProps): { className: string; style: any } {
    const {
        display,
        direction,
        align,
        justify,
        wrap,
        grow,
        shrink,
        basis,
        order,
        gap,
        gapX,
        gapY,
        w,
        h,
        size,
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
        borderStyle,
        borderColor,
        radius,
        shadow,
        opacity,
        position,
        overflow,
        zIndex,
        overlay,
        location,
        backdrop,
        divider,
        cursor,
        select,
        pointerEvents,
        resize,
        animate,
        animateDuration,
        animateDelay,
        animateEase,
        animateFill,
        textSize,
        textWeight,
        textAlign,
        textWrap,
        textTransform,
        italic,
        underline,
        lineThrough,
        truncate
    } = props;

    const sizeWRes = resolveSize('w', size);
    const sizeHRes = resolveSize('h', size);
    const wRes = resolveSize('w', w) || sizeWRes;
    const hRes = resolveSize('h', h) || sizeHRes;
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
        ...(basis && typeof basis === 'string' && !['auto', 'full'].includes(basis) ? { flexBasis: basis } : {}),
        ...(order !== undefined ? { order } : {}),
        ...(grow !== undefined && typeof grow === 'number' ? { flexGrow: grow } : {}),
        ...(shrink !== undefined && typeof shrink === 'number' ? { flexShrink: shrink } : {}),
        ...(overlay && backdrop ? { backgroundColor: 'rgba(0, 0, 0, 0.5)' } : {})
    };

    const classes = [
        overlay && 'absolute inset-0 w-full h-full flex',
        overlay && location && overlayPositionClassMap[location],
        // Default to center if overlay is true but no location provided?
        // The original kit defaulted to center.
        overlay && !location && overlayPositionClassMap['center'],
        
        display && displayClassMap[display],
        direction && directionClassMap[direction],
        align && alignClassMap[align],
        justify && justifyClassMap[justify],
        wrap && 'flex-wrap',
        
        grow === true && 'grow',
        grow === false && 'grow-0',
        shrink === true && 'shrink',
        shrink === false && 'shrink-0',
        basis && typeof basis === 'string' && ['auto', 'full'].includes(basis) && `basis-${basis}`,

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
        borderStyle && borderStyleClassMap[borderStyle],
        borderColor && `border-${borderColor}`,
        radius && radiusClassMap[radius],
        shadow && shadowClassMap[shadow],
        opacity !== undefined && `opacity-${opacity}`,
        position,
        overflow && `overflow-${overflow}`,
        zIndex && `z-${zIndex}`,

        // Interaction
        cursor && cursorClassMap[cursor],
        select && selectClassMap[select],
        pointerEvents && pointerEventsClassMap[pointerEvents],
        resize && resizeClassMap[resize],

        // Animation
        animate && animateClassMap[animate],
        animateDuration && `animate-duration-${animateDuration}`,
        animateDelay && `animate-delay-${animateDelay}`,
        animateEase && animateEaseClassMap[animateEase],
        animateFill && animateFillClassMap[animateFill],

        // Typography
        textSize && textSizeClassMap[textSize],
        textWeight && textWeightClassMap[textWeight],
        textAlign && textAlignClassMap[textAlign],
        textWrap && textWrapClassMap[textWrap],
        textTransform && textTransformClassMap[textTransform],
        italic && 'italic',
        underline && 'underline',
        lineThrough && 'line-through',
        truncate && 'truncate',

        // Divider logic
        divider === true && 'border-t',
        divider === 'horizontal' && 'border-t',
        divider === 'vertical' && 'border-s', // border-start
    ]
        .filter(Boolean)
        .join(' ');

    return {
        className: classes,
        style: Object.keys(computedStyle).length > 0 ? computedStyle : undefined
    };
}
