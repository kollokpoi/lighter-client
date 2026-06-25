import type { PixelData, Rgb } from "../pixel";
import { BaseEffect, type RenderResult } from "./BaseEffect";

export class BreathEffect extends BaseEffect {
    private periodMs: number = 2000;
    constructor(color?: Rgb) {
        super();
        this.color = color || { r: 255, g: 0, b: 0 };
    }

    public render(pixels: PixelData[], from: number, to: number, time: number, baseColor?: Rgb): RenderResult {
        const multiplier = this.getMultiplier(time);

        for (let i = from; i <= to && i < pixels.length; i++) {
            const pixel = pixels[i];
            if (!pixel) continue;


            const color = baseColor ?? this.color;

            pixel.color.r = Math.round(color.r * multiplier / 255);
            pixel.color.g = Math.round(color.g * multiplier / 255);
            pixel.color.b = Math.round(color.b * multiplier / 255);
        }

        this.lastUpdate = time;
        return { changed: true, pixelActive: true };
    }


    public getMultiplier(time: number): number {
        const phase = (time - this.startTime) % this.periodMs;
        const angle = (phase / this.periodMs) * 2 * Math.PI;
        const brightness = (Math.cos(angle) + 1) / 2;
        return Math.round(brightness * this.intensity);
    }

    public setPeriod(ms: number): void {
        this.periodMs = ms;
    }
}