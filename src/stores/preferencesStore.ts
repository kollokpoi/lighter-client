import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { LIGHT_EFFECTS, SELECT_ITEMS_MODE, type LightEffects, type SelectItemsMode } from "../types/preferences/enums"

const usePreferencesStore = defineStore('preferences', () => {
    const selectMode = ref<SelectItemsMode>(SELECT_ITEMS_MODE.SINGLE)
    const selectedEffect = ref<LightEffects>(LIGHT_EFFECTS.STATIC)
    const isSelectRangeMode  = computed(() => selectMode.value === SELECT_ITEMS_MODE.RANGE)
    const isSelectSingleMode  = computed(() => selectMode.value === SELECT_ITEMS_MODE.SINGLE)
    const isSelectAllMode  = computed(() => selectMode.value === SELECT_ITEMS_MODE.ALL)

    const setSelectMode = (mode: SelectItemsMode) => {
        selectMode.value = mode
    }

    return {
        selectMode,
        selectedEffect,
        setSelectMode,
    }
})

export default usePreferencesStore