import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Range } from "../types/range";

const useRangeStore = defineStore("range", () => {
    const FPS = 100;
    const ranges = ref<Range[]>([]);

    const activeRanges = computed(() => ranges.value.filter(r => r.active));
    const rangesByLayer = (layer: number) => ranges.value.filter(r => r.layer === layer);
    const addRange = (range: Range) => ranges.value.push(range);
    const removeRange = (id: number) => ranges.value = ranges.value.filter(r => r.id !== id);

    return {
        ranges,
        rangesByLayer,
        addRange,
        removeRange
    };
})

export default useRangeStore
