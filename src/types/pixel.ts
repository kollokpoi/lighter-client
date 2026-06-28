import { reactive } from "vue";
export interface Rgb {
    r: number;
    g: number;
    b: number;
}

export interface PixelData {
    position: number;
    color: Rgb;
    selected: boolean;
    active: boolean;
    lastDragTime: number;
}

export function createPixel(position: number) {
    return reactive<PixelData>({
        position,
        selected: false,
        color: { r: 0, g: 0, b: 0 },
        active: false,
        lastDragTime: -1,
    });
}