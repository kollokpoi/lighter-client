<template>
  <div
    class="pixel flex-1"
    v-if="pixel"
    :style="{ backgroundColor: `rgb(${pixel.color.r}, ${pixel.color.g}, ${pixel.color.b})` }"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useLedStore } from "@/stores";

const props = defineProps<{ position: number }>();
const ledStore = useLedStore();

const pixel = computed(() => ledStore.pixelAt(props.position));
</script>
<style scoped>
</style>