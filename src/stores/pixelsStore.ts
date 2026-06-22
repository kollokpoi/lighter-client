import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { createPixel, type PixelData } from "../types/pixel";

export const usePixelsStore = defineStore('pixels', () => {
    const pixels = ref<PixelData[]>([]);

    const pixelById = computed(() => (id: number) =>
        pixels.value.find(p => p.position === id)
    );

    const setLength = (length: number) => {
        pixels.value = Array.from({ length }, (_, i) => createPixel(i));
    };

    return {
        pixels,
        pixelById,
        setLength
    };
});