import type { Pixel, rgb } from "../pixel";

export type RenderResult = {
    changed: boolean;
    pixelActive: boolean;
};

export class BaseEffect {
    protected startTime: number = 0;
    protected lastUpdate: number = 0;
    protected speed: number = 128;
    protected intensity: number = 128;
    protected transparent: boolean = false;
    protected color: rgb = { r: 0, g: 0, b: 0 }

    public init(time: number): void { this.startTime = time; this.lastUpdate = time }
    public render(pixels: Pixel[], from: number, to: number, time: number): RenderResult {
        return { changed: true, pixelActive: true };
    }

    public setSpeed = (speed: number): void => { this.speed = speed }
    public setIntensity = (intensity: number): void => { this.intensity = intensity }
    public setTransparent = (transparent: boolean): void => { this.transparent = transparent }
    public setColor(c: rgb) { this.color = c; }
    public getColor() { return this.color }

    public isTransparent(): boolean { return this.transparent }
}