import type { PixelData, Rgb } from "../pixel";
import { BaseEffect, type RenderResult } from "./BaseEffect";

export class BreathEffect extends BaseEffect {
    private periodMs: number = 2000;
    constructor(color?: Rgb) {
        super();
        this.color = color || { r: 255, g: 0, b: 0 };
    }
    
    public render(pixels: PixelData[], from: number, to: number, time: number): RenderResult {
        const multiplier = this.getMultiplier(time);

        for (let i = from; i <= to && i < pixels.length; i++) {
            const pixel = pixels[i];
            if (!pixel) continue;

            const currentColor = pixel.color;

            if (currentColor.r === 0 && currentColor.g === 0 && currentColor.b === 0) {
                pixel.color.r = Math.round(this.color.r * multiplier / 255);
                pixel.color.g = Math.round(this.color.g * multiplier / 255);
                pixel.color.b = Math.round(this.color.b * multiplier / 255);
            } else {
                pixel.color.r = Math.round(currentColor.r * multiplier / 255);
                pixel.color.g = Math.round(currentColor.g * multiplier / 255);
                pixel.color.b = Math.round(currentColor.b * multiplier / 255);
            }
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