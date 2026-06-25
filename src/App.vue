<template>
  <div class="w-full h-screen max-h-full flex flex-col">
    <div class="w-full flex justify-between items-center relative">
      <p>Настройки</p>
      <button class="w-10 h-10 p-0 flex items-center justify-center cursor-pointer rounded-full bg-gray-200"
        @click="isHeaderExpanded = !isHeaderExpanded">
        <i class="pi pi-angle-down transition-all duration-300" :class="isHeaderExpanded ? 'rotate-180' : ''" />
      </button>
      <Transition name="expand">
        <div v-if="isHeaderExpanded" class="w-full overflow-hidden absolute top-full">
          <div class="flex justify-between items-center">
            <div class="flex gap-2">
              <Select v-model="preferences.selectMode" :options="getSelectModeOptions" optionValue="value"
                optionLabel="label" />
              <Select v-model="preferences.selectedEffect" :options="getLightEffectOptions" optionValue="value"
                optionLabel="label" />
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <div class="flex-1 w-full flex flex-col" ref="pixelsHolder">
      <div class="w-full h-4 flex">
        <Pixel v-for="pixel in topPixels" :key="pixel.position" :position="pixel.position" />
      </div>
      <div class="flex w-full flex-1 justify-between items-center">
        <div class="h-full w-4 flex flex-col-reverse">
          <Pixel v-for="pixel in leftPixels" :key="pixel.position" :position="pixel.position" />
        </div>
        <div class="flex-1 p-5">
          <Slider @change="(value:any)=>{
            ledStore.updateRange(0, {end: value})
          }" :min="0" :max="ledStore.pixels.length"/>
        </div>
        <div class="h-full w-4 flex ">
          <Pixel v-for="pixel in rightPixels" :key="pixel.position" :position="pixel.position" />
        </div>
      </div>
      <div class="w-full h-4 flex flex-row-reverse">
        <Pixel v-for="pixel in bottomPixels" :key="pixel.position" :position="pixel.position" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePreferencesStore, useLedStore } from "@/stores";
import { getLightEffectOptions, getSelectModeOptions } from "@/helpers";
import { computed, onMounted, onUnmounted, ref } from "vue";
import Pixel from "@/components/Pixel.vue";
import { StaticEffect, RainbowEffect, BreathEffect } from "@/types/effects/";

const pixelsHolder = ref<HTMLDivElement>();

const width = ref(1);
const height = ref(1);

const preferences = usePreferencesStore();
const ledStore = useLedStore();
const isHeaderExpanded = ref(false);

const aspect = computed(() => height.value / width.value);

const pixelsPerRow = computed(() =>
  Math.round(ledStore.pixels.length / (2 * (1 + aspect.value)) + 2)
);

const pixelsPerColumn = computed(() =>
  Math.round((ledStore.pixels.length - 2 * pixelsPerRow.value - 4) / 2)
);

const topPixels = computed(() => {
  return ledStore.pixels.slice(0, pixelsPerRow.value)
});

const rightPixels = computed(() =>
  ledStore.pixels.slice(pixelsPerRow.value, pixelsPerRow.value + pixelsPerColumn.value)
);

const bottomPixels = computed(() =>
  ledStore.pixels.slice(
    pixelsPerRow.value + pixelsPerColumn.value,
    pixelsPerRow.value * 2 + pixelsPerColumn.value
  )
);

const leftPixels = computed(() =>
  ledStore.pixels.slice(pixelsPerRow.value * 2 + pixelsPerColumn.value)
);

let animFrameId: number;

function loop() {
  ledStore.renderFrame(Date.now());
  animFrameId = requestAnimationFrame(loop);
}

function onResize() {
  if (pixelsHolder.value) {
    width.value = pixelsHolder.value.clientHeight;
    height.value = pixelsHolder.value.clientWidth;
  }
}

onMounted(() => {
  ledStore.init(250);
  ledStore.addRange({
    id: 1,
    start: 0,
    end: 200,
    layer: 0,
    active: true,
    effect: new BreathEffect({ r: 255, g: 0, b: 0 }),
    pixels: [],
  });
  animFrameId = requestAnimationFrame(loop);
  window.addEventListener('resize', onResize)
});

onUnmounted(() => {
  cancelAnimationFrame(animFrameId);
  window.removeEventListener('resize', onResize)
});

</script>
<style>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
