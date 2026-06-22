import type { BaseEffect } from "./effects/BaseEffect"
import type { Pixel } from "./pixel"

export interface Range {
    id: number
    start: number
    end: number
    layer: number
    effect: BaseEffect
    active: boolean
    pixels: Pixel[]
}