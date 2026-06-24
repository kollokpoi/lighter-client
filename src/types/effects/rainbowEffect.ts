import type { PixelData, Rgb } from "../pixel";
import { BaseEffect, type RenderResult } from "./BaseEffect";

export class RainbowEffect extends BaseEffect {
    private hueStart = 0;
    private deltaHue = 7;

    public render(pixels: PixelData[], from: number, to: number, time: number): RenderResult {
        const baseHue = (this.hueStart + (time * this.speed) / 256) % 256;

        for (let i = from; i <= to && i < pixels.length; i++) {
            const pixel = pixels[i];
            if (!pixel) continue;

            const hue = (baseHue + (i - from) * this.deltaHue) % 256;
            const rgb = this.hsvToRgb(hue, 255, this.intensity);
            pixel.color = rgb;
        }

        this.lastUpdate = time;
        return { changed: true, pixelActive: true };
    }

    private hsvToRgb(h: number, s: number, v: number): Rgb {
        if (s === 0) {
            return { r: v, g: v, b: v };
        }

        const hNorm = (h % 256) / 255;
        const sNorm = s / 255;
        const vNorm = v / 255;

        const h6 = hNorm * 6;
        const sector = Math.floor(h6);
        const fraction = h6 - sector;

        const p = vNorm * (1 - sNorm);
        const q = vNorm * (1 - sNorm * fraction);
        const t = vNorm * (1 - sNorm * (1 - fraction));

        let rNorm: number, gNorm: number, bNorm: number;

        switch (sector % 6) {
            case 0: rNorm = vNorm; gNorm = t; bNorm = p; break;
            case 1: rNorm = q; gNorm = vNorm; bNorm = p; break;
            case 2: rNorm = p; gNorm = vNorm; bNorm = t; break;
            case 3: rNorm = p; gNorm = q; bNorm = vNorm; break;
            case 4: rNorm = t; gNorm = p; bNorm = vNorm; break;
            case 5: rNorm = vNorm; gNorm = p; bNorm = q; break;
            default: rNorm = 0; gNorm = 0; bNorm = 0;
        }

        return {
            r: Math.round(rNorm * 255),
            g: Math.round(gNorm * 255),
            b: Math.round(bNorm * 255)
        };
    }
}