<template>
  <div class="pixel flex-1" v-if="pixel"
    :style="{ backgroundColor: pixel.active ? `rgb(${pixel.color.r}, ${pixel.color.g}, ${pixel.color.b})` : 'transparent' }"
    :class="classes" @click="onMouseClick" @mouseenter="handleMouseEnter" />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useLedStore, usePreferencesStore } from "@/stores";

const props = defineProps<{ position: number, isHorizontal: boolean, isReversed: boolean }>();
const ledStore = useLedStore();
const preferences = usePreferencesStore();

const pixel = computed(() => ledStore.pixelAt(props.position));

const classes = computed(() => {
  const p = pixel.value;
  if (!p || !p.selected) return ["pixel"];

  const c = ["pixel", "selected"];

  if (props.isHorizontal) {
    c.push("horizontal");
    if (p.isFirstSelected) c.push(props.isReversed ? "last-horizontal" : "first-horizontal");
    if (p.isLastSelected) c.push(props.isReversed ? "first-horizontal" : "last-horizontal");
  } else {
    c.push("vertical");
    if (p.isFirstSelected) c.push(props.isReversed ? "last-vertical" : "first-vertical");
    if (p.isLastSelected) c.push(props.isReversed ? "first-vertical" : "last-vertical");
  }

  return c;
});

const onMouseClick = () => {
  preferences.onMouseDown();
  ledStore.select(props.position);
};

const handleMouseEnter = (e: MouseEvent) => {
  if (e.buttons === 0) return;
  ledStore.select(props.position);
};
</script>

<style scoped>
.pixel {
  user-select: none;
  cursor: pointer;
  box-sizing: border-box;
}

.selected {
  --border-color: #000000;
  --border-width: 2px;
}

.horizontal {
  border-top: var(--border-width) solid var(--border-color);
  border-bottom: var(--border-width) solid var(--border-color);
}

.vertical {
  border-left: var(--border-width) solid var(--border-color);
  border-right: var(--border-width) solid var(--border-color);
}

.first-horizontal {
  border-left: var(--border-width) solid var(--border-color);
}

.last-horizontal {
  border-right: var(--border-width) solid var(--border-color);
}

.first-vertical {
  border-top: var(--border-width) solid var(--border-color);
}

.last-vertical {
  border-bottom: var(--border-width) solid var(--border-color);
}
</style>