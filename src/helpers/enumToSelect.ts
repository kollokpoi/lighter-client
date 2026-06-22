type SelectOption<T = string> = {
  label: string
  value: T
}

/**
 * Базовый вариант — лейблы из ключей enum
 */
export function enumToSelectOptions<const T extends Record<string, string>>(
  enumObject: T
): SelectOption<T[keyof T]>[] {
  return (Object.entries(enumObject) as [string, T[keyof T]][])
    .map(([key, value]) => ({
      label: key.charAt(0) + key.slice(1).toLowerCase().replace(/_/g, ' '),
      value: value as T[keyof T],
    }))
}

/**
 * Вариант с кастомными лейблами
 */
export function enumToSelectOptionsWithLabels<
  const T extends Record<string, string>
>(
  enumObject: T,
  labels: Record<T[keyof T], string>
): SelectOption<T[keyof T]>[] {
  return (Object.values(enumObject) as T[keyof T][])
    .map((value) => ({
      label: labels[value],
      value: value,
    }))
}