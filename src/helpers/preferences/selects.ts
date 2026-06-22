import { SELECT_ITEMS_MODE, LIGHT_EFFECTS } from "../../types/preferences/enums";
import { enumToSelectOptionsWithLabels } from "../enumToSelect";

export const getSelectModeOptions = enumToSelectOptionsWithLabels(SELECT_ITEMS_MODE,{
    single:'Пиксель',
    range:'Диапазон',
    all:'Все'
});

export const getLightEffectOptions = enumToSelectOptionsWithLabels(LIGHT_EFFECTS,{
    static:'Статичный',
    rainbow:'Радуга',
    breath:'Дыхание'
});