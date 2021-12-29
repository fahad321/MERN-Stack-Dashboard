export const INSERT_INTO_ITEMS = 'INSERT_INTO_ITEMS'
export function insertIntoItems(data) {
    return {
        type: INSERT_INTO_ITEMS,
        data,
    }
}
