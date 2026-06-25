import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { createPixel, type PixelData } from "@/types/pixel";
import type { Range } from "@/types/range";

const useLedStore = defineStore("led", () => {
    const pixels = ref<PixelData[]>([]);
    const ranges = ref<Range[]>([]);
    const brightness = ref(255);
    const power = ref(true);

    const activeRanges = computed(() =>
        ranges.value.filter(r => r.active)
    );

    const rangesByLayer = computed(() =>
        [...activeRanges.value].sort((a, b) => a.layer - b.layer)
    );

    function pixelAt(position: number): PixelData | undefined {
        return pixels.value[position];
    }

    function init(count: number) {
        pixels.value = Array.from({ length: count }, (_, i) => createPixel(i));
    }

    function addRange(range: Range) {
        range.id = ranges.value.length;
        ranges.value.push(range);
    }

    function removeRange(id: number) {
        ranges.value = ranges.value.filter(r => r.id !== id);
    }

    function updateRange(id: number, updates: Partial<Range>) {
        const range = ranges.value.find(r => r.id === id);
        console.log(ranges.value, id)
        if (range) Object.assign(range, updates);
    }

    function clearRanges() {
        ranges.value = [];
    }

    function renderFrame(now: number) {
        for (const p of pixels.value) {
            p.color.r = 0;
            p.color.g = 0;
            p.color.b = 0;
        }
        const sorted = rangesByLayer.value;
        for (const range of sorted) {
            range.effect.render(pixels.value, range.start, range.end, now, range.effect.getColor());
        }
    }

    function reset() {
        pixels.value = [];
        ranges.value = [];
    }

    return {
        pixels,
        ranges,
        brightness,
        power,
        activeRanges,
        rangesByLayer,
        pixelAt,
        init,
        addRange,
        removeRange,
        updateRange,
        clearRanges,
        renderFrame,
        reset,
    };
});

export default useLedStore;