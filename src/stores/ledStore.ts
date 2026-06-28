import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { createPixel, type PixelData } from "@/types/pixel";
import type { Range } from "@/types/range";
import usePreferencesStore from "./preferencesStore";


const useLedStore = defineStore("led", () => {
    const preferences = usePreferencesStore();
    const { mouseDownTime, mouseUpTime } = storeToRefs(preferences);
    const pixels = ref<PixelData[]>([]);
    const ranges = ref<Range[]>([]);
    const brightness = ref(255);
    const power = ref(true);
    const isAllSelected = ref(false);

    const isDragging = () =>  mouseDownTime.value > mouseUpTime.value && Date.now() - mouseDownTime.value > 300

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

    function select(position: number) {
        console.log(isDragging())
        if (preferences.isSelectAllMode) {
            isAllSelected.value = !isAllSelected.value;
            pixels.value.forEach(p => p.selected = isAllSelected.value);
        } else if (isDragging()) {

        }
        else if (preferences.isSelectRangeMode) {
            const range = ranges.value
                .filter(r => r.start <= position && r.end >= position)
                .sort((a, b) => a.layer - b.layer)[0];
            if (!range) return;
            ranges.value.forEach(r => r.isSelected = false);
            range.isSelected = !range.isSelected;

            for (let i = range.start; i <= range.end; i++) {
                pixels.value[i]!.selected = range.isSelected;
            }
        } else {
            const pixel = pixels.value[position];
            if (!pixel) return;

            pixel.selected = !pixel.selected;
        }
    }

    function renderFrame(now: number) {
        const isActiveArray = Array.from({ length: pixels.value.length }, () => false);
        const sorted = rangesByLayer.value;
        for (const range of sorted) {
            range.effect.render(pixels.value, range.start, range.end, now, range.effect.getColor());
            isActiveArray.fill(true, range.start, range.end);
        }
        pixels.value.forEach((elem, index) => {
            elem.active = isActiveArray[index] ?? false;
        });
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
        select
    };
});

export default useLedStore;