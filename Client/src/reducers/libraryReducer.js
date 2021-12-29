import { INSERT_INTO_ITEMS } from './../actions/library/insertIntoItems'
import { INSERT_INTO_INFOCUS_ITEM } from './../actions/library/insertIntoInFocusItem'
import { INSERT_INTO_FILTERED_ITEMS } from './../actions/library/insertIntoFilteredItems'
import { libraryInitialState } from './../data/library/libraryInitialState'

export function library(state = libraryInitialState, action) {
    switch (action.type) {
        case INSERT_INTO_ITEMS:
            return Object.assign({}, state, {
                items: action.data,
            })
        case INSERT_INTO_INFOCUS_ITEM:
            return Object.assign({}, state, {
                inFocusItem: action.data,
            })
        case INSERT_INTO_FILTERED_ITEMS:
            return Object.assign({}, state, {
                filteredItems: action.data,
            })
        default:
            return state
    }
}
