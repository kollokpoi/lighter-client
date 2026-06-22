export const SELECT_ITEMS_MODE = {
    SINGLE: 'single',
    RANGE: 'range',
    ALL: 'all'
} as const;

export type SelectItemsMode = (typeof SELECT_ITEMS_MODE)[keyof typeof SELECT_ITEMS_MODE];

export const LIGHT_EFFECTS = {
    STATIC: 'static',
    BREATH: 'breath',
    RAINBOW: 'rainbow'
} as const;

export type LightEffects = (typeof LIGHT_EFFECTS)[keyof typeof LIGHT_EFFECTS];