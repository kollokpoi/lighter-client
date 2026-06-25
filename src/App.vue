<template>
  <div class="w-full h-screen max-h-full flex flex-col">
    <div class="w-full flex justify-between items-center relative">
      <p>Настройки</p>
      <button
        class="w-10 h-10 p-0 flex items-center justify-center cursor-pointer rounded-full bg-gray-200"
        @click="isHeaderExpanded = !isHeaderExpanded"
      >
        <i
          class="pi pi-angle-down transition-all duration-300"
          :class="isHeaderExpanded ? 'rotate-180' : ''"
        />
      </button>
      <Transition name="expand">
        <div v-if="isHeaderExpanded" class="w-full overflow-hidden absolute top-full">
          <div class="flex justify-between items-center">
            <div class="flex gap-2">
              <Select
                v-model="preferences.selectMode"
                :options="getSelectModeOptions"
                optionValue="value"
                optionLabel="label"
              />
              <Select
                v-model="preferences.selectedEffect"
                :options="getLightEffectOptions"
                optionValue="value"
                optionLabel="label"
              />
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <div class="flex-1 w-full"></div>
  </div>
</template>

<script setup lang="ts">
import { usePreferencesStore, useLedStore } from "@/stores";
import { getLightEffectOptions, getSelectModeOptions } from "@/helpers";
import { onMounted, onUnmounted, ref } from "vue";
import Pixel from "@/components/Pixel.vue";
import { StaticEffect, RainbowEffect, BreathEffect } from "@/types/effects/";

const preferences = usePreferencesStore();
const ledStore = useLedStore();
const isHeaderExpanded = ref(false);
let animFrameId: number;

function loop() {
  ledStore.renderFrame(Date.now());
  animFrameId = requestAnimationFrame(loop);
}

onMounted(() => {
  ledStore.init(30);
  ledStore.addRange({
    id: 1,
    start: 0,
    end: 20,
    layer: 0,
    active: true,
    effect: new BreathEffect({ r: 255, g: 0, b: 0 }),
    pixels: [],
  });
  animFrameId = requestAnimationFrame(loop);
});

onUnmounted(() => {
  cancelAnimationFrame(animFrameId);
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
