<template>
  <div
    class="pixel"
    :style="{
      backgroundColor: `rgb(${pixel.color.r}, ${pixel.color.g}, ${pixel.color.b})`,
    }"
  >

  </div>
</template>
<script lang="ts" setup>
import type { PixelData } from "../types/pixel";
defineProps<{ pixel: PixelData }>();
</script>
<style scoped>
.pixel {
  width: 20px;
  height: 20px;
}
</style>
