import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { SELECT_ITEMS_MODE, type SelectItemsMode } from "../types/preferences/enums"

export const usePreferencesStore = defineStore('preferences', () => {
    const selectMode = ref<SelectItemsMode>(SELECT_ITEMS_MODE.SINGLE)
    const isSelectRangeMode  = computed(() => selectMode.value === SELECT_ITEMS_MODE.RANGE)
    const isSelectSingleMode  = computed(() => selectMode.value === SELECT_ITEMS_MODE.SINGLE)
    const isSelectAllMode  = computed(() => selectMode.value === SELECT_ITEMS_MODE.ALL)

    const setSelectMode = (mode: SelectItemsMode) => {
        selectMode.value = mode
    }

    return {
        selectMode,
        setSelectMode
    }
})