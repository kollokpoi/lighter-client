<template>
  <div class="h-5 w-full flex justify-between p-2">
    
  </div>
</template>

<script setup lang="ts">
import { useRangeStore, usePixelsStore, usePreferencesStore } from "@/stores";

import { onMounted, onUnmounted } from "vue";
import Pixel from "@/components/Pixel.vue";
import { StaticEffect, RainbowEffect, BreathEffect } from "@/types/effects/";

const rangeStore = useRangeStore();
const pixelsStore = usePixelsStore();
const preferences = usePreferencesStore();
let animFrameId: number;

function renderLoop() {
  const now = Date.now();
  const ranges = rangeStore.ranges.filter((r) => r.active);
  const pixels = pixelsStore.pixels;

  for (const range of ranges) {
    range.effect.render(pixels, range.start, range.end, now);
  }

  animFrameId = requestAnimationFrame(renderLoop);
}

onMounted(() => {
  pixelsStore.setLength(1);
  rangeStore.addRange({
    id: 0,
    start: 0,
    end: 1,
    layer: 0,
    effect: new RainbowEffect(),
    active: true,
    pixels: pixelsStore.pixels,
  })
  animFrameId = requestAnimationFrame(renderLoop);
});

onUnmounted(() => {
  cancelAnimationFrame(animFrameId);
});
</script>