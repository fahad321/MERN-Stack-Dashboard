import { INSERT_INTO_INFOCUS_ITEM } from './insertIntoInFocusItem'

export const INSERT_INTO_FILTERED_ITEMS = 'INSERT_INTO_FILTERED_ITEMS'

export function insertIntoFilteredItems(data) {
    return {
        type: INSERT_INTO_FILTERED_ITEMS,
        data,
    }
}
