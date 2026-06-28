<template>
  <div class="pixel flex-1" v-if="pixel"
    :style="{ backgroundColor: pixel.active ? `rgb(${pixel.color.r}, ${pixel.color.g}, ${pixel.color.b})` : 'transparent' }"
    :class="pixel.selected ? 'border-2' : ''" @mousedown="onMouseDown" @mouseenter="handleMouseEnter" />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useLedStore, usePreferencesStore } from "@/stores";

const props = defineProps<{ position: number }>();
const ledStore = useLedStore();
const preferences = usePreferencesStore();

const pixel = computed(() => ledStore.pixelAt(props.position));

const onMouseDown = () => {
  preferences.onMouseDown();
  ledStore.select(props.position);
}

const handleMouseEnter = (e: MouseEvent) => {
  if (e.buttons === 0) return;
  ledStore.select(props.position);
}

</script>
<style scoped>
.pixel {
  user-select: none;
  cursor: pointer;
}
</style>