
import { CreateItem, UpdateItem, ReplaceItem, DeleteItem } from "./reducers"

const reducerIndex = {
    "CREATE": CreateItem,
    "UPDATE": UpdateItem,
    "REPLACE": ReplaceItem,
    "DELETE": DeleteItem
}

export const reducer = (state, action) => {
    const type = action.type
    const currentReducer = reducerIndex[type]
    const result = currentReducer(state, action)
    return {...result}
}