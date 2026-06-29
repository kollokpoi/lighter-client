import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { LIGHT_EFFECTS, SELECT_ITEMS_MODE, type LightEffects, type SelectItemsMode } from "../types/preferences/enums"

const usePreferencesStore = defineStore('preferences', () => {
    const mouseUpTime = ref(0)
    const mouseDownTime = ref(0)

    const selectMode = ref<SelectItemsMode>(SELECT_ITEMS_MODE.RANGE)
    const selectedEffect = ref<LightEffects>(LIGHT_EFFECTS.STATIC)
    const isSelectRangeMode = computed(() => selectMode.value === SELECT_ITEMS_MODE.RANGE)
    const isSelectSingleMode = computed(() => selectMode.value === SELECT_ITEMS_MODE.SINGLE)
    const isSelectAllMode = computed(() => selectMode.value === SELECT_ITEMS_MODE.ALL)

    function onMouseDown() {
        mouseDownTime.value = Date.now();
    }

    function onMouseUp() {
        mouseUpTime.value = Date.now();
    }

    return {
        mouseUpTime,
        mouseDownTime,
        selectMode,
        selectedEffect,
        isSelectRangeMode,
        isSelectSingleMode,
        isSelectAllMode,
        onMouseDown,
        onMouseUp
    }
})

export default usePreferencesStore