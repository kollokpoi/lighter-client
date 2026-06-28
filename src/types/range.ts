import { StaticEffect } from "./effects"
import type { BaseEffect } from "./effects/BaseEffect"

export class Range {
    id: number
    start: number
    end: number
    layer: number
    effect: BaseEffect
    active: boolean
    isSelected: boolean
    constructor(id: number, start: number, end: number, layer: number, effect: BaseEffect = new StaticEffect({ r: 0, g: 0, b: 0 }), active: boolean = true, isSelected: boolean = false) {
        this.id = id
        this.start = start
        this.end = end
        this.layer = layer
        this.active = active
        this.effect = effect
        this.isSelected = isSelected
    }
}