import { INSERTINTOITEMS } from './insertIntoItems'

export const INSERT_INTO_INFOCUS_ITEM = 'INSERT_INTO_INFOCUS_ITEM'

export function insertIntoInFocusItem(data) {
    return {
        type: INSERT_INTO_INFOCUS_ITEM,
        data,
    }
}
