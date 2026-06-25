<template>
  <div
    class="pixel"
    v-if="pixel"
    :style="{
      backgroundColor: `rgb(${pixel.color.r}, ${pixel.color.g}, ${pixel.color.b})`,
    }"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { usePixelsStore } from "../stores/ledStore";

const props = defineProps<{ position: number }>();
const pixelsStore = usePixelsStore();

const pixel = computed(() => pixelsStore.pixelById(props.position));
</script>
<style scoped>
.pixel {
  width: 10px;
  height: 10px;
  display: block;
}
</style>