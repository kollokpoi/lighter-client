export interface Rgb {
    r: number;
    g: number;
    b: number;
}

export interface PixelData {
    position: number;
    color: Rgb;
    selected: boolean;
    rangeId?: number;
}

export function createPixel(position: number): PixelData {
    return {
        position,
        color: { r: 0, g: 0, b: 0 },
        selected: false,
    };
}