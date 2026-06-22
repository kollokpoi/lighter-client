<template>
  <div class="flex gap-3">
    <Pixel v-for="pixel in pixels" :pixel="pixel" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import Pixel from "./components/Pixel.vue";
import { usePixelsStore } from "./stores/pixelsStore.ts";
import { onMounted } from "vue";
import { useRangeStore } from "./stores/rangeStore.ts";
import { StaticEffect } from "./types/effects/staticEffect.ts";

const pixelsStore = usePixelsStore();
const rangeStore = useRangeStore();
const { pixels } = storeToRefs(pixelsStore);
const { ranges } = storeToRefs(rangeStore);

onMounted(()=> {
  pixelsStore.setLength(20);
  rangeStore.addRange(
    {
      id: 1,
      start: 0,
      end: 10,
      layer: 0,
      effect: new StaticEffect({ r: 255, g: 0, b: 0 }),
      active: true,
      pixels: pixels.value
    });
});
</script>
