import { CATEGORIES } from 'shared/consts/categories'

export const getCategoryNameByLink = (link?: string): string | undefined => {
    for (const values of Object.values(CATEGORIES)) {
        const findEl = values.find((item) => item.link === link)

        if (findEl) {
            return findEl.title
        }
    }
    return undefined
}
