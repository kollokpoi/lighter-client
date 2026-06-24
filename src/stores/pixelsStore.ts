import { defineStore } from "pinia";
import { ref } from "vue";
import { createPixel, type PixelData } from "../types/pixel";

const usePixelsStore = defineStore('pixels', () => {
    const pixels = ref<PixelData[]>([]);

    function pixelById(position: number): PixelData | undefined {
        return pixels.value[position];
    }

    function setLength(length: number) {
        pixels.value = Array.from({ length }, (_, i) => createPixel(i));
    }

    return {
        pixels,
        pixelById,
        setLength,
    };
});
export default usePixelsStore