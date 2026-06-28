import type { PixelData, Rgb } from "../pixel";
import { BaseEffect, type RenderResult } from "./BaseEffect";

export class StaticEffect extends BaseEffect {

    constructor(color: Rgb) {
        super();
        this.color = color;
    }

    public render(pixels: PixelData[], from: number, to: number, time: number): RenderResult {
        for (let i = from; i <= to && i < pixels.length; i++) pixels[i]!.color = this.color;
        this.lastUpdate = time
        return { changed: true, pixelActive: true };
    }
}