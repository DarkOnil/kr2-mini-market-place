const CATEGORY_NAMES: Record<string, string> = {
  clothes: 'Одежда',
  clothing: 'Одежда',
  electronics: 'Электроника',
  electronic: 'Электроника',
  furniture: 'Мебель',
  shoes: 'Обувь',
  miscellaneous: 'Разное',
  other: 'Разное',
}

export function getCategoryName(name?: string | null): string {
  if (!name) return 'Без категории'

  const category = String(name)
    .replace(/\s*from config/gi, '')
    .trim()
    .toLowerCase()

  return CATEGORY_NAMES[category] || category.charAt(0).toUpperCase() + category.slice(1)
}
